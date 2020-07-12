# node-tesla-api

A modern nodeJS implementation of the [(unofficial) Tesla API](https://tesla-api.timdorr.com).

_under development: features outlined below may not be final_

## Usage

I'm only focussing on the OAuth and Vehicles aspects of the Tesla API for now.

The API follows the commands outlined in the [(unofficial) Tesla API](https://tesla-api.timdorr.com), but uses camelCase instead of underscores.

### Example

```js
const { oauth, vehicles } = require('node-tesla-api')

const DELAY = Number(process.env.TESLA_API_DELAY) || 2500

const sleep = async delay => new Promise(resolve => setTimeout(resolve, delay))

const wakeCar = async ({ id, token }) => {
  const {
    response: { state }
  } = await vehicles.vehicle({ id, token })
  if (state === 'online') return

  await vehicles.wakeUp({ id, token })
  await sleep(DELAY)
  // try again
  await wakeCar({ id, token })
}

const start = async (email, password) => {
  const { accessToken: token } = await oauth.token({
    email,
    password,
    // these values are an open secret.
    clientSecret: 'c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3',
    clientId: '81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384',
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

## To Do

- DRY up the code some more
- Add API unit tests and bring test coverage to 100%
- Improve documentation
- Make repo public.
