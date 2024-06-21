import {
  State as DeviceState,
  Action as DeviceAction,
  initialState as deviceInitialState,
  reducer as deviceReducer,
} from "./device"

export type State = {
  device: DeviceState
}

export type Action = DeviceAction

export const initialState: State = {
  device: deviceInitialState,
}

export const rootReducer = (state: State, action: Action): State => ({
  device: deviceReducer(state.device, action),
})
