import React from 'react'
import styled from 'react-emotion'
import YouTube from 'react-youtube'

import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

// import { Observable } from 'rxjs'
import { Subject } from 'rxjs/Subject'
import Dropdown from './Dropdown'

// youtube api
import { getVideosList } from './Youtube'
import { translateText } from './Translate'

// Stream
const inputStream = new Subject()

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      results: [],
      selectedSong: 0,
      error: false,
      loading: false,
      lyrics: '',
      translatedLyrics: ''
    }
  }

  // state should be
  // query
  // selected song title, id, artist
  // search results array
  // lyrics fetched from

  componentWillMount() {
    inputStream.subscribe(query => {
      console.log(`input subscribibtion value ${query}`)
      // sets results to an empty array as input changed
      this.setState({ name: query, results: [], lyrics: '', translatedLyrics: '' }, () =>
        this.getSearchResults(this.state.name)
      )
    })
  }

  getSearchResults(query) {
    getVideosList(query).then(songs => {
      this.setState({
        results: songs,
      })
    })
  }

  scrapeLyrics(song, songId, language) {
    const query = `${song.artist} ${song.match}`
    fetch('http://localhost:8000/api/scrape', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        query,
        language,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(`getLyrics answered with ${data} - ${JSON.stringify(data)}`)
        const { lyrics, fetchedFrom } = data
        // TODO make request to save the lyrics
        this.saveLyrics({
          songId,
          language,
          fetchedFrom,
          content: lyrics,
        })
        this.setState({ lyrics: data.lyrics, loading: false, error: false })
      })
      .catch(err => {
        console.error(`Error scraping lyrics`)
        this.setState({ error: true })
      })
  }

  // content, language, fetchedFrom, songId
  saveLyrics({ songId, language, fetchedFrom, content }) {
    console.warn(
      `save lyrics with ${songId} ${language} ${fetchedFrom} ${content}`
    )
    return fetch('http://localhost:8000/api/lyrics', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        songId,
        fetchedFrom,
        language,
        content,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(
          `saveLyrics answered with ${data} - ${JSON.stringify(data)}`
        )
        // if lyrics are found then set lyrics
      })
      .catch(err => {
        this.setState({ error: true })
        console.error(`Error saving lyrics`)
      })
  }

  fetchLyrics(song, language) {
    const query = `${song.artist} ${song.match}`
    return fetch('http://localhost:8000/api/lyrics-fetch', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        artistName: song.artist,
        songTitle: song.match,
        language,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(
          `fetchLyrics answered with ${data} - ${JSON.stringify(data)}`
        )
        // if lyrics are found then set lyrics
        if (data.found) {
          console.log(`Lyrics exist for song ${song.match}`)
          this.setState({ lyrics: data.lyrics.content })
        } else {
          // TODO -> why song and song.id ?
          this.setState({ loading: true })
          this.scrapeLyrics(song, data.song.id, language)
        }
      })
      .catch(err => {
        this.setState({ error: true })
        console.error(`Error fetching lyrics`)
      })
  }

  getSearchContents(song) {
    console.log(`getSearchContents with song ${JSON.stringify(song)}`)
    this.setState(
      {
        selectedSong: song.videoId,
      },
      () => {
        // todo -> get song language
        this.fetchLyrics(song, 'english')
      }
    )
  }

  translateText(targetLanguage) {
    fetch(`http://localhost:8000/api/translate`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        text: this.state.lyrics,
        target: targetLanguage
      }),
    })
    .then(responseToParse => responseToParse.text())
    .then(res => {
      console.log(`translated text ${JSON.stringify(res)}`)
      this.setState({ translatedLyrics: res })
    })
    .catch(err => {
      console.error(`translate text error ${err}`)
    })
  }

  render() {
    // console.log(translateText('i love you', 'en', ''))
    const { results, selectedSong, loading, translatedLyrics } = this.state
    console.log(`selectedSong ${selectedSong}`)
    return (
      <Root>
        <Grid container spacing={24}>
          <Grid item sm={12}>
            <WhitePaper center="true" elevation={10}>
              <Title>Songs Translator</Title>
              <Dropdown
                items={results}
                onChange={selectedItem => this.getSearchContents(selectedItem)}
                onInputChange={e => inputStream.next(e.target.value)}
                // onInputChange={(e: any) => console.log(`input change ${e.target.value}`)}
              />
            </WhitePaper>
          </Grid>

          <Grid spacing={0} item md={12}>
            {selectedSong.length > 0 ? (
              <WhitePaper margin={0} center="true" elevation={0}>
                <YouTube
                  opts={{
                    width: '100%',
                    playerVars: {
                      autoplay: 1,
                    },
                  }}
                  videoId={selectedSong}
                />
              </WhitePaper>
            ) : null}
          </Grid>

          <Grid item md={6} xs={12}>
            <WhitePaper center="true">
            {loading ?
            <span>Loading lyrics...</span>
            :
            <Body dangerouslySetInnerHTML={{ __html: this.state.lyrics }} />
            }
            </WhitePaper>
          </Grid>

          <Grid item md={6} xs={12}>
            <WhitePaper center="true">
                {translatedLyrics ?
                <Body dangerouslySetInnerHTML={{__html: this.state.translatedLyrics}} />
                :
              <Body>
                <h2> Translate to</h2>
                <Section width={`210`}>
                  <Button onClick={() => this.translateText('es')} style={{ margin: '3px' }}>Spanish</Button>
                  <Button onClick={() => this.translateText('en')} style={{ margin: '3px' }}>English</Button>
                  <Button onClick={() => this.translateText('de')} style={{ margin: '3px' }}>German</Button>
                  <Button onClick={() => this.translateText('fr')} style={{ margin: '3px' }}>French</Button>
                  <Button onClick={() => this.translateText('it')} style={{ margin: '3px' }}>Italian</Button>
                  <Button onClick={() => this.translateText('zh-CN')} style={{ margin: '3px' }}>Chinese</Button>
                </Section>
              </Body>
                }
            </WhitePaper>
          </Grid>
        </Grid>
      </Root>
    )
  }
}

const Title = styled('h1')`
  font-family: 'Oswald', sans-serif;
  font-size: 42px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: orange;
`

const Section = styled(`div`)`
  width: ${props => (props.width ? `${props.width}px` : `auto`)};
  margin: 10px auto;
`

const Body = styled('p')`
  font-family: 'Lato', sans-serif;
`

const WhitePaper = styled(Paper)`
  padding: 20px;
  border-radius: 10px;
  margin: ${props => (props.margin >= 0 ? `${props.margin}px` : '30px')};
  ${props => props.center && `text-align: center`};
`

const Root = styled('div')`
  flex-grow: 1;
  max-width: 960px;
  margin: 0 auto;
`
