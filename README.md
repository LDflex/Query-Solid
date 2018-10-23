# LDflex for Solid
Simple access to [Solid](https://solid.mit.edu/) data pods
through [LDflex](https://github.com/RubenVerborgh/LDflex) expressions

[![npm version](https://img.shields.io/npm/v/@solid/query-ldflex.svg)](https://www.npmjs.com/package/@solid/query-ldflex)
[![Build Status](https://travis-ci.org/solid/query-ldflex.svg?branch=master)](https://travis-ci.org/solid/query-ldflex)
[![Coverage Status](https://coveralls.io/repos/github/solid/query-ldflex/badge.svg?branch=master)](https://coveralls.io/github/solid/query-ldflex?branch=master)
[![Dependency Status](https://david-dm.org/solid/query-ldflex.svg)](https://david-dm.org/solid/query-ldflex)

This library brings the [LDflex](https://github.com/RubenVerborgh/LDflex) language
to Solid by:

1. providing a [JSON-LD context for Solid](https://github.com/solid/query-ldflex/blob/master/src/context.json)
2. binding a query engine ([Comunica](https://github.com/RubenVerborgh/LDflex-Comunica))
3. exposing useful data paths

## Data paths
Once you [obtain the `solid.data` object](#usage),
you have access to the following data paths.

### User
The `solid.data.user` path can query data about the currently logged in user,
such as:
- `solid.data.user.firstName`
- `solid.data.user.email`
- `solid.data.user.friends`
- `solid.data.user.friends.firstName`

More inspiration for properties can be found in the [JSON-LD context](https://github.com/solid/query-ldflex/blob/master/src/context.json)

### URL
The `solid.data[url]` path can query data about any subject by URL,
such as:
- `solid.data['https://ruben.verborgh.org/profile/#me'].firstName`
- `solid.data['https://ruben.verborgh.org/profile/#me'].email`
- `solid.data['https://ruben.verborgh.org/profile/#me'].friends`
- `solid.data['https://ruben.verborgh.org/profile/#me'].friends.firstName`

## Installation
```bash
npm install @solid/query-ldflex
```

## Usage
### Node.js
```javascript
const { default: data } = require('@solid/query-ldflex');

const ruben = data['https://ruben.verborgh.org/profile/#me'];
showProfile(ruben);

async function showProfile(person) {
  const label = await person.label;
  console.log(`\nNAME: ${label}`);

  console.log('\nTYPES');
  for await (const type of person.type)
    console.log(`  - ${type}`);

  console.log('\nFRIENDS');
  for await (const name of person.friends.firstName)
    console.log(`  - ${name} is a friend`);
}

```

### Browser
```html
<script src="solid-auth-client.bundle.js"></script>
<script src="solid-query-ldflex.bundle.js"></script>
```

```javascript
document.addEventListener('DOMContentLoaded', async () => {
  const user = solid.data.user;
  alert(`Welcome, ${await user.firstName}!`);
});

```

### Resolving string expressions
LDflex expressions are actual JavaScript—not strings.
There are times when strings are more useful though,
such as when building
[declarative components that take LDflex expressions](https://github.com/solid/react-components).

The `solid.data` object exports a `resolve` interface
that transforms a string expression into an actual LDflex path.
This string is appended to `solid.data` to obtain the resulting path.
For example:
- `solid.data.resolve('.user.firstName')` becomes the path `solid.data.user.firstName`
- `solid.data.resolve('["https://example.org/"].label')` becomes the path `solid.data["https://example.org/"].label`

For convenience, the starting dot
and quotes inside of braces can be omitted.
The following strings will all resolve:
- `'.user.firstName'`
- `'user.firstName'`
- `'["https://example.org/"].label'`
- `'[https://example.org/].label'`

## License
©2018–present [Ruben Verborgh](https://ruben.verborgh.org/),
[MIT License](https://github.com/solid/query-ldflex/blob/master/LICENSE.md).
