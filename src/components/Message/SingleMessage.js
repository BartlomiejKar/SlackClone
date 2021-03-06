import React from 'react';
import moment from "moment"
import { Comment, Image } from "semantic-ui-react"

const SingleMessage = ({ message, user }) => {
    const time = message.time
    // console.log(message.image)
    const isOwnMessage = (user, message) => {
        return user.uid === message.user.id ? "message_self" : "";
    }
    const timeFromNow = time => moment(time).fromNow()

    const isImage = () => {
        return message.image ? <Image src={message.image} className="message__image" /> : null
    }

    return (
        <Comment>
            <Comment.Content className={isOwnMessage(user, message)}>
                <Comment.Author as="a">{message.user.name}</Comment.Author>
                <Comment.Metadata>{timeFromNow(time)}</Comment.Metadata>
                {/* {message.image ? <Image url={message.image} className="message__image" /> : null} */}
                {isImage()}
                <Comment.Text>{message.content}</Comment.Text>
            </Comment.Content>
        </Comment>
    )
}

export default SingleMessage;