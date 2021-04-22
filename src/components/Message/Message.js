import React from 'react';
import firebase from "firebase/app"
import { Segment, Comment } from "semantic-ui-react";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm"
import { connect } from 'react-redux';



const Message = ({ currentChannel, currentUser }) => {
    const messageRef = firebase.database().ref("messages")
    return (
        <>
            <MessageHeader />
            <Segment>
                <Comment.Group className="messages">

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

const mapStateFromProps = (state) => ({
    currentChannel: state.channel.currentChannel,
    currentUser: state.user.currentUser
})
export default connect(mapStateFromProps)(Message)