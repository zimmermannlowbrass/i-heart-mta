import React from "react";
import { useState } from "react";
import { useFormik } from "formik";

function SignIn() {
    const [showPasword, setShowPassword] = useState(false)
    const formik = useFormik({
        initialValues: {
          username:"",
          password:""
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
              <label className="textBox" htmlFor="Username">Email</label>
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

