import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useState,
  useEffect,
  ReactNode,
  Reducer,
} from "react"
import ReactDOM from "react-dom"
import {
  CheckCircleIcon,
  ShieldExclamationIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"

type ToastID = number
type ToastVariant = "success" | "error" | "warning" | "info"
type ToastContent = ReactNode
type ToastDuration = number

type Toast = {
  ID: ToastID
  type: ToastVariant
  content: ToastContent
  duration: ToastDuration
}

type ToastContextContent = ReactNode | ((removeToast: () => void) => ReactNode)
type ToastContextType = {
  addToast: (type: ToastVariant, content: ToastContextContent, duration: ToastDuration) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

type Action = { type: "ADD_TOAST"; payload: Toast } | { type: "REMOVE_TOAST"; payload: ToastID }

const ToastReducer = (state: Toast[], action: Action): Toast[] => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.payload]

    case "REMOVE_TOAST":
      return state.filter((toast) => toast.ID !== action.payload)

    default:
      return state
  }
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<Toast[], Action>>(ToastReducer, [])

  const addToast = useCallback(
    (type: ToastVariant, content: ToastContextContent, duration: ToastDuration) => {
      const ID = Math.random()

      // Define the removeToast function
      const removeToast = () => dispatch({ type: "REMOVE_TOAST", payload: ID })

      // Allow content to be a function so it can receive the removeToast function
      const resolvedContent = typeof content === "function" ? content(removeToast) : content

      dispatch({
        type: "ADD_TOAST",
        payload: { ID, type, content: resolvedContent, duration },
      })

      if (typeof duration === "number") {
        setTimeout(() => dispatch({ type: "REMOVE_TOAST", payload: ID }), duration)
      }
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {ReactDOM.createPortal(<ToastContainer toasts={state} />, document.body)}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  const { addToast } = context

  return {
    success: (content: ToastContextContent, duration: ToastDuration = 3000) =>
      addToast("success", content, duration + 300),
    error: (content: ToastContextContent, duration: ToastDuration = 3000) =>
      addToast("error", content, duration + 300),
    warn: (content: ToastContextContent, duration: ToastDuration = 3000) =>
      addToast("warning", content, duration + 300),
    info: (content: ToastContextContent, duration: ToastDuration = 3000) =>
      addToast("info", content, duration + 300),
  }
}

interface ToastContainerProps {
  toasts: Toast[]
}

const ToastContainer = ({ toasts }: ToastContainerProps) => (
  <div className="fixed top-0 z-[1000] w-full space-y-2 p-4 sm:right-0 sm:w-fit">
    {toasts.map(({ ID, type, content, duration }) => (
      <ToastComponent key={ID} type={type} content={content} duration={duration} />
    ))}
  </div>
)

interface ToastComponentProps {
  type: ToastVariant
  content: ToastContent
  duration: ToastDuration
}

const ToastComponent = ({ type, content, duration }: ToastComponentProps) => {
  const [opacity, setOpacity] = useState("opacity-0")

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setOpacity("opacity-100")
    }, 0) // Delay for fade-in

    const fadeOutTimer = setTimeout(() => {
      setOpacity("opacity-0")
    }, duration - 300) // Delay for fade-out

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(fadeOutTimer)
    }
  }, [duration])

  return (
    <div
      className={`mx-auto flex w-fit items-center rounded-xl bg-gray-300 px-6 py-4 font-semibold shadow-lg transition-opacity duration-300 ease-in sm:mr-0 ${opacity}`}
    >
      {toastTypeToIcon(type)}
      <div className="ml-2">{content}</div>
    </div>
  )
}

const toastTypeToIcon = (type: ToastVariant) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon className="h-5 w-5 flex-shrink-0 stroke-green-600 stroke-2" />

    case "error":
      return <ShieldExclamationIcon className="h-5 w-5 flex-shrink-0 stroke-red-600 stroke-2" />

    case "warning":
      return <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 stroke-yellow-600 stroke-2" />

    case "info":
      return <InformationCircleIcon className="h-5 w-5 flex-shrink-0 stroke-cyan-600 stroke-2" />

    default:
      return <InformationCircleIcon className="h-5 w-5 flex-shrink-0 stroke-cyan-600 stroke-2" />
  }
}

export default ToastProvider
