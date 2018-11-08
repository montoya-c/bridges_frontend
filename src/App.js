import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home.js'
import Login from './Components/Login.js';
import SignUp from './Components/SignUp.js';
import UserResourcesList from './Components/UserResourcesList';
import ResourceForm from './Components/ResourceForm';
import UpdateResourceForm from './Components/UpdateResourceForm';
import PrivateRoute from './Components/PrivateRoute';
import CategoriesList from './Components/CategoriesList';
import CategoryCard from './Components/CategoryCard';
import ResourceDetail from './Components/ResourceDetail'



class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            {
              // "/categories" to Categories
              // "/category/:id" to Category
              // "/resource/:id" to Resource
              // "/login" to Login
              // "/signup" to SignUp
              // "/my-resources"
              // "/add-resource" to AddResource
              // "/edit-resource/:id" to EditResource
              // "/" redirect to /categories or /my-resources
              null
            }
            <Route path = "/Home" component={Home}/>
            <Route path = "/categories" component={CategoriesList}/>
            <Route path = "/category/:id" component={CategoryCard}/>
            <Route path = "/resource/:id" component={ResourceDetail}/>
            <Route path = "/login" component={Login}/>
            <Route path = "/signup" component={SignUp}/>
            <Route path = "/my-resources" component={UserResourcesList}/>
            <Route path = "/add-resource" component={ResourceForm}/>
            <Route path = "/edit-resource" component={UpdateResourceForm}/>
            <Route
                path="/"
                render={() => (
                  <Redirect
                    to={{
                      pathname: localStorage.jwt ? '/my-resources' : '/categories'
                    }}
                  />
                )}
              />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect() (App);
