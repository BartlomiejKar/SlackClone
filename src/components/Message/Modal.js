import React from 'react';
import { Modal, Button, Input, Icon } from "semantic-ui-react"

const ModalFile = ({ closeModal, modal }) => {
    return (
        <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>Select image</Modal.Header>
            <Modal.Content>
                <Input
                    fluid
                    label="types of file: jpg, png"
                    name="file"
                    type="file"
                />
            </Modal.Content>
            <Modal.Actions>
                <Button
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