import { createStore } from 'redux';

let currentUser;
  try{
    currentUser = JSON.parse(localStorage.currentUser)
  }catch(err){
    currentUser= {
      username: '',
      password: '',
      email:'',
      organizationName: '',
      resources: []
    }
  }

const defaultState = {
    jwt: localStorage.jwt && localStorage.jwt != 'undefined' ? localStorage.jwt : false,
    newUser: {
        username: '',
        password: '',
        email: '',
        organizationName:''
    },
    currentUser: currentUser || {
        username: '',
        password: '',
        email:'',
        organizationName: '',
        resources: []
    },
    activeTab: {},
    selectedCategory: {
      details: {
        name: 'Unnamed'
      },
      resources:[]
    },
    selectedResource: {
      resource_details_attributes: [
        {
          language_id: 29,
          program_name: '',
          description: '',
          services: '',
          address: '',
          telephone: '',
          website: '',
          hours: '',
          eligibility: '',
          language_spoken: '',
        },
        {
          language_id: 30,
          program_name: '',
          description: '',
          services: '',
          address: '',
          telephone: '',
          website: '',
          hours: '',
          eligibility: '',
          language_spoken: '',
        }
      ],
      category_ids:[]
    },
    newResource: {
      resource_details_attributes: [
        {
          language_id: 29,
          program_name: '',
          description: '',
          services: '',
          address: '',
          telephone: '',
          website: '',
          hours: '',
          eligibility: '',
          language_spoken: '',
        },
        {
          language_id: 30,
          program_name: '',
          description: '',
          services: '',
          address: '',
          telephone: '',
          website: '',
          hours: '',
          eligibility: '',
          language_spoken: '',
        }
      ],
      category_ids:[]
    },
    selectedLanguage: 'English',
    categories: [],
    isEditing: false
}


const reducer = (currentState = defaultState, action) => {
  const newState = { ...currentState}
    switch (action.type){
      case 'UPDATE_NEW_USER':
        newState.newUser = { ...newState.newUser, ...action.payload }
        break;
      case 'UPDATE_CURRENT_USER':
        newState.currentUser = { ...newState.currentUser, ...action.payload }
        break;
      case 'CREATE_NEW_USER':
        fetch('https://localhost:3001/api/v1/users',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newState.newUser)
        })
          .then(resp => resp.json())
          .then(payload => store.dispatch({ type: 'LOGIN_USER', payload: payload}))
        break;
      case 'FETCH_USER':
        fetch('http://localhost:3001/api/v1/profile',{
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newState.jwt}`
          }
        })
          .then(resp => resp.json())
          .then(user => store.dispatch({type: 'SAVE_USER', payload: user}))
        break;
        case 'SAVE_USER':
          newState.currentUser = action.payload
        break
      case 'ATTEMPT_TO_LOGIN_USER':
        fetch('http://localhost:3001/api/v1/login',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newState.currentUser)
        })
          .then(resp => resp.json())
          .then(payload => store.dispatch({type: 'LOGIN_USER', payload: payload}))
        break;
      case 'LOGIN_USER':
        newState.currentUser = action.payload.user
        newState.jwt = action.payload.jwt
        localStorage.setItem("currentUser", JSON.stringify(newState.currentUser))
        localStorage.setItem("jwt", newState.jwt)
        break;
      case 'LOGOUT_USER':
        localStorage.clear()
        break;
      case 'RENDER_CATEGORIES':
        fetch(`http://localhost:3001/api/v1/categories?language=${newState.selectedLanguage}`,{
          method: 'GET',
          headers:{
            'Content-Type': 'application/json'
          }})
          .then(resp => resp.json())
          .then(payload => store.dispatch({ type: 'DISPLAY_CATEGORIES', payload: payload}))
      break;
      case 'DISPLAY_CATEGORIES':
        newState.categories = action.payload
      break;
      case 'FETCH_SELECTED_CATEGORY_RESOURCES':
      fetch(`http://localhost:3001/api/v1/categories/${action.id}?language=${newState.selectedLanguage}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }})
        .then(resp => resp.json())
        .then(payload => store.dispatch({type: 'SAVE_SELECTED_CATEGORY', payload: payload}))
        break;
        case 'SAVE_SELECTED_CATEGORY':
        newState.selectedCategory = action.payload
        break;
        case 'FETCH_SELECTED_RESOURCE':
        fetch(`http://localhost:3001/api/v1/resources/${action.id}?language=${newState.selectedLanguage}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.jwt}`
          }})
          .then(resp => resp.json())
          .then(payload => store.dispatch({type: 'SAVE_SELECTED_RESOURCE', payload: payload}))
          break;
          case 'SAVE_SELECTED_RESOURCE':
          action.payload.resource_details_attributes = action.payload.resource_details
          newState.selectedResource = action.payload
          break;
          case 'FETCH_NEW_RESOURCE':
            fetch('http://localhost:3001/api/v1/resources',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
              },
              body: JSON.stringify(newState.newResource)
            })
              .then(resp => resp.json())
              .then(payload => store.dispatch({ type: 'SAVE_SELECTED_RESOURCE', payload: payload}))
            break;
            case 'RENDER_USER_RESOURCE':
              // fetch(`http://localhost:3001/api/v1/users/${}`,{
              //   method: 'GET',
              //   headers:{
              //     'Content-Type': 'application/json'
              //   }})
              //   .then(resp => resp.json())
              //   .then(payload => store.dispatch({ type: 'DISPLAY_USER_RESOURCES', payload: payload}))
            break;
            case 'DISPLAY_USER_RESOURCES':
              newState.resources = action.payload
            break;
          case 'SELECT_RESOURCE':
            action.payload.resource_details_attributes = action.payload.resource_details
            newState.selectedResource = action.payload
          break;
          case 'POPULATE_NEW_RESOURCE':
          var { languageIndex, key, value } = action.payload
            var new_details_attributes = [ ...newState.newResource.resource_details_attributes]
            new_details_attributes[languageIndex][key] = value
            newState.newResource = {
              ...newState.newResource,
              resource_details_attributes: new_details_attributes
            }
            break
          case 'POPULATE_UPDATED_RESOURCE':
            var { languageIndex, key, value } = action.payload
              var new_details_attributes = [ ...newState.selectedResource.resource_details_attributes]
              new_details_attributes[languageIndex][key] = value
              newState.selectedResource = {
                ...newState.selectedResource,
                resource_details_attributes: new_details_attributes
              }
        break;
        case 'TOGGLE_CATEGORY':
          let cat_ids = newState.newResource.category_ids;
          //is it there already?
          cat_ids.includes(action.payload) ?
            //yes, take it out
            newState.newResource.category_ids.splice(cat_ids.indexOf(action.payload), 1)
            :
            newState.newResource.category_ids.push(action.payload)
            //no, add it
            newState.newResource= JSON.parse(JSON.stringify(newState.newResource))
        break;
        case 'FETCH_EDIT_RESOURCE':
        fetch(`http://localhost:3001/api/v1/resources/${action.id}`,{
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.jwt}`

          },
          body: JSON.stringify(newState.selectedResource)
        })
          .then(resp => resp.json())
          .then(payload => store.dispatch({ type: 'SAVE_SELECTED_RESOURCE', payload: payload}))
        break;
        case 'TOGGLE_CATEGORY_IN_EDIT':
          let updated_category_ids =      newState.selectedResource.category_ids;
          //is it there already?
            updated_category_ids.includes(action.payload) ?
            //yes, take it out
            newState.selectedResource.category_ids.splice(updated_category_ids.indexOf(action.payload), 1)
            :
            newState.selectedResource.category_ids.push(action.payload)
            //no, add
            newState.selectedResource= JSON.parse(JSON.stringify(newState.selectedResource))
        break;
        case 'DESTROY_SELECTED_RESOURCE':
        fetch(`http://localhost:3001/api/v1/resources/${action.id}`,{
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.jwt}`
          }
        })
          .then(payload => store.dispatch({
            type: 'REMOVE_SELECTED_RESOURCE',
            id: action.id }))
      break;
      case 'REMOVE_SELECTED_RESOURCE':
        newState.currentUser = {
          ...newState.currentUser,
          resources: newState.currentUser.resources.filter(resource => resource.id != action.id)
        }
      break;



    }
    return newState
}


const store = createStore( reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

if(defaultState.jwt) store.dispatch({type:'FETCH_USER'})

export { store }
