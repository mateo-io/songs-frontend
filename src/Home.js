import React from 'react'
import styled from 'react-emotion'

import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

// import { Observable } from 'rxjs'
import { Subject } from 'rxjs/Subject'
const inputStream = new Subject()

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
  }

  componentWillMount() {
    inputStream.subscribe(val => {
      console.log(`input subscribe ${val}`)
      this.setState({ query: val, results: [] }, () =>
        this.getSearchResults(this.state.query)
      )

      // search for faces
    })
  }

  getSearchResults(query) {
    // helloooooo
    console.log(`getSearchResults`)
    this.setState({ results: [{ id: 4, type: 'faces', match: 'Karen' }] })

    // Api.fetchByDates('query')
    //   .then((res:Array<any>) => console.log(`fetchByDates respone ${res}`))
  }

  getSearchContents(query) {
    // fires when search element is clicked
    // redirect to a new route.
    // fetch Contents with actual query.
    // Render ContentCollection or get Contents from Redux and just update it.
    console.log(`getSearchContents with query ${query}`)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    return (
      <Root>
        <Grid container spacing={24}>
          <Grid item md={12}>
            <WhitePaper>
              <Title>observable world</Title>
              <form noValidate autoComplete="off">
                <TextField
                  id="name"
                  label="Name"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
              </form>
              <Body>Hola</Body>
            </WhitePaper>
          </Grid>
        </Grid>
      </Root>
    )
  }
}

const Title = styled('h1')`
  text-align: center;
`

const Body = styled('p')`
  font-family: 'Lato', sans-serif;
`

const WhitePaper = styled(Paper)`
  padding: 20px;
  margin: 30px;
`

const Root = styled('div')`
  flex-grow: 1;
`

export default Home
