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
  tokens, // an array of tokens
  state, // "online" if the car is online
  inService, // boolean
  idS, // use this string version of the id instead of id
  calendarEnabled, // boolean
  apiVersion, // a number
  backseatToken, // unsure what this is
  backseatTokenUpdatedAt // timestamp or null
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
  vehicleId, // a number
  vin, // a string
  displayName, // a string
  optionCodes, // a string of comma separated codes
  color, // not sure - usually null
  tokens, // an array of tokens
  state, // "online" if the car is online
  inService, // boolean
  idS, // use this string version of the id instead of id
  calendarEnabled, // boolean
  apiVersion, // a number
  backseatToken, // unsure what this is
  backseatTokenUpdatedAt // timestamp or null
} = await vehicles.vehicle({ id, token })
```

- On `timdorr`: [`get-api-1-vehicles-id`](https://tesla-api.timdorr.com/api-basics/vehicles#get-api-1-vehicles-id)
- On `teslaapi`: [`vehicle`](https://www.teslaapi.io/vehicles/list#vehicle)

The keen observer will note that this is the same data as returned in the vehicle list response.

---

### `wake`

When you first get the details of your car, you need to check the `state` to see if it's `'online'` or not.

If the car's `state` is `'asleep'` or otherwise not `'online'` then you need to wake it up before you can do anything with it.

**Note** You might also want to check to see if the car is `inService` (`true` or `false`) if you are going to do something like try to move it, or start it.

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

**ToDo**: Compose a high-level API that simplifies the use of this low-level API wrapper. (See #28)

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
