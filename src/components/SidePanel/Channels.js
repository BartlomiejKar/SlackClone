import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import { connect } from "react-redux"
import { setChannel } from "../../actions/index"
import { Menu, Icon, Modal, Form, Input, Button, Label } from "semantic-ui-react"


const initialForm = {
    nameChannel: "",
    detailsChannel: "",
}

const Channels = ({ currentUser, setChannel }) => {
    const [channels, setChannels] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [channelNotification, setChannelNotification] = useState(null)
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(initialForm);
    const channelsRef = firebase.database().ref("channels");
    const messagesRef = firebase.database().ref("messages")
    const [isActive, setIsActive] = useState("");
    useEffect(() => {
        let loadChannels = []
        channelsRef.on("child_added", snap => {
            loadChannels.push(snap.val())
            setChannels(loadChannels);
            setChannel(loadChannels[0]);
            setActiveChannel(loadChannels[0]);
            setChannelNotification(loadChannels[0])
            addNotificationForChannel(snap.key)
        })
        return () => {
            channelsRef.off()
        }
    }, [setChannel])

    const addNotificationForChannel = (snapKey) => {
        messagesRef.child(snapKey).on("value", snap => {
            if (channelNotification) {
                handleNotification(snapKey, channelNotification.id, notifications, snap)
            }
        })
    }

    const handleNotification = (channelId, currentChannelId, notification, snap) => {
        let total = 0;

        let index = notification.findIndex(notification => notification.id === channelId)

        if (index !== -1) {
            if (channelId !== currentChannelId) {
                total = notification[index].total
                if (snap.numChildren() - total > 0) {
                    notification[index].lastNumber = snap.numChildren()
                }

            }
        } else {
            setNotifications({
                id: channelId,
                total: snap.numChildren(),
                lastNumber: snap.numChildren(),
                count: 0
            })
        }

        setNotifications(notification)
    }
    const changeChannel = channel => {
        setActiveChannel(channel);
        clearNotifications()
        setChannel(channel);
        setChannelNotification(channel)
    }

    const clearNotifications = () => {
        let index = notifications.findIndex(notification => notification.id === channelNotification.id);
        if (index !== -1) {
            let updatedNotification = [...notifications];
            updatedNotification[index].total = notifications[index].lastNumber;
            updatedNotification[index].count = 0
            setNotifications(updatedNotification)
        }
    }

    const setActiveChannel = (channel) => {
        setIsActive(channel.id)
    }

    const getNotificationCount = (channel) => {
        let number = 0;

        notifications.forEach(notification => {
            if (notification.id === channel.id) {
                number = notification.count
            }
        })

        if (number > 0) return number
    }
    const displayChannels = (channels) => (
        channels.length > 0 && channels.map(channel => {
            return (
                <Menu.Item
                    key={channel.id}
                    onClick={() => changeChannel(channel)}
                    name={channel.name}
                    style={{ opacity: 0.7 }}
                    active={channel.id === isActive}
                >
                    {getNotificationCount(channel) && <Label color="red">{getNotificationCount(channel)}</Label>}
                    # {channel.name}
                </Menu.Item>
            )
        })
    )

    const addChannel = ({ nameChannel, detailsChannel }) => {
        const key = channelsRef.push().key;
        const newChannel = {
            id: key,
            isPrivate: false,
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
            <Menu.Menu className="menu">
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