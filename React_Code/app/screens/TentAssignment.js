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
  Alert,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import KeyboardShift from './KeyboardShift';

class TentAssignment extends Component {
  state = {
    qrString:'',
    data:'',
    tentData: '',
    maxTentNumber: '',
  }
  onSuccess(e) {
    this.setState({qrString: e.data});
    Alert.alert(
      'Assign Tent',
      'Press OK to assign tent number '+this.state.maxTentNumber + '.',
      [
        {
          text: 'Cancel',
          onPress: () => this.scanner.reactivate(),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.submitQr(e.data)},
      ],
      {cancelable: false},
    );
    
  }

  updateQrString = (text)=>{
    this.setState({qrString: text});
  }

  submitQr = async(qrString)=>{
    if(this.state.data.get(qrString)){
      var tentId = this.state.data.get(qrString);
      const url = "https://tenting-rewards.gonzaga.edu/api/tent/"+tentId+"/";
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
          game_id: this.props.navigation.getParam('gameid'),
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
        this.scanner.reactivate()
      }
      else{
        alert("Invalid code.")
      }
      this.getMaxTentNumber();
      this.scanner.reactivate();
  }
  getMaxTentNumber = async()=>{
    var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent/", {
    method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    var maxTentNum = 0;
    
    for(var i = 0; i < result.length; i++){
      if(result[i].tent_number != null){
        if(result[i].tent_number > maxTentNum){
          maxTentNum = result[i].tent_number;
        }
      }
    }
    this.setState({maxTentNumber: (maxTentNum+1)});
  }
  loadTentNumber = async(id) =>{
    var url = "https://tenting-rewards.gonzaga.edu/api/tent/"+id+"/";
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
    var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent/", {
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
    var maxTentNum = 0;
    
    for(var i = 0; i < result.length; i++){
      userMap.set(result[i].qr_code_str,result[i].id)
      userMap2.set(result[i].qr_code_str, [result[i].tenter_1, result[i].tenter_2, result[i].tenter_3,
         result[i].tenter_4, result[i].tenter_5, result[i].tenter_6, result[i].tent_pin])
      if(result[i].tent_number != null){
        if(result[i].tent_number > maxTentNum){
          maxTentNum = result[i].tent_number;
        }
      }
    }
    console.log(userMap2);
    this.setState({data: userMap});
    this.setState({tentData:userMap2});
    this.setState({maxTentNumber: (maxTentNum+1)});
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: '#041E42' },
    headerTitleStyle: { color: '#041E42' },
    headerBackTitleStyle: {color: "#C1C6C8"},
  }
  render() {
    return (
      
      <Grid style={{backgroundColor: "#C1C6C8"}}>
         <KeyboardShift>
         <Row size={5}></Row>
         <Row size={15}>
          <Col size={5}></Col>
            <Col size={90}>
              <View style = {styles.container}>
                <Text style={{color:'#041E42', fontSize:30, fontWeight: 'bold',}}>TENT ASSIGNMENT</Text>
              </View>
            </Col>
            <Col size={5}></Col>
          </Row>
          <Row size={40}>
            <Col size={10}></Col>
            <Col size={80}>
            
            <QRCodeScanner
              onRead={this.onSuccess.bind(this)}
              cameraStyle = {styles.camera}
              ref={(node) => { this.scanner = node }}
              reactivateTimeout ={2000}
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
                    placeholderTextColor = "#041E42"
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
        </KeyboardShift>
      </Grid>
     
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
    color: '#041E42',
    backgroundColor: 'white',
    borderRadius: 25,
    textAlign: 'left',
    paddingLeft:20,
    height: 40,
    borderColor: '#041E42',
    borderWidth: 1,
    width: '100%'
 },
 container: {
  alignItems: 'center',
  width: '100%'
},
text: {
  color: 'white',
  backgroundColor: '#041E42',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft:60,
  paddingRight: 60,
  borderColor: 'black',
  fontSize: 20
  /*
  borderWidth: 1,
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft:60,
  paddingRight: 60,
  borderColor: 'black',
  fontSize: 20*/
},
});

