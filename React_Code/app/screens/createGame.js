'use strict';

import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  TextInput,
  View,
} from 'react-native';


class CreateGame extends Component {
  state = {
    qrString:'',
    data:'',
    tentData: '',
  }
  

 

  render() {
    return (
      <Grid>
        <Row size={30}></Row>
        <Row size={40}>
          <Col size={30}></Col>
          <Col size={40}><Text style={{fontSize: 50}}>Admin Create Game</Text></Col>
          <Col size={30}></Col>
        </Row>
        <Row size={30}></Row>
      </Grid>
    );
  }
}

export default CreateGame;

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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
  },
  input: {
    textAlign: 'center',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%'
 },
 container: {
  alignItems: 'center',
  width: '100%'
},
text: {
  borderWidth: 1,
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft:60,
  paddingRight: 60,
  borderColor: 'black',
  fontSize: 20
},
});

