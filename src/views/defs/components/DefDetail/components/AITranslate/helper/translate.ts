import fetchJsonp from 'fetch-jsonp'

interface ITranslate {
  query: string
  from?: 'en' | 'zh-CHS'
  to?: 'en' | 'zh-CHS'
  appKey: string
  key: string
  vocabId: string
}

export default function translate({
  query,
  from = 'en',
  to = 'zh-CHS',
  appKey,
  key,
  vocabId,
}: ITranslate): Promise<string> {
  return new Promise(async (resovle, reject) => {
    const salt = new Date().getTime()
    const curtime = Math.round(new Date().getTime() / 1000)
    const str = appKey + truncate(query) + salt + curtime + key

    const sign = await hashString(str)

    const url = `https://openapi.youdao.com/api?q=${encodeURIComponent(
      query
    )}&appKey=${appKey}&salt=${salt}&from=${from}&to=${to}&sign=${sign}&signType=v3&curtime=${curtime}&vocabId=${vocabId}`

    try {
      const response = await fetchJsonp(url, {
        jsonpCallbackFunction: 'jsoncallback',
      })

      const data = await response.json()
      resovle(data.translation[0])
    } catch (error) {
      reject(error)
    }
  })
}

function truncate(q: string) {
  var len = q.length
  if (len <= 20) return q
  return q.substring(0, 10) + len + q.substring(len - 10, len)
}

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}
