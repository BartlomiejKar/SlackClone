import './App.css';
import { connect } from "react-redux"
import { Grid } from "semantic-ui-react";
// import NavPanel from "./components/NavPanel/NavPanel";
import SidePanel from "./components/SidePanel/SidePanel";
import Message from "./components/Message/Message";
import MetaPanel from "./components/MetaPanel/MetaPanel"

const App = (props) => {
  return (
    <Grid columns="equal" className="app" style={{ backgroundColor: "#eee" }}>
      {/* <NavPanel /> */}
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Message />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel
          key={props.currentChannel && props.currentChannel.id}
          user={props.currentUser}
          channel={props.currentChannel}
          userPosts={props.userPosts}
        />
      </Grid.Column>
    </Grid>
  );
}
const mapStateFromProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  userPosts: state.user.userPosts
})
export default connect(mapStateFromProps,)(App);
