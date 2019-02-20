'use strict';

import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  TextInput,
  View,
} from 'react-native';


class CreateGame extends Component {
  state = {
    startDateTimePickerVisible: false,
    endDateTimePickerVisible:false,
    tentingStart: 'Tenting Start: ',
    gameStart: 'Game Start: ',
    gameName: '',
    postTentingStart: '',
    postGameStart: '',
  };
  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });
  
  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });
  
  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });
  
  handleStartDatePicked = (date) => {
    var startDate = new Date(date)
    if(startDate.getHours() > 12){
      this.setState({gameStart: 'Game Start: ' + (startDate.getMonth()+1) + "/" + startDate.getDate()+"/" +startDate.getFullYear()+
    ", " +(startDate.getHours() - 12) + ":" + ('0' + (startDate.getMinutes())).slice(-2)+ " PM"});
    }
    else{
      this.setState({gameStart: 'Game Start: ' + (startDate.getMonth() + 1) + "/" + startDate.getDate()+"/" +startDate.getFullYear()+
    ", " +startDate.getHours() + ":" + ('0' + (startDate.getMinutes())).slice(-2) + " AM"})
    }
    this.setState({postGameStart: startDate.getFullYear()+"-"+('0' + (startDate.getMonth()+1) ).slice(-2)+"-"+('0' + startDate.getDate()).slice(-2)+"T"+('0' + startDate.getHours()).slice(-2)+":"+('0' + startDate.getMinutes()).slice(-2)});
    this.hideStartDateTimePicker();
  };
  
  handleEndDatePicked = (date) => {
    var startDate = new Date(date)
    if(startDate.getHours() > 12){
      this.setState({tentingStart: 'Tenting Start: ' + (startDate.getMonth()+1) + "/" + startDate.getDate()+"/" +startDate.getFullYear()+
    ", " +(startDate.getHours() - 12) + ":" + ('0' + (startDate.getMinutes())).slice(-2) + " PM"});
    }
    else{
      this.setState({tentingStart: 'Game Start: ' + (startDate.getMonth() + 1) + "/" + startDate.getDate()+"/" +startDate.getFullYear()+
    ", " +startDate.getHours() + ":" + ('0' + (startDate.getMinutes())).slice(-2)+ " AM"})
    }
    this.setState({postTentingStart: startDate.getFullYear()+"-"+('0' + (startDate.getMonth()+1) ).slice(-2)+"-"+('0' + startDate.getDate()).slice(-2)+"T"+('0' + startDate.getHours()).slice(-2)+":"+('0' + startDate.getMinutes()).slice(-2)});
    this.hideEndDateTimePicker();
  };
  gamename = (text) => {
    this.setState({gameName: text});
   }
  
  submit = async(name, tentStart, gameStart) =>{
    const url = "http://tenting-rewards.gonzaga.edu/api/games/";
    if(name != "" && tentStart != "" && gameStart != ""){
      var result = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Token '+this.props.navigation.getParam('token'),
        },
        body: JSON.stringify({
          game_start: gameStart,
          tenting_start: tentStart,
          game_name: name
        }),
      })
        .then(res => res.json())
        .then(res => {
          return res
        })
        .catch(error => {
          console.error(error);
        });
        alert("Game successfully created.");
        this.props.navigation.navigate('adminGameManage');
    }
    else{
      alert("All fields are required!");
    }
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: '#9aadce' },
    headerTitleStyle: { color: 'white' },
  }
  render() {
    return (
      <Grid style={{backgroundColor: "#639aff"}}>
        <Row size={10}></Row>
        <Row size={10}>
            <Col size={10}></Col>
            <Col size={80}>
              <TextInput style = {styles.input}
                    placeholder = "Game Name"
                    placeholderTextColor = "white"
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    onChangeText = {this.gamename}
                    returnKeyType={ "done" }
                    />
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size={5}></Row>
        <Row size={10}><Text style = {styles.startingText}>{this.state.gameStart}</Text></Row>
        <Row size={15}>
            <Col size={10}></Col>
              <Col size={80}>
                <View style = {styles.container}>
                <TouchableOpacity onPress={this.showStartDateTimePicker}>
                    <Text style = {styles.pickerText}>
                      Set Game Start
                    </Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.startDateTimePickerVisible}
                  onConfirm={this.handleStartDatePicked}
                  onCancel={this.hideStartDateTimePicker}
                  mode={'datetime'}
                />
                </View>
              </Col>
              <Col size={10}></Col>
        </Row>
        <Row size={10}><Text style = {styles.startingText}>{this.state.tentingStart}</Text></Row>
        <Row size={15}>
            <Col size={10}></Col>
              <Col size={80}>
                <View style = {styles.container}>
                <TouchableOpacity onPress={this.showEndDateTimePicker}>
                    <Text style = {styles.picker2Text}>
                      Set Tent Start
                    </Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.endDateTimePickerVisible}
                  onConfirm={this.handleEndDatePicked}
                  onCancel={this.hideEndDateTimePicker}
                  mode={'datetime'}
                />
                </View>
              </Col>
              <Col size={10}></Col>
        </Row>
        
        <Row size={10}>
        </Row>
        <Row size={15}>
            <Col size={20}></Col>
              <Col size={60}>
                <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.submit(this.state.gameName, this.state.postTentingStart, this.state.postGameStart)}>
                    <Text style = {styles.submitText}>
                      Submit
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

export default CreateGame;

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
    /*
     textAlign: 'center',
     height: 40,
     borderColor: 'black',
     borderWidth: 1,
     width: '100%'*/
  },
  container: {
    alignItems: 'center',
    width: '100%'
 },
 pickerText: {
  color: 'white',
  backgroundColor: '#9aadce',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  padding:10,
  borderColor: 'black',
  fontSize: 20
   /*
    borderWidth: 1,
    padding: 10,
    borderColor: 'black',
    fontSize: 20*/
 },
 picker2Text:{
  color: 'white',
  backgroundColor: '#9aadce',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 11,
  paddingBottom: 11,
  paddingLeft:16,
  paddingRight: 16,
  borderColor: 'black',
  fontSize: 20
  /*
  borderWidth: 1,
  paddingTop: 11,
  paddingBottom: 11,
  paddingLeft: 16,
  paddingRight: 16,
  borderColor: 'black',
  fontSize: 20*/
 },
 submitText: {
  color: 'white',
  backgroundColor: '#9aadce',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:43,
  paddingRight: 43,
  borderColor: 'black',
  fontSize: 20
   /*
  borderWidth: 1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 43,
  paddingRight: 43,
  borderColor: 'black',
  fontSize: 20*/
},
 numberText: {
    padding: 5,
    fontSize: 30,
    color:'white',
 },
 startingText:{
   padding: 5,
   fontSize: 20,
   color:'white',
 }
})

