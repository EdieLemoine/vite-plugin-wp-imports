# vite-plugin-wp-imports

[![NPM](https://img.shields.io/npm/v/vite-plugin-wp-imports?style=for-the-badge)](https://www.npmjs.com/package/vite-plugin-wp-imports/)

A Vite plugin to support importing `@wordpress/*` packages in Vite projects. They will be transformed to the corresponding `window.wp.*` global variables. Currently works in a very simple way, it replaces the part after `@wordpress/[...]` with `window.wp.[...]`.

## Installation

**Using Yarn**

```bash
yarn add -D vite-plugin-wp-imports
```

**Using pnpm**

```bash
pnpm add -D vite-plugin-wp-imports
```

**Using npm**

```bash
npm install --save-dev vite-plugin-wp-imports
```

## Usage

```ts
// vite.config.ts
import wpImports from 'vite-plugin-wp-imports';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [
    wpImports(),
  ],
});
```

**Your code:**

```ts
import { subscribe } from '@wordpress/data';

subscribe(() => {
  console.log('State changed');
});
```

**Build result:**

```js
window.wp.data.subscribe(() => {
  console.log('State changed');
});
```
