const React = require('react')
const {Component, PropTypes} = React

const TICK_INIT = 'TICK_INIT'
const TICK_WRITE = 'TICK_WRITE'
const TICK_DELETE = 'TICK_DELETE'
const START_DELETE = 'START_DELETE'

function getInputProps({...inputProps}) {
    delete inputProps.placeholders
    delete inputProps.waitBeforeDeleteMs
    delete inputProps.writeSpeedMs
    delete inputProps.deleteSpeedMs
    delete inputProps.placeholder
    return inputProps
}

class InputHints extends Component {

    static propTypes = {
        placeholders: PropTypes.array.isRequired,
        waitBeforeDeleteMs: PropTypes.number,
        writeSpeedMs: PropTypes.number,
        deleteSpeedMs: PropTypes.number,
    }

    static defaultProps = {
        waitBeforeDeleteMs: 2000,
        writeSpeedMs: 100,
        deleteSpeedMs: 60,
    }

    constructor(props) {
        super(props)
        this.tick = this.tick.bind(this)
        this.state = {
            currentPlaceholderIdx: 0,
            currentCharPos: 0,
            isDeleting: false,
            inputProps: getInputProps(props),
        }
    }

    componentDidMount() {
        this.queueTick(TICK_INIT)
    }

    componentWillUnmount() {
        clearTimeout(this.ticker)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputProps: getInputProps(nextProps),
        })
    }

    randomizeTimeout(ms) {
        // TODO: probably should implement a minimum timeout
        return Math.random() * ms
    }

    queueTick(type) {
        const {
            writeSpeedMs,
            deleteSpeedMs,
            waitBeforeDeleteMs,
        } = this.props

        const timeout =
            type === TICK_INIT ? 0 :
            type === TICK_WRITE ? this.randomizeTimeout(writeSpeedMs) :
            type === TICK_DELETE ? this.randomizeTimeout(deleteSpeedMs) :
            type === START_DELETE ? waitBeforeDeleteMs :
            0 // ¯\_(ツ)_/¯

        this.ticker = setTimeout(this.tick, timeout)
    }

    moveToNextPlaceholder() {
        const {placeholders} = this.props
        const {currentPlaceholderIdx} = this.state
        const nextPlaceholderIdx = currentPlaceholderIdx + 1
        this.setState({
            isDeleting: false,
            currentPlaceholderIdx: nextPlaceholderIdx < placeholders.length ? nextPlaceholderIdx : 0,
            currentCharPos: 0,
        })
    }

    _getTextInputNode() {
        return this.refTextInput
    }

    tick() {
        const {placeholders} = this.props
        const {
            currentPlaceholderIdx,
            currentCharPos,
            isDeleting,
        } = this.state

        const currentPlaceholder = placeholders[currentPlaceholderIdx]

        const nextCharPos = isDeleting
            ? currentCharPos - 1
            : currentCharPos + 1

        if (isDeleting) {
            if (nextCharPos < 0) {
                this.moveToNextPlaceholder()
            } else {
                this.setState({
                    currentCharPos: nextCharPos,
                })
            }
            this.queueTick(TICK_DELETE)
        } else {
            if (nextCharPos > currentPlaceholder.length) {
                this.setState({
                    isDeleting: true,
                })
                this.queueTick(START_DELETE)
            } else {
                this.setState({
                    currentCharPos: nextCharPos,
                })
                this.queueTick(TICK_WRITE)
            }
        }
    }

    render() {
        const {placeholders} = this.props
        const {
            currentPlaceholderIdx,
            currentCharPos,
            inputProps,
        } = this.state

        const currentPlaceholder = placeholders[currentPlaceholderIdx]
        const placeholder = currentPlaceholder.slice(0, currentCharPos)

        return (
            <input ref={(e) => this.refTextInput = e} placeholder={placeholder} {...inputProps} />
        )
    }

}

function inputWrapper(WrappedComponent) {
    class Input extends Component {
        /* eslint-disable brace-style */
        focus() { this.c._getTextInputNode().focus() }
        blur() { this.c._getTextInputNode().blur() }
        /* eslint-enable brace-style */

        render() {
            return <WrappedComponent {...this.props} ref={(c) => this.c = c} />
        }
    }
    Input.displayName = WrappedComponent.displayName || 'Component'
    return Input
}

module.exports = inputWrapper(InputHints)
