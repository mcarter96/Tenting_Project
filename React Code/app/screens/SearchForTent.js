import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class SearchForTent extends Component {
  state = {
    tentName: '',
    pin: ''
  }
  handleTentName = (text) => {
    this.setState({ tentName: text })
  }
  handlePin = (text) => {
    this.setState({ pin: text })
  }
  submit = (tentName, fullName, pin) => {
    if(tentName == '' && pin == ''){
      alert("You left all of the fields empty.")
    }
    else if (tentName == ''){
      alert("You left tent name empty.")
    }
    else if (tentName == '' && pin == ''){
      alert("You left tent name and pin empty.")
    }
    else if (pin == ''){
      alert("You left pin empty.")
    }
    else{
      console.log('tentName: ' + tentName + 'Pin:' + pin)
      //this.props.navigation.navigate('addMembers', {creatorName: fullName});
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
              <TouchableOpacity onPress={() => this.submit(this.state.tentName, this.state.pin)}>
                  <Text style = {styles.text}>
                    Join
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

export default SearchForTent;

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