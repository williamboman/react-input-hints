<img align="center" alt="react-input-hints" src="example.gif" />

*Animates input placeholders to make it look like they are being typed in realtime.*

[![Build Status](https://travis-ci.org/williamboman/react-input-hints.svg?branch=master)](https://travis-ci.org/williamboman/react-input-hints/branches)

## Usage

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
    <InputHints
        waitBeforeDeleteMs={3000}
        writeSpeedMs={100}
        deleteSpeedMs={60}
        placeholders={[
            'Enter your username here...',
            'Usernames can be 7-18 characters long.',
        ]} />,
    document.body
)
```

## Props

### `waitBeforeDeleteMs` | `number` | default: 2000

Amount of milliseconds placeholders will be fully readable before starting
to delete the placeholder.

### `writeSpeedMs` | `number` | default: 100

The absolute slowest speed to wait between printing characters (characters are printed at random intervals that span from 0 ms to whatever this config value is set to).

### `deleteSpeedMs` | `number` | default: 60

Same as `writeSpeedMs` (see above), but for when deleting characters.

## Tips

Use the [`selector:placeholder`](http://css-tricks.com/snippets/css/style-placeholder-text/) CSS pseudo-class to style your placeholders!

## License

Licensed under the MIT license.

## Authors

**William Boman** <william@redwill.se>