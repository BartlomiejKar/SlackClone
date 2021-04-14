import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import { connect } from "react-redux"
import { setChannel } from "../../actions/index"
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';


const initialForm = {
    nameChannel: "",
    detailsChannel: "",
}

const Channels = ({ currentUser, setChannel }) => {
    const [channels, setChannels] = useState([]);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(initialForm);
    const channelsRef = firebase.database().ref("channels")

    useEffect(() => {
        let loadChannels = []
        channelsRef.on("child_added", snap => {
            loadChannels.push(snap.val())
            setChannels(loadChannels)
        })
    }, [])

    const changeChannel = channel => {
        setChannel(channel)
    }

    const displayChannels = (channels) => (
        channels.length > 0 && channels.map(channel => {
            return (
                <Menu.Item
                    key={channel.id}
                    onClick={() => changeChannel(channel)}
                    name={channel.name}
                    style={{ opacity: 0.7 }}
                >
                    # {channel.name}
                </Menu.Item>
            )
        })
    )

    const addChannel = ({ nameChannel, detailsChannel }) => {
        const key = channelsRef.push().key;
        const newChannel = {
            id: key,
            name: nameChannel,
            details: detailsChannel,
            createdBy: {
                name: currentUser
            }
        }

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                setForm(initialForm);
                closeModal();
                console.log("channel added")
            })
    }

    const closeModal = () => {
        setModal(false)
    }
    const openModal = () => {
        setModal(true)
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validForm = ({ nameChannel, detailsChannel }) => {
        console.log(nameChannel)
        if (nameChannel && detailsChannel) {
            return true
        } else {
            console.log("please fill fields")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validForm(form)) {
            console.log("add channels")
            addChannel(form)
        } else {

        }
        setForm(initialForm)
    }
    return (
        <>
            <Menu.Menu style={{ paddingBottom: "2em" }}>
                <Menu.Item>
                    <span>
                        <Icon name="exchange" />
                CHANNELS
                ({channels.length}) <Icon name="add" onClick={openModal} style={{ cursor: "pointer" }} />
                    </span>
                </Menu.Item>
            </Menu.Menu>
            {displayChannels(channels, changeChannel)}
            <Modal basic open={modal} onClose={closeModal}>
                <Modal.Header>Add channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <Input
                                fluid
                                label="Name Channel"
                                name="nameChannel"
                                onChange={handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                fluid
                                label="Details Channel"
                                name="detailsChannel"
                                onChange={handleChange}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted onClick={handleSubmit}>
                        <Icon name="checkmark" />
                        ADD
                    </Button>
                    <Button color="red" inverted onClick={closeModal}>
                        <Icon name="remove" />
                        CANCEL
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}
const mapStateFromProps = (state) => ({
    currentUser: state.user.currentUser.displayName,
    currentChannel: state.channel
})
export default connect(mapStateFromProps, { setChannel })(Channels);