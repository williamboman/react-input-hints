<img align="center" alt="react-input-hints" src="https://raw.githubusercontent.com/williamboman/react-input-hints/gh-pages/example.gif" />

*Animates input placeholders to make it look like they are being typed in realtime.*

[![Build Status](https://travis-ci.org/williamboman/react-input-hints.svg?branch=gh-pages)](https://travis-ci.org/williamboman/react-input-hints/branches)

## Usage

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
    <InputHints
        placeholders={[
            'Enter your username here...',
            'Usernames can be 7-18 characters long.',
        ]} />,
    document.body
)
```

## Component's ref API

The component implements an API that makes it possible to interact with the DOM node itself. Use [`ref`](https://facebook.github.io/react/docs/refs-and-the-dom.html)s to access these methods.

### `focus()`

Brings focus on the input element.

### `blur()`

Removes focus from the input element.

## Installation

```sh
$ npm install react-input-hints
```

## Props

### `placeholders` | `array`

The placeholders to print out, in order of appearance.

### `waitBeforeDeleteMs` | `number` | default: 2000

Amount of milliseconds placeholders will be fully readable before starting
to delete the placeholder.

### `writeSpeedMs` | `number` | default: 100

The absolute slowest speed to wait between printing characters (characters are printed at random intervals that span from 0 ms to whatever this config value is set to).

### `deleteSpeedMs` | `number` | default: 60

Same as `writeSpeedMs` (see above), but for when deleting characters.

## Tips

Use the [`selector:placeholder`](http://css-tricks.com/snippets/css/style-placeholder-text/) CSS pseudo-class to style your placeholders!

## Todos

- Make it support arbitrary components via props.

## License

Licensed under the MIT license.

## Authors

**William Boman** <william@redwill.se>
