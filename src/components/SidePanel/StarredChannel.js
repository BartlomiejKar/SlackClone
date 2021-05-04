
import React, { useEffect, useState } from 'react';
import firebase from "firebase/app"
import { connect } from "react-redux";
import { setChannel } from "../../actions/index"
import { Menu, Icon } from "semantic-ui-react"

const StarredChannel = (props) => {

    const usersRef = firebase.database().ref("users")

    const [starredChannel, setStarredChannel] = useState([])
    useEffect(() => {
        if (props.users) {

            usersRef.child(props.users.uid)
                .child("starred")
                .on("child_added", snap => {
                    const starredChannelAfterLoading = {
                        id: snap.key,
                        ...snap.val()
                    }
                    setStarredChannel(currentState => {
                        let updatedChannels = [...currentState]
                        updatedChannels.push(starredChannelAfterLoading)
                        return updatedChannels
                    })
                })

            usersRef.child(props.users.uid)
                .child("starred")
                .on("child_removed", snap => {
                    const channelToremove = {
                        id: snap.key,
                        ...snap.val()
                    }
                    setStarredChannel(currentState => {
                        let updated = [...currentState]
                        const filtered = updated.filter(channel => {
                            return channel.id !== channelToremove.id
                        })
                        updated.splice(filtered, 1)
                        return updated
                    })
                })
        }

        return () => usersRef.off()
    }, [])

    const changeChannel = channel => {
        setChannel(channel);
    }
    const displayChannels = (starredChannel) => (
        starredChannel.length > 0 && starredChannel.map(channel => {
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

    return (
        <Menu.Menu className="menu">
            <Menu.Item>
                <span>
                    <Icon name="star" />
              Starred Channel
              </span>
                ({starredChannel.length})
            </Menu.Item>
            {displayChannels(starredChannel)}
        </Menu.Menu>
    )
}



export default connect(null, { setChannel })(StarredChannel);