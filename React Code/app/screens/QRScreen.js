import React, { Component } from 'react';
import {Text,View,ScrollView, StyleSheet} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import QRCode from 'react-native-qrcode';

class QRScreen extends Component {
  state = {
    tentNumber: '_____',
  }
  render() {
    const { navigation } = this.props;
    const tentMembers = navigation.getParam('tentMembers', 'bad');
    return (
      <Grid>
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
              <Text style={{fontSize: 50}}>Tent #{this.state.tentNumber}</Text>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={30}>
          <Col size={24}></Col>
          <Col size={52}><QRCode
            value={tentMembers[0]}
            size={200}
            bgColor='black'
            fgColor='white'/></Col>
          <Col size={24}></Col>
        </Row>
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
              <Text style={{fontSize: 50}}>Countdown!</Text>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={10}></Row>
      </Grid>
      
    );
  }
}

export default QRScreen;

const styles = StyleSheet.create ({
  container: {
     alignItems: 'center',
     width: '100%'
  },
  text: {
     borderWidth: 1,
     padding: 25,
     borderColor: 'black',
     fontSize: 30
  },
  textJoin: {
    borderWidth: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 25,
    paddingBottom: 25,
    borderColor: 'black',
    fontSize: 30
 },
});