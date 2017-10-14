const React = require('react')
const {Component} = React
const PropTypes = require('prop-types')

const TICK_INIT = 'TICK_INIT'
const TICK_WRITE = 'TICK_WRITE'
const TICK_DELETE = 'TICK_DELETE'
const START_DELETE = 'START_DELETE'

function getInputProps({...props}) {
    delete props.placeholders
    delete props.waitBeforeDeleteMs
    delete props.writeSpeedMs
    delete props.deleteSpeedMs
    delete props.placeholder
    delete props.placeholderProp
    delete props.component
    return props
}

class InputHints extends Component {

    static propTypes = {
        placeholders: PropTypes.array.isRequired,
        waitBeforeDeleteMs: PropTypes.number,
        writeSpeedMs: PropTypes.number,
        deleteSpeedMs: PropTypes.number,
        placeholderProp: PropTypes.string,
        component: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.string,
        ]),
    }

    static defaultProps = {
        waitBeforeDeleteMs: 2000,
        writeSpeedMs: 100,
        deleteSpeedMs: 60,
        placeholderProp: 'placeholder',
        component: 'input',
    }

    constructor(props) {
        super(props)
        this._ticker = null
        this._ref = null
        this.state = {
            currentPlaceholderIdx: 0,
            currentCharPos: 0,
            isDeleting: false,
            inputProps: getInputProps(props),
        }
    }

    componentDidMount() {
        this._queueTick(TICK_INIT)
    }

    componentWillUnmount() {
        clearTimeout(this._ticker)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputProps: getInputProps(nextProps),
        })
        if (this.props.placeholders !== nextProps.placeholders) {
            clearTimeout(this._ticker)
            this.setState({
                currentPlaceholderIdx: 0,
                currentCharPos: 0,
                isDeleting: false,
            })
            this._queueTick(TICK_INIT)
        }
    }

    _randomizeTimeout(ms) {
        // TODO: probably should implement a minimum timeout
        return Math.random() * ms
    }

    _queueTick(type) {
        const {
            writeSpeedMs,
            deleteSpeedMs,
            waitBeforeDeleteMs,
        } = this.props

        const timeout =
            type === TICK_INIT ? 0 :
            type === TICK_WRITE ? this._randomizeTimeout(writeSpeedMs) :
            type === TICK_DELETE ? this._randomizeTimeout(deleteSpeedMs) :
            type === START_DELETE ? waitBeforeDeleteMs :
            0 // ¯\_(ツ)_/¯

        this._ticker = setTimeout(this._tick, timeout)
    }

    _moveToNextPlaceholder() {
        const {placeholders} = this.props
        const {currentPlaceholderIdx} = this.state
        const nextPlaceholderIdx = currentPlaceholderIdx + 1
        this.setState({
            isDeleting: false,
            currentPlaceholderIdx: nextPlaceholderIdx < placeholders.length ? nextPlaceholderIdx : 0,
            currentCharPos: 0,
        })
    }

    _tick = () => {
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
                this._moveToNextPlaceholder()
            } else {
                this.setState({
                    currentCharPos: nextCharPos,
                })
            }
            this._queueTick(TICK_DELETE)
        } else {
            if (nextCharPos > currentPlaceholder.length) {
                this.setState({
                    isDeleting: true,
                })
                this._queueTick(START_DELETE)
            } else {
                this.setState({
                    currentCharPos: nextCharPos,
                })
                this._queueTick(TICK_WRITE)
            }
        }
    }

    _registerRef = (ref) => this._ref = ref

    focus() {
        this._ref.focus()
    }

    blur() {
        this._ref.blur()
    }

    render() {
        const {placeholders, component} = this.props
        const {
            currentPlaceholderIdx,
            currentCharPos,
            inputProps,
        } = this.state

        const currentPlaceholder = placeholders[currentPlaceholderIdx]
        const placeholder = currentPlaceholder.slice(0, currentCharPos)

        const componentProps = {
            ...inputProps,
            [this.props.placeholderProp]: placeholder,
        }

        if (typeof component === 'string') {
            return (
                <component ref={this._registerRef} {...componentProps} />
            )
        } else {
            const Component = component
            return (
                <Component ref={this._registerRef} {...componentProps} />
            )
        }
    }

}

module.exports = InputHints
