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
        <Menu
              size='large'>
              <Container>
                <Menu.Item as='a'><Link to="/home">
                  Home</Link>
                </Menu.Item>
                <Menu.Item as='a' active >About</Menu.Item>
                <Menu.Item position='right'>
                  <Link to="/add-resource"><Button as='a' >
                    Add a Resourse
                  </Button></Link>
                <Button as='a'  style={{ marginLeft: '0.5em' }} onClick={e => { localStorage.clear(); window.location.reload() }}>
                    Log Out
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
       <h1>Resources</h1>
         <Container>
           <Menu tabular size="massive">
             <Menu.Item name="Map" active={false}>Map</Menu.Item>
             <Menu.Item name="categories" active={true}>Categories</Menu.Item>
           </Menu>
        </Container>
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
