interface ICallbackValue {
  eventResize: Event
  state: {
    innerHeight: number
    innerWidth: number
  }
}

interface createListenResize {
  (callback: (callbackValue: ICallbackValue) => void, isInitExcutionCallback: boolean): [
    {
      innerHeight: number
      innerWidth: number
    },
    () => void
  ]
}

export const createListenResize: createListenResize
