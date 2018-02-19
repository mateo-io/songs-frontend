const baseUrl =
  'https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q='

const key = '&key=AIzaSyB7F2mssotndn4lHpQnPRhIolAXJ9bC8A0'

const getVideosList = query => {
  return fetch(`${baseUrl}${query}${key}`, {
    method: 'GET',
    headers: new Headers({}),
  })
    .then(res => {
      const util = require('util')
      console.log(`youtube response ${res.ok}`)
      return res.json().then(jsonData => {
        return jsonData.items.map((item, index) => {
          return { id: index, type: 'artist', match: item.snippet.title }
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
