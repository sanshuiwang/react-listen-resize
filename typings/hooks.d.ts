interface innerHandlerObject {
  state: {
    innerHeight: number
    innerWidth: number
  }
}

interface cancelListenResize {
  cancelListenResize: () => void
}

interface callbackHandlerFunc {
  callback: ({ eventResize: event, state: innerHandlerObject }) => void
}

interface useListenResize {
  (callback: callbackHandlerFunc, isInitExcutionCallback: boolean): [
    innerHandlerObject,
    cancelListenResize
  ]
}

export const useListenResize: useListenResize
