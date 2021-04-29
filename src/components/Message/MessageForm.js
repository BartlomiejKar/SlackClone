import React, { useState } from 'react';
import firebase from "firebase/app"
import { v4 as uuidv4 } from 'uuid';
import { Segment, Button, Input } from "semantic-ui-react"
import ModalFile from "./Modal"





const MessageForm = ({ messagesRef, currentChannel, currentUser }) => {
    const storageRef = firebase.storage().ref();
    const [messages, setMessages] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false)
    // console.log(currentChannel)
    // console.log(currentUser.displayName)
    // console.log(messages)

    const uploadFile = (file, fileType) => {
        const filePath = `chat/images/${uuidv4()}.jpeg`

        storageRef.child(filePath).put(file, { contentType: fileType })
            .then((data) => data.ref.getDownloadURL())
            .then((url) => sendMessage(url))
            .catch(err => console.log(err))
    }


    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    const onHandleChange = (e) => {
        setMessages([e.target.name] = e.target.value)
    }

    const createMessage = (url) => {
        const message = {
            content: messages,
            user: {
                id: currentUser.uid,
                name: currentUser.displayName
            },
            image: url || "",
            time: firebase.database.ServerValue.TIMESTAMP,
        }

        return message;
    }

    const sendMessage = (url) => {
        if (messages || url) {
            setLoading(true)
            messagesRef.child(currentChannel.id)
                .push()
                .set(createMessage(url))
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
                    onClick={() => sendMessage()}
                    disabled={loading}
                />
                <Button
                    onClick={openModal}
                    color="teal"
                    content="upload Media"
                    labelPosition="right"
                    icon="cloud upload"
                />
                {<ModalFile
                    uploadFile={uploadFile}
                    modal={modal}
                    closeModal={closeModal}
                />}
            </Button.Group>
        </Segment>
    )
}

export default MessageForm;