import React from "react";
import moment from "moment";

const spanStyle = { color: "#00C853" };

export const AppointmentConfirmation = props => (
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
      Purpose: <span style={spanStyle}>{this.state.purpose}</span>
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
