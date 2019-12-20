# react-listen-resize

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
![][david-url]
![][dt-url]
![][license-url]

Listener resize

## Install

### yarn

```bash
yarn add react-listen-resize
```

### npm

```bash
npm install --save react-listen-resize
```

### UMD

```javascript
<script src="https://unpkg.com/react-listen-resize@0.1.0/dist/index.umd.js"></script>

OR

<script src="https://unpkg.com/react-listen-resize@0.1.0/dist/index.umd.min.js"></script>
```

> Tips: You can find the library on window.ReactListenResize.

## Import

### ES2015

```javascript
import { useListenResize, createListenResize, createWithListenResize } from 'react-listen-resize'
```

### CommonJS

```javascript
const {
  useListenResize,
  createListenResize,
  createWithListenResize
} = require('react-listen-resize')
```

## Usage

### createListenResize(callback, isInitExcutionCallback)

createListenResize is a normal function.

```javascript
import { createListenResize } from 'react-listen-resize'

const [state, cancelListenResize] = createListenResize(
  ({ eventResize, state: { innerHeight, innerWidth } }) => {
    console.log('eventResize-callback:: ', eventResize)
    console.log('state-callback:: ', innerHeight, innerWidth)
  },
  true
)
```

#### Params

createListenResize can pass two Params.

| Property               | Description                             | Type                                                      | Default   | isRequired |
| ---------------------- | --------------------------------------- | --------------------------------------------------------- | --------- | ---------- |
| callback               | listen for resize trigger callback.     | ({eventResize, state: {innerHeight, innerWidth}}) => void | undefined | false      |
| isInitExcutionCallback | Whether to excute the initial callback. | boolean                                                   | false     | false      |

createListenResize returns an array.

| Property                      | Description                         | Type     |
| ----------------------------- | ----------------------------------- | -------- |
| array[0] - state              | Return {innerHeight, innerWidth}    | object   |
| array[1] - cancelListenResize | Call to cancel listening for resize | function |

### useListenResize(callback, isInitExcutionCallback)

useListenResize is a custom hook.

```javascript
import { useListenResize } from 'react-listen-resize'

function Example() {
  const [state, cancelListenResize] = useListenResize(
    ({ eventResize, state: { innerHeight, innerWidth } }) => {
      console.log('eventResize-callback:: ', eventResize)
      console.log('state-callback:: ', innerHeight, innerWidth)
    },
    true
  )
}
```

#### Params

useListenResize can pass two Params.

| Property               | Description                             | Type                                                      | Default   | isRequired |
| ---------------------- | --------------------------------------- | --------------------------------------------------------- | --------- | ---------- |
| callback               | listen for resize trigger callback.     | ({eventResize, state: {innerHeight, innerWidth}}) => void | undefined | false      |
| isInitExcutionCallback | Whether to excute the initial callback. | boolean                                                   | false     | false      |

useListenResize returns an array.

| Property                      | Description                          | Type     |
| ----------------------------- | ------------------------------------ | -------- |
| array[0] - state              | Return {innerHeight, innerWidth} .   | object   |
| array[1] - cancelListenResize | Call to cancel listening for resize. | function |

### createWithListenResize()

createWithListenResize is a HOC.

```javascript
import { createWithListenResize } from 'react-listen-resize'

function Example(props) {
  const { innerHeight, innerWidth, cancelListenResize } = props
}

Example = createWithListenResize()(Example)
```

#### Params

createWithListenResize return values in props.

| Property           | Description                                                                        | Type     |
| ------------------ | ---------------------------------------------------------------------------------- | -------- |
| innerHeight        | [innerHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight) | number   |
| innerWidth         | [innerWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerWidth)   | number   |
| cancelListenResize | Call to cancel listening for resize.                                               | function |

## LICENSE

[MIT License](https://raw.githubusercontent.com/sanshuiwang/react-listen-resize/master/LICENSE)

[npm-url]: https://npmjs.org/package/react-listen-resize
[npm-image]: https://badge.fury.io/js/react-listen-resize.png
[david-url]: https://david-dm.org/sanshuiwang/react-listen-resize.png
[travis-image]: https://api.travis-ci.com/sanshuiwang/react-listen-resize.svg?branch=master
[travis-url]: https://travis-ci.com/sanshuiwang/react-listen-resize
[coverage-image]: https://coveralls.io/repos/github/sanshuiwang/react-listen-resize/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sanshuiwang/react-listen-resize
[dt-url]: https://img.shields.io/npm/dt/react-listen-resize.svg
[license-url]: https://img.shields.io/npm/l/react-listen-resize.svg
