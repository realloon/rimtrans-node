export default function saveFile(fileName: string, content: Blob | string) {
  const blob =
    content instanceof Blob
      ? content
      : new Blob([content], { type: 'text/plain;charset=utf-8' })

  const fileUrl = URL.createObjectURL(blob)

  const downloadLink = document.createElement('a')
  downloadLink.href = fileUrl
  downloadLink.download = fileName

  downloadLink.style.display = 'none'

  document.body.appendChild(downloadLink)
  downloadLink.click()

  document.body.removeChild(downloadLink)
  URL.revokeObjectURL(fileUrl)
}
