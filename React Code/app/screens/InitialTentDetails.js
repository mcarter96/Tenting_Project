import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class InitialTentDetails extends Component {
  state = {
    tentName: '',
    lastName: '',
    pin: ''
  }
  handleTentName = (text) => {
    this.setState({ tentName: text })
  }
  handleTentName = (text) => {
    this.setState({ lastName: text })
  }
  handlePin = (text) => {
    this.setState({ pin: text })
  }
  login = (tentName, lastName, pin) => {
    alert('tentName: ' + tentName + ' lastName: ' + lastName + 'Pin:' + pin)
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
                  placeholder = "Last Name"
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  onChangeText = {this.handleLastName}/>
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
              <TouchableOpacity onPress={() => this.login(this.state.tentName, this.state.lastName, this.state.pin)}>
                  <Text style = {styles.text}>
                    Submit
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
    padding: 25,
    borderColor: 'black',
    fontSize: 30
 },
})