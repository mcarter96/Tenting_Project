import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity, AsyncStorage, 
    TouchableWithoutFeedback, Keyboard, Button} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import KeyboardShift from './KeyboardShift';

class userRegistration extends Component {
  state = {
    userEmail: '',
    name: '',
    password: '',
    id: '',
    phoneNumber: '',
    gradYear: '',
    confirmPassword: '',
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
  confirmPassword = (text) =>{
      this.setState({confirmPassword: text});
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
  gradYear = (text) => {
      this.setState({gradYear: text});
  }
  fetchDataFromApi = (userName, passWord, Name, id, phone, gradyear)  => {
    var today = new Date();
    var yyyy = today.getFullYear();
    const url = "https://tenting-rewards.gonzaga.edu/api/profile/";
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
        graduation_year: parseInt(yyyy + 5),
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
  submit = async(userEmail, name, passWord, id, phoneNumber, gradYear) => {
    
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
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(this.state.password != this.state.confirmPassword){
            alert("Passwords don't match!")
        }
        else if(!strongRegex.test(this.state.password)){
            alert("Password must be minimum length of 8 characters, contain one lower and one upper case character, one numeric character, and one special character.")
        }
        else{
            var result = await this.fetchDataFromApi(userEmail, passWord, name, id, phoneNumber, gradYear)
            var success = true;
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
                alert("Registration successful, check your email for a confirmation code!");
                this.props.navigation.navigate('Login');
            }
        }
    }
    
    
 }
 
  render() {
    return (
        <KeyboardShift>
        <Grid style={{backgroundColor: "#C1C6C8"}}>
            <Row size={2}></Row>
            <Row size={10}>
            </Row>
            <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
                <TextInput style = {styles.input}
                    editable = {true}
                    placeholder = "Email"
                    placeholderTextColor = "#C1C6C8"
                    autoCapitalize = "none"
                    returnKeyType={ "done" }
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
                    placeholderTextColor = "#C1C6C8"
                    autoCapitalize = "none"
                    returnKeyType={ "done" }
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
                        placeholderTextColor = "#C1C6C8"
                        autoCapitalize = "none"
                        secureTextEntry = {true}
                        returnKeyType={ "done" }
                        onChangeText = {this.password}/>
                </Col>
                <Col size={10}></Col>
            </Row>
            <Row size={2}></Row>
            <Row size={10}>
                <Col size={10}></Col>
                <Col size={80}>
                    <TextInput style = {styles.input}
                        placeholder = "Confirm Password"
                        placeholderTextColor = "#C1C6C8"
                        autoCapitalize = "none"
                        secureTextEntry = {true}
                        returnKeyType={ "done" }
                        onChangeText = {this.confirmPassword}/>
                </Col>
                <Col size={10}></Col>
            </Row>
            <Row size={2}></Row>
            <Row size={10}>
                <Col size={10}></Col>
                <Col size={80}>
                <TextInput style = {styles.input}
                    placeholder = "Student ID"
                    placeholderTextColor = "#C1C6C8"
                    keyboardType = 'numeric'
                    maxLength={8} 
                    autoCapitalize = "none"
                    returnKeyType={ "done" }
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
                        placeholderTextColor = "#C1C6C8"
                        autoCapitalize = "none"
                        keyboardType = 'number-pad'
                        returnKeyType={ "done" }
                        onChangeText = {this.userPhoneNumber}/>
                </Col>
                <Col size={10}></Col>
            </Row>
            
            <Row size={7}></Row>

            <Row size={10}>
            <Col size={20}></Col>
                <Col size={60}>
                <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.submit(this.state.userEmail, this.state.name, this.state.password, this.state.id, this.state.phoneNumber, this.state.gradYear)}>
                    <Text style = {styles.text}>
                        Create Account
                    </Text>
                </TouchableOpacity>
                </View>
                </Col>
                <Col size={20}></Col>
            </Row>
            <Row size={2}></Row>
            <Row size={8}>
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
        </Grid>
        </KeyboardShift>
    );
  }
}

export default userRegistration;

const styles = StyleSheet.create({
    input: {
        color: '#8d8c8c',
        backgroundColor: 'white',
        borderRadius: 25,
        textAlign: 'left',
        paddingLeft:20,
        height: 40,
        borderColor: '#041E42',
        borderWidth: 1,
        width: '100%'
     },
  container: {
    alignItems: 'center',
    width: '100%'
 },
 text: {
    color: 'white',
    backgroundColor: '#041E42',//'#4a86f7',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 0,
    padding: 15,
    borderColor: 'black',
    fontSize: 20,
 },
 numberText: {
    padding: 5,
    fontSize: 30
 },
})