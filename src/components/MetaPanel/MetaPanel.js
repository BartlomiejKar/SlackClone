import React, { useState } from 'react';
import { Segment, Header, Accordion, Icon, List } from "semantic-ui-react"

const MetaPanel = (props) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const { channel, userPosts } = props;
    // console.log(userPosts)

    const setIndex = (event, propsTitle) => {
        const { index } = propsTitle;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex)
    }
    const displayTopPosters = (userPosts) => {
        if (userPosts) {
            Object.entries(userPosts).sort((a, b) => b[1] - a[1])
                .map(([key, value], index) => {
                    return (

                        < List.Item key={index}>
                            <List.Content>
                                <List.Header as="a">
                                    {key}
                                </List.Header>
                                <List.Description>
                                    {value.count} posts
                                    </List.Description>
                            </List.Content>
                        </List.Item >

                    )
                }
                )
        }
    }
    console.log(displayTopPosters(userPosts))
    return (
        <Segment>
            <Header as="h3" attached="top">
                About Channel
          </Header>
            <Accordion styled attached="true">
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={setIndex}
                >
                    <Icon name="dropdown" />
                    <Icon name="info" />
                    Channel Details
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    {channel ? channel.details : null}
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={setIndex}
                >
                    <Icon name="dropdown" />
                    <Icon name="user circle" />
                    Top Posters
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <List>
                        {channel && userPosts ? displayTopPosters(userPosts) : "No data"}
                    </List>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={setIndex}
                >
                    <Icon name="dropdown" />
                    <Icon name="user circle" />
                    Created By
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    name user: {channel ? channel.createdBy.name : null}
                </Accordion.Content>
            </Accordion>
        </Segment>

    )
}
export default MetaPanel