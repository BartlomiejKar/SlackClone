
import React, { useEffect } from 'react';
import firebase from "firebase/app"
import { setChannel } from "../actions/index"
import { connect } from "react-redux"
import { useState } from "react";
import { Menu, Icon } from "semantic-ui-react"

const PrivateMessages = (props) => {
    const [users, setUsers] = useState([])

    const [statusUser, setStatusUser] = useState([]);

    const usersRef = firebase.database().ref("users");

    const connectedUserRef = firebase.database().ref(".info/connected");
    const statusUserRef = firebase.database().ref("status")

    useEffect(() => {
        usersRef.on("child_added", snap => {
            setUsers((currentState) => {
                let updatedState = [...currentState]
                let user = snap.val()
                user.id = snap.key
                user.isPrivate = true
                updatedState.push(user)
                return updatedState
            })
        })

        connectedUserRef.on("value", (snap) => {
            if (props.currentUser && snap.val()) {
                const userStatus = statusUserRef.child(props.currentUser.uid)
                userStatus.set(true)
                userStatus.onDisconnect().remove()
            }
        })
        return () => { usersRef.off(); connectedUserRef.off() }
    }, [props.currentUser])

    useEffect(() => {
        statusUserRef.on("child_added", snap => {
            setStatusUser((currentState) => {
                let updatedStatus = [...currentState]
                updatedStatus.push(snap.key)
                return updatedStatus
            })
        })

        statusUserRef.on("child_removed", snap => {
            setStatusUser(currentState => {
                let updatedStatus = [...currentState]
                const index = updatedStatus.indexOf(snap.key)
                updatedStatus.splice(index, 1)
                return updatedStatus
            })
        })

        return () => statusUserRef.off()
    }, [users])


    const displayUsers = () => {
        if (users.length > 0) {
            return users.filter((user) => user.id !== props.currentUser.uid).map((user) => {
                return (
                    < Menu.Item
                        key={user.id}
                        name={user.name}
                        onClick={() => selectUser(user, user.isPrivate)}
                        active={props.currentChannel && generateMessagesInPrivateChannels(user.id) === props.currentChannel.currentChannel.id}
                    >
                        {"@ " + user.name}
                        <Icon name="circle" color={`${statusUser.indexOf(user.id) !== -1 ? "green" : "red"}`} />
                    </Menu.Item >

                )
            })
        }
    }
    const selectUser = (user, isprivate) => {
        let userData = { ...user }
        userData.id = generateMessagesInPrivateChannels(user.id)
        props.setChannel(userData, isprivate)
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
    currentChannel: state.channel,
})

export default connect(mapStateFromProps, { setChannel })(PrivateMessages);