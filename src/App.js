import './App.css';
import { Grid } from "semantic-ui-react";
import NavPanel from "./components/NavPanel/NavPanel";
import SidePanel from "./components/SidePanel/SidePanel";
import Message from "./components/Message/Message";
import MetaPanel from "./components/MetaPanel/MetaPanel"

const App = () => {
  return (
    <Grid columns="equal" className="app" style={{ backgroundColor: "#eee" }}>
      <NavPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Message />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}

export default App;
