import Copy from '../@ui/Copy'

const tagStyle = 'font-mono'
const _STATUSES = {
  success: {
    style: `text-green-600 ${tagStyle}`,
  },
  error: {
    style: `text-destructive-600 dark:text-destructive-dark-600 ${tagStyle}`,
  },
  pending: {
    style: `text-amber-600 ${tagStyle}`,
  },
}
type Status = keyof typeof _STATUSES

export type Item = {
  id: string
  code?: number
  body?: string
  headers?: string
  message?: string
  status: Status
}

type Props = {
  items: Item[]
}

const History = (props: Props) => {
  const { items } = props
  return (
    <div className="px-6 py-4 w-full h-full">
      <ul
        role="list"
        className="h-full p-2 space-y-4 rounded-lg secondary-background-color overflow-auto"
      >
        {/*REFACTOR: list items */}
        {items.map((item) => (
          <div
            key={item.id}
            className="background-color rounded-lg p-4 space-y-3"
          >
            <div>
              <span className={`${_STATUSES[item.status].style}`}>
                {item.status !== 'pending' ? item.code : 'PENDING...'}
              </span>
            </div>
            {item.message ? (
              <div>
                <p className="text-sm font-light italic">{item.message}</p>
              </div>
            ) : null}
            {item.body ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="font-black text-xs">BODY</p>
                  <Copy text={item.body} className="text-xs" />
                </div>
                <code className="code whitespace-pre-wrap">{item.body}</code>
              </div>
            ) : undefined}
            {item.headers ? (
              <div>
                <div className="flex justify-between items-center">
                  <p className="font-black text-xs">HEADERS</p>
                  <Copy text={item.headers} className="text-xs" />
                </div>
                <code className="code">{item.headers}</code>
              </div>
            ) : undefined}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default History
