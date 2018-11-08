import React, { Component} from 'react'
import { connect } from 'react-redux';
import {
    Header,
    Container,
    Menu,
    Card,
} from "semantic-ui-react";
import {Link} from 'react-router-dom';

class Home extends Component {
  render(){

    return(
      <div className="App">
          <div className="App-header">
                      <Header inverted as="h1">Bridges-HTX</Header>
          </div>
        
        </div>
    )
  }
}
export default connect ()(Home)
