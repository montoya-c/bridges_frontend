import React, { Component} from 'react'
import { connect } from 'react-redux';
import { languages } from '../wording';
import {
    Header,
    Container,
    Menu,
    Card,
    Button,
    Icon,
    Dropdown
} from "semantic-ui-react";
import {Link} from 'react-router-dom';

const options = [
  { key: 1, text: 'English', value: 1 },
  { key: 2, text: 'Español', value: 2 }

]

class Home extends Component {

  render(){
    const wording = languages[this.props.selectedLanguage]
    return(
      <div className="App">
        <Menu  size='large'>
              <Container>
                <Menu.Item as='a' active>{wording["Home"]}</Menu.Item>
                <Menu.Item as='a' >{wording["About"]}</Menu.Item>
                <Menu.Item as='a'>{wording["Connect"]}</Menu.Item>
                <Menu.Item as='a'>{wording["Collaborate"]}</Menu.Item>
                <Menu.Item position='right'>
                  <Link to="/signup"><Button as='a' >
                    {wording["Sign Up"]}
                  </Button></Link>
                <Link to="/login"><Button as='a'  style={{ marginLeft: '0.5em' }} >
                    {wording["Log In"]}
                  </Button></Link>
                </Menu.Item>
              </Container>
            </Menu>
          <div className="App-header">
                      <Header inverted as="h1">Bridges-HTX</Header>
                      <br/>
                        <Menu compact>
                          <Dropdown text='Language/Idioma' onChange={this.props.changeSelectedLanguage} options={options} simple item />
                        </Menu>
                      <br/>
                      <Link to="/categories"><Button primary size='huge' basic inverted color='black'> <Icon name='search ' />Search</Button></Link>
          </div>
       </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selectedLanguage: state.selectedLanguage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSelectedLanguage(e){
      dispatch ({
        type: 'CHANGE_SELECTED_LANGUAGE',
        payload: e.target.innerText
      })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
