import React, { Component} from 'react'
import { connect } from 'react-redux';
import { Header, Card, Button, Icon, Image, Item, Label, Grid, Menu, Container } from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';


class UserResourcesList extends Component {

 componentDidMount(){
   // this.props.fetchUserResource(this.props.match.params.id)
 }


  render(){
    console.log(this.props)
    return(
      <div>
        <Menu
              size='large'>
              <Container>
                <Menu.Item as='a'><Link to="/home">
                  Home</Link>
                </Menu.Item>
                <Menu.Item as='a' active >Profile</Menu.Item>
                <Menu.Item as='a'>Connect</Menu.Item>
                <Menu.Item as='a'>Collaborate</Menu.Item>
                <Menu.Item position='right'>
                  <Link to="/add-resource"><Button as='a' >
                    Add a Resource
                  </Button></Link>
                <Button as='a'  style={{ marginLeft: '0.5em' }} onClick={e => { localStorage.clear(); window.location.reload() }}>
                    Log Out
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
        <div>
          <Header as='h2' icon textAlign='center'>
            <Icon name='user' circular />
            <Header.Content>  <h1>{this.props.currentUser.username}</h1></Header.Content>
          </Header>
        </div>
          <br/>

          <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Card.Group>
                { this.props.currentUser.resources &&
                  this.props.currentUser.resources.map(resource =>(
                <Card>
                    <Card.Content>
                      <Card.Header>{resource.details.program_name}</Card.Header>
                      <Card.Meta>Last Updated: </Card.Meta>
                      <Card.Description>{resource.details.description}</Card.Description>
                        <Link to={`/resource/${resource.id}`}><Button  floated='right' animated='vertical'onClick={e => this.props.fetchUserResource(resource.id)}><Button.Content hidden>View</Button.Content>
                        <Button.Content visible><Icon link name='eye'/></Button.Content>
                        </Button></Link>
                      <Link to={`/edit-resource/${resource.id}`}><Button  floated='right' animated='vertical'><Button.Content hidden>Edit</Button.Content>
                        <Button.Content visible><Icon link name='edit' /></Button.Content></Button></Link>
                        <Button  floated='right' animated='vertical' onClick={e =>  this.props.fetchDeleteResource(resource.id)}><Button.Content hidden>Remove</Button.Content>
                        <Button.Content visible><Icon link name='delete' /></Button.Content></Button>
                    </Card.Content>
                </Card>
                ))}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return{
    currentUser: state.currentUser,
    selectedResource: state.selectedResource
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchUserResource(id){
      dispatch({
        type: 'FETCH_SELECTED_RESOURCE',
        id: id
      })
    },
    selectResource(id){
      dispatch({
        type: 'SELECT_RESOURCE',
        id: id
      })
    },
    fetchDeleteResource(id){
      dispatch({
        type: 'DESTROY_SELECTED_RESOURCE',
        id:id
      })
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (UserResourcesList))
