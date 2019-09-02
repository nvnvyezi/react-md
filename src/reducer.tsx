import React, { useReducer, createContext } from 'react'

interface IProps {
  children: React.ReactChild[] | React.ReactChild
}
interface IState {
  value: string
}

interface IMDInputAction {
  type: 'mdInput'
  value: string
}
type IAction = IMDInputAction

interface IContext {
  state: IState
  dispatch(param: IMDInputAction): void
}

const initialState: IState = {
  value: '```javascript\nfunction(){\n\tconsole.log(123)\n}\n```',
}

export const Context = createContext<IContext>({
  state: initialState,
  dispatch: () => {},
})

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'mdInput':
      return { ...state, value: action.value }
    default:
      return { ...state }
  }
}

export default function Provider(props: IProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}
