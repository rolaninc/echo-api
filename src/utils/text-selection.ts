type RemainChars = {
  count: number
}

const buildRange = (node: Node, remains: RemainChars, range?: Range) => {
  let newRange = range
  if (!newRange) {
    newRange = document.createRange()
    newRange.selectNode(node)
    newRange.setStart(node, 0)
  }
  if (remains.count > 0) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent!.length < remains.count) {
        remains.count -= node.textContent!.length
      } else {
        newRange.setEnd(node, remains.count)
        remains.count = 0
      }
    } else {
      for (let index = 0; index < node.childNodes.length; index++) {
        newRange = buildRange(node.childNodes[index]!, remains, newRange)
        if (remains.count === 0) {
          break
        }
      }
    }
  } else {
    newRange.setEnd(node, remains.count)
  }
  return newRange
}

export const setCursorPosition = (node: Node, at: number) => {
  const selection = window.getSelection()
  if (selection) {
    const range = buildRange(node, { count: at })
    if (range) {
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}

export const getCurrentCursorPosition = (): number | undefined => {
  const selection = window.getSelection()
  if (selection) {
    let offset = 0
    for (let i = 0; i < selection.rangeCount; i++) {
      const range = selection.getRangeAt(i)
      offset = Math.max(offset, range.endOffset)
    }
    return offset
  }
  return undefined
}
