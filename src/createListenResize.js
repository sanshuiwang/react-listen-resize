import throttle from 'lodash/throttle'

function createListenResize(callback, isInitListenCallback = false) {
  let innerHeight = window.innerHeight
  let innerWidth = window.innerWidth

  const _screenResizeHandler = event => {
    innerHeight = (event && event.srcElement && event.srcElement.innerHeight) || window.innerHeight
    innerWidth = (event && event.srcElement && event.srcElement.innerWidth) || window.innerWidth

    callback && callback({ eventResize: event, state: { innerHeight, innerWidth } })
  }
  const handler = throttle(_screenResizeHandler, 250)

  isInitListenCallback && _screenResizeHandler()

  window.addEventListener('resize', handler)
  const cancelListen = () => {
    window.removeEventListener('resize', handler)
  }

  return [{ innerHeight, innerWidth }, cancelListen]
}

export default createListenResize
