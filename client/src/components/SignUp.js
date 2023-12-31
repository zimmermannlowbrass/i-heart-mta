import React from "react";
import { useState } from "react";
import { useFormik } from "formik";

import * as Yup from 'yup'

import '../stylesheets/signup.css'


function SignUp() {

  const [signedUp, setSignedUp] = useState(false)
  const [passwordAlert, setPasswordAlert] = useState(false)
  const [showPasword, setShowPassword] = useState(false)
  const [showPaswordConfirm, setShowPasswordConfirm] = useState(false)

  const formSchema = Yup.object().shape({
      name: Yup.string().required("Name is required.").max(30),
      username: Yup.string().notOneOf([Yup.ref('name'), null], 'Username should be different than your name.').required("Username is required.").min(6),
      password: Yup.string().required("Password is required.").min(8, "Password is too short - should be 8 chars minimum"),
      borough: Yup.string().required("Borough is required."),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match!").required("Please confirm your password.")
    })

  function passwordHasNumber(password) {
    for (const x of password) {
      if (parseFloat(x)) {
        setPasswordAlert(false)
        return true
      }
    }
    setPasswordAlert(true)
    return false
  }

  const formik = useFormik({
      initialValues: {
        username:"",
        name:"",
        password:"",
        confirmPassword:"",
        borough:"",
        role:""
      },
      validationSchema: formSchema,
      onSubmit: (values) => {
        if (passwordHasNumber(values.password)) {
          fetch("users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
            })
            .then(r => r.json())
            .then(setSignedUp(true))
        }
      }
    })
  if (signedUp) {
    return (
      <h3 className="signedup-success">You have successfully signed up! Go ahead and sign in to get started!</h3>
    )
  }
  return (
    <div>
        <form className="signup-form" onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <br />
          <input
          id="name"
          name="name"
          placeholder="ex.John Doe"
          onChange={formik.handleChange}
          value={formik.values.name}
          />
          <p style={{ color: "red" }}> {formik.errors.name}</p>
          <label htmlFor="borough">Borough of Residency</label>
          <br />
          <input
          type="radio"
          id="Manhattan"
          name="borough"
          onChange={formik.handleChange}
          value='Manhattan'
          />
          Manhattan
          <input
          type="radio"
          id="Brooklyn"
          name="borough"
          onChange={formik.handleChange}
          value='Brooklyn'
          />
          Brooklyn
          <input
          type="radio"
          id="Bronx"
          name="borough"
          onChange={formik.handleChange}
          value='Bronx'
          />
          Bronx
          <input
          type="radio"
          id="Queens"
          name="borough"
          onChange={formik.handleChange}
          value='Queens'
          />
          Queens
          <p style={{ color: "red" }}> {formik.errors.borough}</p>
          <label htmlFor="username">Username</label>
          <br />
          <input
          id="username"
          username="username"
          placeholder="ex. UserName99"
          onChange={formik.handleChange}
          value={formik.values.username}
          />
          <p style={{ color: "red" }}> {formik.errors.username}</p>
          <label htmlFor="role">Occupation</label>
          <br />
          <input
          id="role"
          placeholder="ex. Student"
          username="role"
          onChange={formik.handleChange}
          value={formik.values.role}
          />
          <br />
          <br />
          
          <label htmlFor="password">Password</label>
          <br />
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
          <p style={{ color: "red" }}> {formik.errors.password}</p>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <input
          type={showPaswordConfirm ? null : "password"}
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          />
          <button type="button" onClick={() =>setShowPasswordConfirm(!showPaswordConfirm)}>
              {showPaswordConfirm ? "hide" : "show"}
          </button>
          <p style={{ color: "red" }}> {formik.errors.confirmPassword}</p>
          <button type="submit">Submit</button>
      </form>
      <br />
      <br />
      {passwordAlert && <h4 style={{color: 'red'}}>PASSWORD INSUFFICIENT</h4>}
      <h4>Passwords must be at least 8 characters and contain one number</h4>
    </div>
  )
}

export default SignUp;