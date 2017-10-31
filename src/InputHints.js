const React = require('react')
const {Component} = React
const PropTypes = require('prop-types')
const Typewriting = require('react-typewriting')

export default function InputHints({placeholders, ...props}) {
    return (
        <Typewriting
            waitBeforeDeleteMs={2000}
            component='input'
            stringProp='placeholder'
            strings={placeholders} />
    )
}

InputHints.propTypes = {
    placeholders: PropTypes.arrayOf(PropTypes.string).isRequired,
}
