import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class InitialTentDetails extends Component {
  state = {
    tentName: '',
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
        this.props.navigation.navigate('addMembers', {creatorName: fullName, tentPin: pin});
      }
    }
 }
  render() {
    return (
      <Grid>
        <Row size={5}></Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  placeholder = "Tent Name"
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  onChangeText = {this.handleTentName}/>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={5}>
        </Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  placeholder = "Email"
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  onChangeText = {this.handleFullName}/>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={5}></Row>
        <Row size={10}>
        <Col size={10}></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  placeholder = "Pin"
                  placeholderTextColor = "black"
                  keyboardType = 'number-pad'
                  maxLength={6} 
                  secureTextEntry = {true}
                  autoCapitalize = "none"
                  onChangeText = {this.handlePin}/>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={35}></Row>
        <Row size={20}>
          <Col size={20}></Col>
            <Col size={60}>
              <View style = {styles.container}>
              <TouchableOpacity onPress={() => this.submit(this.state.tentName, this.state.fullName, this.state.pin)}>
                  <Text style = {styles.text}>
                    Next
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

export default InitialTentDetails;

const styles = StyleSheet.create({
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:50,
    paddingRight:50,
    borderColor: 'black',
    fontSize: 20
 },
})