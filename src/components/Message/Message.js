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
    useEffect(() => {
        if (currentChannel) {
            setMessages([])
            messageRef.child(currentChannel.id).on("child_added", snap => {
                setMessages((currentState) => {
                    let updateMessages = [...currentState];
                    updateMessages.push(snap.val())
                    return updateMessages
                })
            })

            return () => messageRef.child(currentChannel.id).off();
        }
    }, [currentChannel])


    const displayMessages = messages => (
        messages.length > 0 && messages.map(el => {
            return <SingleMessage
                key={el.time}
                message={el}
                user={currentUser}
            />
        })
    )

    return (
        <>
            <MessageHeader />
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