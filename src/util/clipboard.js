import Vue from 'vue'
import Clipboard from 'clipboard'
import {toast} from 'util/toast'

function clipboardSuccess() {
  toast('复制成功')
}

function clipboardError() {
  toast.Toast('复制失败')
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
