import React, { Component} from 'react'
import { connect } from 'react-redux';
import { Form, Button, Tab } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class UpdateResourceForm extends Component {

    componentDidMount(){
      this.props.fetchCategories()
    }

    renderForm(languageIndex){
      return (
        <div>
          <Form.Input fluid label='Program Name' placeholder='Program Name' value={this.props.selectedResource.program_name} onChange={e => this.props.editSelectedResource(languageIndex, "program_name", e.target.value)} />
          <Form.TextArea label='Description' placeholder='Give a summary about the services you provide.' value={this.props.selectedResource.description} onChange={e => this.props.editSelectedResource(languageIndex, "description", e.target.value)
          } />
        <Form.TextArea label='Services' placeholder='Include a list of the type of services included.' value={this.props.selectedResource.services} onChange={e => this.props.editSelectedResource(languageIndex, "services", e.target.value)}/>
          <Form.TextArea label='Eligibility' placeholder='Include eligibility requirements.' value={this.props.selectedResource.eligibility} onChange={e => this.props.editSelectedResource(languageIndex, "eligibility", e.target.value)} />

          <br/>
          <br/>
          <label>Contact Info</label>
          <br/>
          <br/>
          <Form.Group widths='equal'>
            <Form.TextArea label='Address:' placeholder='Address' value={this.props.selectedResource.address} onChange={e => this.props.editSelectedResource(languageIndex, "address", e.target.value)}/>
            <Form.TextArea label='Telephone' placeholder='Telephone' value={this.props.selectedResource.telephone} onChange={e => this.props.editSelectedResource(languageIndex, "telephone", e.target.value)}/>
            <Form.TextArea  label='Website' placeholder='Website' value={this.props.selectedResource.website} onChange={e => this.props.editSelectedResource(languageIndex, "website", e.target.value)}/>
          </Form.Group>
          <Form.TextArea label='The following languages are spoken at our agency/organization:' placeholder='List languages that are available to clients' value={this.props.selectedResource.language_spoken} onChange={e => this.props.editSelectedResource(languageIndex, "language_spoken", e.target.value)} />

      </div>
    )
  }

  render(){
    const panes = [
      { menuItem: 'English', pane: this.renderForm(0) },
      { menuItem: 'Spanish', pane: this.renderForm(1) }
    ]
    return(
      <div>
      <div>
        <h1>form that allows editing resource can also cancel to exit and redirect to my resources page</h1>
      </div>
      <Form>
        <Tab panes={panes} renderActiveOnly={false} />
          <label>Category</label>
            <br/>
            Please check all the boxes that apply.
          {this.props.categories.map(category =>(
            <Form.Checkbox label={category.details.name} onChange={e => this.props.toggleCategory(category.id)}/>
          ))}
          <Form.Group>
          <Link to ="/my-resources"><Form.Button onClick={this.props.createNewResource}>Cancel</Form.Button></Link>
          <Form.Button onClick={this.props.createNewResource}>Submit</Form.Button>
          </Form.Group>
      </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    categories: state.categories,
    selectedResource: state.selectedResource
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchEditedSelectedResource(resourceAttributes){
      dispatch({
        type:'FETCH_EDIT_RESOURCE',
      })
    },
    editSelectedResource(languageIndex, key, value){
      dispatch ({
        type: 'POPULATE_UPDATED_RESOURCE',
        payload:{languageIndex, key, value}
      })
    },
    fetchCategories(){
      dispatch({
        type: 'RENDER_CATEGORIES'
      })
    },
    toggleCategory(categoryID){
      dispatch({
        type: 'TOGGLE_CATEGORY',
        payload: categoryID
      })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (UpdateResourceForm)
