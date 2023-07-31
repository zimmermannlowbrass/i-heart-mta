import React from "react";
import { useFormik } from "formik";

function SignUp() {

    const formik = useFormik({
        initialValues: {
          username:"",
          name:"",
          password:""
        },
        onSubmit: (values) => {
            fetch("users", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
                })
                .then(r => r.json())
                .then(user => console.log(user))
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <label htmlFor="name">Name</label>
            <br />
            <input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            />
            <p style={{ color: "red" }}> {formik.errors.name}</p>
            <label htmlFor="username">Username</label>
            <br />
            <input
            id="username"
            username="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            />
            <p style={{ color: "red" }}> {formik.errors.name}</p>

            <label htmlFor="password">Password</label>
            <br />
            <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>

            <button type="submit">Submit</button>
        </form>
        </div>
    )
}

export default SignUp;