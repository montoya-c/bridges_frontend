import React, { Component} from 'react'
import { connect } from 'react-redux';
import {
    Card,
} from "semantic-ui-react";
import {Link} from 'react-router-dom';


class CategoryCard extends Component {

  componentDidMount(){
    this.props.fetchCategoryResources(this.props.match.params.id)
  }

  render(){
    console.log(this.props.selectedCategory)
    return(
      <div>
        <h1>This is a Category where you will find all the Resources listed.</h1>
        <Card.Group>
          {this.props.selectedCategory.resources.map(resource =>(
              <Card fluid color='black' header={<Link to={{pathname:`/resource/${resource.id}`}}>{resource.details.program_name}</Link>}/>
            ))}
       </Card.Group>
      </div>
    )
  }
}

  const mapStateToProps = (state) => {
    return{
      selectedCategory: state.selectedCategory
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return{
      fetchCategoryResources(id){
        dispatch({
          type: 'FETCH_SELECTED_CATEGORY_RESOURCES',
          id:id
        })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CategoryCard)
