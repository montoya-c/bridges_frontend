import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'

class Login extends Component {
  render(){
    if(this.props.jwt)  return (
        <Redirect
          to={{
            pathname: "/my-resources",
            state: {from: this.props.location}
          }}
        />
      )
  return (
    <div>
    <h1>Login</h1>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' onChange={e => this.props.updateCurrentUser({ username: e.target.value })} type="text"/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' onChange={e => this.props.updateCurrentUser({ password: e.target.value })} type="password" />
        </Form.Field>
        <Button onClick={this.props.loginUser} type='submit'>Submit</Button>
      </Form>
    </div>
    );
  }
}

const mapStateToProps = ( state ) => {
    return {
      jwt: state.jwt
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {

        updateCurrentUser(userAttributes){
            dispatch({
                type: 'UPDATE_CURRENT_USER',
                payload: userAttributes
            })
        },

        loginUser(){
            dispatch({
                type: 'ATTEMPT_TO_LOGIN_USER'
            })
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (Login)
