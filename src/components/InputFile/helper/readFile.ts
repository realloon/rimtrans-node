const readFile = (file: File) =>
  new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = readEvent => {
      const content = readEvent.target?.result

      content
        ? resolve(content)
        : reject(new Error('Content is null or undefined.'))
    }

    reader.onerror = errorEvent =>
      reject(
        errorEvent.target?.error ||
          new Error('Error occurred while reading the file.')
      )

    if (
      file.type === 'application/zip' ||
      file.type === 'application/x-zip-compressed'
    ) {
      reader.readAsArrayBuffer(file)
    } else if (file.name.endsWith('.rnp')) {
      reader.readAsText(file)
    } else {
      reject(new Error('Illegal file type'))
      return
    }
  })

export default readFile
