import React, { Children, cloneElement, useCallback, useEffect } from 'react'

const KEYS = {
  8: 'onBackspace',
  9: 'onTab',
  13: 'onEnter',
  27: 'onEsc',
  32: 'onSpace',
  37: 'onLeft',
  38: 'onUp',
  39: 'onRight',
  40: 'onDown',
  188: 'onComma',
  16: 'onShift'
}

export type KeyboardType = (event: React.KeyboardEvent<HTMLElement>) => void

export interface KeyboardProps {
  target?: 'component' | 'document'
  onBackspace?: KeyboardType
  onComma?: KeyboardType
  onDown?: KeyboardType
  onEnter?: KeyboardType
  onEsc?: KeyboardType
  onKeyDown?: KeyboardType
  onLeft?: KeyboardType
  onRight?: KeyboardType
  onShift?: KeyboardType
  onSpace?: KeyboardType
  onTab?: KeyboardType
  onUp?: KeyboardType
  capture?: boolean
}

const Keyboard: React.FC<KeyboardProps> = ({
  capture,
  target,
  children,
  onKeyDown,
  ...restProps
}) => {
  const onKeyDownHandler = useCallback(
    (event, ...rest) => {
      const key = event.keyCode ? event.keyCode : event.which
      const callbackName = KEYS[key]

      if (callbackName && restProps[callbackName]) {
        restProps[callbackName](event, ...rest)
      }

      if (onKeyDown) {
        onKeyDown(event, ...rest)
      }
    },
    [onKeyDown, restProps]
  )

  useEffect(() => {
    if (target === 'document') {
      document.addEventListener('keydown', onKeyDownHandler, capture)
    }

    return () => {
      if (target === 'document') {
        document.removeEventListener('keydown', onKeyDownHandler, capture)
      }
    }
  }, [capture, onKeyDownHandler, target])

  return target === 'document'
    ? children
    : cloneElement(Children.only(children), {
        onKeyDown: onKeyDownHandler
      })
}

export default Keyboard
