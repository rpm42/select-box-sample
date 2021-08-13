import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Keyboard from './Keyboard'

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

export const StyledStyledCell = styled.div<{ selected: boolean }>`
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

export interface StyledBoxProps<T> {
  options: T[]
  value?: T
  numOfCols: number
  onChange?: (value: T, index: number) => void
  children: (value: T, index: number) => React.ReactElement
}

export const StyledBox: <T>(
  p: StyledBoxProps<T>
) => React.ReactElement<StyledBoxProps<T>> = ({
  options,
  value,
  numOfCols,
  onChange,
  children
}) => {
  function onNext() {}
  function onPrevious() {}

  return (
    <Keyboard
      target="document"
      onUp={focus ? onPrevious : undefined}
      onDown={focus ? onNext : undefined}
      onLeft={focus ? onPrevious : undefined}
      onRight={focus ? onNext : undefined}
    >
      <StyledSelectBox numOfCols={numOfCols}>
        {options.map((option, index) => {
          return (
            <StyledStyledCell
              key={index}
              className={value === option ? 'active' : ''}
              onClick={() => onChange(option, index)}
            >
              {children(option, index)}
            </StyledStyledCell>
          )
        })}
      </StyledSelectBox>
    </Keyboard>
  )
}

export default StyledBox
