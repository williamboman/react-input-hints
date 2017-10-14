const React = require('react')
const {PureComponent} = React
const PropTypes = require('prop-types')
const Typewriting = require('react-typewriting')

export default class InputHints extends PureComponent {
    static propTypes = {
        placeholders: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    static defaultProps = {
        waitBeforeDeleteMs: 2000,
    }

    render() {
        const {placeholders, ...props} = this.props
        return (
            <Typewriting
                {...props}
                component='input'
                stringPropName='placeholder'
                strings={placeholders}
            />
        )
    }
}
