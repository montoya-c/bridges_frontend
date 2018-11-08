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
    jwt: localStorage.jwt || false,
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
    selectedResource: {},
    newResource: {},
    selectedLanguage: 'English',
    categories: []
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
      case 'ATTEMPT_TO_LOGIN_USER':
        fetch('https://localhost:3001/api/v1/login',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newState.currentUser)
        })
          .then(resp => resp.json)
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


    }
    return newState
}


const store = createStore( reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export { store }
