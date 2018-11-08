import React, { Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'

class SignUp extends Component{

  render(){
    return(
      <div>
        <h1>Sign Up</h1>
        <br/>
          <Form>
            <Form.Field>
              <label>Organization Name</label>
              <input placeholder='organization Name'onChange={ e =>this.props.updateNewUser({username: e.target.value})} type="text" />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input placeholder='Email' onChange={ e =>this.props.updateNewUser({username: e.target.value})} type="text" />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <input placeholder='Username' onChange={ e =>this.props.updateNewUser({username: e.target.value})} type="text"/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder='Password' onChange={ e =>this.props.updateNewUser({username: e.target.value})} type="password"/>
            </Form.Field>
            <Button onClick={this.props.createNewUser} type='submit'>Submit</Button>
          </Form>
          <br/>
          <Link to ="/login">Login</Link>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return{

  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateNewUser(userAttributes){
      dispatch({
        type: 'UPDATE_NEW_USER',
        payload: userAttributes
      })
    },

    createUser(){
      dispatch({
        type: 'CREATE_NEW_USER'
      })

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
