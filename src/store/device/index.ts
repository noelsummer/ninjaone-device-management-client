import { Device } from "@types"

export type State = {
  devices: Device[]
}

export type Action =
  | { type: "SET_DEVICES"; payload: Device[] }
  | { type: "CREATE_DEVICE"; payload: Device }
  | { type: "UPDATE_DEVICE"; payload: Device }
  | { type: "DELETE_DEVICE"; payload: { id: string } }

export const initialState: State = {
  devices: [],
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DEVICES":
      return {
        ...state,
        devices: action.payload,
      }
    case "CREATE_DEVICE":
      return {
        ...state,
        devices: [...state.devices, action.payload],
      }
    case "UPDATE_DEVICE":
      return {
        ...state,
        devices: state.devices.map((device) =>
          device.id === action.payload.id ? action.payload : device,
        ),
      }
    case "DELETE_DEVICE":
      return {
        ...state,
        devices: state.devices.filter((device) => device.id !== action.payload.id),
      }
    default:
      return state
  }
}
