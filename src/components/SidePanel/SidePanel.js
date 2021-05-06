import React from 'react';
import { connect } from "react-redux"
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import StarredChannel from "./StarredChannel"
import PrivateMessages from '../../PrivateMessages/PrivateMessages';
const SidePanel = ({ currentUser }) => {
    // console.log(currentUser.uid)
    return (
        <Menu
            size="large"
            inverted
            fixed="left"
            vertical
            style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
        >
            <UserPanel />
            <StarredChannel
                users={currentUser}
            />
            <Channels />
            <PrivateMessages
            />
        </Menu>
    )
}

const mapStateFromProps = (state) => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateFromProps)(SidePanel)