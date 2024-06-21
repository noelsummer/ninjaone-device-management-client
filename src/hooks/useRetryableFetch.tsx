import { useCallback, useState, ReactNode } from "react"
import { useToast } from "@components/Toast"

type APICallFunction<T> = (...args: any[]) => Promise<T>

interface useRetryableFetchProps<T> {
  APICall: APICallFunction<T>
  failureContent: ReactNode
  successContent?: ReactNode
}
interface useRetryableFetchResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: (...args: any[]) => void
}

export const useRetryableFetch = <T,>({
  APICall,
  failureContent,
  successContent,
}: useRetryableFetchProps<T>): useRetryableFetchResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setloading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const toast = useToast()

  const fetchWithRetry = useCallback(async (retryCount: number, ...args: any[]) => {
    try {
      setError(null)

      setloading(true)

      const response = await APICall(...args)

      setData(response)

      if (successContent) {
        toast.success(successContent)
      }

      setloading(false)
    } catch (error) {
      setError(error as Error)

      if (retryCount === 1) {
        // Retry once more in the background silently first
        fetchWithRetry(retryCount + 1, ...args)
      } else if (retryCount === 2) {
        // Show the toast with Retry button which will fetch the API manually once more
        toast.error(
          (removeToast) => (
            <div className="flex items-center">
              <div>{failureContent}</div>
              <button
                type="button"
                className="mx-2"
                onClick={() => {
                  fetchWithRetry(retryCount + 1, ...args)
                  removeToast()
                }}
              >
                Click here to try again.
              </button>
            </div>
          ),
          1000 * 60 * 3,
        )
      } else {
        // Show the final error toast
        toast.error(
          <div className="flex items-center">
            <div>{failureContent}</div>
            <button type="button" className="mx-2">
              Contact NinjaOne Support
            </button>
          </div>,
        )
      }
    } finally {
      setloading(false)
    }
  }, [])

  return { data, loading, error, refetch: (...args: any[]) => fetchWithRetry(1, ...args) }
}

export default useRetryableFetch
