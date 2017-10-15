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

```jsx
const Title = ({title}) => <h1>{title}</h1>

<InputHints
    component={Title}
    placeholderProp='title'
    placeholders={[
        'This will render the <Title> component,',
        'with the current placeholder value passed as the "title" prop.',
    ]} />
```

## Component's ref API

The component implements an API that makes it possible to interact with the DOM node itself. Use [`ref`](https://facebook.github.io/react/docs/refs-and-the-dom.html)s to access these methods.

*This API is not guaranteed to work correctly if passing custom component as prop.*

### `focus()`

Brings focus on the input element.

### `blur()`

Removes focus from the input element.

## Installation

```sh
$ npm install react-input-hints
```

## Props

### `placeholders` | `Array`

The placeholders to print out, in order of appearance.

### `waitBeforeDeleteMs` | `Number` | default: 2000

Amount of milliseconds placeholders will be fully readable before starting
to delete the placeholder.

### `writeSpeedMs` | `Number` | default: 100

The absolute slowest speed to wait between printing characters (characters are printed at random intervals that span from 0 ms to whatever this config value is set to).

### `deleteSpeedMs` | `Number` | default: 60

Same as `writeSpeedMs` (see above), but for when deleting characters.

### `component` | `Component`, `Function`, `String` | default: 'input'

A `Component`, stateless function, or string corresponding to a default JSX element.

### `placeholderProp` | `String` | default: 'placeholder'

The prop to pass the current placeholder value to.

## Tips

Use the [`selector:placeholder`](http://css-tricks.com/snippets/css/style-placeholder-text/) CSS pseudo-class to style your placeholders!

## License

Licensed under the MIT license.

## Authors

**William Boman** <william@redwill.se>
