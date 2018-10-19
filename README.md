# LDflex for Solid
This library brings the [LDflex](https://github.com/RubenVerborgh/LDflex) language
to [Solid](https://solid.mit.edu/).

[![npm version](https://img.shields.io/npm/v/@solid/query-ldflex.svg)](https://www.npmjs.com/package/@solid/query-ldflex)
[![Build Status](https://travis-ci.org/solid/query-ldflex.svg?branch=master)](https://travis-ci.org/solid/query-ldflex)
[![Coverage Status](https://coveralls.io/repos/github/solid/query-ldflex/badge.svg?branch=master)](https://coveralls.io/github/solid/query-ldflex?branch=master)
[![Dependency Status](https://david-dm.org/solid/query-ldflex.svg)](https://david-dm.org/solid/query-ldflex)

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

## License
©2018–present [Ruben Verborgh](https://ruben.verborgh.org/),
[MIT License](https://github.com/solid/query-ldflex/blob/master/LICENSE.md).
