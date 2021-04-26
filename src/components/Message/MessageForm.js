import React, { useState } from 'react';
import firebase from "firebase/app"
import { Segment, Button, Input } from "semantic-ui-react"



const MessageForm = ({ messagesRef, currentChannel, currentUser }) => {
    const [messages, setMessages] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    // console.log(currentChannel)
    // console.log(currentUser.displayName)
    // console.log(messages)

    const onHandleChange = (e) => {
        setMessages([e.target.name] = e.target.value)
    }

    const createMessage = () => {
        const message = {
            content: messages,
            user: {
                id: currentUser.uid,
                name: currentUser.displayName
            },
            time: firebase.database.ServerValue.TIMESTAMP,
        }
        return message;
    }
    const sendMessage = () => {
        if (messages) {
            setLoading(true)
            messagesRef.child(currentChannel.id)
                .push()
                .set(createMessage())
                .then(() => {
                    setLoading(false)
                    setMessages("");
                    setError("")
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err)
                })
        } else {
            setError("Add message")
        }
    }

    return (
        <Segment className="messageForm">
            <Input
                fluid
                value={messages}
                name="message"
                onChange={onHandleChange}
                style={{ marginBottom: "0.7em" }}
                label={<Button icon="add" />}
                labelPosition="left"
                placeholder="Write your message"
                className={error ? "error" : ""}
            />
            <Button.Group icon widths="2">
                <Button
                    color="orange"
                    content="Add reply"
                    labelPosition="left"
                    icon="edit"
                    onClick={sendMessage}
                    disabled={loading}
                />
                <Button
                    color="teal"
                    content="upload Media"
                    labelPosition="right"
                    icon="cloud upload"
                />
            </Button.Group>
        </Segment>
    )
}

export default MessageForm;