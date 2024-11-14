<h1 align="center">
  <br>
  @uuid-ts/uuid
  <br>
</h1>

<p align="center">A well-implemented UUID TypeScript class, with all the necessary features and extensibility.</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@uuid-ts/uuid" />
  <img src="https://img.shields.io/bundlephobia/min/@uuid-ts/uuid" />
  <img src="https://img.shields.io/github/last-commit/ggondim/uuid" />
</p>

<hr>

<p align="center">
  <a href="#">Basic usage</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Installation</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Advanced usage</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">API</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Table of contents</a>
</p>

<hr>

## Features

<dl>
  <dt><strong>Automatic parsing</strong> 🔮</dt>
  <dd>Automatically identifies UUID from hex, base64 or buffer</dd>

  <dt><strong>Automatic generation</strong> 🪄</dt>
  <dd>Generates UUID (defaults to v7)</dd>

  <dt><strong>Easy conversion</strong> ✌️</dt>
  <dd>Converts UUID to hex, base64 or buffer</dd>

  <dt><strong>Validation</strong> ✅</dt>
  <dd>Utility methods to validate existing strings or buffers</dd>
</dl>

<br><hr>

## TL;DR: basic usage

[![](https://img.shields.io/static/v1?label=Try%20it%20online%20on&message=RunKit&color=f55fa6)](https://npm.runkit.com/@uuid-ts/uuid)

Parsing an existent UUID as string:

```typescript
const uuidString = '01932c07-209c-7401-9658-4e7a759e7bf7';

const uuid = new Uuid(uuidString);

// methods
uuid.toHex(); // '01932c07-209c-7401-9658-4e7a759e7bf7'
uuid.toBase64(); // 'AZMsByCcdAGWWAAATnp1ng'
uuid.toBuffer(); // [Buffer]
uuid.toInstance<Binary>(Binary); // [Binary]
```

Generating a new UUID:

```typescript
const uuid = new Uuid();

uuid.toString(); // '01932c0a-235b-7da6-8153-aee356735b58'
```

Parsing an UUID from a Node.js Buffer:

```typescript
const uuid = new Uuid(buffer);

uuid.toString(); // '01932c0b-e834-7b5a-9bae-2964245fc0b6'
```

See also utility functions:

- `Uuid.bufferToUuidHex(buffer: Buffer): string`
- `Uuid.uuidBufferFromHex(uuidHexString: string): Buffer`
- `Uuid.isUuidHexString(uuid: string | Buffer): boolean`
- `Uuid.isUuidBase64String(uuid: string | Buffer): Buffer | null`
- `Uuid.fromHex(hexString: string): Uuid`
- `Uuid.fromBase64(base64String: string): Uuid`
- `Uuid.fromBuffer(buffer: Buffer): Uuid`

See more usage topics in [usage](#usage) section.
<br><hr>

## Table of contents

<ul>
  <li>
    <details>
      <summary><a href="#Installation">Installation</a></summary>
      <ul>
        <li><a href="#Requirements">Requirements</a></li>
        <li><a href="#Installing">Installing</a></li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><a href="#Usage">Usage</a></summary>
      <ul>
        <li><a href="#TLDR">TL;DR - The most simple usage</a></li>
        <li><a href="#example">An example title</a></li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><a href="#Extending">Extending</a></summary>
      <ul>
        <li><a href="#example">An example title</a></li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><a href="#Help">Help</a></summary>
      <ul>
        <li><a href="#FAQ">FAQ</a></li>
        <li><a href="#Support">Support</a></li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><a href="#API">API</a></summary>
      <ul>
        <li><a href="#example">An example title</a></li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><a href="#Tecnhical-concepts">Technical concepts</a></summary>
      <ul>
        <li><a href="#Motivation-and-design">Motivation and design</a></li>
        <li><a href="#Features">Features</a></li>
        <li><a href="#Related-projects">Related projects</a></li>
        <li><a href="#Similar-projects">Similar projects</a></li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><a href="#Contributing">Contributing</a></summary>
      <ul>
        <li><a href="#If-you-don-t-want-to-code">If you don't want to code</a></li>
        <li><a href="#If-you-want-to-code">If you want to code</a></li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><a href="#Hall-of-fame">Hall of fame</a></summary>
      <ul>
        <li><a href="#who-is-using">Who is using</a></li>
        <li><a href="#Contributors">Contributors</a></li>
        <li><a href="#Backers">Backers</a></li>
        <li><a href="#Sponsors">Sponsors</a></li>
      </ul>
    </details>
  </li>
  <li><a href="#License">License</a></li>
</ul>

---

## Installation

### Requirements

![](https://img.shields.io/static/v1?label=npm&message=latest&color=brightgreen) ![](https://img.shields.io/static/v1?label=node&message=14+&color=brightgreen) ![](https://img.shields.io/static/v1?label=os&message=any&color=blueviolet) ![](https://img.shields.io/static/v1?label=platforms&message=node|browser&color=777) ![](https://img.shields.io/static/v1?label=platforms&message=isomorphic&color=orange)



### Installing

#### Via package manager

![](https://nodei.co/npm/@uuid-ts/uuid.png?downloads=true&downloadRank=true&stars=true)

```shell
$ npm install --save @uuid-ts/uuid
```
<details>
  <summary><b>See other options</b></summary>

#### Yarn

```shell
$ yarn add @uuid-ts/uuid
```

#### Unpkg

[https://unpkg.com/:@uuid-ts/uuid](https://unpkg.com/:@uuid-ts/uuid)

```javascript
<script src="https://unpkg.com/:@uuid-ts/uuid" />
```

</details>

### Module/language support

![](https://img.shields.io/static/v1?label=modules&message=ES%20Modules%20|%20CommonJS&color=yellow)
![](https://img.shields.io/static/v1?label=javascript&message=ECMA2023&color=yellow)

This means you:

* **May** use the module with `import`, `require` or `define`
* **Should** use polyfills or transpilation if you want to support older environments


<br/>

<p align="right"><a href="#Table-of-contents">↟ Back to top</a></p>

---

## Usage

### Creating new UUIDs using `Uuid` class

You can create a new UUID using the `Uuid` constructor without arguments:

```typescript
import { Uuid } from '@uuid-ts/uuid';

const uuid = new Uuid();

uuid.toString(); // '01932c0a-235b-7da6-8153-aee356735b58'
```

### Parsing UUIDs from strings

You can parse an UUID from formatted UUID hex strings (with or without dashes) or from base64 strings:

```typescript
import { Uuid } from '@uuid-ts/uuid';

const uuidHex = '01932c07-209c-7401-9658-4e7a759e7bf7';
const uuidFromHex = new Uuid(uuidString);
uuidFromHex.toString(); // '01932c07-209c-7401-9658-4e7a759e7bf7'

const uuidBase64 = 'AZMsByCcdAGWWAAATnp1ng';
const uuidFromBase64 = new Uuid(uuidBase64);
uuidFromBase64.toString(); // '01932c07-209c-7401-9658-4e7a759e7bf7'
```

### Parsing UUIDs from buffers

You can parse an UUID from a Node.js buffer:

```typescript
import { Uuid } from '@uuid-ts/uuid';

const uuidFromBuffer = new Uuid(buffer);
uuidFromBuffer.toString(); // '01932c0b-e834-7b5a-9bae-2964245fc0b6'
```

### Converting UUIDs to different formats

After parsing or generating an UUID, you can convert it to different formats:

```typescript
import { Uuid } from '@uuid-ts/uuid';

const uuid = new Uuid();

uuid.toHex(); // '01932c0a-235b-7da6-8153-aee356735b58'
uuid.toBase64(); // 'AZMsCgI1tqYBSO7jZnN1tY'
uuid.toBuffer(); // [Buffer]
```

The `toInstance` method allows you to convert the UUID to a custom class that accepts a buffer as argument:

```typescript
import { Uuid } from '@uuid-ts/uuid';

class Binary {
  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }
}

const uuid = new Uuid();
uuid.toInstance<Binary>(Binary); // [Binary]
```

### Validation functions

The easiest way to validate an UUID in any format is to use the Uuid constructor itself. If the argument is a valid UUID, it will be parsed correctly. Otherwise, an error will be thrown.

You can also use the static methods `Uuid.isUuidHexString` and `Uuid.isUuidBase64String` to validate UUIDs in hex or base64 format:


```typescript
import { Uuid } from '@uuid-ts/uuid';

Uuid.isUuidHexString('01932c07-209c-7401-9658-4e7a759e7bf7'); // true
Uuid.isUuidBase64String('AZMsByCcdAGWWAAATnp1ng'); // true
```

### Constructing UUIDs from different formats

If you want to avoid the automatic parsing of the Uuid constructor or if you need explicit argument types, you can use the static methods `Uuid.fromHex`, `Uuid.fromBase64` and `Uuid.fromBuffer`:

```typescript
import { Uuid } from '@uuid-ts/uuid';

const uuidFromHex = Uuid.fromHex('01932c07-209c-7401-9658-4e7a759e7bf7');
uuidFromHex.toString(); // '01932c07-209c-7401-9658-4e7a759e7bf7'

const uuidFromBase64 = Uuid.fromBase64('AZMsByCcdAGWWAAATnp1ng');
uuidFromBase64.toString(); // '01932c07-209c-7401-9658-4e7a759e7bf7'

const uuidFromBuffer = Uuid.fromBuffer(buffer);
uuidFromBuffer.toString(); // '01932c0b-e834-7b5a-9bae-2964245fc0b6'
```

### Utility functions

The `Uuid` class also provides utility functions to convert UUIDs to hex strings and to convert hex strings to buffers:

```typescript
import { Uuid } from '@uuid-ts/uuid';

const buffer = Uuid.uuidBufferFromHex('01932c0b-e834-7b5a-9bae-2964245fc0b6');
Uuid.bufferToUuidHex(buffer); // '01932c0b-e834-7b5a-9bae-2964245fc0b6'
```

<br/>

<p align="right"><a href="#Table-of-contents">↟ Back to top</a></p>

---

## Help

### FAQ

<details>
  <summary><b>1. Do I need to install any dependencies?</b></summary>

This package depends directly to the main `uuid` package and also to `uuidv7` package. You don't need to install them manually, they are already included in the package.

</details>

<br />

<details>
  <summary><b>2. Can I use this package in the browser?</b></summary>

Yes, if you are using polyfills to support the `Buffer` class in the browser. This package is isomorphic and can be used in both Node.js and browser environments.

</details>

<br />

<details>
  <summary><b>3. What is the difference between this package and the main `uuid` package?</b></summary>

This package is a wrapper around the main `uuid` package that provides a more user-friendly API and automatic parsing of UUIDs from different formats. It also includes utility functions to convert UUIDs to different formats and to validate UUIDs.

</details>

<br />

<details>
  <summary><b>4. What about the other UUID versions?</b></summary>

This package currently supports only UUID version 7. We may add support for other versions in a near future.

You can also contribute to this project by adding support for other versions.

</details>

<br />

<details>
  <summary><b>5. Can I use this package with TypeScript?</b></summary>

Yes, this package is written in TypeScript and includes type definitions. You can use it with TypeScript without any additional configuration.

</details>

<br />

<details>
  <summary><b>6. Can I use this package with JavaScript?</b></summary>

Yes, this package is written in TypeScript but it is compiled to JavaScript and includes type definitions. You can use it with JavaScript without any additional configuration.

Just make sure to use a modern version of Node.js or a browser that supports the latest ECMAScript features, or use a transpiler like Babel to support older environments.

</details>

### Support

![](https://img.shields.io/github/issues/ggondim/uuid)

If you need help or have a problem with this project and you not found you problem in FAQ above, [start an issue](https://github.com/ggondim/uuid/issues).

> We will not provide a SLA to your issue, so, don't expect it to be answered in a short time.

<br/>

<p align="right"><a href="#Table-of-contents">↟ Back to top</a></p>

---

## API

[under construction] See jsdoc in the source code for more information.

<br/>

<p align="right"><a href="#Table-of-contents">↟ Back to top</a></p>

---

## Tecnhical concepts

### Motivation and design

@uuid-ts/uuid was inspired from the main `uuid` package, but with a more user-friendly API and automatic parsing of UUIDs from different formats. It also includes utility functions to convert UUIDs to different formats and to validate UUIDs.

The main goal of this package is to provide a simple and easy-to-use API to work with UUIDs in different formats and to provide a more user-friendly interface to the main `uuid` package.

It also has support for UUID version 7, which is the latest version of UUIDs and is recommended for most use cases.

### Related projects

* [uuid](https://www.npmjs.com/package/uuid)
* [uuid](https://www.npmjs.com/package/uuidv7)

<br/>

<p align="right"><a href="#Table-of-contents">↟ Back to top</a></p>

---

## Contributing

### If you don't want to code

Help us spreading the word or consider making a donation.

#### Star the project

![](https://img.shields.io/github/stars/ggondim/uuid?style=social)

#### Tweet it

![](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fggondim%2Fuuid)

<!--#### Donate

![](https://c5.patreon.com/external/logo/become_a_patron_button.png)

![](https://camo.githubusercontent.com/b8efed595794b7c415163a48f4e4a07771b20abe/68747470733a2f2f7777772e6275796d6561636f666665652e636f6d2f6173736574732f696d672f637573746f6d5f696d616765732f707572706c655f696d672e706e67)

<img src="https://opencollective.com/webpack/donate/button@2x.png?color=blue" width=250 />-->

#### Add your company name to the [Who is using](#Who-is-using) secion

Make a pull request or start an issue to add your company's name.

### If you want to code

![](https://img.shields.io/static/v1?label=code%20style&message=eslint/airbnb&color=orange)

#### Code of conduct

![](https://img.shields.io/static/v1?label=Code%20of%20conduct&message=Contributor%20Covenant&color=informational)

We follow [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md). If you want to contribute to this project, you must accept and follow it.

#### SemVer

![](https://img.shields.io/static/v1?label=semver&message=2.0.0&color=informational)

This project adheres to [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

#### Roadmap

If you are not solving an issue or fixing a bug, you can help developing the roadmap below.

<details>
  <summary>
    <b>See the roadmap</b>
  </summary>

* [ ] Develop tests
* [ ] Improve documentation
* [ ] Add support for other UUID versions

</details>


<br/>

<p align="right"><a href="#Table-of-contents">↟ Back to top</a></p>

---

## Hall of fame

### Who is using

* [Your company here]()

### Contributors

[![](https://sourcerer.io/fame/ggondim/ggondim/uuid/images/0)](https://sourcerer.io/fame/ggondim/${OWNER}/uuid/links/0)

<!-- ### Backers

<object type="image/svg+xml" data="https://opencollective.com/collective/tiers/backers.svg?avatarHeight=36&width=600"></object>

### Sponsors

<object type="image/svg+xml" data="https://opencollective.com/collective/tiers/Sponsors.svg?avatarHeight=36&width=600"></object> -->

<br/>

<p align="right"><a href="#Table-of-contents">↟ Back to top</a></p>

---

## License

![](https://img.shields.io/github/license/ggondim/uuid)

Licensed under the [MIT License](LICENSE.md).

<br/>

<p align="right"><a href="#Table-of-contents">↟ Back to top</a></p>

---

