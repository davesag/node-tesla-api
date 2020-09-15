# node-tesla-api

A modern NodeJS implementation of the [(unofficial) Tesla API](https://tesla-api.timdorr.com).

_under development: features outlined below may not be final_

## Usage

I'm only focussing on the OAuth and Vehicles aspects of the Tesla API for now.

The API follows the commands outlined in the [(unofficial) Tesla API](https://tesla-api.timdorr.com), but uses camelCase instead of underscores.

**You'll need to own a Tesla to make use of this API.**

Please feel free to use [my Tesla referral code](https://ts.la/david60377) when you buy a Tesla - we both get some free charging that way.

My code is: [`david60377`](https://ts.la/david60377)

### Example

```js
const { oauth, vehicles } = require('node-tesla-api')

const sleep = async delay => new Promise(resolve => setTimeout(resolve, delay))

const wakeCar = async ({ id, token }) => {
  const {
    response: { state }
  } = await vehicles.vehicle({ id, token })
  if (state === 'online') return

  await vehicles.wakeUp({ id, token })
  await sleep(2500)
  await wakeCar({ id, token })
}

const start = async (email, password) => {
  const { accessToken: token } = await oauth.token({
    email,
    password,
    // These values are an open secret.
    // See https://tesla-api.timdorr.com for the latest values.
    clientSecret: 'get-me-from-pastebin',
    clientId: 'also-get-me-from-pastebin',
    grantType: 'password'
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

## Development

<!-- prettier-ignore -->
| branch | status | coverage | audit | notes |
| ------ | ------ | -------- | ----- | ----- |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/node-tesla-api/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/node-tesla-api/tree/develop) | [![codecov](https://codecov.io/gh/davesag/node-tesla-api/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/node-tesla-api) | [![Vulnerabilities](https://snyk.io/test/github/davesag/node-tesla-api/develop/badge.svg)](https://snyk.io/test/github/davesag/node-tesla-api/develop) | work in progress |
| `master`  | [![CircleCI](https://circleci.com/gh/davesag/node-tesla-api/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/node-tesla-api/tree/master) | [![codecov](https://codecov.io/gh/davesag/node-tesla-api/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/node-tesla-api) | [![Vulnerabilities](https://snyk.io/test/github/davesag/node-tesla-api/master/badge.svg)](https://snyk.io/test/github/davesag/node-tesla-api/master) | latest stable release |

### Prerequisites

- [NodeJS](htps://nodejs.org), version 12.18.3 (LTS) or better (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)

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

_code coverage on this project is shamefully lacking. I will fix that_

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).

## To Do

- Cross check the API with the latest updates
- Add API unit tests and bring test coverage to 100%
- DRY up the code some more
- Improve documentation
