
import React, { useEffect } from 'react';
import firebase from "firebase/app"
import { setChannel } from "../actions/index"
import { connect } from "react-redux"
import { useState } from "react";
import { Menu, Icon } from "semantic-ui-react"

const PrivateMessages = (props) => {
    const [users, setUsers] = useState([])
    const usersRef = firebase.database().ref("users");

    useEffect(() => {
        usersRef.on("child_added", snap => {
            setUsers((currentState) => {
                let updatedState = [...currentState]
                let user = snap.val()
                user.id = snap.key
                updatedState.push(user)
                return updatedState
            })
        })

        return () => usersRef.off()
    }, [])


    const displayUsers = () => {
        if (users.length > 0) {
            return users.filter((user) => user.id !== props.currentUser.uid).map((user) => {
                return (
                    < Menu.Item
                        key={user.id}
                        name={user.name}
                        onClick={() => selectUser(user)}
                        active={props.currentChannel && generateMessagesInPrivateChannels(user.id) === props.currentChannel.id}
                    >
                        {"@ " + user.name}
                    </Menu.Item >

                )
            })
        }
    }
    const selectUser = (user) => {
        let userData = { ...user }
        userData.id = generateMessagesInPrivateChannels(user.id)
        props.setChannel(user)
    }

    const generateMessagesInPrivateChannels = (userID) => {
        if (props.currentUser.uid < userID) {
            return props.currentUser.uid + userID
        } else {
            return userID + props.currentUser.uid
        }
    }
    return (
        <Menu.Menu className="menu">
            <Menu.Item>
                <span>
                    <Icon name="mail" />
                    Private Chat ({users.length - 1})
                </span>
                {displayUsers()}
            </Menu.Item>
        </Menu.Menu>
    )
}

const mapStateFromProps = (state) => ({
    currentUser: state.user.currentUser,
    currentChannel: state.channel
})

export default connect(mapStateFromProps, { setChannel })(PrivateMessages);