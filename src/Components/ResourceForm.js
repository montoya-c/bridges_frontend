import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';



class ResourceForm extends Component {

  componentDidMount(){
    this.props.fetchNewResource()
  }

  render(){
    return(
      <div>
      <div>
        <h1>form that allows adding resource can also cancel to exit and redirect to my resources page</h1>
      </div>
      <Form>
          <Form.Input fluid label='Program Name' placeholder='Program Name' />
          <Form.TextArea label='Description' placeholder='Give a summary about the services you provide.' />
          <Form.TextArea label='Services' placeholder='Include a list of the type of services included.' />
          <Form.TextArea label='Eligibility' placeholder='Include eligibility requirements.' />
            <label>Category</label>
            <br/>
            Please check all the boxes that apply.
          {this.props.categories.map(category =>(
          <Form.Checkbox label={category.details.name}
          />  ))}
          <br/>
          <br/>
          <label>Contact Info</label>
          <br/>
          <br/>
          <Form.Group widths='equal'>
            <Form.TextArea label='Address:' placeholder='Address' />
            <Form.TextArea label='Telephone' placeholder='Telephone' />
            <Form.TextArea  label='Website' placeholder='Website' />
          </Form.Group>
          <Form.TextArea label='The following languages are spoken at our agency/organization:' placeholder='List languages that are available to clients' />
          <Form.Group>
          <Link to ="/my-resources"><Form.Button onClick={this.props.createNewResource}>Cancel</Form.Button></Link>
          <Form.Button onClick={this.props.createNewResource}>Submit</Form.Button>
          </Form.Group>
      </Form>
      <br/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return{
    categories: state.categories,
    newResource: state.newResource
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchNewResource(resourceAttributes){
      dispatch({
        type: 'SAVE_NEW_RESOURCE',
        payload: resourceAttributes
      })
    },
    createNewResource(){
      dispatch({
        type: 'CREATE_NEW_RESOURCE'
      })
    }
  }
}




export default connect(mapStateToProps, mapDispatchToProps) (ResourceForm)
