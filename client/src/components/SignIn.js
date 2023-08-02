import React from "react";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import '../stylesheets/signin.css'

import { UserContext } from "../context/user";

function SignIn() {

  const {setUser} = useContext(UserContext)
  const history = useHistory()
  const [showPasword, setShowPassword] = useState(false)
  const [signInAlert, setSignInAlert] = useState('')
  const formik = useFormik({
      initialValues: {
        username:"",
        password:""
      },
      onSubmit: (values) => {
          fetch("/logins", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
            .then((r) => {
              if (r.ok) {
                r.json().then((user) => {
                  console.log(user)
                  setUser(user)
                  history.push('/')
                })
              } else {
                r.json().then(err => setSignInAlert(err['error']))
              }
            })
      }
  })

  return (
      <div className="signin-form">
          <form onSubmit={formik.handleSubmit}>
            <label className="textBox" htmlFor="Username">Username: </label>
            <input
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            />
            <br />
            <br />
            <label className="textBox" htmlFor="password">Password: </label>
            <input
            type={showPasword ? null : "password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            />
            <button type="button" onClick={() =>setShowPassword(!showPasword)}>
                {showPasword ? "hide" : "show"}
            </button>
            <br />
            <button style={{alignItems: 'center'}} type="submit">Sign In</button>
          </form>
          {signInAlert}
      </div>
  )
}

export default SignIn;

