import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class QRScreen extends Component {
  render() {
    return (
      <Grid>
        <Row size={30}></Row>
        <Row size={40}>
          <Text style={{fontSize: 50}}>Display QR Code here!</Text>
        </Row>
        <Row size={30}></Row>
      </Grid>
      
    );
  }
}

export default QRScreen;
