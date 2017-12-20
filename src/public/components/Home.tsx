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
import * as axios from "axios";
import { User } from "../../shared/models/user";

export interface HomeState {
  name: string;
}

export interface HomeProps {}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = { name: "" };
  }

  getValidationState = (): "success" | "warning" | "error" | undefined => {
    const length = this.state.name.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return undefined;
  };

  handleChange = (event: any) => {
    this.setState({
      name: event.target.value
    });
  };

  handleSubmit = (event: any) => {
    //alert("A name was submitted: " + this.state.name);
    event.preventDefault();
    axios.default.get<User>("/auth/user").then(response => {
      if (response.data) {
        alert("Hi " + response.data.name + "!");
      } else {
        alert("Hi Anon!");
      }
    });
  };
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
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col sm={1}>
                    <FormControl.Feedback />
                  </Col>
                </Row>
                <HelpBlock>Validation is based on string length.</HelpBlock>
                <Button onClick={this.handleSubmit}>Say Hi To Me!</Button>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
