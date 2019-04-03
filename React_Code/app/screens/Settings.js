import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class Settings extends Component {
  render() {
    return (
      <Grid style={{backgroundColor: "#C1C6C8"}}>
        <Row size={30}></Row>
        <Row size={40}>
          <Col size={20}></Col>
          <Col size={60}></Col>
          <Col size={20}></Col>
        </Row>
        <Row size={30}></Row>
      </Grid>
      
    );
  }
}

export default Settings;
