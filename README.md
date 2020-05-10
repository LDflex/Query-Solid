# LDflex for Solid
Simple access to data in [Solid](https://solidproject.org/) pods
through [LDflex](https://github.com/RubenVerborgh/LDflex) expressions

[![npm version](https://img.shields.io/npm/v/@solid/query-ldflex.svg)](https://www.npmjs.com/package/@solid/query-ldflex)
[![Build Status](https://travis-ci.com/solid/query-ldflex.svg?branch=master)](https://travis-ci.com/solid/query-ldflex)
[![Coverage Status](https://coveralls.io/repos/github/solid/query-ldflex/badge.svg?branch=master)](https://coveralls.io/github/solid/query-ldflex?branch=master)
[![Dependency Status](https://david-dm.org/solid/query-ldflex.svg)](https://david-dm.org/solid/query-ldflex)

This library is a _configuration_ of
the [LDflex](https://github.com/RubenVerborgh/LDflex) language
for the Solid ecosystem.
It configures LDflex with:

1. a [JSON-LD context for Solid](https://github.com/solid/context)
2. a Solid-authenticated query engine ([Comunica](https://github.com/RubenVerborgh/LDflex-Comunica) or [rdflib.js](https://github.com/LDflex/LDflex-rdflib/))
3. useful [data paths](#data-paths) for Solid

LDflex expressions occur for example
on [Solid React components](https://github.com/solid/react-components),
where they make it easy for developers
to specify what data they want to show.
They can also be used as an expression language
in any other Solid project or framework.

## Creating data paths
Once you [obtain the `solid.data` object](#usage),
start writing data paths from the following entry points.

### The `user` entry point
The `solid.data.user` path can query data about the currently logged in user,
such as:
- `solid.data.user.firstName` yields the user's first name(s)
- `solid.data.user.email` yields the user's email address(es)
- `solid.data.user.friends` yields the user's friend(s)
- `solid.data.user.friends.firstName` yields the user's friends' first name(s)

### The _any URL_ entry point
The `solid.data[url]` path can query data about any subject by URL,
such as:
- `solid.data['https://ruben.verborgh.org/profile/#me'].firstName`
- `solid.data['https://ruben.verborgh.org/profile/#me'].email`
- `solid.data['https://ruben.verborgh.org/profile/#me'].friends`
- `solid.data['https://ruben.verborgh.org/profile/#me'].friends.firstName`

### Specifying properties
As you can see in the above examples,
an LDflex path starts with an entry point
and is followed by property names,
which can be:

- **abbreviations**
  such as `firstName`
  (which expands to `http://xmlns.com/foaf/0.1/givenName`)
- **prefixed names**
  such as `foaf:givenName`
  (which expands to `http://xmlns.com/foaf/0.1/givenName`)
- **full URLs**
  such as `http://xmlns.com/foaf/0.1/givenName`

The abbreviations and prefixed names are expanded
using a [JSON-LD context](https://github.com/solid/context/blob/master/context.json).
You can find some inspiration about what to ask for in this context.

You can access data using any vocabulary you want
and, when included in the JSON-LD context, in multiple ways.
For example:
- FOAF:
  - `solid.data.user.name`
  - `solid.data.user.foaf_name`
  - `solid.data.user.foaf$name`
  - `solid.data.user['foaf:name']`
  - `solid.data.user['http://xmlns.com/foaf/0.1/name']`
- vCard:
  - `solid.data.user.vcard_fn`
  - `solid.data.user.vcard$fn`
  - `solid.data.user['vcard:fn']`
  - `solid.data.user['http://www.w3.org/2006/vcard/ns#fn']`
- Schema.org:
  - `solid.data.user.schema_name`
  - `solid.data.user.schema$name`
  - `solid.data.user['schema:name']`
  - `solid.data.user['http://www.schema.org/name']`
- Custom:
  - `solid.data.user['http://example.org/my-ontology/name']`

The traditional colon syntax for prefixes (`schema:name`) 
can be substituted with an underscore (`schema_name`)
or dollar sign (`schema$name`).
This is because JavaScript keys with a colon
require quotes (`user['schema:name']`)
whereas underscores and dollar signs
can be used freely (`user.schema_name`, `user.schema$name`).


## Installation
```bash
npm install @solid/query-ldflex
```

## Usage
### Within Node.js environments
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

If, instead of Comunica,
you want to use the rdflib.js query engine,
install `@ldflex/rdflib` as a dependency of your project
and use

```javascript
const { default: data } = require('@solid/query-ldflex/lib/exports/rdflib');
```

When creating browser builds,
it can be easier to simply tell webpack
to replace `@ldflex/comunica` by `@ldflex/rdflib`.


### In the browser
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

To replace Comunica by rdflib.js,
opt for

```html
<script src="solid-auth-client.bundle.js"></script>
<script src="rdflib.min.js"></script>
<script src="solid-query-ldflex.rdflib.js"></script>
```

### Adding a custom JSON-LD context
In addition to the [default properties](https://github.com/solid/context/blob/master/context.json),
you might want to support your own:

```javascript
console.log(solid.data.context);       // the raw default JSON-LD context
await solid.data.context.extend({      // add new JSON-LD context
  con: 'http://www.w3.org/2000/10/swap/pim/contact#',
  preferred: 'con:preferredURI',
});
console.log(await solid.data.context); // the expanded JSON-LD context

// Now we can use both existing and new properties
const ruben = solid.data['https://ruben.verborgh.org/profile/#me'];
console.log(await ruben.name);
console.log(await ruben.preferred);
```

Be aware though that this leads to expressions that are less portable,
because they only work when the additional context is added.

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
and quotes inside of brackets can be omitted.
If the path is a single URL,
quotes and brackets can be omitted.
The following strings will all resolve:
- `'.user.firstName'`
- `'user.firstName'`
- `'["https://example.org/"].label'`
- `'[https://example.org/].label'`
- `'https://example.org/'`

## License
©2018–present [Ruben Verborgh](https://ruben.verborgh.org/),
[MIT License](https://github.com/solid/query-ldflex/blob/master/LICENSE.md).
