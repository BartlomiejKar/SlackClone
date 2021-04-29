import React, { useState } from 'react';
import mime from "mime-types";
import { Modal, Button, Input, Icon } from "semantic-ui-react"

const ModalFile = ({ closeModal, modal, uploadFile }) => {
    const [file, setFile] = useState(null)
    const acceptedImages = ["image/jpeg", "image/png"]

    const addFile = (e) => {
        const fileUpload = e.target.files[0];
        setFile(fileUpload);
    }
    const sendFile = () => {
        if (file !== null) {
            if (checkFile(file.name)) {
                const fileType = file.name
                uploadFile(file, fileType)
                closeModal();
                clearFile()
            }
        }
    }

    const checkFile = (file) => acceptedImages.includes(mime.lookup(file))

    const clearFile = () => {
        setFile(null)
    }
    return (
        <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>Select image</Modal.Header>
            <Modal.Content>
                <Input
                    onChange={addFile}
                    fluid
                    label="types of file: jpg, png"
                    name="file"
                    type="file"
                />
            </Modal.Content>
            <Modal.Actions>
                <Button
                    onClick={sendFile}
                    color="green"
                    inverted
                >
                    <Icon name="checkmark" />
                    Send
                </Button>
                <Button
                    color="red"
                    inverted
                    onClick={closeModal}
                >
                    <Icon name="remove" />
              Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}


export default ModalFile