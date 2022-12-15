import { ReactNode } from 'react'

type Props = {
  title?: string
  description?: string
  className?: string
  children?: ReactNode
}

const Tooltip = (props: Props) => {
  const { title, description, className, children } = props
  return (
    <div className="group relative">
      {(title || description) && (
        <div
          className={`pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2
          whitespace-pre rounded-sm bg-black px-2 py-1
          text-xs font-semibold text-white opacity-0 transition delay-300 group-hover:opacity-100
          ${className}`}
        >
          {title && <p>{title}</p>}
          {description && (
            <p className="text-[10px] font-normal">{description}</p>
          )}
        </div>
      )}

      {children}
    </div>
  )
}

export default Tooltip
