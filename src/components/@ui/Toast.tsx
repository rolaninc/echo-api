import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { generateUIKey } from '../../generators/gen-id'
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
      const id = generateUIKey()
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
        <div className="fixed top-[8px] right-[8px] space-y-2 z-50">
          {/*TODO: refactor: it's better to split notification component away from here*/}
          {notifications.map((n) => (
            <div
              key={n.id}
              className="w-[300px] drop-shadow-md ease-in-out animate-slide-in-right"
            >
              <div
                className={`w-full rounded-lg ${
                  _STATUSES[n.status ?? 'success'].style
                }`}
              >
                <div
                  className={`flex p-2 space-x-2 text-white ${
                    !n.description && 'items-center'
                  }`}
                >
                  <div className="flex flex-col py-1 font-bold">
                    {_STATUSES[n.status ?? 'success'].jsx}
                  </div>
                  <div className="grow">
                    <p className="font-bold text-sm">{n.title}</p>
                    {n.description && (
                      <>
                        <p className="text-xs whitespace-pre-wrap">
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
                      className="hover:scale-125 transition-transform"
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
