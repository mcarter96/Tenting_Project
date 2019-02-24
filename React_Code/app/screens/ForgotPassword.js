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

class ForgotPassword extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    userEmail: '',
  }
  
  resetPassword = async(useremail) => {
    const url = "http://tenting-rewards.gonzaga.edu/api/password_reset/";
    var result = fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: useremail,
      }),
      
    })
      .then(res => res.text())
      .then(res => {
        return res
      })
      .catch(error => {
        console.error(error);
      });
      alert("Check email for a link to reset your password.");
      this.props.navigation.navigate('Login');
   }

   reset = (userEmail) =>{
    //console.log(userid);
    this.resetPassword(userEmail);
   }
   userEmail = (text) => {
    this.setState({userEmail: text});
   }

  
  render() {
    const { navigation } = this.props;
    const userid = navigation.getParam('id', 'no id');
    return (
      <KeyboardShift>
        <Grid style={{backgroundColor: "#639aff"}}>
          <Row size={30}></Row>
          <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
              <TextInput style = {styles.input}
                    placeholder = "Email"
                    placeholderTextColor = "white"
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    returnKeyType={ "done" }
                    onChangeText = {this.userEmail}
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
          <Row size={10}>
            <Col size={20}></Col>
              <Col size={60}>
                <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.reset(this.state.userEmail)}>
                    <Text style = {styles.text}>
                      Reset
                    </Text>
                </TouchableOpacity>
                </View>
              </Col>
              <Col size={20}></Col>
          </Row>
          <Row size={2}></Row>
            <Row size={10}>
                <Col size={20}></Col>
                <Col size={60}>
                    <View style = {styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{color: 'white'}}>
                        Go Back
                        </Text>
                    </TouchableOpacity>
                    </View>
                </Col>
                <Col size={20}></Col>
            </Row>
            <Row size={18}></Row>
        </Grid>
      </KeyboardShift>
    );
  }
}

export default ForgotPassword;

const styles = StyleSheet.create({
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
  paddingTop: 10,
  paddingBottom: 10,
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
 text2: {
  borderWidth: 1,
  padding: 15,
  borderColor: 'black',
  fontSize: 20
},
 numberText: {
    padding: 5,
    fontSize: 30
 },
})