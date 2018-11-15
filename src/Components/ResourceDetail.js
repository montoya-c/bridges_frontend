import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Icon, } from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';

class ResourceDetail extends Component {

  componentDidMount(){
    this.props.fetchSelectedResource(this.props.match.params.id)
  }

  render(){
    console.log(this.props)
      const wording = languages[this.props.selectedLanguage]
    return((
       this.props.selectedResource.details &&
      <div>
        <button><Icon link name='close' onClick={ e=> this.props.history.goBack()}/></button>
        <br/>
        <h1>When you click on a resource within resource list found within categories you will see the resource detail</h1>
        <br/>
        <h1>{this.props.selectedResource.details.program_name}</h1>
        <p>{this.props.selectedResource.details.description}</p>
        <h3>{wording["Services:"]}</h3>
        <p>{this.props.selectedResource.details.services}</p>
        <h3>{wording["Eligibility:"]}</h3>
        <p>{this.props.selectedResource.details.eligibility}</p>
        <h3>{wording["The following languages are spoken:"]}</h3>
        <p>{this.props.selectedResource.details.language_spoken}</p>
        <h3>{wording["Contact Info:"]}</h3>
        <h4>{wording["Address:"]}</h4>{this.props.selectedResource.details.address}
        <h4>{wording["Telephone:"]}</h4>{this.props.selectedResource.details.telephone}
        <h4>{wording["Website:"]}</h4>{this.props.selectedResource.details.website}
        <h4>{wording["Hours:"]}</h4>
        <p>{this.props.selectedResource.details.hours}</p>
        <br/>
        <br/>
      </div>

    ) || null)
  }
}

    const languages = {
      "English":{
        "Services:":"Services:",
        "Eligibility:":"Eligibility:",
        "The following languages are spoken:":"The following languages are spoken:",
        "Contact Info:":"Contact Info:",
        "Address:":"Address:",
        "Telephone:":"Telephone:",
        "Website:":"Website:",
        "Hours:":"Hours:"
      },
      "Spanish":{
        "Services:":"Servicios:",
        "Eligibility:":"Requisitos de Eligibildad:",
        "The following languages are spoken:":"Se hablan los siguientes idiomas:",
        "Contact Info:":"Información de Contacto",
        "Address:":"Dirección:",
        "Telephone:":"Teléfono",
        "Website:":"Sitio Web:",
        "Hours:":"Horarios:"
    }
  }




    /* <h3>{wording["services"]}</h3>*/



const mapStateToProps = (state, props) => {
  console.log(state.selectedCategory.resources)
  return{
    selectedResource: state.selectedResource,
    selectedLanguage: state.selectedLanguage
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      fetchSelectedResource(id){
        dispatch ({
          type: 'FETCH_SELECTED_RESOURCE',
          id: id
        })
      }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (ResourceDetail))
