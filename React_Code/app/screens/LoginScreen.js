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
        console.log(result);
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
            this.props.navigation.navigate('Confirmation', {id: result.user_id});
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
            <Col size={24}></Col>
              <Col size={54}><Image source={require('../images/tenttwo.png')} /></Col>
            <Col size={22}></Col>
          </Row>
          <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
              <TextInput style = {styles.input}
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
            <View style = {styles.container}>
              <TextInput style = {styles.input}
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
                <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.login(this.state.username, this.state.password)}>
                    <Text style = {styles.text}>
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
                <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Registration')}>
                    <Text style = {styles.text2}>
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
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft:60,
    paddingRight: 60,
    borderColor: 'black',
    fontSize: 20
 },
 text2: {
  color: 'white',
  backgroundColor: '#9aadce',//'#4a86f7',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  padding: 15,
  borderColor: 'black',
  fontSize: 20
},
 numberText: {
    padding: 5,
    fontSize: 30
 },
})