import { useEffect, useCallback, useReducer, useState } from 'react'
import throttle from 'lodash/throttle'

const initialState = {
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth
}

const reducer = (state, action) => {
  const payload = (action && action.payload) || {}

  switch (action.type) {
    case 'update':
      return { ...state, ...payload }
    default:
      throw new Error()
  }
}

function useListenResize(callback, isInitFunc = false) {
  const [isInitListenCallback, setIsInitListenCallback] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    setIsInitListenCallback(isInitFunc)
  }, [isInitFunc])

  const _screenResizeHandler = useCallback(
    event => {
      const innerHeight =
        (event && event.srcElement && event.srcElement.innerHeight) || window.innerHeight
      const innerWidth =
        (event && event.srcElement && event.srcElement.innerWidth) || window.innerWidth

      dispatch({
        type: 'update',
        payload: {
          innerHeight,
          innerWidth
        }
      })

      callback && callback({ eventResize: event, state: { innerHeight, innerWidth } })
    },
    [callback]
  )

  useEffect(() => {
    if (isInitListenCallback) {
      _screenResizeHandler()
      setIsInitListenCallback(false)
    }
  }, [_screenResizeHandler, isInitListenCallback])

  useEffect(() => {
    const handler = throttle(_screenResizeHandler, 250)
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [_screenResizeHandler])

  return [state]
}

export default useListenResize
