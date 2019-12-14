import React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
import throttle from 'lodash/throttle'

function withListenResize(WrappedComponent) {
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

      return <WrappedComponent innerHeight={innerHeight} innerWidth={innerWidth} {...this.props} />
    }
  }

  WithListenResize.displayName = `withListenResize(${getDisplayName(WrappedComponent)})`

  return hoistNonReactStatic(WithListenResize, WrappedComponent)
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withListenResize
