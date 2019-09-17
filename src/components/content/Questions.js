import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "material-ui/TextField";

export const QAnalysisType = props => (
  <>
    <FormLabel component="legend">
      {" "}
      What type of Analysis do you expect to do?
    </FormLabel>
    <TextField
      multiLine={true}
      style={{ display: "block", marginBottom: 15, marginTop: 15 }}
      name="analysis"
      hintText="Analysis"
      onChange={props.onChange}
    />
  </>
);
