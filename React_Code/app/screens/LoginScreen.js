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
    base_url: "http://tenting-rewards.gonzaga.edu/"
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

  password = (text) => {
    this.setState({password: text});
  }
  username = (text) => {
    this.setState({username: text});
   }
  login = async(username, password) => {
    console.log("login sectino reached")
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
        console.log("result reached")
        if (result.token){
          this.setState({password:''});
          this.setState({username:''});
          this._textInput.setNativeProps({ text: '' });
          this._textInput2.setNativeProps({text: ''});
          console.log(username)
          if (username == "adminUser@zagmail.gonzaga.edu") {
            console.log("Admin reached")
            this.props.navigation.navigate('Admin', {userEmail: username});
          } else {
            this.props.navigation.navigate('Tabs', {userEmail: username});
          }
        }
        else{
          alert("Invalid Username or Password.")
        }
    }

  }
  render() {
    return (
      <Grid>
        <Row size={30}></Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  placeholder = "Email"
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  autoCorrect = {false}
                  onChangeText = {this.username}
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
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  autoCorrect = {false}
                  secureTextEntry = {true}
                  onChangeText = {this.password}
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
        <Row size={25}>
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
      </Grid>
      
    );
  }
}

export default Login;

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
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft:60,
    paddingRight: 60,
    borderColor: 'black',
    fontSize: 20
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