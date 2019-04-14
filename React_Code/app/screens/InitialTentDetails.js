import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity, Dimensions, Button} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Content} from "native-base";
import KeyboardShift from './KeyboardShift';
class InitialTentDetails extends Component {
  state = {
    tentName: '.',
    fullName: '',
    pin: ''
  }
  
  handleTentName = (text) => {
    this.setState({ tentName: text })
  }
  handleFullName = (text) => {
    this.setState({ fullName: text })
  }
  handlePin = (text) => {
    this.setState({ pin: text })
  }
  submit = (tentName, fullName, pin) => {
    if(tentName == '' && fullName == '' && pin == ''){
      alert("You left all of the fields empty.")
    }
    else if (tentName == '' && fullName == ''){
      alert("You left tent name and email empty.")
    }
    else if (tentName == '' && pin == ''){
      alert("You left tent name and pin empty.")
    }
    else if (pin == '' && fullName == ''){
      alert("You left pin and email empty.")
    }
    else if (tentName == ''){
      alert("You left tent name empty.")
    }
    else if (fullName == ''){
      alert("You left email empty.")
    }
    else if (pin == ''){
      alert("You left pin empty.")
    }
    else{
      let filter = /^([a-zA-Z0-9_\.\-])+\@((zagmail)+\.)+((gonzaga)+\.)+((edu))$/;
      if(!filter.test(this.state.fullName)){
        alert("Must input zagmail address!")
      }
      else{
        this.props.navigation.navigate('addMembers', {creatorName: fullName, tentPin: pin, token: this.props.navigation.getParam('token')});
      }
    }
 }
 static navigationOptions = ({ navigation }) => ({
    headerLeft: <Button onPress={() => navigation.goBack(null)}
          title="Back"
          color="#C1C6C8" />,
    headerStyle: { backgroundColor: '#041E42' },
    headerTitleStyle: { color: '#041E42' },
  });
 
 componentDidMount(){
  const { navigation } = this.props;
  const userEmail = navigation.getParam('userEmail', 'No Name');
  this.setState({fullName: userEmail});
  }
  render() {
    return (
      <Grid style={{backgroundColor: "#C1C6C8"}}>
        <KeyboardShift>
          <Row size={5}></Row>
          <Row size={25}>
          <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
              <View style = {styles.container}>
                <Text style={{color:'#041E42', fontSize:30}}>SETUP TENT</Text>
              </View>
            </Col>
            <Col size={10}></Col>
          </Row>
          </Row>
          <Row size={5}></Row>
          <Row size={10}>
          <Col size={10}></Col>
            <Col size={80}>
              <TextInput style = {styles.input}
                    placeholder = "Pin"
                    placeholderTextColor = "#041E42"
                    keyboardType = 'number-pad'
                    maxLength={6} 
                    secureTextEntry = {true}
                    autoCapitalize = "none"
                    returnKeyType={ "done" }
                    onChangeText = {this.handlePin}/>
            </Col>
            <Col size={10}></Col>
          </Row>
          <Row size={35}></Row>
          <Row size={20}>
            <Col size={20}></Col>
              <Col size={60}>
                <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.submit(this.state.tentName, this.state.fullName, this.state.pin)}>
                    <Text style = {styles.text}>
                      Next
                    </Text>
                </TouchableOpacity>
                </View>
              </Col>
              <Col size={20}></Col>
          </Row>
          </KeyboardShift>
        </Grid>
      
    );
  }
}

export default InitialTentDetails;

const styles = StyleSheet.create({
  input: {
    color: '#041E42',
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
    backgroundColor: '#041E42',
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
})