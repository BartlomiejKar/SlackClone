import React from 'react';
import { Segment, Header, Input, Icon } from "semantic-ui-react"
const MessageHeader = () => {
    return (
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                <span>Channel
                    <Icon name={"star outline"} color="black" />
                </span>
                <Header.Subheader>User</Header.Subheader>
            </Header>
            <Header floated="right">
                <Input
                    size="mini"
                    icon="search"
                    name="search"
                />
            </Header>
        </Segment>
    )
}


export default MessageHeader;