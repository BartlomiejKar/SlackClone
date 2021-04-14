import React, { useEffect } from 'react';
import { setUser, clearUser } from "./actions/index"
import ReactDOM from 'react-dom';
import firebase from "firebase/app"
import { BrowserRouter, Switch, Route, withRouter, useHistory } from "react-router-dom";
import { store } from "./actions/store";
import { Provider, connect } from "react-redux"
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { Spinner } from "./components/Spinner/Spinner"
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";


const Root = ({ isLoading, setUser, clearUser }) => {
  const history = useHistory()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        history.push({
          pathname: "/"
        })
      } else {
        history.push("/login")
        clearUser()
      }
    })
  }, [history, setUser, clearUser])

  const renderApp =
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>


  return isLoading ? <Spinner /> : renderApp

}
const mapStateFromProps = (state) => ({
  isLoading: state.user.isLoading
})


const RootWithRouter = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

