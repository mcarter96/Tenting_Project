import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class SearchForTent extends Component {
  state = {
    creatorName: '',
    pin: '', 
    mapOfCreators2Ids: '',
    userEmail: '',
    email2id:'',
  }
  handleCreatorName = (text) => {
    this.setState({ creatorName: text })
  }
  handlePin = (text) => {
    this.setState({ pin: text })
  }
  
  loadTentData = async(id) =>{
    var url = "http://tenting-rewards.gonzaga.edu/api/tent/"+id+"/";
    var result = await fetch(url, {
    method: 'GET'
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

  addToTent = async (tentdata) => {
    const url = "http://tenting-rewards.gonzaga.edu/api/tent/"+tentdata.id+"/";
    console.log(tentdata);
    var result = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

  submit = async(creatorName, pin) => {
    if(creatorName == '' && pin == ''){
      alert("You left all of the fields empty.")
    }
    else if (creatorName == ''){
      alert("You left creator name empty.")
    }
    else if (creatorName == '' && pin == ''){
      alert("You left creator name and pin empty.")
    }
    else if (pin == ''){
      alert("You left pin empty.")
    }
    else{
      if(this.state.mapOfCreators2Ids.get(creatorName)){
        if(this.state.mapOfCreators2Ids.get(creatorName)[1] == pin){
          var tentData = await this.loadTentData(this.state.mapOfCreators2Ids.get(creatorName)[0])
          if(tentData.tenter_2 == null){
            tentData.tenter_2 = this.state.email2id.get(this.state.userEmail);
            this.addToTent(tentData);
            this.props.navigation.navigate('TentRegInitial', {userEmail: this.state.userEmail, tentId: tentData.id});
            this.props.navigation.navigate('QRCode', {qrString: tentData.qr_code_str});
          }
          else if(tentData.tenter_3 == null){
            tentData.tenter_3 = this.state.email2id.get(this.state.userEmail);
            this.addToTent(tentData);
            this.props.navigation.navigate('TentRegInitial', {userEmail: this.state.userEmail, tentId: tentData.id});
            this.props.navigation.navigate('QRCode', {qrString: tentData.qr_code_str});
          }
          else if(tentData.tenter_4 == null){
            tentData.tenter_4 = this.state.email2id.get(this.state.userEmail);
            this.addToTent(tentData);
            this.props.navigation.navigate('TentRegInitial', {userEmail: this.state.userEmail, tentId: tentData.id});
            this.props.navigation.navigate('QRCode', {qrString: tentData.qr_code_str});
          }
          else if(tentData.tenter_5 == null){
            tentData.tenter_5 = this.state.email2id.get(this.state.userEmail);
            this.addToTent(tentData);
            this.props.navigation.navigate('TentRegInitial', {userEmail: this.state.userEmail, tentId: tentData.id});
            this.props.navigation.navigate('QRCode', {qrString: tentData.qr_code_str});
          }
          else{
            tentData.tenter_6 = this.state.email2id.get(this.state.userEmail);
            this.addToTent(tentData);
            this.props.navigation.navigate('TentRegInitial', {userEmail: this.state.userEmail, tentId: tentData.id});
            this.props.navigation.navigate('QRCode', {qrString: tentData.qr_code_str});
          }
        }
        else{
          alert("Incorrect pin.")
        }
      }
      else{
        alert("There are no tents associated with this email.")
      }
      
    }
 }
  async componentDidMount(){
    const { navigation } = this.props;
    const email = navigation.getParam('userEmail', 'No Name');
    this.setState({userEmail: email});
    var result2 = await fetch("http://tenting-rewards.gonzaga.edu/api/profile/", {
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
    var userMap2 = new Map();
    var userMap3 = new Map();
    for(var i = 0; i < result2.length; i++){
      userMap2.set(result2[i].id, result2[i].email)
      userMap3.set(result2[i].email, result2[i].id);
    }
    this.setState({email2id: userMap3});
    //console.log(userMap2);
    var result = await fetch("http://tenting-rewards.gonzaga.edu/api/tent/", {
    method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    var userMap = new Map();
    for (i = 0; i < result.length; i++){
      if(result[i].tenter_6 == null)
        userMap.set(userMap2.get(result[i].tenter_1), [result[i].id, result[i].tent_pin]);
    }
    //console.log(userMap);
    this.setState({mapOfCreators2Ids: userMap});
  }
  render() {
    return (
      <Grid>
        <Row size={5}></Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  placeholder = "Tent Creator Email"
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  onChangeText = {this.handleCreatorName}/>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={5}>
        </Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  placeholder = "Pin"
                  placeholderTextColor = "black"
                  keyboardType = 'number-pad'
                  maxLength={6} 
                  secureTextEntry = {true}
                  autoCapitalize = "none"
                  onChangeText = {this.handlePin}/>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={35}></Row>
        <Row size={20}>
          <Col size={20}></Col>
            <Col size={60}>
              <View style = {styles.container}>
              <TouchableOpacity onPress={() => this.submit(this.state.creatorName, this.state.pin)}>
                  <Text style = {styles.text}>
                    Join
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

export default SearchForTent;

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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:50,
    paddingRight:50,
    borderColor: 'black',
    fontSize: 20
 },
})