# node-tesla-api

A modern NodeJS implementation of the [(unofficial) Tesla API](https://tesla-api.timdorr.com).

[![NPM](https://nodei.co/npm/node-tesla-api.png)](https://nodei.co/npm/node-tesla-api/)

_under development: features outlined below may not be final_

## Usage

```sh
npm i node-tesla-api
```

I'm only focussing on the OAuth and Vehicles aspects of the Tesla API for now.

The API follows the commands outlined in the [(unofficial) Tesla API](https://tesla-api.timdorr.com), but uses camelCase instead of underscores.

**You'll need to own a Tesla to make use of this API.**

Please feel free to use [my Tesla referral code](https://ts.la/david60377) when you buy a Tesla - we both get some free charging that way.

My code is: [`david60377`](https://ts.la/david60377)

### Example

```js
const { oauth, vehicles } = require('node-tesla-api')

const sleep = async delay => new Promise(resolve => setTimeout(resolve, delay))

const wakeCar = async ({ id, token, retry = 0, maxRetries = 3 }) => {
  if (retry === maxRetries) return

  const {
    response: { state }
  } = await vehicles.vehicle({ id, token })
  if (state === 'online') return

  await vehicles.wake({ id, token })
  await sleep(DELAY)
  // try again
  await wakeCar({ id, token, retry: retry + 1, maxRetries })
}

const start = async (email, password) => {
  const { accessToken: token } = await oauth.token({
    email,
    password,
    // These values are an open secret.
    // See https://tesla-api.timdorr.com for the latest values.
    clientSecret: 'get-me-from-pastebin',
    clientId: 'also-get-me-from-pastebin'
  })
  console.log('token', token)

  const { response: cars } = await vehicles.list({ token })
  console.log('cars', cars)

  const { idS: id } = cars.find(car => car.displayName === 'Terry')
  await wakeCar({ id, token })

  const { response: state } = await vehicles.vehicleState({ id, token })
  console.log('state', JSON.stringify(state, null, 2))
}

start('your-tesla@account.email', 'Y0uRP@55w0rd').catch(err => {
  console.error(err)
})
```

## API

### `oauth`

Controls how you obtain, refresh and revoke tokens.

```js
const { oauth } = require('node-tesla-api')
```

---

#### `token`

Returns the `accessToken` you will need to invoke the other api functions.

```js
const { accessToken, refreshToken, tokenType, createdAt, expiresIn } = await oauth.token({
  email: 'your-tesla@account.email',
  password: 'your-password',
  clientSecret: 'get-me-from-pastebin',
  clientId: 'also-get-me-from-pastebin'
})
```

- On `timdorr`: [`post-oauth-token-grant_type-password`](https://tesla-api.timdorr.com/api-basics/authentication#post-oauth-token-grant_type-password)
- On `teslaapi`: [`get-access-token`](https://www.teslaapi.io/authentication/oauth#get-access-token)

---

#### `refresh`

Returns a _refreshed_ `accessToken`. Use this if your original token has expired.

```js
const { accessToken, refreshToken, tokenType, createdAt, expiresIn } = await oauth.refresh({
  refreshToken: 'the refresh token you got back from the `token` function',
  clientSecret: 'get-me-from-pastebin',
  clientId: 'also-get-me-from-pastebin'
})
```

- On `timdorr`: [`post-oauth-token-grant_type-refresh_token`](https://tesla-api.timdorr.com/api-basics/authentication#post-oauth-token-grant_type-refresh_token)
- On `teslaapi`: [`get-access-token`](https://www.teslaapi.io/authentication/oauth#get-access-token)

---

#### `revoke`

Revokes an `accessToken`. Use this to log the user out.

```js
await oauth.revoke({ token: 'the access token you got back from the `token` function' })
```

- On `timdorr`: Not mentioned
- On `teslaapi`: [`revoke-access-token`](https://www.teslaapi.io/authentication/oauth#revoke-access-token)

---

### `vehicles`

Using the accessToken issued above you use the `vehicles` functions to interact with your car.

```js
const { vehicles } = require('node-tesla-api')
```

---

#### `list`

Get a list of your vehicles.

```js
const { response: cars } = await vehicles.list({ token })

const {
  id, // don't use this integer version as the number overflows
  vehicleId, // a number, unsure what it's used for
  vin, // a string
  displayName, // a string
  optionCodes, // a string of comma separated codes
  color, // not sure - usually null
  accessType, // e.g. 'OWNER'
  tokens, // an array of tokens
  state, // "online" if the car is online
  inService, // boolean
  idS, // use this string version of the id instead of id
  calendarEnabled, // boolean
  apiVersion, // a number, e.g. 10 right now.
  backseatToken, // unsure what this is
  backseatTokenUpdatedAt // timestamp or null
  vehicleConfig, // e.g. null
} = cars[0]
```

- On `timdorr`: [`get-api-1-vehicles`](https://tesla-api.timdorr.com/api-basics/vehicles#get-api-1-vehicles)
- On `teslaapi`: [`vehicles`](https://www.teslaapi.io/vehicles/list#vehicles)

---

#### `vehicle`

Get the basic details of a specific vehicle.

```js
// using the `idS` field returned from `vehicles.list`, not the `id`, or `vehicleId`.
// and the token from `oauth.token`
const {
  id, // don't use this integer version as the number overflows
  vehicleId, // a number, unsure what it's used for
  vin, // a string
  displayName, // a string
  optionCodes, // a string of comma separated codes
  color, // not sure - usually null
  accessType, // e.g. 'OWNER'
  tokens, // an array of two tokens
  state, // "online" if the car is online
  inService, // boolean
  idS, // use this string version of the id instead of id
  calendarEnabled, // boolean
  apiVersion, // a number, e.g. 10 right now.
  backseatToken, // unsure what this is
  backseatTokenUpdatedAt // timestamp or null
  vehicleConfig, // e.g. null
} = await vehicles.vehicle({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id`](https://tesla-api.timdorr.com/api-basics/vehicles#get-api-1-vehicles-id)
- On `teslaapi`: [`vehicle`](https://www.teslaapi.io/vehicles/list#vehicle)

The keen observer will note that this is the same data as returned in the vehicle list response.

---

### `wake`

When you first get the details of your car, you need to check the `state` to see if it's `'online'` or not.

If the car's `state` is `'asleep'` or otherwise not `'online'` then you need to wake it up before you can do anything with it.

**Note** You might also want to check to see if the car is `inService` (`true` or `false`) if you are going to do something like move it, or start it.

To wake up the car you send it a `wake` command as follows:

```js
await vehicles.wake({ id, token })
```

Now just because you told the car to wake, doesn't mean that the car will actually wake up. Sometimes your car can go into a deep-sleep mode, or it might even be off, or disconnected from the network.

You need to keep checking the `state` and reissuing the `wake` command until either the car really wakes up, or decide to stop trying.

```js
// Check the `state` of the car recursively, trying three times to wake it up.
const wakeCar = async ({ id, token, retry = 0, maxRetries = 3 }) => {
  if (retry === maxRetries) return

  const {
    response: { state }
  } = await vehicles.vehicle({ id, token })
  if (state === 'online') return

  await vehicles.wake({ id, token })
  await sleep(DELAY)
  // try again
  await wakeCar({ id, token, retry: retry + 1, maxRetries })
}
```

Then you can just call

```js
await wakeCar({ id, token })
```

**ToDo**: Compose a high-level API that simplifies the use of this low-level API wrapper. (See https://github.com/davesag/node-tesla-api/issues/28)

- On `timdorr`: [`post-api-1-vehicles-id-wake_up`](https://tesla-api.timdorr.com/vehicle/commands/wake#post-api-1-vehicles-id-wake_up)
- On `teslaapi`: [`wake-up`](https://www.teslaapi.io/vehicles/commands#wake-up)

---

### `vehicleData`

Now you know how to wake your car, let's take a look at the full set of car data.

```js
const {
  response: {
    id, // don't use this.
    userId,
    vehicleId, // or this
    vin,
    displayName, // TODO: Is this ever different to `vehicleName`?
    optionCodes,
    color,
    accessType, // e.g. "OWNER"  TODO: find out these values.
    tokens, // array of two small strings
    state, // should be "online",
    inService, // boolean,
    idS, // use this instead of `id`
    calendarEnabled, // boolean
    apiVersion, // e.g. 10
    backseatToken, // TODO: find out what this is for
    backseatTokenUpdatedAt, // TODO: find out what this is for
    vehicleConfig: {
      canAcceptNavigationRequests, // boolean
      canActuateTrunks, // boolean
      carSpecialType, // e.g. "base" TODO: find out these values.
      carType, // mine is a "model3"  TODO: find out these values.
      chargePortType, // mine is "CCS"  TODO: find out these values.
      eceRestrictions, // boolean
      euVehicle, // boolean (e.g. true but I am in AU)
      exteriorColor, // mine is "MidnightSilver"  TODO: find out these values.
      hasAirSuspension, // boolean
      hasLudicrousMode, // boolean
      keyVersion, // e.g. 2
      motorizedChargePort, // boolean
      plg, // boolean (e.g. false)
      rearSeatHeaters, // e.g. 1 - I have rear seat heaters
      rearSeatType, // e.g. null
      rhd, // right hand drive? (e.g. true)
      roofColor, // e.g. "Glass"  TODO: find out these values.
      seatType, // e.g. null
      spoilerType, // e.g. "None"
      sunRoofInstalled, // e.g. null,
      thirdRowSeats, // e.g. "<invalid>",  TODO: find out these values.
      timestamp: vcTimestamp, // unix epoch timestamp
      useRangeBadging, // e.g. true,
      wheelType, // e.g. "Pinwheel18"  TODO: find out these values.
    },
    chargeState: {
      batteryHeaterOn, // boolean
      batteryLevel, // integer percentage
      batteryRange, // floating point value using imperial units (miles)
      chargeCurrentRequest, // how many amps the car wants (e.g. 8)
      chargeCurrentRequestMax,  // how many amps the car can have (e.g. 8)
      chargeEnableRequest, // boolean
      chargeEnergyAdded, // floating point number (e.g 10.15)
      chargeLimitSoc, // integer percentage (e.g 94)
      chargeLimitSocMax,  // integer percentage (e.g 100)
      chargeLimitSocMin,   // integer percentage (e.g 50)
      chargeLimitSocStd,  // integer percentage (e.g 90)
      chargeMilesAddedIdeal,   // floating point number (e.g 41.5)
      chargeMilesAddedRated,   // floating point number (e.g 41.5)
      chargePortColdWeatherMode, // boolean
      chargePortDoorOpen, // boolean
      chargePortLatch, // e.g "Engaged"  TODO: find out these values.
      chargeRate, // a number TODO: check these values when charging the car
      chargeToMaxRange, // boolean
      chargerActualCurrent, // a number e.g 0   TODO: check these values when charging the car
      chargerPhases, // 1 = single, 3 = three  TODO: is there such a thing as 2 phase power?
      chargerPilotCurrent, // something else measured in amps (e.g. 8)
      chargerPower, // a number (TODO: check these values when charging the car)
      chargerVoltage, // an integer (e.g 2)
      chargingState, // e.g. "Stopped"  TODO: find out these values.
      connChargeCable, // e.g. "IEC"  TODO: find out these values.
      estBatteryRange, // floating point value using imperial units (miles) (e.g. 273.36)
      fastChargerBrand, // e.g. "<invalid>"
      fastChargerPresent, // boolean
      fastChargerType, // e.g. "MCSingleWireCAN"  TODO: find out these values.
      idealBatteryRange,// floating point value using imperial units (miles) (e.g. 281.16)
      managedChargingActive, // boolean
      managedChargingStartTime, // a timestamp or null
      managedChargingUserCanceled, // boolean
      maxRangeChargeCounter, // TODO: maybe how the car knows to warn you about overcharging.
      minutesToFullCharge, // integer count (e.g 0)
      notEnoughPowerToHeat: null, // e.g. null  TODO: find out these values.
      scheduledChargingPending, // boolean
      scheduledChargingStartTime, //  unix epoch timestamp
      timeToFullCharge, // integer count (e.g 0)
      timestamp: chsTimestamp,//  unix epoch timestamp
      tripCharging, // boolean
      usableBatteryLevel, // integer percentage (e.g 93)
      userChargeEnableRequest // e.g. null  TODO: find out these values.
    },
    climateState: {
      batteryHeater, // boolean
      batteryHeaterNoPower, // e.g. null  TODO: find out these values.
      climateKeeperMode, // e.g "off"  TODO: find out these values.
      defrostMode, // e.g. 0.  TODO: find out these values.
      driverTempSetting, // e.g. 22 (uses GUI setting `guiTemperatureUnits`)
      fanStatus, // e.g. 0.  TODO: find out these values.
      insideTemp, // e.g. 16.2 (uses GUI setting `guiTemperatureUnits`)
      isAutoConditioningOn, // boolean
      isClimateOn, // boolean
      isFrontDefrosterOn, // boolean
      isPreconditioning, // boolean
      isRearDefrosterOn, // boolean
      leftTempDirection, // e.g. 326 - range is 0 to 360 presumably.
      maxAvailTemp, // e.g. 28 (uses GUI setting `guiTemperatureUnits`)
      minAvailTemp, // e.g. 15 (uses GUI setting `guiTemperatureUnits`)
      outsideTemp, // e.g. 15.5 (uses GUI setting `guiTemperatureUnits`)
      passengerTempSetting, // e.g. 22 (uses GUI setting `guiTemperatureUnits`)
      remoteHeaterControlEnabled, // boolean
      rightTempDirection // e.g. 326 - range is 0 to 360 presumably.
      seatHeaterLeft, // 0 = off, else 1, 2, or 3
      seatHeaterRearCenter, // 0 = off, else 1, 2, or 3
      seatHeaterRearLeft, // 0 = off, else 1, 2, or 3
      seatHeaterRearRight, // 0 = off, else 1, 2, or 3
      seatHeaterRight, // 0 = off, else 1, 2, or 3
      sideMirrorHeaters, // boolean
      timestamp: clsTimestamp, // unix epoch timestamp again
      wiperBladeHeater: false
    },
    driveState: {
      gpsAsOf, // unix epoch timestamp
      heading, // e.g. 340 0 to 360 integer degrees
      latitude, // e.g. -30.336537
      longitude, // e.g. 141.145116,
      nativeLatitude, // e.g. -30.336537  TODO: what's this all about?
      nativeLocationSupported, // e.g. 1  TODO: what's this all about?
      nativeLongitude, // e.g. 141.145116  TODO: what's this all about?
      nativeType, // e.g. "wgs"  TODO: get acceptable values for this
      power, // e.g. 0  TODO: get acceptable values for this
      shiftState, // e.g. null  TODO: get acceptable values for this
      speed, // e.g. null  TODO: find out the units for this but my guess is imperial units (mph)
      timestamp: dsTimestamp, // e.g. 1600552117638
    },
    guiSettings: {
      gui24HourTime, // boolean
      guiChargeRateUnits, // e.g. "kW"  TODO: get acceptable values for this
      guiDistanceUnits, // e.g. "km/hr"  TODO: get acceptable values for this
      guiRangeDisplay, // e.g. "Rated"  TODO: get acceptable values for this
      guiTemperatureUnits, // e.g. "C"  TODO: get acceptable values for this
      showRangeUnits, // boolean
      timestamp: gsTimestamp, // unix epoch timestamp
    },
    vehicleState: {
      apiVersion, // e.g. 10,
      autoparkStateV2, // e.g. "standby"  TODO: get acceptable values for this
      autoparkStyle, // e.g. "standard", "dead_man"  TODO: get acceptable values for this
      calendarSupported, // boolean
      carVersion, // e.g. "2020.36.10 010e3e5a2863",
      centerDisplayState, // e.g. 0 = off, 2 = on, 3 = charging screen, 7 = sentry mode, 8 = dog mode
      df, // e.g. 0 (driver-side front tyre/someone sitting?) TODO: get acceptable values
      dr, // e.g. 0 (driver-side rear tyre/someone sitting?) TODO: get acceptable values
      fdWindow, // e.g. 0 (front driver-side window)  TODO: get acceptable values
      fpWindow, // e.g. 0 (front passenger-side window)  TODO: get acceptable values
      ft, // e.g. 0 (front trunk) TODO get acceptable values
      isUserPresent, // boolean
      lastAutoparkError, // e.g. "no_error",
      locked, // boolean
      mediaState: {
        remoteControlEnabled  // boolean
      },
      notificationsSupported, // boolean
      odometer, // e.g 16686.68661 always in imperial units (miles)
      parsedCalendarSupported, // boolean
      pf, // e.g. 0 (passenger-side front tyre/someone sitting?) TODO: get acceptable values
      pr, // e.g. 0 (passenger-side rear tyre/someone sitting?) TODO: get acceptable values
      rdWindow, // e.g. 0 (rear driver-side window)  TODO: get acceptable values
      remoteStart, // boolean
      remoteStartEnabled, // boolean
      remoteStartSupported, // boolean
      rpWindow, // e.g. 0 TODO no idea what this is (driver-side front)
      rt, // e.g. 0 (rear trunk) TODO get acceptable values
      sentryMode, // boolean
      sentryModeAvailable, // boolean
      smartSummonAvailable, // boolean
      softwareUpdate: {
        downloadPerc, // 0 if not downloading
        expectedDurationSec, // e.g. 2700 but no update downloading
        installPerc, // 1 if not installing
        status, // e.g. ''
        version, // e.g. ''
      },
      speedLimitMode: {
        active, // boolean
        currentLimitMph, // always in imperial units
        maxLimitMph, // always in imperial units
        minLimitMph, // always in imperial units
        pinCodeSet, // boolean
      },
      summonStandbyModeEnabled, // boolean
      timestamp, // numeric unix epoch time
      valetMode, // boolean
      valepPinNeeded, // boolean
      vehicleName // TODO: is this different to the displayName of the vehicle?
    }
} = await vehicles.vehicleState({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id-vehicle_data`](https://tesla-api.timdorr.com/vehicle/state/data#get-api-1-vehicles-id-vehicle_data)
- On `teslaapi`: [`vehicle-data`](https://www.teslaapi.io/vehicles/state-and-settings#vehicle-data)

---

### `vehicleState`

The car's current state (This is the same as the `vehicleState` field in the response to `vehicles.vehicleData()`)

```js
const {
  response: {
    apiVersion, // e.g. 10
    autoparkStateV2, // 'standby' or ? (also seeing `autoparkStateV3` in docs)
    autoparkStyle, // e.g. 'standard', 'dead_man'
    calendarSupported, // boolean
    carVersion, // e.g. '2020.36.10 010e3e5a2863'
    centreDisplayState, // e.g. 0 = off, 2 = on, 3 = charging screen, 7 = sentry mode, 8 = dog mode
    df, // driver-side front door 0 = closed, non-zero is open.
    dr, // driver-side rear door 0 = closed, non-zero is open.
    fdWindow, // e.g. 0 = closed, non-zero is open (front driver-side window) TODO is it a %?
    fpWindow, // e.g. 0 = closed, non-zero is open (front passenger-side window) TODO is it a %?
    ft, // front trunk (aka frunk) 0 = closed, non-zero is open.
    isUserPresent, // boolean
    lastAutoparkError, // 'no_error'
    locked, // boolean
    mediaState: { // see also the `mediaState` command
      remoteControlEnabled, // e.g. true. boolean
    },
    notificationsSupported, // boolean
    odometer, // NOTE always in miles not metric
    parsedCalendarSupported, // boolean
    pf, // passenger-side front door 0 = closed, non-zero is open.
    pr, // passenger-side rear door 0 = closed, non-zero is open.
    rdWindow, // e.g. 0 (rear driver-side window)
    remoteStart, // boolean
    remoteStartEnabled, // boolean
    remoteStartSupported, // boolean
    rpWindow, // e.g. 0 (rear passenger-side window)
    rt, // rear trunk (aka boot) 0 = closed, non-zero is open.
    sentryMode, // boolean
    sentryModeAvailable, // boolean
    smartSummonAvailable, // boolean
    softwareUpdate: {
      downloadPerc, // 0 if not downloading
      expectedDurationSec, // e.g. 2700 but no update downloading
      installPerc, // 1 if not installing
      status, // e.g. ''
      version, // e.g. ''
    },
    speedLimitMode; {
      active, // boolean
      currentLimitMph, // always in imperial units
      maxLimitMph, // always in imperial units
      minLimitMph, // always in imperial units
      pinCodeSet, // boolean
    },
    summonStandbyModeEnabled, // boolean
    timestamp, // numeric unix epoch time
    valetMode, // boolean
    valepPinNeeded, // boolean
    vehicleName // TODO: is this different to the displayName of the vehicle?
  }
} = await vehicles.vehicleState({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id-data_request-vehicle_state`](https://tesla-api.timdorr.com/vehicle/state/vehiclestate#get-api-1-vehicles-id-data_request-vehicle_state)
- On `teslaapi`: not listed

---

### `vehicleConfig`

The car's configuration (This is the same as the `vehicleConfig` field in the response to `vehicles.vehicleData()`)

```js
const {
  response: {
    canAcceptNavigationRequests, // boolean
    canActuateTrunks, // boolean
    carSpecialType, // e.g. "base" TODO: find out these values.
    carType, // mine is a "model3"  TODO: find out these values.
    chargePortType, // mine is "CCS"  TODO: find out these values.
    eceRestrictions, // boolean
    euVehicle, // boolean (e.g. true but I am in AU)
    exteriorColor, // mine is "MidnightSilver"  TODO: find out these values.
    hasAirSuspension, // boolean
    hasLudicrousMode, // boolean
    keyVersion, // e.g. 2
    motorizedChargePort, // boolean
    plg, // boolean (e.g. false)
    rearSeatHeaters, // e.g. 1 - I have rear seat heaters
    rearSeatType, // e.g. null
    rhd, // right hand drive? (e.g. true)
    roofColor, // e.g. "Glass"  TODO: find out these values.
    seatType, // e.g. null
    spoilerType, // e.g. "None"
    sunRoofInstalled, // e.g. null,
    thirdRowSeats, // e.g. "<invalid>",  TODO: find out these values.
    timestamp, // unix epoch timestamp
    useRangeBadging, // e.g. true,
    wheelType // e.g. "Pinwheel18"  TODO: find out these values.
  }
} = await vehicles.vehicleConfig({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id-data_request-vehicle_config`](https://tesla-api.timdorr.com/vehicle/state/vehicleconfig#get-api-1-vehicles-id-data_request-vehicle_config)
- On `teslaapi`: not listed

---

### `chargeState`

The car's current charge state. (This is the same as the `chargeState` field in the response to `vehicles.vehicleData()`)

```js
const {
  response: {
    batteryHeaterOn, // boolean
    batteryLevel, // integer percentage
    batteryRange, // floating point value using imperial units (miles)
    chargeCurrentRequest, // how many amps the car wants (e.g. 8)
    chargeCurrentRequestMax, // how many amps the car can have (e.g. 8)
    chargeEnableRequest, // boolean
    chargeEnergyAdded, // floating point number (e.g 10.15)
    chargeLimitSoc, // integer percentage (e.g 94)
    chargeLimitSocMax, // integer percentage (e.g 100)
    chargeLimitSocMin, // integer percentage (e.g 50)
    chargeLimitSocStd, // integer percentage (e.g 90)
    chargeMilesAddedIdeal, // floating point number (e.g 41.5)
    chargeMilesAddedRated, // floating point number (e.g 41.5)
    chargePortColdWeatherMode, // boolean
    chargePortDoorOpen, // boolean
    chargePortLatch, // e.g "Engaged"  TODO: find out these values.
    chargeRate, // a number (TODO: check these values when charging the car)
    chargeToMaxRange, // boolean
    chargerActualCurrent, // a number (TODO: check these values when charging the car)
    chargerPhases, // 1 = single, 3 = three  TODO: is there such a thing as 2 phase power?
    chargerPilotCurrent, // something else measured in amps (e.g. 8)
    chargerPower, // a number (TODO: check these values when charging the car)
    chargerVoltage, // an integer (e.g 2)
    chargingState, // e.g. "Stopped"  TODO: find out these values.
    connChargeCable, // e.g. "IEC"  TODO: find out these values.
    estBatteryRange, // floating point value using imperial units (miles) (e.g. 273.36)
    fastChargerBrand, // e.g. "<invalid>"
    fastChargerPresent, // boolean
    fastChargerType, // e.g. "MCSingleWireCAN"  TODO: find out these values.
    idealBatteryRange, // floating point value using imperial units (miles) (e.g. 281.16)
    managedChargingActive, // boolean
    managedChargingStartTime, // a timestamp or null
    managedChargingUserCanceled, // boolean
    maxRangeChargeCounter, // TODO: maybe how the car knows to warn you about overcharging.
    minutesToFullCharge, // integer count (e.g 0)
    notEnoughPowerToHeat: null, // e.g. null  TODO: find out these values.
    scheduledChargingPending, // boolean
    scheduledChargingStartTime, //  unix epoch timestamp
    timeToFullCharge, // integer count (e.g 0)
    timestamp, //  unix epoch timestamp
    tripCharging, // boolean
    usableBatteryLevel, // integer percentage (e.g 93)
    userChargeEnableRequest // e.g. null  TODO: find out these values.
  }
} = await vehicles.chargeState({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id-data_request-charge_state`](https://tesla-api.timdorr.com/vehicle/state/chargestate#get-api-1-vehicles-id-data_request-charge_state)
- On `teslaapi`: ['charge-state'](https://www.teslaapi.io/vehicles/state-and-settings#charge-state)

---

### `climateState`

The car's current climate state. (This is the same as the `climateState` field in the response to `vehicles.vehicleData()`)

```js
const {
  response: {
    batteryHeater, // boolean
    batteryHeaterNoPower, // e.g. null  TODO: find out these values.
    climateKeeperMode, // e.g "off"  TODO: find out these values.
    defrostMode, // e.g. 0.  TODO: find out these values.
    driverTempSetting, // e.g. 22 (uses GUI setting `guiTemperatureUnits`)
    fanStatus, // e.g. 0.  TODO: find out these values.
    insideTemp, // e.g. 16.2 (uses GUI setting `guiTemperatureUnits`)
    isAutoConditioningOn, // boolean
    isClimateOn, // boolean
    isFrontDefrosterOn, // boolean
    isPreconditioning, // boolean
    isRearDefrosterOn, // boolean
    leftTempDirection, // e.g. 326 - range is 0 to 360 presumably.
    maxAvailTemp, // e.g. 28 (uses GUI setting `guiTemperatureUnits`)
    minAvailTemp, // e.g. 15 (uses GUI setting `guiTemperatureUnits`)
    outsideTemp, // e.g. 15.5 (uses GUI setting `guiTemperatureUnits`)
    passengerTempSetting, // e.g. 22 (uses GUI setting `guiTemperatureUnits`)
    remoteHeaterControlEnabled, // boolean
    rightTempDirection // e.g. 326 - range is 0 to 360 presumably.
    seatHeaterLeft, // 0 = off, else 1, 2, or 3
    seatHeaterRearCenter, // 0 = off, else 1, 2, or 3
    seatHeaterRearLeft, // 0 = off, else 1, 2, or 3
    seatHeaterRearRight, // 0 = off, else 1, 2, or 3
    seatHeaterRight, // 0 = off, else 1, 2, or 3
    sideMirrorHeaters, // boolean
    timestamp, // unix epoch timestamp again
    wiperBladeHeater: false
  }
} = await vehicles.climateState({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id-data_request-climate_state`](https://tesla-api.timdorr.com/vehicle/state/climatestate#get-api-1-vehicles-id-data_request-climate_state)
- On `teslaapi`: ['climate-state'](https://www.teslaapi.io/vehicles/state-and-settings#climate-state)

---

### `driveState`

The car's current location and driving state. (This is the same as the `driveState` field in the response to `vehicles.vehicleData()`)

```js
const {
  response: {
    gpsAsOf, // unix epoch timestamp
    heading, // e.g. 340 0 to 360 integer degrees
    latitude, // e.g. -30.336537
    longitude, // e.g. 141.145116,
    nativeLatitude, // e.g. -30.336537  TODO: what's this all about?
    nativeLocationSupported, // e.g. 1  TODO: what's this all about?
    nativeLongitude, // e.g. 141.145116  TODO: what's this all about?
    nativeType, // e.g. "wgs"  TODO: get acceptable values for this
    power, // e.g. 0  TODO: get acceptable values for this
    shiftState, // e.g. null  TODO: get acceptable values for this
    speed, // e.g. null  TODO: find out the units for this but my guess is imperial units (mph)
    timestamp // e.g. 1600552117638
  }
} = await vehicles.driveState({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id-data_request-drive_state`](https://tesla-api.timdorr.com/vehicle/state/drivestate#get-api-1-vehicles-id-data_request-drive_state)
- On `teslaapi`: ['drive-state'](https://www.teslaapi.io/vehicles/state-and-settings#drive-state)

---

### `guiSettings`

Localisation settings including units for distances, temperatures, and charge, as well as the clock type. (This is the same as the `guiSettings` field in the response to `vehicles.vehicleData()`)

```js
const {
  response: {
    gui24HourTime, // boolean
    guiChargeRateUnits, // e.g. "kW"  TODO: get acceptable values for this
    guiDistanceUnits, // e.g. "km/hr"  TODO: get acceptable values for this
    guiRangeDisplay, // e.g. "Rated"  TODO: get acceptable values for this
    guiTemperatureUnits, // e.g. "C"  TODO: get acceptable values for this
    showRangeUnits, // boolean
    timestamp: gsTimestamp // unix epoch timestamp
  }
} = await vehicles.guiSettings({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id-data_request-gui_settings`](https://tesla-api.timdorr.com/vehicle/state/guisettings#get-api-1-vehicles-id-data_request-gui_settings)
- On `teslaapi`: ['gui-settings'](https://www.teslaapi.io/vehicles/state-and-settings#gui-settings)

---

### `mobileEnabled`

Is mobile access enabled?

```js
const { response: mobileEnabled } = await vehicles.mobileEnabled({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id-mobile_enabled`](https://tesla-api.timdorr.com/vehicle/state/mobileenabled#get-api-1-vehicles-id-mobile_enabled)
- On `teslaapi`: ['mobile-enabled'](https://www.teslaapi.io/vehicles/state-and-settings#mobile-enabled)

---

### `serviceData`

Current servicing data.

```js
const {
  response: {
    // unknown fields - maybe only of use when the car is booked in for service.
    ...serviceData
  }
} = await vehicles.serviceData({ id, token })
```

- On `timdorr`: not mentioned
- On `teslaapi`: ['vehicle-service-data'](https://www.teslaapi.io/vehicles/state-and-settings#vehicle-service-data)

---

### `nearbyChargingSites`

Lists Tesla-operated charging stations near to the car.

```js
const {
  response: {
    congestionSyncTimeUtcSecs, // integer number of seconds
    destinationCharging: [
      {
        location: {
          lat: dcLat, //  e.g. -35.312247
          long: dcLong, // e.g. 149.133236
        },
        name: dcName, // e.g. "Hotel Realm Canberra"
        type: dcType, // e.g. "destination"
        distanceMiles: dcDist // e.g. 11.807002
      }
    ],
    superchargers: [
      {
        location: {
          lat: scLat, // e.g. -35.294304,
          long: scLong, // e.g. 149.190322
        },
        name: scName, // e.g. "Canberra, ACT"
        type: scType, // e.g. "supercharger"
        distanceMiles: scDist, // e.g. 11.87435
        availableStalls, // e.g. 5
        totalStalls, // e.g. 6
        siteClosed // boolean
      }
    ],
    "timestamp" // unix epoch timestamp
  }
} = await vehicles.nearbyChargingSites({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id-nearby_charging_sites`](https://tesla-api.timdorr.com/vehicle/state/nearbychargingsites#get-api-1-vehicles-id-nearby_charging_sites)
- On `teslaapi`: not mentioned

---

## Commands.

It's great to be able to get data from your car, but what about making it do things? We already saw the `wake` command above.

Commands all return a response with a `result` (boolean) and, if the `result` is `false`, a `reason` string.

---

### `honkHorn`

Beeps the car's horn. _toot!_

```js
const {
  response: { result, reason }
} = await vehicles.honkHorn({ id, token })
```

- On `timdorr`: [`post-api-1-vehicles-id-command-honk_horn`](https://tesla-api.timdorr.com/vehicle/commands/alerts#post-api-1-vehicles-id-command-honk_horn)
- On `teslaapi`: [`honk-horn`](https://www.teslaapi.io/vehicles/commands#honk-horn)

---

### `flashLights`

Flashes the car's headlights.

```js
const {
  response: { result, reason }
} = await vehicles.flashLights({ id, token })
```

- On `timdorr`: [`post-api-1-vehicles-id-command-flash_lights`](https://tesla-api.timdorr.com/vehicle/commands/alerts#post-api-1-vehicles-id-command-flash_lights)
- On `teslaapi`: [`flash-lights`](https://www.teslaapi.io/vehicles/commands#flash-lights)

---

### `autoConditioningStart`

Start the car's climate control system. It will use the temperature and set-warming options you've previously set. Repeated calls to this will not cause an error, though obviously if the car's climate control system is on it's not going to turn on again.

```js
const {
  response: { result, reason }
} = await vehicles.autoConditioningStart({ id, token })
```

- On `timdorr`: [`post-api-1-vehicles-id-command-auto_conditioning_start`](https://tesla-api.timdorr.com/vehicle/commands/climate#post-api-1-vehicles-id-command-auto_conditioning_start)
- On `teslaapi`: [`start-hvac-system`](https://www.teslaapi.io/vehicles/commands#start-hvac-system)

---

### `autoConditioningStop`

Stop the car's climate control system.

**Note**: If you call this when the car's climate control system is already off you will get a `ECONNABORTED` error rather than a response of `{ result: false, reason: 'some reason' }`.

```js
const {
  response: { result, reason }
} = await vehicles.autoConditioningStop({ id, token })
```

- On `timdorr`: [`post-api-1-vehicles-id-command-auto_conditioning_stop`](https://tesla-api.timdorr.com/vehicle/commands/climate#post-api-1-vehicles-id-command-auto_conditioning_stop)
- On `teslaapi`: [`stop-hvac-system`](https://www.teslaapi.io/vehicles/commands#stop-hvac-system)

---

### `setTemps`

Sets the temperature for the car's climate control system.

The request requires the parameter `driverTemp`. It also accepts a `passengerTemp` but only the `driverTemp` is actually used right now. This may change in the future.

#### Notes

- The values for `driverTemp` and `passengerTemp` are always in Metric (`°C`) no matter what you have set in `guiSettings`.
- If you set the temperature very low or very high the HVAC system will start heating or cooling immediately.

```js
const driverTemp = 23.4 // degrees celsius.
const {
  response: { result, reason }
} = await vehicles.setTemps({ id, token, driverTemp })
```

- On `timdorr`: [`post-api-1-vehicles-id-command-auto_conditioning_stop`](https://tesla-api.timdorr.com/vehicle/commands/climate#post-api-1-vehicles-id-command-auto_conditioning_stop)
- On `teslaapi`: [`stop-hvac-system`](https://www.teslaapi.io/vehicles/commands#stop-hvac-system) the api claims that the params get passed in as query params but this is not actually true.

---

### `setPreconditoningMax`

Toggles the climate controls between Max Defrost and the previous setting.

#### Notes

You can pass `on: true`, or 'on: false' to this multiple times, without error.

```js
const on = true // degrees celsius.
const {
  response: { result, reason }
} = await vehicles.setPreconditioningMax({ id, token, on: true })
```

- On `timdorr`: [`post-api-1-vehicles-id-command-set_preconditioning_max`](https://tesla-api.timdorr.com/vehicle/commands/climate#post-api-1-vehicles-id-command-set_preconditioning_max)
- On `teslaapi`: not listed

---

_More API documentation to come_: See the actual code for what's completely supported.

---

## Development

<!-- prettier-ignore -->
| branch | status | coverage | audit | notes |
| ------ | ------ | -------- | ----- | ----- |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/node-tesla-api/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/node-tesla-api/tree/develop) | [![codecov](https://codecov.io/gh/davesag/node-tesla-api/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/node-tesla-api) | [![Vulnerabilities](https://snyk.io/test/github/davesag/node-tesla-api/develop/badge.svg)](https://snyk.io/test/github/davesag/node-tesla-api/develop) | work in progress |
| `master`  | [![CircleCI](https://circleci.com/gh/davesag/node-tesla-api/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/node-tesla-api/tree/master) | [![codecov](https://codecov.io/gh/davesag/node-tesla-api/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/node-tesla-api) | [![Vulnerabilities](https://snyk.io/test/github/davesag/node-tesla-api/master/badge.svg)](https://snyk.io/test/github/davesag/node-tesla-api/master) | latest stable release |

### Prerequisites

- [NodeJS](htps://nodejs.org), version 12.18.4 (LTS) or better (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)

### Install dependencies

```sh
npm install
```

### Linting

```sh
npm run lint
```

Note this will also run whenever you commit file changes.

### Formatting via Prettier

```sh
npm run prettier
```

**Note**: this will also run whenever you commit file changes.

### Testing

```sh
npm test
```

or with code coverage

```sh
npm run test:unit:cov
```

_code coverage on this project is shamefully lacking. I am fixing that_

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).

## To Do

- Cross check the API with the latest updates
- Add API unit tests and bring test coverage to 100%
- DRY up the code some more
- Improve documentation
