import React, { Component } from "react";
import moment from "moment";
// import injectTapEventPlugin from "react-tap-event-plugin";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import Dialog from "material-ui/Dialog";
import Divider from "material-ui/Divider";
import MenuItem from "material-ui/MenuItem";
import Card from "material-ui/Card";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import SnackBar from "material-ui/Snackbar";
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
  StepButton
} from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
// injectTapEventPlugin();
class App extends Component {
  constructor() {
    super();
    this.state = {
      //init state
      loading: true,
      navOpen: false,
      confirmationModalOpen: false,
      confirmationTextVisible: false,
      stepIndex: 0,
      appointmentDateSelected: false,
      appointmentMeridiem: 0,
      validEmail: false,
      validPhone: false,
      smallScreen: window.innerWidth < 768,
      confirmationSnackbarOpen: false
    };
    //method bindings
    this.handleNavToggle = this.handleNavToggle.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handleSetAppointmentDate = this.handleSetAppointmentDate.bind(this);
    this.handleSetAppointmentSlot = this.handleSetAppointmentSlot.bind(this);
    this.handleSetAppointmentMeridiem = this.handleSetAppointmentMeridiem.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.checkDisableDate = this.checkDisableDate.bind(this);
    this.renderAppointmentTimes = this.renderAppointmentTimes.bind(this);
    this.renderConfirmationString = this.renderConfirmationString.bind(this);
    this.renderAppointmentConfirmation = this.renderAppointmentConfirmation.bind(
      this
    );
    this.resize = this.resize.bind(this);
  }
  handleNavToggle() {}

  handleNextStep() {}

  handleSetAppointmentDate(date) {}

  handleSetAppointmentSlot(slot) {}

  handleSetAppointmentMeridiem(meridiem) {}

  handleFetch(response) {}

  handleFetchError(err) {}

  handleSubmit() {}

  validateEmail(email) {}

  validatePhone(phoneNumber) {}

  checkDisableDate(date) {}

  renderConfirmationString() {}

  renderAppointmentTimes() {}

  renderAppointmentConfirmation() {}

  resize() {}
  componentWillMount() {}
  componentWillUnmount() {}
  render() {
    const {
      stepIndex,
      loading,
      navOpen,
      smallScreen,
      confirmationModalOpen,
      confirmationSnackbarOpen,
      ...data
    } = this.state;
    const contactFormFilled =
      data.firstName &&
      data.lastName &&
      data.phone &&
      data.email &&
      data.validPhone &&
      data.validEmail;
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={() => this.setState({ confirmationModalOpen: false })}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        onClick={() => this.handleSubmit()}
      />
    ];
    return (
      <div>
        <AppBar
          title={data.siteTitle}
          onLeftIconButtonTouchTap={() => this.handleNavToggle()}
        />
        <Drawer
          docked={false}
          width={300}
          open={navOpen}
          onRequestChange={navOpen => this.setState({ navOpen })}
        >
          <img
            src="https://placeholder.pics/svg/300"
            style={{
              height: 70,
              marginTop: 50,
              marginBottom: 30,
              marginLeft: "50%",
              transform: "translateX(-50%)"
            }}
          />
          <a style={{ textDecoration: "none" }} href={this.state.homePageUrl}>
            <MenuItem>Home</MenuItem>
          </a>
          <a style={{ textDecoration: "none" }} href={this.state.aboutPageUrl}>
            <MenuItem>About</MenuItem>
          </a>
          <a
            style={{ textDecoration: "none" }}
            href={this.state.contactPageUrl}
          >
            <MenuItem>Contact</MenuItem>
          </a>

          <MenuItem
            disabled={true}
            style={{
              marginLeft: "50%",
              transform: "translate(-50%)"
            }}
          >
            {"© Copyright " + moment().format("YYYY")}
          </MenuItem>
        </Drawer>
        <section
          style={{
            maxWidth: !smallScreen ? "80%" : "100%",
            margin: "auto",
            marginTop: !smallScreen ? 20 : 0
          }}
        >
          {this.renderConfirmationString()}
          <Card
            style={{
              padding: "10px 10px 25px 10px",
              height: smallScreen ? "100vh" : null
            }}
          >
            <Stepper
              activeStep={stepIndex}
              linear={false}
              orientation="vertical"
            >
              <Step disabled={loading}>
                <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                  Choose an available day for your appointment
                </StepButton>
                <StepContent>
                  <DatePicker
                    style={{
                      marginTop: 10,
                      marginLeft: 10
                    }}
                    value={data.appointmentDate}
                    hintText="Select a date"
                    mode={smallScreen ? "portrait" : "landscape"}
                    onChange={(n, date) => this.handleSetAppointmentDate(date)}
                    shouldDisableDate={day => this.checkDisableDate(day)}
                  />
                </StepContent>
              </Step>
              <Step disabled={!data.appointmentDate}>
                <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
                  Choose an available time for your appointment
                </StepButton>
                <StepContent>
                  <SelectField
                    floatingLabelText="AM or PM"
                    value={data.appointmentMeridiem}
                    onChange={(evt, key, payload) =>
                      this.handleSetAppointmentMeridiem(payload)
                    }
                    selectionRenderer={value => (value ? "PM" : "AM")}
                  >
                    <MenuItem value={0}>AM</MenuItem>
                    <MenuItem value={1}>PM</MenuItem>
                  </SelectField>
                  <RadioButtonGroup
                    style={{ marginTop: 15, marginLeft: 15 }}
                    name="appointmentTimes"
                    defaultSelected={data.appointmentSlot}
                    onChange={(evt, val) => this.handleSetAppointmentSlot(val)}
                  >
                    {this.renderAppointmentTimes()}
                  </RadioButtonGroup>
                </StepContent>
              </Step>
              <Step disabled={!Number.isInteger(this.state.appointmentSlot)}>
                <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
                  Share your contact information with us and we'll send you a
                  reminder
                </StepButton>
                <StepContent>
                  <section>
                    <TextField
                      style={{ display: "block" }}
                      name="first_name"
                      hintText="First Name"
                      floatingLabelText="First Name"
                      onChange={(evt, newValue) =>
                        this.setState({ firstName: newValue })
                      }
                    />
                    <TextField
                      style={{ display: "block" }}
                      name="last_name"
                      hintText="Last Name"
                      floatingLabelText="Last Name"
                      onChange={(evt, newValue) =>
                        this.setState({ lastName: newValue })
                      }
                    />
                    <TextField
                      style={{ display: "block" }}
                      name="email"
                      hintText="name@mail.com"
                      floatingLabelText="Email"
                      errorText={
                        data.validEmail ? null : "Enter a valid email address"
                      }
                      onChange={(evt, newValue) => this.validateEmail(newValue)}
                    />
                    <TextField
                      style={{ display: "block" }}
                      name="phone"
                      hintText="(888) 888-8888"
                      floatingLabelText="Phone"
                      errorText={
                        data.validPhone ? null : "Enter a valid phone number"
                      }
                      onChange={(evt, newValue) => this.validatePhone(newValue)}
                    />
                    <RaisedButton
                      style={{ display: "block" }}
                      label={
                        contactFormFilled
                          ? "Schedule"
                          : "Fill out your information to schedule"
                      }
                      labelPosition="before"
                      primary={true}
                      fullWidth={true}
                      onClick={() =>
                        this.setState({
                          confirmationModalOpen: !this.state
                            .confirmationModalOpen
                        })
                      }
                      disabled={!contactFormFilled || data.processed}
                      style={{ marginTop: 20, maxWidth: 100 }}
                    />
                  </section>
                </StepContent>
              </Step>
            </Stepper>
          </Card>
          <Dialog
            modal={true}
            open={confirmationModalOpen}
            actions={modalActions}
            title="Confirm your appointment"
          >
            {this.renderAppointmentConfirmation()}
          </Dialog>
          <SnackBar
            open={confirmationSnackbarOpen || loading}
            message={
              loading ? "Loading... " : data.confirmationSnackbarMessage || ""
            }
            autoHideDuration={10000}
            onRequestClose={() =>
              this.setState({ confirmationSnackbarOpen: false })
            }
          />
        </section>
      </div>
    );
  }
}

export default App;
