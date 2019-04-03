import React, { Component } from 'react';
import {Text,View,ScrollView, StyleSheet, TouchableOpacity,Image,} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import QRCode from 'react-native-qrcode';

class QRScreen extends Component {
  state = {
    tentNumber: '    ',
    tentId: '',
    tentQr:'TENT CODE',
  }
  loadTentData = async() =>{
    var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent/", {
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
          this.setState({tentNumber: result[i].tent_number});
        }
      }
  }
  logout = () => {
    console.log(this.state.data);
    this.props.navigation.navigate('Login');
  }
  async componentDidMount(){
    const { navigation } = this.props;
    const tentIdentifier = navigation.getParam('tentId', 'bad');
    const tentString = navigation.getParam('qrString', 'No QR');
    this.setState({tentId: tentIdentifier});
    if(tentString != "No QR"){
      this.setState({tentQr: tentString})
    }
    else if(tentIdentifier != null){
      this.loadTentData();
    }
  }
  async componentDidUpdate(){
    const { navigation } = this.props;
    const tentIdentifier = navigation.getParam('tentId', 'bad');
    const tentString = navigation.getParam('qrString', 'No QR');
    const tentNum = navigation.getParam('tentnum', 'nonum')
    if(this.state.tentId !== tentIdentifier)
      this.setState({tentId: tentIdentifier});
    if(tentString != "No QR"){
      if(this.state.tentQr !== tentString)
        this.setState({tentQr: tentString})
    }
    if(tentNum != 'nonum'){
      if(this.state.tentNumber !== tentNum){
        this.setState({tentNumber: tentNum});
      }
    }
    
    else if(tentIdentifier != null){
      var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent/", {
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
            if(result[i].tent_number != null && this.state.tentNumber != result[i].tent_number)
              this.setState({tentNumber: result[i].tent_number});
        }
      }
      
      
    }
  }
  render() {
    return (
      <Grid style={{backgroundColor: "#C1C6C8"}}>
       <Row size={5}></Row>
       <Row size={20}>
            <Col size={24}></Col>
              <Col size={54}><Image source={require('../images/logo.png')} /></Col>
            <Col size={22}></Col>
        </Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
              <Text style={styles.text}>Tent #:{this.state.tentNumber}</Text>
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
            bgColor='#041E42'
            fgColor='#C1C6C8'/></Col>
          <Col size={24}></Col>
        </Row>
        <Row size={5}>
          <Col size={10}></Col>
          <Col size={80}>
          <View style = {styles.container}><Text style={{fontSize: 15, color: 'white'}}>{this.state.tentQr}</Text></View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={5}></Row>
        <Row size={10}>
        <Col size={20}></Col>
        <Col size={60}>
        <View style = {styles.container}>
          <TouchableOpacity onPress={() => this.logout()}>
                    <Text style = {styles.textLogout}>
                      Logout
                    </Text>
          </TouchableOpacity>
          </View>
        </Col>
        <Col size={20}></Col>
        </Row>
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
    color:'white',
    backgroundColor: '#041E42',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 0,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft:20,
    paddingRight: 100,
    borderColor: 'black',
    fontSize: 20,
    textAlign: 'left',
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
 textLogout: {
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
 },
 /*
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
 */
});