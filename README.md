<h1 align="center">Avro Compatibility</h1>
<p>
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg" />
  <a href="https://github.com/petermyers/avro-compatibility#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://codecov.io/github/petermyers/avro-compatibility" > 
 <img src="https://codecov.io/github/petermyers/avro-compatibility/branch/main/graph/badge.svg?token=Q7JWECNCZR"/> 
 </a>
  <a href="https://github.com/petermyers/allow/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/petermyers/allow/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-brightgreen.svg" />
  </a>
</p>

> A lightweight library for checking Avro schema compatibility.  
> Built on the backs of giants.  
> (Sits atop the amazing [mtth/avsc](https://github.com/mtth/avsc))

### 🏠 [Homepage](https://github.com/petermyers/avro-compatibility#readme)

## Prerequisites

- node >=18.18.0

## Installation
```sh
npm install avro-compatibility
```
or
```sh
yarn add avro-compatibility
```

## Usage
### Validity Checks
Validates a string (or object) is valid Avro.
```js
import { ValidityChecker } from 'avro-compatibility';

// Invalid Avro
const schemaInvalid = `{
  "name" : "Employee",
  "fields" : [
    { "name" : "Name" , "type" : "string" },
    { "name" : "Age" , "type" : "int" }
  ]
}`;

ValidityChecker.for(schemaInvalid).check(); // Returns false;

// Valid Avro
const schemaValid = {
  "type" : "record",
  "namespace" : "ValidityCheckerExample",
  "name" : "Employee",
  "fields" : [
    { "name" : "Name" , "type" : "string" },
    { "name" : "Age" , "type" : "int" }
  ]
};

ValidityChecker.for(schemaValid).check(); // Returns false;
```

#### Logging
You can log out the errors found during validity checks by supplying `printValidityErrors`.

```js
ValidityChecker.for(schemaInvalid).check({ printValidityErrors: true });
```

### Compatibility Checks
Validate whether or not a schema is compatible with previous versions of the schema given a particular compatibility mode. See the [Confluent Docs](https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html#compatibility-types) on schema evolution for more information.

```js
import { CompatibilityChecker, CompatibilityMode } from 'avro-compatibility';

const schema1 = {
    type: 'record',
    name: 'myrecord',
    fields: [{ type: 'string', name: 'f1' }],
};

const schema2 = {
    type: 'record',
    name: 'myrecord',
    fields: [
        { type: 'string', name: 'f1' },
        { type: 'string', name: 'f2', default: 'foo' },
    ],
};

const schema3 = {
    type: 'record',
    name: 'myrecord',
    fields: [
        { type: 'string', name: 'f1' },
        { type: 'string', name: 'f2' },
    ],
};

// Removing a field.
CompatibilityChecker
  .check(schema2) // New schema
  .against([schema1]) // Previous schemas
  .withCompatibility(CompatibilityMode.BACKWARD)
  .check(); // True

// Add a field without a default.
CompatibilityChecker
  .check(schema3) // New schema
  .against([schema1]) // Previous schemas
  .withCompatibility(CompatibilityMode.BACKWARD)
  .check(); // False
```

Supported compatibility modes.
```js
CompatibilityMode.BACKWARD
CompatibilityMode.BACKWARD_TRANSITIVE
CompatibilityMode.FORWARD
CompatibilityMode.FORWARD_TRANSITIVE
CompatibilityMode.FULL
CompatibilityMode.FULL_TRANSITIVE
CompatibilityMode.NONE
```

#### Logging
You can log out the errors found during compatibility checks by supplying `printCompatibilityErrors`.

```js
CompatibilityChecker.check(schema3)
  .against([schema1])
  .withCompatibility(CompatibilityMode.BACKWARD)
  .check({ printCompatibilityErrors: true })
```

## Development
### Install
```sh
yarn install
```

### Tests
```sh
# Run tests.
yarn test

# Run tests with coverage.
yarn test:coverage

# Run lint and prettier.
yarn lint

# Fix lint errors than can be automatically resolved.
yarn format
```

## Author

👤 **Peter Myers**

* Github: [@petermyers](https://github.com/petermyers)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/petermyers/avro-compatibility/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2024 [Peter Myers](https://github.com/petermyers).<br />
This project is [MIT](https://github.com/petermyers/avro-compatibility/blob/main/LICENSE) licensed.