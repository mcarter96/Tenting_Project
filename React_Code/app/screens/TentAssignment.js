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

import QRCodeScanner from 'react-native-qrcode-scanner';
import KeyboardShift from './KeyboardShift';

class TentAssignment extends Component {
  state = {
    qrString:'',
    data:'',
    tentData: '',
  }
  onSuccess(e) {
    alert("Successfully Scanned, press submit to assign tent number.")
    this.setState({qrString: e.data});
  }

  updateQrString = (text)=>{
    this.setState({qrString: text});
  }

  submitQr = async(qrString)=>{
    var tentId = this.state.data.get(qrString);
    const url = "http://tenting-rewards.gonzaga.edu/api/tent/"+tentId+"/";
     var members = this.state.tentData.get(qrString);
     
     var result = fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: tentId,
        tenter_1: members[0],
        tenter_2: members[1],
        tenter_3: members[2],
        tenter_4: members[3],
        tenter_5: members[4],
        tenter_6: members[5],
        tent_pin: members[6],
        qr_code_str: qrString,
        game_id: 1,
        tent_number: null,
      }),
      
    })
      .then(res => res.text())
      .then(res => {
        return res
      })
      .catch(error => {
        console.error(error);
      });
      var tentNum = await this.loadTentNumber(tentId);
      console.log(tentNum);
      alert("Successfully assigned tent number.");
  }

  loadTentNumber = async(id) =>{
    var url = "http://tenting-rewards.gonzaga.edu/api/tent/"+id+"/";
    var result = await fetch(url, {
    method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    return result.tent_number;
  }

  async componentDidMount(){
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
    var userMap2 = new Map();
    for(var i = 0; i < result.length; i++){
      userMap.set(result[i].qr_code_str,result[i].id)
      userMap2.set(result[i].qr_code_str, [result[i].tenter_1, result[i].tenter_2, result[i].tenter_3,
         result[i].tenter_4, result[i].tenter_5, result[i].tenter_6, result[i].tent_pin])
    }
    console.log(userMap2);
    this.setState({data: userMap});
    this.setState({tentData:userMap2});
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
              reactivate = {true}
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

export default TentAssignment;

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

