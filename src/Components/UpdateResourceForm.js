import React, { Component} from 'react'
import { connect } from 'react-redux';
import { Form, Button, Tab, Menu, Icon, Container } from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';


class UpdateResourceForm extends Component {

    componentDidMount(){
      console.log(this.props)
      this.props.fetchCategories()
      this.props.fetchSelectedResource(this.props.match.params.id)
    }

    renderForm(languageIndex){
      let form = this.props.selectedResource.resource_details_attributes[languageIndex]
      if(!this.props.selectedResource.details || !this.props.categories) return null
      return (
        <div>
          <Form.Input fluid label='Program Name' placeholder='Program Name' value={form.program_name} onChange={e => this.props.editSelectedResource(languageIndex, "program_name", e.target.value)} />
          <Form.TextArea label='Description' placeholder='Give a summary about the services you provide.' value={form.description} onChange={e => this.props.editSelectedResource(languageIndex, "description", e.target.value)
          } />
        <Form.TextArea label='Services' placeholder='Include a list of the type of services included.' value={form.services} onChange={e => this.props.editSelectedResource(languageIndex, "services", e.target.value)}/>
          <Form.TextArea label='Eligibility' placeholder='Include eligibility requirements.' value={form.eligibility} onChange={e => this.props.editSelectedResource(languageIndex, "eligibility", e.target.value)} />

          <br/>
          <br/>
          <label>Contact Info</label>
          <br/>
          <br/>
          <Form.Group widths='equal'>
            <Form.TextArea label='Address:' placeholder='Address' value={form.address} onChange={e => this.props.editSelectedResource(languageIndex, "address", e.target.value)}/>
            <Form.TextArea label='Telephone' placeholder='Telephone' value={form.telephone} onChange={e => this.props.editSelectedResource(languageIndex, "telephone", e.target.value)}/>
            <Form.TextArea  label='Website' placeholder='Website' value={form.website} onChange={e => this.props.editSelectedResource(languageIndex, "website", e.target.value)}/>
          </Form.Group>
          <Form.TextArea label='The following languages are spoken at our agency/organization:' placeholder='List languages that are available to clients' value={form.language_spoken} onChange={e => this.props.editSelectedResource(languageIndex, "language_spoken", e.target.value)} />
      </div>
    )
  }

  render(){
    const panes = [
      { menuItem: 'English', render: () => this.renderForm(0) },
      { menuItem: 'Spanish', render: () => this.renderForm(1) }
    ]
    return(
      <div>
      <div>
          <Menu inverted size='large'>
            <Container>
              <Menu.Item position='right'>
                <Button as='a'  style={{ marginLeft: '0.5em' }} onClick={e => { localStorage.clear(); window.location.reload() }}>
                      Log Out
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
      </div>
      <br/>
      <br/>
      <Form>
        <Tab panes={panes} renderActiveOnly={true} />
          <label>Category</label>
            <br/>
            Please check all the boxes that apply.
          {this.props.categories.map(category =>(
            <Form.Checkbox checked={this.props.selectedResource.category_ids.includes(category.id)} label={category.details.name} onChange={e => this.props.toggleCategory(category.id)}/>
          ))}
          <Form.Group>
          <Link to ="/my-resources"><Form.Button onClick={this.props.createNewResource}>Cancel</Form.Button></Link>
          <Form.Button onClick={e => this.props.fetchEditedSelectedResource(this.props.match.params.id)}>Submit</Form.Button>
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
    fetchEditedSelectedResource(id){
      dispatch({
        type:'FETCH_EDIT_RESOURCE',
        id:id
      })
    },
    fetchSelectedResource(id){
      dispatch({
        type: 'FETCH_SELECTED_RESOURCE',
        id:id
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
        type: 'TOGGLE_CATEGORY_IN_EDIT',
        payload: categoryID
      })
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (UpdateResourceForm))
