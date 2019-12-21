interface optionsHandlerObject {
  forwardRef: boolean
}

interface createWithListenResize {
  (options: optionsHandlerObject): void
}

export const createWithListenResize: createWithListenResize
