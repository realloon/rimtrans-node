const readFile = (file: File) =>
  new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = readEvent => {
      const content = readEvent.target?.result

      content && resolve(content)
    }

    if (file.type === 'application/zip') {
      reader.readAsArrayBuffer(file)
    } else if (file.name.endsWith('.rnp')) {
      reader.readAsText(file)
    } else {
      reject('Illegal file type')
      return
    }
  })

export default readFile
