import React from 'react';
import { Segment, Comment } from "semantic-ui-react";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm"

const Message = () => {
    return (
        <>
            <MessageHeader />
            <Segment>
                <Comment.Group className="messages">

                </Comment.Group>
            </Segment>
            <MessageForm />
        </>
    )
}

export default Message