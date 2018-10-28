import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class TentRuleConfirmation extends Component {
  render() {
    return (
      <Grid>
        <Row size={30}></Row>
        <Row size={40}>
          <Col size={30}></Col>
          <Col size={40}><Text style={{fontSize: 50}}>Rules</Text></Col>
          <Col size={30}></Col>
        </Row>
        <Row size={30}></Row>
      </Grid>
      
    );
  }
}

export default TentRuleConfirmation;