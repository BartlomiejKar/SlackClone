import React, { useState } from 'react';
import firebase from "../../Firebase"
import { Link } from 'react-router-dom';
import { Form, Segment, Grid, Button, Header, Message, Icon, GridColumn } from "semantic-ui-react"
import { isFormEmpty, isPasswordValid, saveProfile } from "./ValidationMethod"


const InitialForm = {
    userName: "",
    email: "",
    password: "",
    passwordConfirm: ""
}

const Register = () => {

    const [dataUser, setDataUser] = useState(InitialForm);
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(null);
    const [signIn, setSignIn] = useState(false)


    const handleChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
    }

    const isFormValid = () => {
        let error = []
        if (isFormEmpty(dataUser)) {
            error = "Please fill empty fields"
            setErrors(error)
            return false
        } else if (!isPasswordValid(dataUser)) {
            error = "Password is invalid"
            setErrors(error)
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            setLoading(true)
            firebase.auth()
                .createUserWithEmailAndPassword(dataUser.email, dataUser.password)
                .then(createdUser => {
                    createdUser.user.updateProfile({
                        displayName: dataUser.userName
                    })
                    console.log(createdUser)
                    setSignIn("User Register, please Log in");
                    setDataUser(InitialForm)
                    setLoading(false)
                    saveProfile(createdUser)
                })
                .catch(err => {
                    console.log(err);
                    setErrors(err.message)
                    setLoading(false)
                })
        } else {
            return false
        }

    }
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <GridColumn style={{ maxWidth: 450 }}>
                <Header as="h2" icon color="black" textAlign="center">
                    <Icon name="user circle" color="blue" />
                    Register Chat
                </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name="userName"
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            onChange={handleChange}
                            type="text"
                            value={dataUser.userName}
                        />
                        <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email Adress"
                            onChange={handleChange}
                            type="email"
                            value={dataUser.email}
                        />
                        <Form.Input
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="password"
                            onChange={handleChange}
                            type="password"
                            value={dataUser.password}
                        />
                        <Form.Input
                            fluid
                            name="passwordConfirm"
                            icon="repeat"
                            iconPosition="left"
                            placeholder="password"
                            onChange={handleChange}
                            type="password"
                            value={dataUser.passwordConfirm}
                        />
                        <Button className={loading ? "loading" : ""} color="blue" size="large" type="submit" fluid>Submit</Button>
                    </Segment>
                    {errors ? <Message negative>
                        <h3>Error</h3>
                        {errors}
                    </Message> : null}
                    {signIn ? <Message positive>{signIn}</Message> : null}
                </Form>
                <Message>Already a user? <Link to="/login">Log in</Link></Message>
            </GridColumn>
        </Grid >
    )
}

export default Register;