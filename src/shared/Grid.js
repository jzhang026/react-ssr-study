import React, { Component } from 'react'
import {testLog} from './utils'
class Grid extends Component {
  constructor(props) {
    super(props)
    let repos;
    if(__isBrowser__) {
      repos = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      repos = this.props.staticContext.data
    }
    this.state = {
      repos,
      loading: !repos
    }
    this.fetchRepos = this.fetchRepos.bind(this)
  }
  componentWillMount() {
    testLog()
  }
  componentDidMount() {
    if(!this.state.repos) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  fetchRepos(lang) {
    this.setState({loading: true})
    this.props.fetchInitialData(lang)
    .then((repos) => {
      this.setState({repos,loading:false})
    })
  }
  render() {
    const {repos, loading} = this.state
    // const { loading, repos } = this.state

    if (loading) {
      return <p>LOADING</p>
    }

    return (
      <div>
        <h3>{this.props.match.params.id}</h3>
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        {repos.map(({ name, owner, stargazers_count, html_url }) => (
          <li key={name} style={{margin: 25, color: 'black', fontSize: '20px'}}>
            <ul>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        ))}
      </ul>
      </div>
    )
  }
}

export default Grid