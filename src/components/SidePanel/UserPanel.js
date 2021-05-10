import React from 'react';
import firebase from "firebase/app";
import { connect } from "react-redux"
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
    firebase.auth().signOut()
}
const UserPanel = ({ currentUser }) => {

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
                        <span>{currentUser}</span>
                    } options={dropDownOptions()} />
                </Header>
            </Grid.Column>
        </Grid>
    )
}

const mapStateFromProps = (state) => ({
    currentUser: state.user.currentUser.displayName
})
export default connect(mapStateFromProps)(UserPanel);