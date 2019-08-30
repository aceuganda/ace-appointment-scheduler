import React, { Component } from "react";
import AppointmentApp from "./components/AppointmentApp.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { getMuiTheme } from "material-ui/styles";
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#d32f2f",
    primary2Color: "#f44336"
  }
});
class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppointmentApp />
        </MuiThemeProvider>
      </div>
    );
  }
}
export default App;
