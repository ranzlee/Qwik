import * as React from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from "react-bootstrap";
import { UIEvent, SyntheticEvent } from "react";

export interface HomeState {
  name: string;
}

export interface HomeProps {}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = { name: "" };
  }

  getValidationState(): "success" | "warning" | "error" | undefined {
    const length = this.state.name.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return undefined;
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      name: event.currentTarget.value
    });
  }

  handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    alert("A name was submitted: " + this.state.name);
    event.preventDefault();
  }
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col sm={12}>
            <form>
              <FormGroup
                controlId="basicForm"
                validationState={this.getValidationState()}
              >
                <ControlLabel>Working example with validation</ControlLabel>
                <Row>
                  <Col sm={3}>
                    <FormControl
                      type="text"
                      value={this.state.name}
                      placeholder="Enter text"
                      onChange={event => this.handleChange(event as any)}
                    />
                  </Col>
                  <Col sm={1}>
                    <FormControl.Feedback />
                  </Col>
                </Row>
                <HelpBlock>Validation is based on string length.</HelpBlock>
                <Button>Submit</Button>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
