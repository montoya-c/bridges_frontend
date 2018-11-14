import React, { Component} from 'react'
import { connect } from 'react-redux';
import { Header, Card, Button, Icon, Image, Item, Label, Grid, Menu, Container } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class UserResourcesList extends Component {

 componentDidMount(){
   this.props.fetchUserResource()
 }


  render(){
    console.log(this.props)
    return(
      <div>
        <Menu
              size='large'>
              <Container>
                <Menu.Item as='a'><Link to="/categories">
                  Home</Link>
                </Menu.Item>
                <Menu.Item as='a' active >Profile</Menu.Item>
                <Menu.Item as='a'>Connect</Menu.Item>
                <Menu.Item as='a'>Collaborate</Menu.Item>
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
        <div>
          <Header as='h2' icon textAlign='center'>
            <Icon name='user' circular />
            <Header.Content>  <h1>{this.props.currentUser.username}</h1></Header.Content>
          </Header>
        </div>
          <br/>
          /* add if user has resources list if not logic  */
          <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Card.Group>
                {this.props.currentUser.resources.map(resource =>(
                <Card>
                    <Card.Content>
                      <Card.Header>{resource.details.program_name}</Card.Header>
                      <Card.Meta>Last Updated: </Card.Meta>
                      <Card.Description>{resource.details.description}</Card.Description>
                        <Button onClick={ e=> this.props.history.push(`/resource/${resource.id}`)} floated='right' animated='vertical'><Button.Content hidden>View</Button.Content>
                        <Button.Content visible><Icon link name='eye'/></Button.Content>
                        </Button>
                        <Button onClick={ e=> this.props.selectResource(resource)} floated='right' animated='vertical'><Button.Content hidden>Edit</Button.Content>
                        <Button.Content visible><Icon link name='edit' /></Button.Content></Button>
                        <Button  floated='right' animated='vertical'><Button.Content hidden>Remove</Button.Content>
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
    fetchUserResource(){
      dispatch({
        type: 'RENDER_USER_RESOURCE',
      })
    },
    selectResource(resource){
      dispatch({
        type: 'SELECT_RESOURCE',
        payload: resource
      })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (UserResourcesList)
