import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Image,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import KeyboardShift from './KeyboardShift';
import styles from '../screens/style.js'
class Login extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    username: '',
    password: '',
    loading: false,
    data: [],
    error: null,
    refreshing: false,
    base_url: "http://tenting-rewards.gonzaga.edu/",
  }
  fetchDataFromApi = (userName, passWord)  => {
    const url = "http://tenting-rewards.gonzaga.edu/api/login/";

     return fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userName,
        password: passWord,
      }),
    })
      .then(res => res.json())
      .then(res => {
        return res
      })
      .catch(error => {
        console.error(error);
      })
  };

   getUserId = async(userName) =>{
    var result = await fetch("http://tenting-rewards.gonzaga.edu/api/profile/", {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
      //return responseJson.results;
    })
    .catch((error) => {
      console.error(error);
    });
    for(var i = 0; i < result.length; i++){
      if(result[i].email == userName){
        return result[i].id;
      }
    }
    return null;
   }
  password = (text) => {
    this.setState({password: text});
  }
  username = (text) => {
    this.setState({username: text});
   }
  login = async(username, password) => {
    if(username == '' && password == ''){
        alert("Username and Password fields are required.")
    }
    else if(username == ''){
        alert("Username field is required.")
    }
    else if(password == ''){
        alert("Password field is required.")
    }
    else{
        var result = await this.fetchDataFromApi(username, password);
        if (!result.non_field_errors){
          
          console.log(result);
          if (result.token){
            this.setState({password:''});
            this.setState({username:''});
            this._textInput.setNativeProps({ text: '' });
            this._textInput2.setNativeProps({text: ''});
            console.log(result.is_admin);
            if (result.is_admin) {
              this.props.navigation.navigate('Admin', {token: result.token});
            } else {
              this.props.navigation.navigate('Tabs',{tentId: result.tent_id, userEmail: username, token: result.token});
            }
          }
          else if(!result.is_confirmed && !result.is_admin){
            this.setState({password:''});
            this.setState({username:''});
            this._textInput.setNativeProps({ text: '' });
            this._textInput2.setNativeProps({text: ''});
            this.props.navigation.navigate('Confirmation', {id: userId});
          }
          else{
            alert("Invalid Username or Password.")
          }
        }
        else{
          alert("Invalid Username or Password.")
        }
        
    }

  }
  render() {
    return (
      <KeyboardShift>
        <Grid style={{backgroundColor: "#639aff"}}>
          <Row size={30}>
            <Col size={23}></Col>
              <Col size={54}><Image source={require('../images/tenttwo.png')} /></Col>
            <Col size={23}></Col>
          </Row>
          <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
              <TextInput style = {styles.textInput}
                    placeholder = "Email"
                    placeholderTextColor = "white"
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    onChangeText = {this.username}
                    returnKeyType={ "done" }
                    ref={component => this._textInput2 = component}
                    />
            </Col>
            <Col size={10}></Col>
          </Row>
          <Row size={5}></Row>
          <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
            <View style = {styles.textBox}>
              <TextInput style = {styles.textInput}
                    placeholder = "Password"
                    placeholderTextColor = "white"
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    secureTextEntry = {true}
                    onChangeText = {this.password}
                    returnKeyType={ "done" }
                    ref={component => this._textInput = component}
                    />
              </View>
            </Col>
            <Col size={10}></Col>
          </Row>
          <Row size={5}></Row>
          <Row size={15}>
            <Col size={20}></Col>
              <Col size={60}>
                <View style = {styles.textBox}>
                <TouchableOpacity onPress={() => this.login(this.state.username, this.state.password)}>
                    <Text style = {styles.textInput}>
                      Login
                    </Text>
                </TouchableOpacity>
                </View>
              </Col>
              <Col size={20}></Col>
          </Row>
          <Row size={15}>
            <Col size={20}></Col>
              <Col size={60}>
                <View style = {styles.textBox}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Registration')}>
                    <Text style = {styles.textInput}>
                      Create Account
                    </Text>
                </TouchableOpacity>
                </View>
              </Col>
              <Col size={20}></Col>
          </Row>
          <Row size={10}>
          <Col size={20}></Col>
              <Col size={60}>
                <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
                    <Text style={{color: 'white'}}>
                      Forgot Password?
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

export default Login;
