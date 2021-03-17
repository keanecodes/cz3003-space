import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { contentState } from '../recoil/atoms';
import { formValuesState, userAuth, authorise, resetPassord } from '../recoil/users'

export default function Account({view, history}) {

  const formValues = useRecoilValue(formValuesState)
  const setUserAuth = useSetRecoilState(userAuth)
  const setPageContent = useSetRecoilState(contentState)
  const [error, setErrorUI] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (view == "login" || view == "register") {
        // server call
        console.log(formValues);
        const { data } = await authorise(`/${view}`,formValues) 
        
        // show notification
        // setNotification({
        //   message: data.message,
        //   isVisible: true
        // })
        // redirect
        if (data) {
          // state
          setUserAuth({
            isAuthenticated: true,
            user: data
          })

          // redirect to dashboard
          // history.push(routes.user.dashboard)
          history.push('/game')
          setPageContent('game')
        }
      } else {
        const res = await resetPassord(formValues.email) 
        alert(res.message)
        history.push('/login')
        setPageContent('login')
      }
    } catch (error) {
      // setNotification({
      //   message: error.message,
      //   isVisible: true
      // })
      console.error(error)
      setErrorUI(true)
    }
  };

  return (
    <div className="content account-page" id="login">
      <div className="login-dialog glow-border" role="dialog" data-submit="joinTeam" data-account-error={error}>
        {view == "login" 
          ? <h3 className="dashed">Sign In</h3>
          : view == "register" 
          ? <h3 className="dashed">Create New Account</h3>
          : <h3 className="dashed">Recover Account</h3>
        }
        
        {view == "register" ? <Input label="name" type="text" tips={false}/> : null}
        <Input label="email" type="text" tips={false}/>
        {view != "reset" ? <Input label="password" type="password" tips={false}/> : null}
        
        <input className="glow-border" form="login-form" type="submit" value="Enter"/>
        <form id="login-form" onSubmit={handleSubmit}></form>
      </div>
      
      <div>
        {(view == "register" || view == "reset") ? (<>or <Link to="/login">[Sign In]</Link> &nbsp;</>) : null}
        {(view == "login" || view == "reset") ? (<>or <Link to="/register">[Create New Account]</Link> &nbsp;</>) : null}
        {(view == "login" || view == "register") ? (<>or <Link to="/reset" data-click="recoverTeam">[Recover Account]</Link></>) : null}
      </div>
      <div>temp email: user@mail.com password: password</div>
    </div>
  )
}

const Input = ({label, type, tips}) => {

  const[formValues, setFormValues] = useRecoilState(formValuesState)

  const handleChange = e => setFormValues({...formValues, [`${label}`]: e.target.value} )

  return (
    <label>
      <h4>{label}</h4>
      <input value={formValues[`${label}`]} className="glow-border" type={type} form="login-form" onChange={handleChange}/>
      {tips == true ? <span>If you don't have a team key, you can create a new team.</span> : null}
    </label>
  )
}
