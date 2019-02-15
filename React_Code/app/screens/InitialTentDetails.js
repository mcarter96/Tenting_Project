import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import KeyboardShift from './KeyboardShift';
import styles from '../screens/style.js'

class InitialTentDetails extends Component {
  state = {
    tentName: '.',
    fullName: '',
    pin: ''
  }
  handleTentName = (text) => {
    this.setState({ tentName: text })
  }
  handleFullName = (text) => {
    this.setState({ fullName: text })
  }
  handlePin = (text) => {
    this.setState({ pin: text })
  }
  submit = (tentName, fullName, pin) => {
    if(tentName == '' && fullName == '' && pin == ''){
      alert("You left all of the fields empty.")
    }
    else if (tentName == '' && fullName == ''){
      alert("You left tent name and email empty.")
    }
    else if (tentName == '' && pin == ''){
      alert("You left tent name and pin empty.")
    }
    else if (pin == '' && fullName == ''){
      alert("You left pin and email empty.")
    }
    else if (tentName == ''){
      alert("You left tent name empty.")
    }
    else if (fullName == ''){
      alert("You left email empty.")
    }
    else if (pin == ''){
      alert("You left pin empty.")
    }
    else{
      let filter = /^([a-zA-Z0-9_\.\-])+\@((zagmail)+\.)+((gonzaga)+\.)+((edu))$/;
      if(!filter.test(this.state.fullName)){
        alert("Must input zagmail address!")
      }
      else{
        this.props.navigation.navigate('addMembers', {creatorName: fullName, tentPin: pin, token: this.props.navigation.getParam('token')});
      }
    }
 }
 componentDidMount(){
  const { navigation } = this.props;
  const userEmail = navigation.getParam('userEmail', 'No Name');
  this.setState({fullName: userEmail});
  }
  render() {
    return (
      <KeyboardShift>
        <Grid>
          <Row size={5}></Row>
          <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
              
            </Col>
            <Col size={10}></Col>
          </Row>
          <Row size={5}>
          </Row>
          <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
              <TextInput style = {styles.textInput}
                    placeholder = {String(this.state.fullName)}
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    editable = {false}
                    onChangeText = {this.handleFullName}/>
                    
            </Col>
            <Col size={10}></Col>
          </Row>
          <Row size={5}></Row>
          <Row size={10}>
          <Col size={10}></Col>
            <Col size={80}>
              <TextInput style = {styles.textInput}
                    placeholder = "Pin"
                    placeholderTextColor = "black"
                    keyboardType = 'number-pad'
                    maxLength={6} 
                    secureTextEntry = {true}
                    autoCapitalize = "none"
                    returnKeyType={ "done" }
                    onChangeText = {this.handlePin}/>
            </Col>
            <Col size={10}></Col>
          </Row>
          <Row size={35}></Row>
          <Row size={20}>
            <Col size={20}></Col>
              <Col size={60}>
                <View style = {styles.textBox}>
                <TouchableOpacity onPress={() => this.submit(this.state.tentName, this.state.fullName, this.state.pin)}>
                    <Text style = {styles.description3}>
                      Next
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

// textInput, textBox, description3

export default InitialTentDetails;
