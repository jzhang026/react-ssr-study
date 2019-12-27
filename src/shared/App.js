import React, {Component} from 'react'
import Grid from './Grid'
import routes from './routes'
import {Router, Switch, Route} from 'react-router-dom'
import NoMatch from '../shared/NoMatch'
import NavBar from '../shared/NavBar'
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          {routes.map(({ path, exact, component: C, ...rest})=> (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={(props) => (
                <C {...props} {...rest} />
              )}

            />
          ))}
        <Route render={(props) => <NoMatch {...props} />} />
        </Switch>
      </div>
    )
  }
}

export default App