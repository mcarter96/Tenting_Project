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
        <Row size={25}>
        <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        cameraStyle = {styles.camera}
        />
      </Row>
        <Row size={75}></Row>
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
    height: 200,
    width: 200,
  },
});

AppRegistry.registerComponent('default', () => ScanScreen);