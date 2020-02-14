import fetch from "isomorphic-fetch";

export function fetchPopularRepos(language = "all") {
  const encodedURI = encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(encodedURI)
    .then(data => data.json())
    .then(repos => repos.items)
    .catch(error => {
      console.warn(error);
      return null;
    });
}

export function fetchRepos(language) {
  return function(dispatch) {
    dispatch({ type: "start" });
    return fetchPopularRepos(language).then(items => {
      debugger;
      return dispatch({
        type: "success",
        data: items
      });
    });
  };
}
