import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class addMembers extends Component {
  state = {
    data: '',
    tentData: '',
    memberOne: '',
    memberTwo: '',
    memberThree: '',
    memberFour: '',
    memberFive: '',
    tentPin: '',
  }
  newMemberOne = (text) => {
    this.setState({memberOne: text});
    
  }
  newMemberTwo = (text) => {
    this.setState({memberTwo: text});
    
  }
  newMemberThree = (text) => {
    this.setState({memberThree: text});
    
  }
  newMemberFour = (text) => {
    this.setState({memberFour: text});
    
  }
  newMemberFive = (text) => {
    this.setState({memberFive: text});
   
  }
  genQrCodeStr = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  fetchDataFromApi = (members, tentPin)  => {
    var qrStr = this.genQrCodeStr();
    const url = "http://tenting-rewards.gonzaga.edu/api/tent/";

     return fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tenter_1: members[0],
        tenter_2: members[1],
        tenter_3: members[2],
        tenter_4: members[3],
        tenter_5: members[4],
        tenter_6: members[5],
        tent_pin: parseInt(tentPin),
        qr_code_str: qrStr,
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

  email2id = (members) => {
    var regIds = [];
    for(var i = 0; i < members.length; i++){
      if(members[i] == ''){
        regIds.push(null);
      }
      else{
        regIds.push(this.state.data.get(members[i]));
      }
    }
    return regIds;
  }

  submit = (thisUser,memberone, membertwo, memberthree, memberfour, memberfive, tentPin) => {
    let members = [thisUser,memberone, membertwo, memberthree, memberfour, memberfive];
    let filter = /^([a-zA-Z0-9_\.\-])+\@((zagmail)+\.)+((gonzaga)+\.)+((edu))$/;
    var alertString = "You must enter a zagmail address for the following members: \n";
    var mustAlert = false;
    for (var i = 0; i < members.length; i++){
      if(members[i] != ''){
        if(!filter.test(members[i])){
          mustAlert = true;
          alertString = alertString.concat(String(i+1));
          alertString = alertString.concat("\n");
        }
      }
    }
    if(mustAlert){
      alert(alertString);
    }
    else{
      var allValidUsers = true;
      var allNotInTent = true;
      var alertString1 = "The following users have unregistered emails: \n";
      var alertString2 = "The following members are already in a tent: \n";
      for(var i = 0; i < members.length; i++){
        if(members[i] == ''){
        }
        else{
          
          if(typeof this.state.data.get(members[i]) == 'undefined'){
            alertString1 = alertString1.concat(members[i]);
            alertString1 = alertString1.concat("\n");
            allValidUsers = false;
          }
          
          
          if(this.state.tentData.get(members[i]) != null){
            alertString2 = alertString2.concat(members[i]);
            alertString2 = alertString2.concat("\n");
            allNotInTent = false;
          }
          
        }
      }
      if(!allValidUsers){
        alert(alertString1);
      }
      else if(!allNotInTent){
        alert(alertString2);
      }
      
      
      if(allValidUsers && allNotInTent){
        var idArray = this.email2id(members);
        this.fetchDataFromApi(idArray, tentPin);
        this.props.navigation.navigate('TentRegInitial');
        this.props.navigation.navigate('QRCode', {tentMembers: members});
      }
    }
 }
 async componentDidMount(){
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
  var userMap = new Map();
  for(var i = 0; i < result.length; i++){
    userMap.set(result[i].email,result[i].id)
  }

  this.setState({data: userMap});
  var userMap2 = new Map();
  for(var i = 0; i < result.length; i++){
    userMap2.set(result[i].email, result[i].tent_id);
  }
  this.setState({tentData:userMap2});
 }
  render() {
    const { navigation } = this.props;
    const userName = navigation.getParam('creatorName', 'No Name');
    const tentPin = navigation.getParam('tentPin', 'noPin');
    return (
      <Grid>
        <Row size={2}></Row>
        <Row size={10}>
          <Col size={10}><Text style = {styles.numberText}>1.</Text></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  editable = {false}
                  placeholder = {userName}
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  />
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={2}>
        </Row>
        <Row size={10}>
          <Col size={10}><Text style = {styles.numberText}>2.</Text></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  placeholder = "New Member"
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  onChangeText = {this.newMemberOne}/>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}><Text style = {styles.numberText}>3.</Text></Col>
            <Col size={80}>
                <TextInput style = {styles.input}
                    placeholder = "New Member"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {this.newMemberTwo}/>
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}><Text style = {styles.numberText}>4.</Text></Col>
            <Col size={80}>
                <TextInput style = {styles.input}
                    placeholder = "New Member"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {this.newMemberThree}/>
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}><Text style = {styles.numberText}>5.</Text></Col>
            <Col size={80}>
                <TextInput style = {styles.input}
                    placeholder = "New Member"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {this.newMemberFour}/>
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}><Text style = {styles.numberText}>6.</Text></Col>
            <Col size={80}>
                <TextInput style = {styles.input}
                    placeholder = "New Member"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {this.newMemberFive}/>
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size={7}></Row>
        <Row size={20}>
          <Col size={20}></Col>
            <Col size={60}>
              <View style = {styles.container}>
              <TouchableOpacity onPress={() => this.submit(userName,this.state.memberOne, this.state.memberTwo, 
                this.state.memberThree, this.state.memberFour, this.state.memberFive, tentPin)}>
                  <Text style = {styles.text}>
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

export default addMembers;

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