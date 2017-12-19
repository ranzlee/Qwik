import * as React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";

export default class Login extends React.Component {
  render() {
    return (
      <Grid fluid={false}>
        <Row>
          <Col lg={4} />
          <Col lg={4}>
            <a
              className="btn btn-block btn-social btn-facebook"
              href="/auth/facebook"
            >
              <i className="fa fa-facebook" />
              Sign in with Facebook
            </a>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={4} />
          <Col lg={4}>
            <a
              className="btn btn-block btn-social btn-google"
              href="/auth/google"
            >
              <i className="fa fa-google" />
              Sign in with Google
            </a>
          </Col>
        </Row>
      </Grid>
    );
  }
}
