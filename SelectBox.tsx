import React, { useRef, useState } from 'react'
import { BehaviorSubject } from 'rxjs'
import styled, { css } from 'styled-components'
import Keyboard from './Keyboard'
import useBehaviorSubject from './useBehaviorSubject'

const StyledSelectBox = styled.div<{ numOfCols: number; focused: boolean }>`
  border: 0;
  display: grid;
  grid-template-columns: repeat(${props => props.numOfCols}, minmax(4em, 1fr));
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  background-color: #c2c2c2;
  padding: 1px;
  box-sizing: border-box;
  //border: 1px solid #c2c2c2;
  ${p =>
    p.focused &&
    css`
      background-color: gold;
    `}
`

const StyledStyledCell = styled.div<{ selected: boolean }>`
  display: block;
  cursor: pointer;
  user-select: none;
  &:hover {
    border-color: grey !important;
  }
  font-size: 1em;
  text-align: center;
  overflow: hidden;
  background-color: white;
  ${p =>
    p.selected &&
    css`
      background: #444;
      color: white;
    `}
`

const StyledSelect = styled.select`
  opacity: 0;
  height: 0;
  width: 0;
  margin: 0;
  border: none;
  -moz-appearance: none;
`

const StyledOption = styled.option`
  opacity: 0;
  height: 0;
  width: 0;
  margin: 0;
  border: none;
  -moz-appearance: none;
`

export interface StyledBoxProps<T> {
  options: T[]
  numOfCols: number
  value$: BehaviorSubject<T>
  children?: (
    option: T,
    state: {
      selected: boolean
      hover: boolean
      focus: boolean
    }
  ) => React.ReactElement
}

export const StyledBox: <T>(
  p: StyledBoxProps<T>
) => React.ReactElement<StyledBoxProps<T>> = ({
  options,
  value$,
  numOfCols,
  children,
  ...rest
}) => {
  const optionEl = useRef<HTMLOptionElement>()
  const [focus, setFocus] = useState<boolean>()
  const [hover, setHover] = useState<boolean>()
  const [hoverIndex, setHoverIndex] = useState<number>()
  const [currentIndex, setCurrentIndex] = useState<number>()
  const [value, setValue] = useBehaviorSubject(value$)

  function onNext() {
    currentIndex < options.length - 1 && handleClick(currentIndex + 1)
  }
  function onPrevious() {
    currentIndex > 0 && handleClick(currentIndex - 1)
  }
  function onDown() {
    currentIndex + numOfCols <= options.length - 1 &&
      handleClick(currentIndex + numOfCols)
  }
  function onUp() {
    currentIndex - numOfCols >= 0 && handleClick(currentIndex - numOfCols)
  }

  const onFocus = () => {
    setTimeout(() => {
      setFocus(true)
    }, 1)
  }

  const onBlur = () => setFocus(false)
  function handleClick(index: number) {
    optionEl.current.focus()
    setCurrentIndex(index)
    setValue(options[index])
  }

  return (
    <Keyboard
      target="document"
      onUp={focus ? onUp : undefined}
      onDown={focus ? onDown : undefined}
      onLeft={focus ? onPrevious : undefined}
      onRight={focus ? onNext : undefined}
    >
      <StyledSelect
        size={options.length}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={optionEl}
      >
        {options.map((option, index) => {
          return (
            <StyledOption value={option + ''} selected={value === option} />
          )
        })}
      </StyledSelect>
      <StyledSelectBox
        numOfCols={numOfCols}
        focused={focus}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {options.map((option, index) => {
          return (
            <StyledStyledCell
              key={index}
              selected={option === value}
              onClick={() => handleClick(index)}
              onMouseEnter={() => setHoverIndex(index)}
            >
              {children && typeof children === 'function'
                ? children(option, {
                    selected: value === option,
                    hover: hover && hoverIndex === index,
                    focus
                  })
                : option}
            </StyledStyledCell>
          )
        })}
      </StyledSelectBox>
    </Keyboard>
  )
}

export default StyledBox
