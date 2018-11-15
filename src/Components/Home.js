import React, { Component} from 'react'
import { connect } from 'react-redux';
import {
    Header,
    Container,
    Menu,
    Card,
    Button,
    Icon,
} from "semantic-ui-react";
import {Link} from 'react-router-dom';



class Home extends Component {
  render(){
    return(
      <div className="App">
        <Menu  size='large'>
              <Container>
                <Menu.Item as='a' active>Home</Menu.Item>
                <Menu.Item as='a' >About</Menu.Item>
                <Menu.Item as='a'>Connect</Menu.Item>
                <Menu.Item as='a'>Collaborate</Menu.Item>
                <Menu.Item position='right'>
                  <Link to="/signup"><Button as='a' >
                    Sign Up
                  </Button></Link>
                <Link to="/login"><Button as='a'  style={{ marginLeft: '0.5em' }} >
                    Log In
                  </Button></Link>
                </Menu.Item>
              </Container>
            </Menu>
          <div className="App-header">
                      <Header inverted as="h1">Bridges-HTX</Header>
                      <br/>
                      <br/>
                      <Link to="/categories"><Button primary size='huge'> <Icon name='search ' />Search</Button></Link>
          </div>
       </div>
    )
  }
}
export default connect()(Home)
