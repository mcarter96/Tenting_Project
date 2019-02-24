import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class adminClearData extends Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: '#9aadce' },
    headerTitleStyle: { color: 'white' },
    }
  render() {
    return (
      <Grid style={{backgroundColor: "#639aff"}}>
        <Row size={30}></Row>
        <Row size={40}>
          <Col size={30}></Col>
          <Col size={40}><Text style={{fontSize: 50}}>Admin Manager Users</Text></Col>
          <Col size={30}></Col>
        </Row>
        <Row size={30}></Row>
      </Grid>
      
    );
  }
}

export default adminClearData;
