import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';



class ResourceForm extends Component {
  render(){

    return(
      <div>
        <h1>form that allows adding resource can also cancel to exit and redirect to my resources page</h1>
      </div>
      // <Form>
      //   <Form.Group>
      //     <Form.Input fluid label='Program Name' placeholder='Program Name' />
      //     <Form.TextArea label='Description' placeholder='Tell us more about the services you offer.' />
      //     <Form.Select fluid label='Gender' options={options} placeholder='Gender' />
      //   </Form.Group>
      //   <Form.Group inline>
      //     <label>Category Type</label>
      //     <Form.Radio
      //       label='Small'
      //       value='sm'
      //       checked={value === 'sm'}
      //       onChange={this.handleChange}
      //     />
      //     <Form.Radio
      //       label='Medium'
      //       value='md'
      //       checked={value === 'md'}
      //       onChange={this.handleChange}
      //     />
      //     <Form.Radio
      //       label='Large'
      //       value='lg'
      //       checked={value === 'lg'}
      //       onChange={this.handleChange}
      //     />
      //   </Form.Group>
      //   <Form.TextArea label='About' placeholder='Tell us more about you...' />
      //   <Form.Checkbox label='I agree to the Terms and Conditions' />
      //   <Form.Button>Submit</Form.Button>
      // </Form>
    )
  }

}
export default connect() (ResourceForm)
