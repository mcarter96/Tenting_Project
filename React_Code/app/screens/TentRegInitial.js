import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { me } from '../config/data';
import styles from '../screens/style.js'

class TentRegInitial extends Component {
  state = {
    tentData: '',
    email: '',
  }
  onPressCreateTent = () => {
    if(this.state.tentData != null){
      this.props.navigation.navigate('QRCode');
    }else{
      this.props.navigation.navigate('TentingStack', {tentId: this.state.tentData, userEmail: this.state.email, token: this.props.navigation.getParam('token')});
    }
    
  }
  componentDidMount(){
    const { navigation } = this.props;
    const tentId = navigation.getParam('tentId', 'No Name');
    const userEmail = navigation.getParam('userEmail', 'No email');
    this.setState({tentData: tentId});
    this.setState({email: userEmail});
  }
  componentDidUpdate(){
    const { navigation } = this.props;
    const tentId = navigation.getParam('tentId', 'No Name');
    if(this.state.tentData !== tentId){
      this.setState({tentData: tentId});
    }
  }

  onPressJoinTent = () => {
    if(this.state.tentData != null){
      this.props.navigation.navigate('QRCode');
    }
    else{
      this.props.navigation.navigate('JoinTentStack', {tentId: this.state.tentData, userEmail: this.state.email, token: this.props.navigation.getParam('token')});
    }
    
  }
  leaveTent = async(tentdata) => {
    const url = "http://tenting-rewards.gonzaga.edu/api/tent/"+tentdata.id+"/";
    //console.log(tentdata);
    var result = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token '+this.props.navigation.getParam('token'),
      },
      body: JSON.stringify({
        id: tentdata.id,
        tenter_1: tentdata.tenter_1,
        tenter_2: tentdata.tenter_2,
        tenter_3: tentdata.tenter_3,
        tenter_4: tentdata.tenter_4,
        tenter_5: tentdata.tenter_5,
        tenter_6: tentdata.tenter_6,
        tent_pin: tentdata.tent_pin,
        qr_code_str: tentdata.qr_code_str,
        game_id: tentdata.game_id,
        tent_number: null,
      }),
      
    })
      .then(res => res.text())
      .then(res => {
        return res
      })
      .catch(error => {
        console.error(error);
      });
      console.log(result);
  }
  loadTentData = async(id) =>{
    var url = "http://tenting-rewards.gonzaga.edu/api/tent/"+id+"/";
    var result = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Token '+this.props.navigation.getParam('token'),
    },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    return result
  }
  email2id = async(email) =>{
    console.log(email);
    var result = await fetch("http://tenting-rewards.gonzaga.edu/api/profile/", {
    method: 'GET',
    headers: {
      Authorization: 'Token '+this.props.navigation.getParam('token'),
    },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    var userId = 0
    for(var i = 0; i < result.length; i++){
      if(result[i].email == email)
        userId = result[i].id;
    }
    return userId;
  }
  onPressLeaveTent = async() =>{
    if(this.state.tentData != null){
      var tentdata = await this.loadTentData(this.state.tentData);
      var userid = await this.email2id(this.state.email);
      if(tentdata.tenter_2 == userid){
        tentdata.tenter_2 = null;
        this.leaveTent(tentdata);
        this.props.navigation.navigate('QRCode', {qrString: "No Tent"});
        this.props.navigation.navigate('TentRegInitial', {userEmail: this.state.email, tentId: null});
        alert("Succesfully left tent!")
      }
      else if(tentdata.tenter_3 == userid){
        tentdata.tenter_3 = null;
        this.leaveTent(tentdata);
        this.props.navigation.navigate('QRCode', {qrString: "No Tent"});
        this.props.navigation.navigate('TentRegInitial', {userEmail: this.state.email, tentId: null});
        alert("Succesfully left tent!")
      }
      else if(tentdata.tenter_4 == userid){
        tentdata.tenter_4 = null;
        this.leaveTent(tentdata);
        this.props.navigation.navigate('QRCode', {qrString: "No Tent"});
        this.props.navigation.navigate('TentRegInitial', {userEmail: this.state.email, tentId: null});
        alert("Succesfully left tent!")
      }
      else if(tentdata.tenter_5 == userid){
        tentdata.tenter_6 = null;
        this.leaveTent(tentdata);
        this.props.navigation.navigate('QRCode', {qrString: "No Tent"});
        this.props.navigation.navigate('TentRegInitial', {userEmail: this.state.email, tentId: null});
        alert("Succesfully left tent!")
      }
      else{
        tentdata.tenter_6 = null;
        this.leaveTent(tentdata);
        this.props.navigation.navigate('QRCode', {qrString: ""});
        this.props.navigation.navigate('TentRegInitial', {userEmail: this.state.email, tentId: null});
        alert("Succesfully left tent!")
      }
    }
    else{
      alert("Your not in a tent.")
    }
  }

  render() {
    return (
      <Grid>
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.textBox}>
            <TouchableOpacity onPress={this.onPressCreateTent}>
                <Text style = {styles.description4}>
                  Create Tent
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.textBox}>
            <TouchableOpacity onPress={this.onPressJoinTent}>
              <Text style = {styles.textJoin}>
                Join Tent
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.textBox}>
            <TouchableOpacity onPress={this.onPressLeaveTent}>
              <Text style = {styles.textLeave}>
                Leave Tent
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={10}></Row>
      </Grid>
    );
  }
}

// description4, textJoinLeave, textbox

//Me.defaultProps = { ...me };

export default TentRegInitial;
