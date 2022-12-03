import { ReactNode } from 'react'

type Props = {
  text?: string
  className?: string
  children?: ReactNode
}

const Tooltip = (props: Props) => {
  const { text, className, children } = props
  return (
    <div className="relative group">
      {text && (
        <div
          className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-50
          opacity-0 group-hover:opacity-100 transition pointer-events-none delay-300
          bg-black rounded-sm px-2 py-1 text-white text-xs font-semibold
          ${className}`}
        >
          {text}
        </div>
      )}

      {children}
    </div>
  )
}

export default Tooltip
