import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import KeyboardShift from './KeyboardShift';
import styles from '../screens/style.js'

class Confirmation extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    confirmationCode: '',
  }
  
  confirmUserAccount = async(userId, confirmCode) => {
    console.log("http://tenting-rewards.gonzaga.edu/api/confirm-email/?id=" + userId + "&confirmation_id="+ confirmCode);
    var result = await fetch("http://tenting-rewards.gonzaga.edu/api/confirm-email/?id=" + userId + "&confirmation_id="+ confirmCode, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    if(result.success){
        alert("Account confirmed please login again.")
        this.props.navigation.navigate('Login');
    }
    else{
        alert("Bad confirmation code, please copy the code sent to your email.")
    }
   }

   confirm = (userid, confirmcode) =>{
    console.log(userid);
    this.confirmUserAccount(userid, confirmcode);
   }
   confirmationCode = (text) => {
    this.setState({confirmationCode: text});
   }

  
  render() {
    const { navigation } = this.props;
    const userid = navigation.getParam('id', 'no id');
    return (
      <KeyboardShift>
        <Grid>
          <Row size={30}></Row>
          <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
              <TextInput style = {styles.numberInput}
                    placeholder = "Confirmation Code"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    returnKeyType={ "done" }
                    onChangeText = {this.confirmationCode}
                    />
            </Col>
            <Col size={10}></Col>
          </Row>
          <Row size={5}></Row>
          <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
            </Col>
            <Col size={10}></Col>
          </Row>
          <Row size={5}></Row>
          <Row size={15}>
            <Col size={20}></Col>
              <Col size={60}>
                <View style = {styles.textBox}>
                <TouchableOpacity onPress={() => this.confirm(userid, this.state.confirmationCode)}>
                    <Text style = {styles.description}>
                      Confirm
                    </Text>
                </TouchableOpacity>
                </View>
              </Col>
              <Col size={20}></Col>
          </Row>
          <Row size={25}>
          <Col size={20}></Col>
              <Col size={60}>
              </Col>
              <Col size={20}></Col>
          </Row>
        </Grid>
      </KeyboardShift>
    );
  }
}

// textInput, textBox, decription, description2, numberInput
export default Confirmation;