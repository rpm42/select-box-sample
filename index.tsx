import React, {
  RefObject,
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
  HTMLAttributes,
  useCallback
} from 'react'
import { render } from 'react-dom'
import styled, { css } from 'styled-components'
import Keyboard from './Keyboard'
import SelectBox from './SelectBox'
import InputNumber from './InputNumber'
import { useAppContext } from './AppContext'
import useObservable from './useObservable'
import { AMOUNT_LIST, CURRENCY_LIST } from './constants'

const OptionView = styled.div<{ seleected: boolean; hover: boolean }>`
  font-family: Lato;
  padding: 0.5em 0;
  color: ${p => (p.selected ? 'gold' : 'black')};
  background: ${p => (p.selected ? '#444' : p.hover ? '#ddd' : 'white')};
  transition: background 0.3s;
`

const App = () => {
  const ctx = useAppContext()
  const [amount] = useObservable(ctx.amount$, ctx.amount$.value)
  const [currency] = useObservable(ctx.currency$, ctx.currency$.value)
  return (
    <div>
      <div>
        value: {amount} {currency}
      </div>
      <SelectBox value$={ctx.currency$} options={CURRENCY_LIST} numOfCols={4}>
        {(option, { selected, hover }) => {
          return (
            <OptionView selected={selected} hover={hover}>
              {option}
            </OptionView>
          )
        }}
      </SelectBox>
      <SelectBox value$={ctx.amount$} options={AMOUNT_LIST} numOfCols={4}>
        {(option, { selected, hover }) => {
          return (
            <OptionView selected={selected} hover={hover}>
              {option}
            </OptionView>
          )
        }}
      </SelectBox>
      <br />
      <InputNumber value$={ctx.amount$} />
      <span>{currency}</span>
    </div>
  )
}

render(<App />, document.getElementById('root'))
