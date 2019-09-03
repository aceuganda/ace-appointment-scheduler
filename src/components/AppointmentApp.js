/* eslint-disable */

import React, { Component, useState } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SnackBar from "material-ui/Snackbar";
import Card from "material-ui/Card";
import LinearProgress from "material-ui/LinearProgress";
import FormLabel from "@material-ui/core/FormLabel";
import {
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";

const API_BASE = "http://localhost:8083/";

class AppointmentApp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      firstName: "",
      lastName: "",
      organisation: "",
      email: "",
      startDate: "",
      endDate: "",
      confirmationModalOpen: false,
      appointmentDateSelected: false,
      validEmail: true,
      validPhone: true,
      finished: false,
      smallScreen: window.innerWidth < 768,
      stepIndex: 0,
      startTime: new Date(2019, 12, 16, 8, 0),
      endTime: new Date(2019, 12, 16, 17, 0),
      loading: false,
      purpose: "",
      skillset: "",
      analysis: "",
      number: "",
      description: "",
      recommendation: "",
      vrPurpose: "",
      vrOther: "",
      other: "",
      charge: "",
      agreement: "",
      chargeAmount: ""
    };
  }

  componentDidUpdate() {
    console.log("current state", this.state);
  }

  handleSetPurpose(p) {
    this.setState({ purpose: p });
  }

  handleAgreement(a) {
    this.setState({ agreement: a });
  }
  handleChargeAmount(a) {
    this.setState({ chargeAmount: a });
  }

  handleCharge(c) {
    this.setState({ charge: c });
  }
  handleSetvrPurpose(p) {
    this.setState({ vrPurpose: p });
  }
  handleStartTime(date) {
    this.setState({ startTime: date });
  }
  handleEndTime(date) {
    this.setState({ endTime: date });
  }
  handleSubmit() {
    this.setState({ confirmationModalOpen: false, loading: true });
    let st = moment(this.state.startTime).format("HH:mm:ss a");
    let ed = moment(this.state.endTime).format("HH:mm:ss a");

    let start = moment(st, "HH:mm:ss a");
    let end = moment(ed, "HH:mm:ss a");
    let d = moment.duration(end.diff(start));
    let duration = parseInt(d.asHours());
    const newAppointment = {
      name: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      organisation: this.state.organisation,
      purpose:
        this.state.purpose === "Other" ? this.state.other : this.state.purpose,
      skillset: this.state.skillset,
      analysis: this.state.analysis,
      number: this.state.number,
      description: this.state.description,
      recommendation: this.state.description,
      vrPurpose:
        this.state.vrPurpose === "vrOther"
          ? this.state.vrOther
          : this.state.vrPurpose,
      slot_startDate: moment(this.state.startDate).format("YYYY-DD-MM"),
      slot_endDate: moment(this.state.endDate).format("YYYY-DD-MM"),
      slot_startTime: st,
      slot_endTime: ed,
      slot_days: this.state.endDate.diff(this.state.startDate, "days") + 1,
      slot_hours: duration
    };
    console.log("form", newAppointment);
    // axios
    //   .post(API_BASE + "api/appointmentCreate", newAppointment)
    //   .then(response =>
    //     this.setState({
    //       confirmationSnackbarMessage: "Appointment succesfully added!",
    //       confirmationSnackbarOpen: true,
    //       processed: true,
    //       loading: false
    //     })
    //   )
    //   .catch(err => {
    //     console.log(err);
    //     return this.setState({
    //       confirmationSnackbarMessage: "Appointment failed to save.",
    //       confirmationSnackbarOpen: true,
    //       loading: false
    //     });
    //   });
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 5
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };
  validateEmail(email) {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email)
      ? this.setState({ email: email, validEmail: true })
      : this.setState({ validEmail: false });
  }
  validatePhone(phoneNumber) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(phoneNumber)
      ? this.setState({ phone: phoneNumber, validPhone: true })
      : this.setState({ validPhone: false });
  }

  //end of ...
  renderAppointmentConfirmation() {
    const spanStyle = { color: "#00C853" };
    return (
      <section>
        <p>
          Name:{" "}
          <span style={spanStyle}>
            {this.state.firstName} {this.state.lastName}
          </span>
        </p>
        <p>
          Number: <span style={spanStyle}>{this.state.phone}</span>
        </p>
        <p>
          Email: <span style={spanStyle}>{this.state.email}</span>
        </p>
        <p>
          Appointment Date: From{" "}
          <span style={spanStyle}>
            {moment(this.state.startDate).format("dddd[,] MMMM Do[,] YYYY")}
          </span>{" "}
          to{" "}
          <span style={spanStyle}>
            {moment(this.state.endDate).format("dddd[,] MMMM Do[,] YYYY")}
          </span>{" "}
        </p>
        <p>
          Appointment Time: From{" "}
          <span style={spanStyle}>
            {moment(this.state.startTime).format("HH:mm")}
          </span>{" "}
          to{" "}
          <span style={spanStyle}>
            {moment(this.state.endTime).format("HH:mm")}
          </span>
        </p>
      </section>
    );
  }

  renderChargeInformation() {}
  renderAdditionalInformation() {
    switch (this.state.purpose) {
      case "Computing Core":
        return (
          <div>
            <section>
              <FormLabel component="legend">
                {" "}
                How many people will be attending the meeting?
              </FormLabel>
              <TextField
                style={{ display: "block" }}
                name="number"
                hintText="Number"
                onChange={(evt, newValue) =>
                  this.setState({ number: newValue })
                }
              />
              <FormLabel component="legend">
                {" "}
                What type of Analysis do you expect to do?
              </FormLabel>
              <TextField
                multiLine={true}
                name="analysis"
                hintText="Analysis"
                onChange={(evt, newValue) =>
                  this.setState({ analysis: newValue })
                }
              />
              <FormLabel component="legend">
                {" "}
                Could you provide us with a brief description of the nature of
                data and an estimate of the amount of computing resources you
                expect to use.
              </FormLabel>
              <TextField
                multiLine={true}
                name="description"
                hintText="Description"
                onChange={(evt, newValue) =>
                  this.setState({ description: newValue })
                }
              />
              <FormLabel component="legend">
                {" "}
                Please share with us any additional information/Suggestions that
                may be helpful to us scheduling and prepairing for your visit.
              </FormLabel>
              <TextField
                multiLine={true}
                name="recommendation"
                hintText="Recommendation"
                onChange={(evt, newValue) =>
                  this.setState({ recommendation: newValue })
                }
              />
              <FormLabel component="legend">
                {" "}
                Admission Type: Charge or no Charge
                <small>
                  <br />
                  Please indicate whether or not you should be charged for the
                  service. Please note that priority may be given to chargeable
                  users.
                </small>
              </FormLabel>
              <RadioButtonGroup
                style={{
                  marginTop: 15,
                  marginLeft: 15
                }}
                name="charge"
                onChange={(evt, val) => this.handleCharge(val)}
              >
                <RadioButton
                  label="Yes, I would like to be charged"
                  value="yes"
                  style={{
                    marginBottom: 15
                  }}
                />
                <RadioButton
                  label="Free Admission"
                  value="no"
                  style={{
                    marginBottom: 15
                  }}
                />
              </RadioButtonGroup>

              {this.state.charge === "no" ? (
                <React.Fragment>
                  <FormLabel component="legend">
                    {" "}
                    Free Admission
                    <small>
                      <br />
                      Condition: Kindly note that Free admissions may only apply
                      to a few users and for a limited time only as priority may
                      be given to chargeable users.
                      <br /> I agree
                    </small>
                  </FormLabel>
                  <RadioButtonGroup
                    style={{
                      marginTop: 15,
                      marginLeft: 15
                    }}
                    name="agreement"
                    onChange={(evt, val) => this.handleAgreement(val)}
                  >
                    <RadioButton
                      label="Yes, I agree"
                      value="yes"
                      style={{
                        marginBottom: 15
                      }}
                    />
                    <RadioButton
                      label="No"
                      value="no"
                      style={{
                        marginBottom: 15
                      }}
                    />
                  </RadioButtonGroup>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <FormLabel component="legend">
                    {" "}
                    Cost
                    <small>
                      <br />
                      Note: The charges contained here are negotiable, but will
                      gerally depend on how long you need the facility
                    </small>
                  </FormLabel>
                  <RadioButtonGroup
                    style={{
                      marginTop: 15,
                      marginLeft: 15
                    }}
                    name="chargeAmount"
                    onChange={(evt, val) => this.handleChargeAmount(val)}
                  >
                    <RadioButton
                      label="Per Day = $1"
                      value="Per Day = $1"
                      style={{
                        marginBottom: 15
                      }}
                    />
                    <RadioButton
                      label="Per Week = 2$"
                      value="Per Week = 2$"
                      style={{
                        marginBottom: 15
                      }}
                    />
                  </RadioButtonGroup>
                </React.Fragment>
              )}
            </section>{" "}
            {this.renderStepActions(4)}
          </div>
        );

      case "ACE Tour":
        return (
          <div>
            <section>
              <FormLabel component="legend">
                {" "}
                Thats all we need! Continue to the next section to finish!
              </FormLabel>
            </section>
            {this.renderStepActions(4)}
          </div>
        );
      case "Other":
        return (
          <div>
            <section>
              <FormLabel component="legend">
                {" "}
                Thats all we need for now! We shall review your needs and get
                back to you {this.state.firstName}!
              </FormLabel>
            </section>
            {this.renderStepActions(4)}
          </div>
        );
      case "Virtual Reality Facility":
        return (
          <div>
            <section>
              <FormLabel component="legend">
                {" "}
                Purpose for Visiting the VR lab
              </FormLabel>
              <RadioButtonGroup
                style={{
                  marginTop: 15,
                  marginLeft: 15
                }}
                name="vrPurpose"
                onChange={(evt, val) => this.handleSetvrPurpose(val)}
              >
                <RadioButton
                  label="VR Demonstrations"
                  value="VR Demonstrations"
                  style={{
                    marginBottom: 15
                  }}
                />
                <RadioButton
                  label="Content Creation"
                  value="Content Creation"
                  style={{
                    marginBottom: 15
                  }}
                />
                <RadioButton
                  label="CT Scan and Molecular Visualizations"
                  value="CT Scan and Molecular Visualizations"
                  style={{
                    marginBottom: 15
                  }}
                />
                <RadioButton
                  label="ACE Tour"
                  value="ACE Tour"
                  style={{
                    marginBottom: 15
                  }}
                />
                <RadioButton
                  label="Training/Workshop"
                  value="Training/Workshop"
                  style={{
                    marginBottom: 15
                  }}
                />
                <RadioButton
                  label="Other"
                  value="vrOther"
                  stvryle={{
                    marginBottom: 15
                  }}
                />
              </RadioButtonGroup>
              {this.state.vrPurpose === "vrOther" ? (
                <TextField
                  style={{ display: "block" }}
                  name="other"
                  hintText="Other"
                  floatingLabelText="Other"
                  onChange={(evt, newValue) =>
                    this.setState({ vrOther: newValue })
                  }
                />
              ) : null}
            </section>
            {this.renderStepActions(4)}
          </div>
        );
      default:
        return (
          <div>
            <section>
              <FormLabel component="legend"> Hello world</FormLabel>
            </section>
            {this.renderStepActions(4)}
          </div>
        );
        break;
    }
  }
  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: "12px 0" }}>
        <RaisedButton
          label={stepIndex === 5 ? "Finish" : "Next"}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          backgroundColor="#00C853 !important"
          style={{ marginRight: 12, backgroundColor: "#00C853" }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {
      finished,
      isLoading,
      smallScreen,
      stepIndex,
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

    const DatePickerRange = () => (
      <div>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="start1" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="end1" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          showDefaultInputIcon={true}
          appendToBody={true}
          showClearDates={true}
          numberOfMonths={smallScreen ? 1 : 2}
          minimumNights={0}
          small={true}
        />
      </div>
    );
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={() => this.setState({ confirmationModalOpen: false })}
      />,
      <FlatButton
        label="Confirm"
        style={{ backgroundColor: "#00C853 !important" }}
        primary={true}
        onClick={() => this.handleSubmit()}
      />
    ];

    return (
      <div>
        <AppBar
          title="African Center of Excellence in Bioinformatics"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <section
          style={{
            maxWidth: !smallScreen ? "80%" : "100%",
            margin: "auto",
            marginTop: !smallScreen ? 20 : 0
          }}
        >
          <Card
            style={{
              padding: "12px 12px 25px 12px",
              minHeight: smallScreen ? "100vh" : null
            }}
          >
            {this.state.loading ? <LinearProgress /> : null}
            <Stepper
              activeStep={stepIndex}
              orientation="vertical"
              linear={false}
            >
              <Step>
                <StepLabel>
                  Share your contact information with us and we'll send you a
                  reminder
                </StepLabel>
                <StepContent>
                  <p>
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
                        name="organisation"
                        hintText="Organization"
                        floatingLabelText="Organization"
                        onChange={(evt, newValue) =>
                          this.setState({ organisation: newValue })
                        }
                      />
                      <TextField
                        style={{ display: "block" }}
                        name="email"
                        hintText="youraddress@mail.com"
                        floatingLabelText="Email"
                        errorText={
                          data.validEmail ? null : "Enter a valid email address"
                        }
                        onChange={(evt, newValue) =>
                          this.validateEmail(newValue)
                        }
                      />
                      <TextField
                        style={{ display: "block" }}
                        name="phone"
                        hintText="+2348995989"
                        floatingLabelText="Phone"
                        errorText={
                          data.validPhone ? null : "Enter a valid phone number"
                        }
                        onChange={(evt, newValue) =>
                          this.validatePhone(newValue)
                        }
                      />

                      <TextField
                        style={{ display: "block" }}
                        floatingLabelText="Your Speciality"
                        name="skillset"
                        hintText="Your Specilaity"
                        onChange={(evt, newValue) =>
                          this.setState({ skillset: newValue })
                        }
                      />
                    </section>
                  </p>
                  {this.renderStepActions(0)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  Choose an available day for your appointment
                </StepLabel>

                <StepContent>
                  {DatePickerRange()}
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>
                  Choose an available time for your appointment
                </StepLabel>
                <StepContent>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <TimePicker
                      label="Start Time"
                      value={this.state.startTime}
                      onChange={date => this.handleStartTime(date)}
                    />

                    <TimePicker
                      label="End Time"
                      value={this.state.endTime}
                      onChange={date => this.handleEndTime(date)}
                    />
                  </MuiPickersUtilsProvider>

                  {this.renderStepActions(2)}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Fill out your areas of interest</StepLabel>

                <StepContent>
                  <section>
                    <FormLabel component="legend"> Booking Purpose</FormLabel>
                    <RadioButtonGroup
                      style={{
                        marginTop: 15,
                        marginLeft: 15
                      }}
                      name="purpose"
                      onChange={(evt, val) => this.handleSetPurpose(val)}
                    >
                      <RadioButton
                        label="Tele Learning Facility/Training/Workshop"
                        value="Tele Learning Facility/Training/Workshop"
                        style={{
                          marginBottom: 15
                        }}
                      />
                      <RadioButton
                        label="Virtual Reality Facility"
                        value="Virtual Reality Facility"
                        style={{
                          marginBottom: 15
                        }}
                      />
                      <RadioButton
                        label="Computing Core"
                        value="Computing Core"
                        style={{
                          marginBottom: 15
                        }}
                      />
                      <RadioButton
                        label="ACE Tour"
                        value="ACE Tour"
                        style={{
                          marginBottom: 15
                        }}
                      />
                      <RadioButton
                        label="Individual Research"
                        value="Individual Research"
                        style={{
                          marginBottom: 15
                        }}
                      />
                      <RadioButton
                        label="Other"
                        value="Other"
                        style={{
                          marginBottom: 15
                        }}
                      />
                    </RadioButtonGroup>
                    {this.state.purpose === "Other" ? (
                      <TextField
                        style={{ display: "block" }}
                        name="other"
                        hintText="Other"
                        floatingLabelText="Other"
                        onChange={(evt, newValue) =>
                          this.setState({ other: newValue })
                        }
                      />
                    ) : null}
                  </section>{" "}
                  {this.renderStepActions(3)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Additional Information</StepLabel>

                <StepContent>
                  {this.renderAdditionalInformation()}
                  {/*                   
                  {this.state.purpose === "Virtual Reality Facility"
                    ? this.renderStepActions(5)
                    : this.renderInformation()} */}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Make your Schedule</StepLabel>

                <StepContent>
                  <section>
                    <RaisedButton
                      style={{ display: "block", backgroundColor: "#00C853" }}
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
                  </section>{" "}
                  {this.renderStepActions(5)}
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
            open={confirmationSnackbarOpen || isLoading}
            message={
              isLoading ? "Loading... " : data.confirmationSnackbarMessage || ""
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
export default AppointmentApp;
