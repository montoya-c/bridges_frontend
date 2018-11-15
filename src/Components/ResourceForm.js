import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Form, Button, Tab } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class ResourceForm extends Component {

  componentDidMount(){
    //this.props.fetchNewResource()
    this.props.fetchCategories()
  }

  renderForm(languageIndex){
    let form = this.props.newResource.resource_details_attributes[languageIndex]
    return (
      <div>
        <Form.Input fluid label='Program Name' placeholder='Program Name' value={form.program_name} onChange={e => this.props.updateNewResource(languageIndex, "program_name", e.target.value)} />
        <Form.TextArea label='Description' placeholder='Give a summary about the services you provide.' value={form.description} onChange={e => this.props.updateNewResource(languageIndex, "description", e.target.value)
        } />
      <Form.TextArea label='Services' placeholder='Include a list of the type of services included.' value={form.services} onChange={e => this.props.updateNewResource(languageIndex, "services", e.target.value)}/>
        <Form.TextArea label='Eligibility' placeholder='Include eligibility requirements.' value={form.eligibility}
         onChange={e => this.props.updateNewResource(languageIndex, "eligibility", e.target.value)} />

        <br/>
        <br/>
        <label>Contact Info</label>
        <br/>
        <br/>
        <Form.Group widths='equal'>
          <Form.TextArea label='Address:' placeholder='Address' value={form.address} onChange={e => this.props.updateNewResource(languageIndex, "address", e.target.value)}/>
          <Form.TextArea label='Telephone' placeholder='Telephone' value={form.telephone} onChange={e => this.props.updateNewResource(languageIndex, "telephone", e.target.value)}/>
          <Form.TextArea  label='Website' placeholder='Website' value={form.website} onChange={e => this.props.updateNewResource(languageIndex, "website", e.target.value)}/>
        </Form.Group>
        <Form.TextArea label='The following languages are spoken at our agency/organization:' placeholder='List languages that are available to clients' value={form.language_spoken} onChange={e => this.props.updateNewResource(languageIndex, "language_spoken", e.target.value)} />

    </div>
  )
  }

  render(){
    const panes = [
      { menuItem: 'English', render: () => this.renderForm(0)},
      { menuItem: 'Spanish', render: () => this.renderForm(1) }

      /* if language_id = 0 then renderForm(0)*/

    ]
    return(
      <div>
      <div>

      </div>
      <Form>
        <Tab panes={panes} />
          <label>Category</label>
            <br/>
            Please check all the boxes that apply.
          {this.props.categories.map(category =>(
            <Form.Checkbox label={category.details.name} onChange={e => this.props.toggleCategory(category.id)}/>
          ))}
          <Form.Group>
          <Link to ="/my-resources"><Form.Button onClick={this.props.createNewResource}>Cancel</Form.Button></Link>
          <Form.Button onClick={this.props.fetchNewResource}>Submit</Form.Button>
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
        type: 'FETCH_NEW_RESOURCE',
      })
    },
    updateNewResource(languageIndex, key, value){
      dispatch({
        type: 'POPULATE_NEW_RESOURCE',
        payload: { languageIndex, key,  value }
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
    },
    fetchNewResource(){
      dispatch({
        type: 'FETCH_NEW_RESOURCE'
      })
    }
  }
}




export default connect(mapStateToProps, mapDispatchToProps) (ResourceForm)
