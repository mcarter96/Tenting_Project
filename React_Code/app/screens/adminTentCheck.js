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
  static navigationOptions = {
    headerStyle: { backgroundColor: '#9aadce' },
    headerTitleStyle: { color: 'white' },
  }
  render() {
    return (
     
      <Grid style={{backgroundColor: "#639aff"}}>
      <KeyboardShift>
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
                  placeholderTextColor = "white"
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

export default adminTentChecks;

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
     color: 'white',
     backgroundColor: '#639aff',
     borderRadius: 10,
     textAlign: 'center',
     height: 40,
     borderColor: 'white',
     borderWidth: 0.5,
     width: '100%'
 },
 container: {
  alignItems: 'center',
  width: '100%'
},
text: {
  color: 'white',
  backgroundColor: '#9aadce',
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
