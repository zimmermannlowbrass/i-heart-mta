import React, { useState} from "react";
import { useFormik } from "formik";

import * as Yup from 'yup'

import { useContext } from "react";
import { UserContext } from "../../../../context/user";
import "../../../../stylesheets/canedit.css"

function CanEditProfile({ setCanEditProfile }) {

    const {user, setUser} = useContext(UserContext)
    const [submitted, setSubmitted] = useState(false)

    const formSchema = Yup.object().shape({
        name: Yup.string().required("Name is required.").max(30),
        borough: Yup.string().required("Borough is required."),
    })
    const formik = useFormik({
        initialValues: {
          name:"",
          borough:"",
          role:""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(values)
            })
            .then(r => r.json())
            .then(user => setUser(user))
            .then(setSubmitted(true))
        }
    })
    

    return (
        <div>
            {submitted 
            ? 
            <h1 className="addedTripAlert">🥳🎉🎊<br/>Success!<br/>Profile has been edited!!<br/>🥳🎉🎊</h1>
            :
            <form className="can-edit-form" onSubmit={formik.handleSubmit} style={{ margin: "10px" }}>
                <label htmlFor="name">Name</label>
                <br />
                <input
                id="name"
                name="name"
                placeholder="ex.John Doe"
                onChange={formik.handleChange}
                value={formik.values.name}
                />
                <p style={{ color: "red" }}> {formik.errors.name}</p>
                <label htmlFor="borough">Borough</label>
                <br />
                <input
                type="radio"
                id="Manhattan"
                name="borough"
                onChange={formik.handleChange}
                value='Manhattan'
                />
                Manhattan
                <br/>
                <input
                type="radio"
                id="Brooklyn"
                name="borough"
                onChange={formik.handleChange}
                value='Brooklyn'
                />
                Brooklyn
                <br/>
                <input
                type="radio"
                id="Bronx"
                name="borough"
                onChange={formik.handleChange}
                value='Bronx'
                />
                Bronx
                <br/>
                <input
                type="radio"
                id="Queens"
                name="borough"
                onChange={formik.handleChange}
                value='Queens'
                />
                Queens
                <br/>
                <p style={{ color: "red" }}> {formik.errors.borough}</p>
                <label htmlFor="role">Occupation</label>
                <br />
                <input
                id="role"
                placeholder="ex. Student"
                username="role"
                onChange={formik.handleChange}
                value={formik.values.role}
                />
                <button type="submit">Submit</button>
            </form>
            }
        </div>
    )
}

export default CanEditProfile