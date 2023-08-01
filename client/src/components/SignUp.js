import React from "react";
import { useState } from "react";
import { useFormik } from "formik";

import * as Yup from 'yup'

function SignUp() {

  const [signedUp, setSignedUp] = useState(false)

  const formSchema = Yup.object().shape({
      name: Yup.string().required("Name is required.").max(20),
      username: Yup.string().required("Username is required.").min(6),
      password: Yup.string().required("Password is required.").min(8, "Password is too short - should be 8 chars minimum"),
      borough: Yup.string().required("Borough is required."),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match!").required("Please confirm your password.")
    })

  function passwordHasNumber(password) {
    for (const x of password) {
      if (parseFloat(x)) {
        return true
      }
    }
    alert('Password needs to have a number!')
    return false
  }

  const formik = useFormik({
      initialValues: {
        username:"",
        name:"",
        password:"",
        confirmPassword:"",
        borough:""
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
        <h4>You have successfully signed up! Go ahead and sign in to get started</h4>
      )
    }
    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
              <label htmlFor="name">Full Name</label>
              <br />
              <input
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              />
              <p style={{ color: "red" }}> {formik.errors.name}</p>
              <label htmlFor="borough">Borough of Residency</label>
              <br />
              <input
              type="radio"
              id="borough"
              name="borough"
              onChange={formik.handleChange}
              value='Manhattan'
              />
              Manhattan
              <input
              type="radio"
              id="borough"
              name="borough"
              onChange={formik.handleChange}
              value='Brooklyn'
              />
              Brooklyn
              <input
              type="radio"
              id="borough"
              name="borough"
              onChange={formik.handleChange}
              value='Bronx'
              />
              Bronx
              <input
              type="radio"
              id="borough"
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
              onChange={formik.handleChange}
              value={formik.values.username}
              />
              <p style={{ color: "red" }}> {formik.errors.username}</p>
              <label htmlFor="password">Password</label>
              <br />
              <input
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              />
              <p style={{ color: "red" }}> {formik.errors.password}</p>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <br />
              <input
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              />
              <p style={{ color: "red" }}> {formik.errors.password}</p>
              <button type="submit">Submit</button>
          </form>
        </div>
    )
}

export default SignUp;