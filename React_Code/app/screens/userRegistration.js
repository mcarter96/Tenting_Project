import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class userRegistration extends Component {
  state = {
    userEmail: '',
    name: '',
    password: '',
    id: '',
    phoneNumber: '',

  }
  userEmail = (text) => {
      this.setState({userEmail: text});
  }
  userName = (text) => {
    this.setState({name: text});
    
  }
  password = (text) => {
    this.setState({id: text});
    
  }
  studentID = (text) => {
    this.setState({id: text});
    
  }
  userPhoneNumber = (text) => {
    this.setState({phoneNumber: text});
    
  }
  password = (text) => {
      this.setState({password: text});
  }
  fetchDataFromApi = (userName, passWord, Name, id, phone)  => {
    const url = "http://tenting-rewards.gonzaga.edu/api/profile/";
     return fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userName,
        name: Name,
        password: passWord,
        student_id: parseInt(id),
        phone_number: phone,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res
      })
      .catch(error => {
        console.error(error);
      })
    };
  submit = async(userEmail, name, passWord, id, phoneNumber) => {
    
    var alertString = "Missing field(s):\n";
    var displayAlert = false;
    if (userEmail == ""){
        alertString = alertString.concat("Email\n");
        displayAlert = true;
    }
    if(name == ""){
        alertString = alertString.concat("Name\n");
        displayAlert = true;
    }
    if (passWord == ""){
        alertString = alertString.concat("Password\n");
        displayAlert = true;
    }
    if (id == ""){
        alertString = alertString.concat("Student id\n");
        displayAlert = true;
    }
    if(displayAlert){
        alert(alertString);
    }
    else{
        var result = await this.fetchDataFromApi(userEmail, passWord, name, id, phoneNumber)
        var success = true;
        console.log(result);
        if(result.email){
            if(result.email[0] == "Email address must be a zagmail email address"){
                success = false;
                alert("Email address must be a zagmail email address");
            }
        }
        else if(result.phone_number){
            if(result.phone_number[0] == "Phone number must be entered in the format: '+999-999-9999'"){
                success = false;
                alert("Phone number must be entered in the format: '+999-999-9999'");
            }
            else if(result.phone_number[0] == "user profile with this phone number already exists."){
                success = false;
                alert("An account using this phone number already exists.");
            }
            
        }
        else if(result.student_id){
            if(result.student_id[0] == "user profile with this student id already exists."){
                success = false;
                alert("User profile with this student id already exists!");
            }
            
        }
        if(success){
            alert("Registration successful!");
            this.props.navigation.navigate('Login');
        }
        
    }
    
    
 }
  render() {
    return (
      <Grid>
        <Row size={2}></Row>
        <Row size={10}>
        </Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  editable = {true}
                  placeholder = "Email"
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  onChangeText = {this.userEmail}
                  />
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={2}>
        </Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  placeholder = "Name"
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  onChangeText = {this.userName}/>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
                <TextInput style = {styles.input}
                    placeholder = "Password"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    secureTextEntry = {true}
                    onChangeText = {this.password}/>
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
                <TextInput style = {styles.input}
                    placeholder = "Student ID"
                    placeholderTextColor = "black"
                    keyboardType = 'number-pad'
                    maxLength={8} 
                    autoCapitalize = "none"
                    onChangeText = {this.studentID}/>
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
                <TextInput style = {styles.input}
                    placeholder = "Phone Number"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {this.userPhoneNumber}/>
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size={2}></Row>
        <Row size={7}></Row>
        <Row size={20}>
          <Col size={20}></Col>
            <Col size={60}>
              <View style = {styles.container}>
              <TouchableOpacity onPress={() => this.submit(this.state.userEmail, this.state.name, this.state.password, this.state.id, this.state.phoneNumber)}>
                  <Text style = {styles.text}>
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

export default userRegistration;

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
    padding: 15,
    borderColor: 'black',
    fontSize: 20
 },
 numberText: {
    padding: 5,
    fontSize: 30
 },
})