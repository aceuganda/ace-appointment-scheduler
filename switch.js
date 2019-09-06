switch (this.StaticRange.purpose) {
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
            onChange={(evt, newValue) => this.setState({ number: newValue })}
          />
          <FormLabel component="legend">
            {" "}
            What type of Analysis do you expect to do?
          </FormLabel>
          <TextField
            multiLine={true}
            name="analysis"
            hintText="Analysis"
            onChange={(evt, newValue) => this.setState({ analysis: newValue })}
          />
          <FormLabel component="legend">
            {" "}
            Could you provide us with a brief description of the nature of data
            and an estimate of the amount of computing resources you expect to
            use.
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
            Please share with us any additional information/Suggestions that may
            be helpful to us scheduling and prepairing for your visit.
          </FormLabel>
          <TextField
            multiLine={true}
            name="recommendation"
            hintText="Recommendation"
            onChange={(evt, newValue) =>
              this.setState({ recommendation: newValue })
            }
          />
        </section>{" "}
        {this.renderStepActions(4)}
      </div>
    );
    break;
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
            Thats all we need for now! We shall review your needs and get back
            to you {this.state.firstName}!
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
              onChange={(evt, newValue) => this.setState({ vrOther: newValue })}
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
