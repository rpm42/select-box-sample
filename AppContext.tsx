import { createContext, useContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { AMOUNT_LIST, CURRENCY_LIST } from './constants'

type Unpack<A> = A extends Array<infer E> ? E : A

export class Context {
  public currency$ = new BehaviorSubject<Unpack<typeof CURRENCY_LIST> | null>(
    null
  )
  public amount$ = new BehaviorSubject<Unpack<typeof AMOUNT_LIST> | null>(null)
}

export const context = createContext(new Context())

export const useAppContext = () => useContext(context)

export default context
