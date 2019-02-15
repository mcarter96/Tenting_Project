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
  Button,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import KeyboardShift from './KeyboardShift';
import styles from '../screens/style.js'

class adminTentChecks extends Component {
  state = {
    qrString:'',
    data:'',
    tentData: '',
    token: '',
    shouldUpdate:'',
  }
  
  onSuccess(e) {
    
    this.setState({qrString: e.data});
    this.submitQr(e.data);
  }

  updateQrString = (text)=>{
    alert("HI")
    this.setState({qrString: text});
  }
  submitQr = async(qrString)=>{
    var tentId = this.state.data.get(qrString)[0];
    var tentNumber = this.state.data.get(qrString)[1];
    //this.scanner.reactivate()
    this.props.navigation.navigate('checkList', {tentid: tentId, tentnum: tentNumber, adminToken:this.state.token});
  }
  
  componentWillMount(){
    this.props.navigation.addListener('willFocus', () => this.scanner.reactivate());
  }
  async componentDidMount(){
    const { navigation } = this.props;
    const adminToken = navigation.getParam('adminToken', 'No ID');
    this.setState({token: adminToken});
    var result = await fetch("http://tenting-rewards.gonzaga.edu/api/tent/", {
    method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    var userMap = new Map();
    for(var i = 0; i < result.length; i++){
      userMap.set(result[i].qr_code_str,[result[i].id, result[i].tent_number])
    }
    this.setState({data: userMap});
  }
  
  render() {
    return (
      <KeyboardShift>
        <Grid>
          <Row size ={20}></Row>
          <Row size={40}>
            <Col size={10}></Col>
            <Col size={80}>
            
            <QRCodeScanner
              onRead={this.onSuccess.bind(this)}
              cameraStyle = {styles.camera}
              ref={(node) => { this.scanner = node }}
              />
              </Col>
            <Col size={10}></Col>
          </Row>
          <Row size={30}></Row>
          <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
              <TextInput style = {styles.input}
                    editable = {true}
                    placeholder = "Code"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    returnKeyType={ "done" }
                    onChangeText = {this.updateQrString}
                    />
            </Col>
            <Col size={10}></Col>
          </Row>
          <Row size={5}></Row>
          <Row size={15}>
            <Col size={20}></Col>
              <Col size={60}>
                <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.submitQr(this.state.qrString)}>
                    <Text style = {styles.text}>
                      Submit
                    </Text>
                </TouchableOpacity>
                </View>
              </Col>
              <Col size={20}></Col>
          </Row>
        </Grid>
      </KeyboardShift>
      
    );
  }
}

// textBold, textCenter, touchableButton, textInput, camera, description, textBox, buttonText

export default adminTentChecks;