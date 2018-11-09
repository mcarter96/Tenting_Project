'use strict';

import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
export default class App extends Component {
  onSuccess(e) {
    console.log(e.data)
  }

  render() {
    return (
      <Grid>
        <Row size={10}></Row>
        <Row size={40}>
        <Col size={10}></Col>
        <Col size={80}><QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          cameraStyle = {styles.camera}
          /></Col>
        <Col size={10}></Col>
        </Row>
        <Row size={50}></Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  camera: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
  },
});

AppRegistry.registerComponent('default', () => ScanScreen);