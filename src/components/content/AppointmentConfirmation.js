import React from "react";
import moment from "moment";

const spanStyle = { color: "#00C853" };

export const AppointmentConfirmation = props => (
  <section>
    <p>
      Name:{" "}
      <span style={spanStyle}>
        {props.firstName} {props.lastName}
      </span>
    </p>
    <p>
      Number: <span style={spanStyle}>{props.phone}</span>
    </p>
    <p>
      Email: <span style={spanStyle}>{props.email}</span>
    </p>
    <p>
      Purpose: <span style={spanStyle}>{props.purpose}</span>
    </p>
    <p>
      Appointment Date: From{" "}
      <span style={spanStyle}>
        {moment(props.startDate).format("dddd[,] MMMM Do[,] YYYY")}
      </span>{" "}
      to{" "}
      <span style={spanStyle}>
        {moment(props.endDate).format("dddd[,] MMMM Do[,] YYYY")}
      </span>{" "}
    </p>
    <p>
      Appointment Time: From{" "}
      <span style={spanStyle}>{moment(props.startTime).format("HH:mm")}</span>{" "}
      to <span style={spanStyle}>{moment(props.endTime).format("HH:mm")}</span>
    </p>
  </section>
);
