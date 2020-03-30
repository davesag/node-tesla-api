# node-tesla-api

A modern nodeJS implementation of the (unofficial) Tesla API

_under development: features outlined below are not yet implemented_

## Development

<!-- prettier-ignore -->
| branch | status | coverage | notes |
| ------ | ------ | -------- | ----- |
| `develop` | `ci badge` | `code coverage badge` | work in progress |
| `master`  | `ci badge` | `code coverage badge` | latest stable release |

### Prerequisites

- [NodeJS](htps://nodejs.org), version 12.16.1 (LTS) or better (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)

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
