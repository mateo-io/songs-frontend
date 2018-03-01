const baseUrl =
  'https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q='

const key = '&key=AIzaSyB7F2mssotndn4lHpQnPRhIolAXJ9bC8A0'

const getVideosList = query => {
  return fetch(`${baseUrl}${query}${key}`, {
    method: 'GET',
    headers: new Headers({}),
  })
    .then(res => {
      console.log(`youtube response ${res.ok}`)
      return res.json().then(jsonData => {
        return jsonData.items.map((item, index) => {
          const { snippet: { title } } = item

          const nameArray = title.split('-').reverse()

          const songName = nameArray[0] || ''
          const songArtist = nameArray[1]

          const songNameFormatted = songName
            // remove brackets [official video]
            .replace(/\[.*\]/, '')
            // remove parens (real viddd dude)
            .replace(/\(.*\)/, '')
            // remove HD
            .replace(/\s+HD[^\b]{0}/, '')

          return {
            id: `${songArtist}-${songName}`,
            type: songArtist,
            match: songNameFormatted,
            thumb: item.snippet.thumbnails.default,
          }
        })
      })
    })
    .catch(err =>
      console.error(
        `youtube API getVideosList failed with query ${query} and error ${err}`
      )
    )
}

export { getVideosList }
