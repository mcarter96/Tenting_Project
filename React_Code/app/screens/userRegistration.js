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
<<<<<<< HEAD
    gradYear: '',
=======
>>>>>>> 78a020ad2ad738699277b92b02c2bf8f4a0a420a

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
<<<<<<< HEAD
  gradYear = (text) => {
      this.setState({gradYear: text});
  }
  fetchDataFromApi = (userName, passWord, Name, id, phone, gradyear)  => {
=======
  fetchDataFromApi = (userName, passWord, Name, id, phone)  => {
>>>>>>> 78a020ad2ad738699277b92b02c2bf8f4a0a420a
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
<<<<<<< HEAD
        graduation_year: parseInt(gradyear),
=======
>>>>>>> 78a020ad2ad738699277b92b02c2bf8f4a0a420a
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
<<<<<<< HEAD
  submit = async(userEmail, name, passWord, id, phoneNumber, gradYear) => {
=======
  submit = async(userEmail, name, passWord, id, phoneNumber) => {
>>>>>>> 78a020ad2ad738699277b92b02c2bf8f4a0a420a
    
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
<<<<<<< HEAD
    if (gradYear == ""){
        alertString = alertString.concat("Graduation Year\n");
        displayAlert = true;
    }
=======
>>>>>>> 78a020ad2ad738699277b92b02c2bf8f4a0a420a
    if(displayAlert){
        alert(alertString);
    }
    else{
<<<<<<< HEAD
        var result = await this.fetchDataFromApi(userEmail, passWord, name, id, phoneNumber, gradYear)
=======
        var result = await this.fetchDataFromApi(userEmail, passWord, name, id, phoneNumber)
>>>>>>> 78a020ad2ad738699277b92b02c2bf8f4a0a420a
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
<<<<<<< HEAD
                    keyboardType = 'number-pad'
=======
>>>>>>> 78a020ad2ad738699277b92b02c2bf8f4a0a420a
                    onChangeText = {this.userPhoneNumber}/>
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size={2}></Row>
<<<<<<< HEAD
        <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
                <TextInput style = {styles.input}
                    placeholder = "Graduation Year"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    keyboardType = 'number-pad'
                    onChangeText = {this.gradYear}/>
            </Col>
            <Col size={10}></Col>
        </Row>
=======
        <Row size={7}></Row>
>>>>>>> 78a020ad2ad738699277b92b02c2bf8f4a0a420a
        <Row size={20}>
          <Col size={20}></Col>
            <Col size={60}>
              <View style = {styles.container}>
<<<<<<< HEAD
              <TouchableOpacity onPress={() => this.submit(this.state.userEmail, this.state.name, this.state.password, this.state.id, this.state.phoneNumber, this.state.gradYear)}>
=======
              <TouchableOpacity onPress={() => this.submit(this.state.userEmail, this.state.name, this.state.password, this.state.id, this.state.phoneNumber)}>
>>>>>>> 78a020ad2ad738699277b92b02c2bf8f4a0a420a
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