import React from 'react';
import { Segment, Header, Input, Icon } from "semantic-ui-react"
const MessageHeader = (props) => {
    const channel = props.channel ? props.channel.name : ""
    return (
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                <span>
                    {channel}
                    <Icon name={"star outline"} color="black" />
                </span>
                <Header.Subheader>{props.users}</Header.Subheader>
            </Header>
            <Header floated="right">
                <Input
                    onChange={props.handleChange}
                    size="mini"
                    icon="search"
                    name="search"
                    placeholder="search messages"
                />
            </Header>
        </Segment>
    )
}


export default MessageHeader;