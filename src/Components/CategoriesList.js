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


class CategoriesList extends Component {

  componentDidMount(){
    this.props.fetchCategories()
  }

  render(){

    return(
      <div>
      <div className="App">
          <div className="App-header">
                      <Header inverted as="h1">Bridges-HTX</Header>
                      <br/>
                      <br/>
                      <Button primary size='huge'>
                        Get Started
                        <Icon name='right arrow' />
                      </Button>
          </div>
          <Container>
            <Menu tabular size="massive">
              <Menu.Item name="Map" active={false}>Map</Menu.Item>
              <Menu.Item name="categories" active={true}>Categories</Menu.Item>
            </Menu>
         </Container>
       </div>
       <h1>Resources</h1>
          <Card.Group>
            {this.props.categories.map(category =>(
                <Card fluid color='black' header={<Link to={{pathname:`/category/${category.id}`}}>{category.details.name}</Link>}/>
              ))}
         </Card.Group>
        </div>
    )
  }
}

  const mapStateToProps = (state) => {
    return{
      categories: state.categories
    }
  }

  const mapDispatchToProps = (dispatch) => {

    return{

      fetchCategories(){
        dispatch({
          type: 'RENDER_CATEGORIES'
        })
      }
    }
  }




export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)
