import React, { useState } from 'react';
import firebase from "../../Firebase"
import { Link } from 'react-router-dom';
import { Form, Segment, Grid, Button, Header, Message, Icon, GridColumn } from "semantic-ui-react"



const InitialForm = {
    email: "",
    password: "",
}

const Login = () => {

    const [dataUser, setDataUser] = useState(InitialForm);
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(null);

    const handleChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
    }

    const validationForm = (email, password) => {
        return email && password
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validationForm(dataUser.email, dataUser.password)) {
            setLoading(true)
            firebase.auth()
                .signInWithEmailAndPassword(dataUser.email, dataUser.password)
                .then(() => {
                    setLoading(false)
                }).catch(err => {
                    console.log(err)
                    setErrors(err.message)
                    setLoading(false)
                })
        }

    }
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <GridColumn style={{ maxWidth: 450 }}>
                <Header as="h2" icon color="black" textAlign="center">
                    <Icon name="user circle" color="violet" />
                   Login Chat
                </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
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
                        <Button className={loading ? "loading" : ""} color="blue" size="large" type="submit" fluid>Login</Button>
                    </Segment>
                    {errors ? <Message negative>{errors}</Message> : null}
                </Form>
                <Message>Don't have an account?<Link to="/register">Register</Link></Message>
            </GridColumn>
        </Grid >
    )
}

export default Login;