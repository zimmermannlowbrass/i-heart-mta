import React from "react";
import { useState, useContext } from "react";
import { useFormik } from "formik";

import { UserContext } from "../context/user";

function SignIn() {

    const {setUser} = useContext(UserContext)

    const [showPasword, setShowPassword] = useState(false)
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
                  })
                } else {
                  r.json().then(err => console.log(err['error']))
                }
              })
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
              <label className="textBox" htmlFor="Username">Username</label>
              <input
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              />
              <br />
              <br />
              <label className="textBox" htmlFor="password">Password</label>
              <input
              type={showPasword ? null : "password"}
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              />
              <button type="button" onClick={() =>setShowPassword(!showPasword)}>
                  {showPasword ? "hide password" : "show password"}
              </button>
              <br />
              <br />
              <button type="submit">Sign In</button>
            </form>
            <br />
            <br />
            <h3>Don't have an account yet?</h3>
        </div>
    )
}

export default SignIn;

