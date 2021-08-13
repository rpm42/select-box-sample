import React, { HTMLAttributes, useRef, useCallback } from 'react'
import { BehaviorSubject } from 'rxjs'
import styled from 'styled-components'
import useBehaviorSubject from './useBehaviorSubject'
import useScrollWheel from './useScrollWheel'

export interface InputNumberProps extends HTMLAttributes<HTMLInputElement> {
  value$: BehaviorSubject<number>
}

const StyledInput = styled.input.attrs({ type: 'text' })`
  padding: 0.25em;
  border: none;
  border-bottom: 1px solid black;
  background: transparent;
  font: 1.4em/1.4em Lato;
  outline: none;
  &:focus {
    border-bottom: 1px solid brown;
  }
`

export const InputNumber = ({
  value$
}: InputNumberProps): React.ReactElement<InputNumberProps> => {
  const [value, setValue] = useBehaviorSubject(value$)
  const ref = useRef()
  const step = 10
  const min = 0
  const max = Number.MAX_SAFE_INTEGER

  function increment() {
    value + step <= max && setValue(value + step)
  }

  function decrement() {
    value - step >= min && setValue(value - step)
  }

  let onWheel = useCallback(
    e => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        return
      }
      if (e.deltaY > 0) {
        increment()
      } else if (e.deltaY < 0) {
        decrement()
      }
    },
    [value]
  )

  useScrollWheel({ onScroll: onWheel, isDisabled: false }, ref)

  function onKeyPressHandler(e: KeyboardEvent) {
    const c = e.charCode
    if (c < 0x30 || c > 0x39) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  function onChange(e) {
    const value = e.target.value
    setValue(value ? parseInt(value, 10) : null)
  }

  return (
    <StyledInput
      value={value}
      onKeyPress={onKeyPressHandler}
      onChange={onChange}
      ref={ref}
    />
  )
}

export default InputNumber
