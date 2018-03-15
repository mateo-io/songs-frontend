const key = 'AIzaSyB7F2mssotndn4lHpQnPRhIolAXJ9bC8A0'

const getTextLanguage = text => {
  0
}

export const translateText = (text, source_lang, destination_lang) => {
  const content = fetch(
    `https://translation.googleapis.com/language/translate/v2?`,
    {
      method: 'POST',
      body: {
        q: text,
        source: source_lang,
        target: destination_lang,
      },
    }
  )
    .then(res => res.json())
    .then(text => {
      console.log(text)
      return text['data']['translations'][0]['translatedText']
    })
}
