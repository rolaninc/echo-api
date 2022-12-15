import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { genUIKey } from '../../generators/gen-id'
import Icon, { icon } from './Icon'

const _STATUSES = {
  success: {
    jsx: icon('success'),
    style: 'bg-green-500',
  },
  error: {
    jsx: icon('error'),
    style: 'bg-destructive-500 dark:bg-destructive-dark-500',
  },
  warning: {
    jsx: icon('warning'),
    style: 'bg-amber-500',
  },
  info: {
    jsx: icon('info'),
    style: 'bg-sky-500',
  },
}
export type Status = keyof typeof _STATUSES

export type Config = {
  title: string
  description?: string
  duration?: number
  status?: Status
}

type Notification = {
  id: string
} & Config

type TimeoutPool = {
  [id: string]: any
}

type ToastContextValue = (config: Config) => void

const ToastContext = createContext({} as ToastContextValue)

export const useToast = (): ToastContextValue => {
  return useContext(ToastContext)
}

type Props = {
  children?: ReactNode
}

const Toast = (props: Props) => {
  const { children } = props

  const pool = useRef<TimeoutPool>({})
  const [notifications, setNotifications] = useState<Notification[]>([])

  const toast = useCallback(
    (config: Config) => {
      const id = genUIKey()
      const duration = config.duration ?? 5000
      pool.current[id] = setTimeout(() => {
        clear(id)
      }, duration)
      setNotifications((p) => [...p, { id, ...config }])
    },
    [pool]
  )

  const clear = (id: string) => {
    setNotifications((p) => p.filter((n) => n.id !== id))
    const t = pool.current[id]
    if (t) {
      clearTimeout(t)
      delete pool.current[id]
    }
  }

  useEffect(() => {
    return () => {
      Object.entries(pool.current).forEach(([_, v]) => clearTimeout(v))
      pool.current = {}
    }
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      <>
        {children}
        <div className="fixed top-[8px] right-[8px] z-50 space-y-2">
          {/*TODO: refactor: it's better to split notification component away from here*/}
          {notifications.map((n) => (
            <div
              key={n.id}
              className="w-[300px] animate-slide-in-right drop-shadow-md ease-in-out"
            >
              <div
                className={`w-full rounded-lg ${
                  _STATUSES[n.status ?? 'success'].style
                }`}
              >
                <div
                  className={`flex space-x-2 p-2 text-white ${
                    !n.description && 'items-center'
                  }`}
                >
                  <div className="flex flex-col py-1 font-bold">
                    {_STATUSES[n.status ?? 'success'].jsx}
                  </div>
                  <div className="grow">
                    <p className="text-sm font-bold">{n.title}</p>
                    {n.description && (
                      <>
                        <p className="whitespace-pre-wrap text-xs">
                          {n.description}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        clear(n.id)
                      }}
                      className="transition-transform hover:scale-125"
                    >
                      <Icon variant="close" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </ToastContext.Provider>
  )
}

export default Toast
