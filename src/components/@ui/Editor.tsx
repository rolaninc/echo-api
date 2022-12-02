import { useCallback, useEffect, useRef, useState } from 'react'
import {
  getCurrentCursorPosition,
  setCursorPosition,
} from '../../utils/text-selection'

type Props = {
  text?: string
  placeholder?: string
  onChange?: (text: string) => void
  validationInterval?: number
}

const Editor = (props: Props) => {
  const text = props.text ?? ''
  const placeholder = props.placeholder ?? ''
  const onChange = props.onChange ?? ((_: string) => {})
  const interval = props.validationInterval ?? 1000
  const ref = useRef<HTMLDivElement>(null)

  const [value, setValue] = useState(text)
  const [initialValue, setInitialValue] = useState(text)
  const [message, setMessage] = useState(text)

  const validate = useCallback(() => {
    if (value.length === 0) {
      return
    }

    try {
      const data = JSON.parse(value)
      const input = ref.current
      if (input) {
        const offset = getCurrentCursorPosition()
        const text = JSON.stringify(data, undefined, 2)
        if (text !== '{}') {
          input.innerText = text
          if (offset && offset > 0) {
            setCursorPosition(input, Math.min(offset, text.length))
          }
          onChange(text)
        }
      }
    } catch (e) {
      setMessage(e.message)
    }
  }, [value])

  const onKeyDown = (e) => {
    // convert tab to 2 spaces
    if (e.key === 'Tab' && e.keyCode !== 229) {
      e.preventDefault()
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const tab = document.createElement('span')
        tab.style.whiteSpace = 'pre'
        tab.innerText = '  '
        range.insertNode(tab)
        range.setStartAfter(tab)
        range.setEndAfter(tab)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  const onInput = () => {
    const input = ref.current
    if (input) {
      setValue(input.innerText)
    }
  }

  useEffect(() => {
    onChange(value)

    if (message !== '') {
      setMessage('')
    }
    const timeout = setTimeout(() => validate(), interval)
    return () => {
      clearTimeout(timeout)
    }
  }, [value])

  useEffect(() => {
    const div = ref.current
    if (div) {
      div.innerText = initialValue
    }
  }, [initialValue])

  useEffect(() => {
    setInitialValue(text)
  }, [text])

  return (
    <div className="relative h-full">
      <div
        ref={ref}
        placeholder={placeholder}
        contentEditable
        onInput={onInput}
        onKeyDown={onKeyDown}
        className="
        p-4 rounded-lg h-full overflow-auto empty:before:content-[attr(placeholder)]
        border border-color
        font-mono font-bold text-sm whitespace-pre-wrap
        secondary-background-color
        empty:before:text-gray-400 dark:empty:before:text-gray-400
        "
      />
      {message && (
        <div
          className="
          absolute left-[8px] bottom-[8px] w-[calc(100%-16px)] p-1 rounded-lg flex justify-center items-center
          bg-destructive-500 dark:bg-destructive-dark-500
          "
        >
          <p className="text-white font-mono text-sm">{message}</p>
        </div>
      )}
    </div>
  )
}

export default Editor
