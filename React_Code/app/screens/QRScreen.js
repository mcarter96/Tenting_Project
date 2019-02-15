import React, { Component } from 'react';
import {Text,View,ScrollView, StyleSheet} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import QRCode from 'react-native-qrcode';
import styles from '../screens/style.js'

class QRScreen extends Component {
  state = {
    tentNumber: '_____',
    tentId: '',
    tentQr:'No Tent',
  }
  async componentDidMount(){
    const { navigation } = this.props;
    const tentIdentifier = navigation.getParam('tentId', 'bad');
    const tentString = navigation.getParam('qrString', 'No QR');
    this.setState({tentId: tentIdentifier});
    if(tentString != "No QR"){
      this.setState({tentQr: tentString})
    }
    else{
      var result = await fetch("http://tenting-rewards.gonzaga.edu/api/tent/", {
      method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
        //return responseJson.results;
      })
      .catch((error) => {
        console.error(error);
      });
      for(var i = 0; i < result.length; i++){
        if(result[i].id == this.state.tentId){
          this.setState({tentQr: result[i].qr_code_str});
        }
      }
      
    }
  }
  async componentDidUpdate(){
    const { navigation } = this.props;
    const tentIdentifier = navigation.getParam('tentId', 'bad');
    const tentString = navigation.getParam('qrString', 'No QR');
    if(this.state.tentId !== tentIdentifier)
      this.setState({tentId: tentIdentifier});
    if(tentString != "No QR"){
      if(this.state.tentQr !== tentString)
        this.setState({tentQr: tentString})
    }
    else{
      var result = await fetch("http://tenting-rewards.gonzaga.edu/api/tent/", {
      method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
        //return responseJson.results;
      })
      .catch((error) => {
        console.error(error);
      });
      for(var i = 0; i < result.length; i++){
        if(result[i].id == this.state.tentId){
          if(this.state.tentQr !== result[i].qr_code_str)
            this.setState({tentQr: result[i].qr_code_str});
        }
      }
      
    }
  }
  render() {
    return (
      <Grid>
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.textBox}>
              <Text style={{fontSize: 50}}>Tent #{this.state.tentNumber}</Text>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={30}>
          <Col size={24}></Col>
          <Col size={52}>
          <QRCode
            value={this.state.tentQr}
            size={200}
            bgColor='black'
            fgColor='white'/></Col>
          <Col size={24}></Col>
        </Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
          <View style = {styles.textBox}><Text style={{fontSize: 15}}>{this.state.tentQr}</Text></View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.textBox}>
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

// textJoinLeave, description4, textBox

export default QRScreen;
