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
    <div className="relative group">
      {(title || description) && (
        <div
          className={`absolute -top-12 left-1/2 -translate-x-1/2 whitespace-pre z-50
          opacity-0 group-hover:opacity-100 transition pointer-events-none delay-300
          bg-black rounded-sm px-2 py-1 text-white text-xs font-semibold
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
