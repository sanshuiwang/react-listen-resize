import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatic from 'hoist-non-react-statics'
import { throttle } from './helpers/util'

function withListenResize({ forwardRef = false }) {
  return function withListenResizeHOC(WrappedComponent) {
    class WithListenResize extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          innerHeight: window.innerHeight,
          innerWidth: window.innerWidth
        }

        this.handler = throttle(this._screenResizeHandler, 250)
      }

      _screenResizeHandler = event => {
        const innerHeight =
          (event && event.srcElement && event.srcElement.innerHeight) || window.innerHeight
        const innerWidth =
          (event && event.srcElement && event.srcElement.innerWidth) || window.innerWidth

        this.setState({ innerHeight, innerWidth })
      }

      componentDidMount() {
        window.addEventListener('resize', this.handler)
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this.handler)
      }

      render() {
        const { innerHeight, innerWidth } = this.state
        const { wrappedComponentRef, ...rest } = this.props

        let params = {
          innerHeight,
          innerWidth,
          ...rest
        }

        if (forwardRef) {
          params.ref = wrappedComponentRef
        }

        return <WrappedComponent {...params} />
      }
    }
    WithListenResize.propTypes = {
      wrappedComponentRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object])
    }

    if (forwardRef) {
      const forwarded = React.forwardRef(function withListenResizeForwardRef(props, ref) {
        return <WithListenResize {...props} wrappedComponentRef={ref} />
      })
      forwarded.displayName = `ForwardRef(withListenResize(${getDisplayName(WrappedComponent)}))`

      return hoistNonReactStatic(forwarded, WrappedComponent)
    }

    WithListenResize.displayName = `withListenResize(${getDisplayName(WrappedComponent)})`

    return hoistNonReactStatic(WithListenResize, WrappedComponent)
  }
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const createWithListenResize = (options = {}) => {
  return withListenResize({ ...options })
}

export default createWithListenResize
