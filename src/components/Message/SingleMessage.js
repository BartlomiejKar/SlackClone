import React from 'react';
import moment from "moment"
import { Comment } from "semantic-ui-react"

const SingleMessage = ({ message, user }) => {
    const time = message.time

    const isOwnMessage = (user, message) => {
        return user.uid === message.user.id ? "message_self" : "";
    }
    const timeFromNow = time => moment(time).fromNow()

    return (
        <Comment>
            <Comment.Content className={isOwnMessage(user, message)}>
                <Comment.Author as="a">{message.user.name}</Comment.Author>
                <Comment.Metadata>{timeFromNow(time)}</Comment.Metadata>
                <Comment.Text>{message.content}</Comment.Text>
            </Comment.Content>
        </Comment>
    )
}

export default SingleMessage;