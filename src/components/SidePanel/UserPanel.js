import React from 'react';
import firebase from "firebase/app";
import { Dropdown, Grid, Header, Icon } from "semantic-ui-react"

const dropDownOptions = () => [
    {
        key: "user",
        text: <span>Signed as <strong>USER</strong></span>,
        disabled: true
    },
    {
        key: "Logout",
        text: <span onClick={handleLogout}>Logout</span>
    }
]

const handleLogout = () => {
    firebase.auth().signOut().then(() => {
        console.log("signout")
    })
}

const UserPanel = () => {
    return (
        <Grid>
            <Grid.Column>
                <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
                    <Header inverted floated="left" as="h2">
                        <Icon name="code" />
                        <Header.Content>Chat</Header.Content>
                    </Header>
                </Grid.Row>
                <Header style={{ padding: "0.2em" }} as='h4' inverted>
                    <Dropdown trigger={
                        <span>User</span>
                    } options={dropDownOptions()} />
                </Header>
            </Grid.Column>
        </Grid>
    )
}

export default UserPanel;