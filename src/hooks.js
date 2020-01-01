import { useEffect, useCallback, useReducer, useState } from 'react'
import { throttle } from './helpers/util'

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

function useListenResize(callback, isInitExcutionCallback = false) {
  const [isInit, setIsInit] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

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
    setIsInit(isInitExcutionCallback)
  }, [isInitExcutionCallback])

  useEffect(() => {
    if (isInit) {
      _screenResizeHandler()
      setIsInit(false)
    }
  }, [_screenResizeHandler, isInit])

  const handler = useCallback(throttle(_screenResizeHandler, 250), [])

  const cancelListenResize = useCallback(() => {
    window.removeEventListener('resize', handler)
  }, [handler])

  useEffect(() => {
    window.addEventListener('resize', handler)
    return cancelListenResize
  }, [cancelListenResize, handler])

  return [state, cancelListenResize]
}

export default useListenResize
