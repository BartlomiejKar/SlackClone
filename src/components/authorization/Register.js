import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Segment, Grid, Button, Header, Message, Icon, GridColumn } from "semantic-ui-react"


const Register = () => {

    const handleChange = () => {

    }

    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <GridColumn style={{ maxWidth: 450 }}>
                <Header as="h2" icon color="black" textAlign="center">
                    <Icon name="user circle" color="blue" />
                    Register Chat
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name="userName"
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            onChange={handleChange}
                            type="text"
                        />
                        <Form.Input
                            fluid
                            name="userSurname"
                            icon="user"
                            iconPosition="left"
                            placeholder="UserSurname"
                            onChange={handleChange}
                            type="text"
                        />
                        <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email Adress"
                            onChange={handleChange}
                            type="email"
                        />
                        <Form.Input
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="password"
                            onChange={handleChange}
                            type="password"
                        />
                        <Form.Input
                            fluid
                            name="passwordConfirm"
                            icon="repeat"
                            iconPosition="left"
                            placeholder="password"
                            onChange={handleChange}
                            type="password"
                        />
                        <Button color="blue" size="large" fluid>Submit</Button>
                    </Segment>
                </Form>
                <Message>Already a user? <Link to="/login">Log in</Link></Message>
            </GridColumn>
        </Grid >
    )
}

export default Register;