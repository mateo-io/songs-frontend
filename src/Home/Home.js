import React from 'react'
import styled from 'react-emotion'
import YouTube from 'react-youtube'

import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'

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
      lyrics: 'Song lyrics...if you choose one',
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
      this.setState({ name: query, results: [] }, () =>
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

  getSearchContents(song) {
    console.log(`getSearchContents with song ${JSON.stringify(song)}`)
    this.setState({
      selectedSong: song.videoId,
    })
    const query = `${song.artist} ${song.match}`
    fetch('http://localhost:8000/api/scrape', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        query,
        language: 'english',
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(`getLyrics answered with ${data} - ${JSON.stringify(data)}`)
        this.setState({ lyrics: data.payload })
      })
      .catch(err => console.error(`Error fetching lyrics`))
  }

  render() {
    // console.log(translateText('i love you', 'en', ''))
    const { results, selectedSong } = this.state
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
              <Body dangerouslySetInnerHTML={{ __html: this.state.lyrics }} />
            </WhitePaper>
          </Grid>

          <Grid item md={6} xs={12}>
            <WhitePaper center="true">
              <Body>Translated</Body>
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
