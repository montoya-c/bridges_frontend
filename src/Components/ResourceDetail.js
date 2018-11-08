import React, { Component} from 'react'
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react'

class ResourceDetail extends Component {
  render(){

    return(
      <div>
        <h1>When you click on a resource within resource list found within categories you will see the resource detail</h1>
        
      </div>

    )
  }

  // const mapStateToProps = (state) => {
  //   return{
  //     categories: state.categories,
  //     selectedResource: state.selectedResource
  //   }
  // }
  //
  // const mapDispatchToProps = (dispatch) => {
  //   return{
  //     fetchCategories(){
  //       dispatch({
  //         type: ''
  //       })
  //     }
  //   }
  // }




}
export default connect() (ResourceDetail)
