import React, { Component} from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
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
              <input placeholder='organization Name'onChange={ e =>this.props.updateNewUser({organizationName: e.target.value})} type="text" />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input placeholder='Email' onChange={ e =>this.props.updateNewUser({email: e.target.value})} type="text" />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <input placeholder='Username' onChange={ e =>this.props.updateNewUser({username: e.target.value})} type="text"/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder='Password' onChange={ e =>this.props.updateNewUser({password: e.target.value})} type="password"/>
            </Form.Field>
            <Button onClick={e => this.props.createUser(this.props.history)} type='submit'>Submit</Button>
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

    createUser(history){
      dispatch({
        type: 'CREATE_NEW_USER',
        redirect: () => history.push('/my-resources')
      })

    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
