import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import { connect } from 'react-redux';
import { Segment, Comment } from "semantic-ui-react";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm"
import SingleMessage from "./SingleMessage";
import { setUserPosts } from "../../actions/index"





const Message = ({ currentChannel, currentUser, setUserPosts }) => {
    const messageRef = firebase.database().ref("messages");
    const usersRef = firebase.database().ref("users")

    const [messages, setMessages] = useState([])

    const [usersCount, setUsersCount] = useState(null)
    const [searchMessages, setSearchMessages] = useState("")
    const [isStarredChannel, setIsStarredChannel] = useState(false)


    useEffect(() => {
        if (currentChannel) {
            setMessages([])
            messageRef.child(currentChannel.id).on("child_added", snap => {
                setMessages((currentState) => {
                    let updateMessages = [...currentState];
                    updateMessages.push(snap.val())
                    countUsers(updateMessages)
                    countPosterByUser(updateMessages)
                    return updateMessages
                })
            })


            addStarToChannel(currentChannel.id, currentUser.uid)
            return () => messageRef.child(currentChannel.id).off();
        }
    }, [currentChannel])


    const addFavoriteChannel = () => {

        setIsStarredChannel(prevState => !prevState)
        if (!isStarredChannel) {
            usersRef.child(`${currentUser.uid}/starred`)
                .update({
                    [currentChannel.id]: {
                        name: currentChannel.name,
                        details: currentChannel.details,
                        createdBy: {
                            name: currentChannel.createdBy.name
                        }
                    }
                })
        } else {
            usersRef.child(`${currentUser.uid}/starred`)
                .child(currentChannel.id)
                .remove(err => {
                    if (err !== null) {
                        console.log(err)
                    }
                })
        }
    }

    const addStarToChannel = (channellID, userID) => {
        usersRef.child(userID)
            .child("starred")
            .once("value")
            .then(data => {
                if (data.val() !== null) {
                    const channel = Object.keys(data.val());
                    const prevStarred = channel.includes(channellID)
                    setIsStarredChannel(prevStarred)
                }
            })
    }
    const countUsers = (messages) => {
        const users = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name)
            }
            return acc
        }, [])
        const usersCount = users.length > 1 ? `${users.length} users` : `${users.length} user`;
        setUsersCount(usersCount)
    }

    const displayMessages = messages => {
        const displayMessagesAfterSearch = searchMessages ? filterMessagesForUser() : messages
        if (displayMessagesAfterSearch.length > 0) {
            return displayMessagesAfterSearch.map(el => {
                return <SingleMessage
                    key={el.time}
                    message={el}
                    user={currentUser}
                />
            })
        }
    }

    const countPosterByUser = (messages) => {
        if (messages) {
            let usersPosts = messages.reduce((acc, message) => {
                if (message.user.name in acc) {
                    acc[message.user.name].count += 1;
                } else {
                    acc[message.user.name] = {
                        count: 1
                    }
                }
                return acc
            }, {})
            setUserPosts(usersPosts)
        }
    }

    const searchMessagesFormUsers = (e) => {
        setSearchMessages(e.target.value)
    }
    const filterMessagesForUser = () => {
        const regex = new RegExp(searchMessages, "gi")
        const filterMessage = messages.reduce((acc, message) => {
            if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
                acc.push(message)
            }
            return acc
        }, [])
        return filterMessage
    }
    return (
        <>
            <MessageHeader
                users={usersCount}
                channel={currentChannel}
                handleChange={searchMessagesFormUsers}
                addFavoriteChannel={addFavoriteChannel}
                isStarredChannel={isStarredChannel}
            />
            <Segment>
                <Comment.Group className="messages">
                    {displayMessages(messages)}
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

const mapStateFromProps = (state) => {
    return {
        currentChannel: state.channel.currentChannel,
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateFromProps, { setUserPosts })(Message)