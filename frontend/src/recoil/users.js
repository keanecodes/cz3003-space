import { atom } from 'recoil'
import axios from 'axios'
import jwtDecode from "jwt-decode";

export const formValuesState = atom({
  key: 'formValuesState',
  default: {
    name: "",
    email: "",
    password: "",
  }
})

const userAuthDefault = {
  isAuthenticated: false,
  user: null
}

// on page load
// try to get user token and details from localStorage
const token = localStorage.SPACEAuthToken
if (token && token !== 'undefined' && token !== '') {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('SPACEAuthToken');
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/';
  } else {
    try {
      axios.defaults.headers.common['Authorization'] = token;
      const { data } = async () => await getUserData(formValues)
      if (data) {
        userAuthDefault.isAuthenticated = true
        userAuthDefault.user = data
      }
    } catch (error) {
      // setNotification({
      //   message: error.message,
      //   isVisible: true
      // })
      console.error(error)
    }
  }
}

// auth
export const userAuth = atom({
  key: 'userAuth',
  default: userAuthDefault
})


export const authorise = (method, userData) => {
  
  const reqBody = {
    email: userData.email,
    password: userData.password
  }
  if (method == '/register') reqBody.displayName = userData.name 

  return axios
    .post(method, reqBody)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      return getUserData()
    })
    .catch(err => {
      let error = new Error(method + 'failed');
      error.data = {...err.response, message:err.message}
      throw error;
    });
}

// logout remove localStorage
export const logoutUser = () => {
  localStorage.removeItem('SPACEAuthToken');
  delete axios.defaults.headers.common['Authorization'];
  // localStorage.removeItem('user')
}

export const getUserData = () => {
  return axios.get('/user');
}

// login set localStorage
export const setAuthorizationHeader = token => {
  const AuthToken = `Bearer ${token}`;
  localStorage.setItem('SPACEAuthToken', AuthToken)
  axios.defaults.headers.common['Authorization'] = AuthToken;
}

export const resetPassord = email => {
  return axios
    .post('/reset', {email})
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      // message.error(err.response.data.message)
      console.error(err.response.data);
      let error = new Error('Reset failed');
      error.data = err.response.data
      throw error;
    });
}
