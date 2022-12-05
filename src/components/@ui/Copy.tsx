import { useEffect, useState } from 'react'
import Icon from './Icon'

type Props = {
  text: string
  className?: string
}

const Copy = (props: Props) => {
  const { text, className } = props
  const [copied, setCopied] = useState(false)

  const onClick = async (e) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch (e) {}
  }

  useEffect(() => {
    if (!copied) {
      return
    }
    const timeout = setTimeout(() => {
      setCopied((p) => !p)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center space-x-1 px-2 py-1 font-mono ${className}`}
      disabled={copied}
    >
      <Icon variant="copy" />
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  )
}

export default Copy
