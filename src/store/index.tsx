import { createContext, useContext, useReducer, Dispatch, ReactNode } from "react"
import { State, Action, initialState, rootReducer } from "./store"

interface StateProviderProps {
  children: ReactNode
}

interface StateContextProps {
  state: State
  dispatch: Dispatch<Action>
}

const defaultState: StateContextProps = {
  state: initialState,
  dispatch: () => undefined,
}

export const StateContext = createContext<StateContextProps>(defaultState)

export const StateProvider = ({ children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}

export const useStore = (): StateContextProps => {
  const context = useContext(StateContext)

  if (!context) {
    throw new Error("useStore must be used within a StateProvider")
  }

  return context
}

export default StateProvider
