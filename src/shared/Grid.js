import React, { Component } from "react";
import { connect } from "react-redux";
import { testLog } from "./utils";
import { fetchRepos } from "./api";
class Grid extends Component {
  constructor(props) {
    super(props);
    let repos;
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      repos = this.props.staticContext.data;
    }
    this.state = {
      repos,
      loading: !repos
    };
    this.fetchRepos = this.fetchRepos.bind(this);
  }
  componentWillMount() {
    testLog();
    this.props.fetchRepoData(this.props.match.params.id);
  }
  // componentDidMount() {
  //   if (!this.state.repos) {
  //     this.fetchRepos(this.props.match.params.id);
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      // this.fetchRepos(this.props.match.params.id);
      this.props.fetchRepoData(this.props.match.params.id);
    }
  }
  fetchRepos(lang) {
    this.setState({ loading: true });
    debugger;
    this.props.fetchInitialData(lang).then(repos => {
      this.setState({ repos, loading: false });
      debugger;
    });
  }
  render() {
    debugger;
    const { repos, loading } = this.state;
    const { repoData } = this.props;
    // const { loading, repos1 } = this.state
    if (typeof this.props.isFetching !== "undefined" && repoData.length == 0) {
      return <p>Fetching</p>;
    } else if (loading && repoData.length == 0) {
      return <p>LOADING</p>;
    }

    return (
      <div>
        <h3>{this.props.match.params.id}</h3>
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {/* {repos.map(({ name, owner, stargazers_count, html_url }) => (
            <li
              key={name}
              style={{ margin: 25, color: "black", fontSize: "20px" }}
            >
              <ul>
                <li>
                  <a href={html_url}>{name}</a>
                </li>
                <li>@{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>
            </li>
          ))} */}
          {repoData.map(({ name, owner, stargazers_count, html_url }) => (
            <li
              key={name}
              style={{ margin: 25, color: "black", fontSize: "20px" }}
            >
              <ul>
                <li>
                  <a href={html_url}>{name}</a>
                </li>
                <li>@{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { repos } = state;
  return {
    repoData: repos.data,
    isFetching: repos.isFetching
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchRepoData: language => dispatch(fetchRepos(language))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Grid);
