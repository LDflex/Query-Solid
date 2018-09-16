# LDflex for Solid
This library brings the [LDflex](https://github.com/RubenVerborgh/LDflex) language
to [Solid](https://solid.mit.edu/).

## Installation
```bash
npm install @solid/query-ldflex
```

## Usage
### Node.js
```javascript
const { default: ldflex } = require('@solid/query-ldflex');
const { node } = ldflex;

const ruben = node('https://ruben.verborgh.org/profile/#me');
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
[MIT License](https://github.com/RubenVerborgh/LDflex/blob/master/LICENSE.md).
