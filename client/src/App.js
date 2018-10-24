import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store.js';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileActions';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddEducation from './components/add-credentials/AddEducation';
import AddExperience from './components/add-credentials/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path = "/" component = {Landing}/>
            <div className = "container">
              <Route exact path = "/register" component = {Register} />
              <Route exact path = "/login" component = {Login} />
              <Route exact path = "/profiles" component = {Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path = "/dashboard" component = {Dashboard} />
                <PrivateRoute exact path = "/create-profile" component = {CreateProfile} />
                <PrivateRoute exact path = "/edit-profile" component = {EditProfile} />
                <PrivateRoute exact path = "/add-education" component = {AddEducation} />
                <PrivateRoute exact path = "/add-experience" component = {AddExperience} />
                <PrivateRoute exact path = "/feed" component = {Posts} />
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
