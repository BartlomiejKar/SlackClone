import React, { useEffect } from 'react';
import { setUser } from "./actions/index"
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


const Root = ({ isLoading, setUser }) => {
  const history = useHistory()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        setUser(user)
        history.push({
          pathname: "/"
        })
      }
    })
  }, [history, setUser])

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


const RootWithRouter = withRouter(connect(mapStateFromProps, { setUser })(Root))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

