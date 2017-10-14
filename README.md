<img align="center" alt="react-input-hints" src="https://raw.githubusercontent.com/williamboman/react-input-hints/gh-pages/example.gif" />

*Animates input placeholders to make it look like they are being typed in realtime.*

[![Build Status](https://travis-ci.org/williamboman/react-input-hints.svg?branch=gh-pages)](https://travis-ci.org/williamboman/react-input-hints/branches)

## Usage

```jsx
<InputHints
    placeholders={[
        'Enter your username here...',
        'Usernames can be 7-18 characters long.',
    ]} />
)
```

## Installation

```sh
$ npm install react-input-hints
# or
$ yarn add react-input-hints
```

## Props

*See [react-typewriting](https://github.com/williamboman/react-typewriting#props) for more controls.*

### `placeholders` | `Array<string>` | *required*

The placeholders to print out, in order of appearance.

## Tips

Use the [`selector:placeholder`](http://css-tricks.com/snippets/css/style-placeholder-text/) CSS pseudo-class to style your placeholders!

## License

Licensed under the MIT license.

## Authors

**William Boman** <william@redwill.se>
