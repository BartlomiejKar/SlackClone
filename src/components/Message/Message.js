import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import { Segment, Comment } from "semantic-ui-react";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm"
import SingleMessage from "./SingleMessage"
import { connect } from 'react-redux';



const Message = ({ currentChannel, currentUser }) => {
    const messageRef = firebase.database().ref("messages");

    const [messages, setMessages] = useState([])
    const [usersCount, setUsersCount] = useState(null)
    const [searchMessages, setSearchMessages] = useState("")

    useEffect(() => {
        if (currentChannel) {
            setMessages([])
            messageRef.child(currentChannel.id).on("child_added", snap => {
                setMessages((currentState) => {
                    let updateMessages = [...currentState];
                    updateMessages.push(snap.val())
                    countUsers(updateMessages)
                    return updateMessages
                })
            })

            return () => messageRef.child(currentChannel.id).off();
        }
    }, [currentChannel])

    const countUsers = (messages) => {
        const users = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name)
            }
            return acc
        }, [])
        const usersCount = users.length > 1 ? `${users.length} users` : `${users.length} user`;
        setUsersCount(usersCount)
    }

    const displayMessages = messages => {
        const displayMessagesAfterSearch = searchMessages ? filterMessagesForUser() : messages
        if (displayMessagesAfterSearch.length > 0) {
            return displayMessagesAfterSearch.map(el => {
                return <SingleMessage
                    key={el.time}
                    message={el}
                    user={currentUser}
                />
            })
        }
    }

    const searchMessagesFormUsers = (e) => {
        setSearchMessages(e.target.value)
    }
    const filterMessagesForUser = () => {
        const regex = new RegExp(searchMessages, "gi")
        const filterMessage = messages.reduce((acc, message) => {
            if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
                acc.push(message)
            }
            return acc
        }, [])
        return filterMessage
    }
    return (
        <>
            <MessageHeader
                users={usersCount}
                channel={currentChannel}
                handleChange={searchMessagesFormUsers}
            />
            <Segment>
                <Comment.Group className="messages">
                    {displayMessages(messages)}
                </Comment.Group>
            </Segment>
            <MessageForm
                key={currentChannel && currentChannel.id}
                messagesRef={messageRef}
                currentChannel={currentChannel}
                currentUser={currentUser}
            />
        </>
    )
}

const mapStateFromProps = (state) => {
    return {
        currentChannel: state.channel.currentChannel,
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateFromProps)(Message)