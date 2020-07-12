# node-tesla-api

A modern nodeJS implementation of the [(unofficial) Tesla API](https://tesla-api.timdorr.com).

_under development: features outlined below may not be final_

## Usage

I'm only focussing on the OAuth and Vehicles aspects of the Tesla API for now.

The API follows the commands outlined in the [(unofficial) Tesla API](https://tesla-api.timdorr.com), but uses camelCase instead of underscores. The following is a very low-level mapping of the main commands.

```js
const api = require('node-tesla-api')

const client = api(secret, id) // client_secret and client_id
const getToken = async (email, password) =>
  client.oauth.token({
    email,
    password,
    grant_type: 'password'
  })

const refreshToken = async (email, password) =>
  client.oauth.token({
    email,
    password,
    grant_type: 'refresh_token'
  })

const revokeToken = async token => client.oauth.revoke({ token })

const listVehicles = async token => client.vehicles.list({ token })

// use the vehicle's id_s field instead of id.
const getVehicle = async (id, token) => client.vehicles.vehicle({ id, token })

// then check to see if it's asleep. If it is then wake it up.
const wakeUp = async (id, token) => client.vehicles.wakeUp({ id, token })

// when it's awake you can get the vehicle data. Else you'll get a 408 error.
const getVehicleData = async (id, token) => client.vehicles.data({ id, token })
const getVehicleServiceData = async (id, token) =>
  client.vehicles.serviceData({ id, token })
const isMobileEnabled = async (id, token) =>
  client.vehicles.mobileEnabled({ id, token })
const chargeState = async (id, token) =>
  client.vehicles.chargeState({ id, token })
const climateState = async (id, token) =>
  client.vehicles.climateState({ id, token })
const driveState = async (id, token) =>
  client.vehicles.driveState({ id, token })
const guiSettings = async (id, token) =>
  client.vehicles.guiSettings({ id, token })

const unlock = async (id, token) => client.vehicles.doorUnlock({ id, token })
const lock = async (id, token) => client.vehicles.doorLock({ id, token })
const beep = async (id, token) => client.vehicles.honkHorn({ id, token })
const flash = async (id, token) => client.vehicles.flashLights({ id, token })
const startHVAC = async (id, token) =>
  client.vehicles.autoConditioningStart({ id, token })
const stopHVAC = async (id, token) =>
  client.vehicles.autoConditioningStop({ id, token })
const setTemperature = async (driverTemp, passengerTemp, id, token) =>
  client.vehicles.setTemps({ driverTemp, passengerTemp, id, token })
const setChargeLimit = async (limitValue, id, token) =>
  client.vehicles.setChargeLimit({ limitValue, id, token })
const setChargeToMax = async (id, token) =>
  client.vehicles.chargeMaxRange({ id, token })
const setChargeToStandard = async (id, token) =>
  client.vehicles.chargeStandard({ id, token })
const sunRoof = async (state, id, token) =>
  client.vehicles.sunRoof({ state, id, token })
const frunk = async (id, token) => client.vehicles.actuateTrunk({ id, token })
const remoteStartDrive = async (id, token, password) =>
  client.vehicles.remoteStartDrive({ id, token, password })
const openChargePort = async (id, token) =>
  client.vehicles.chargePortDoorOpen({ id, token })
const closeChargePort = async (id, token) =>
  client.vehicles.chargePortDoorClose({ id, token })
const startCharging = async (id, token) =>
  client.vehicles.chargeStart({ id, token })
const stopCharging = async (id, token) =>
  client.vehicles.chargeStop({ id, token })

const calendar = async (id, token) =>
  client.vehicles.upcomingCalendarEntries({ id, token })
const enableValetMode = async (id, token, password) =>
  client.vehicles.setValetMode({ id, token, on: true, password })
const disableValetMode = async (id, token, password) =>
  client.vehicles.setValetMode({ id, token, on: false, password })
const resetValetPIN = async (id, token) =>
  client.vehicles.resetValetPIN({ id, token })
const enableSpeedLimit = async (id, token) =>
  client.vehicles.speedLimitActivate({ id, token })
const disableSpeedLimit = async (id, token) =>
  client.vehicles.speedLimitDeactivate({ id, token })
const setSpeedLimit = async (id, token) =>
  client.vehicles.speedLimitDeactivate({ id, token })
const resetSpeedLimitPIN = async (id, token) =>
  client.vehicles.speedLimitClearPin({ id, token })
```

## Development

<!-- prettier-ignore -->
| branch | status | coverage | audit | notes |
| ------ | ------ | -------- | ----- |
| `develop` | `ci badge` | `code coverage badge` | `audit badge` | work in progress |
| `master`  | `ci badge` | `code coverage badge` | `audit badge` | latest stable release |

### Prerequisites

- [NodeJS](htps://nodejs.org), version 12.18.2 (LTS) or better (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)

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

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
