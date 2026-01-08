'use strict'

let lastCopied = ''

function isEditable(element) {
  if (!(element instanceof HTMLElement)) return false
  if (element.isContentEditable) return true
  if (element instanceof HTMLTextAreaElement) {
    return !element.disabled && !element.readOnly
  }
  if (element instanceof HTMLInputElement) {
    const editableTypes = /^(text|email|number|password|search|tel|url)$/i
    return editableTypes.test(element.type || 'text') && !element.disabled && !element.readOnly
  }
  return false
}

document.addEventListener('pointerup', (event) => {
  // Hold Ctrl/Cmd to bypass auto-copy
  if (event.ctrlKey || event.metaKey) return

  // Don't interfere with text selection in editable fields
  if (isEditable(document.activeElement)) return

  const text = window.getSelection()?.toString().trim()
  if (!text || text === lastCopied) return

  navigator.clipboard.writeText(text).then(() => {
    lastCopied = text
  })
})
