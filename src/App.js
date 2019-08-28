import React, { Component } from "react";
import injectTapEventPlugin from "react-tap-event-plugin";

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
    return <div>Hello World</div>;
  }
}

export default App;
