import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';

class Settings extends Component {
  state = {
    data: '',
    emails: ''
  }
  logout = () => {
    this.props.navigation.navigate('Login');
  }
  loadChecks = async()=>{
    var tentIdentifier = this.props.navigation.getParam('tentId')
    if(tentIdentifier != null){
      var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent-checks/", {
        method: 'GET',
        headers: {
          Authorization: 'Token '+'0472d271e0dd2668afcf3e57a376c4c9cda55aee'
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
      var alertString ="Completed Checks: " + "\n";
      for(var i = 0; i < result.length; i++){
        if(result[i].tent_id == tentIdentifier){
          if(result[i].waiver_check)
            alertString += "Waiver Check\n";
          if(result[i].setup_check)
            alertString += "Setup Check\n";
          if(result[i].tent_check_1)
            alertString += "Tent Check 1\n";
          if(result[i].tent_check_2)
            alertString += "Tent Check 2\n";
          if(result[i].tent_check_3)
            alertString += "Tent Check 3\n";
          if(result[i].tent_check_4)
            alertString += "Tent Check 4\n";
          if(result[i].final_check)
            alertString += "Final Check\n";
        }
      }
      alert(alertString)
    }
    else if(this.props.navigation.getParam('qrString') != undefined){
      var tentIdentifier;
      var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent/", {
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
      for(var i = 0; i < result.length; i++){
        if(result[i].qr_code_str == this.props.navigation.getParam('qrString')){
          tentIdentifier = result[i].id
        }
      }
      var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent-checks/", {
        method: 'GET',
        headers: {
          Authorization: 'Token '+this.props.navigation.getParam('token')
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
      var alertString ="Completed Checks: " + "\n";
      for(var i = 0; i < result.length; i++){
        if(result[i].tent_id == tentIdentifier){
          if(result[i].waiver_check)
            alertString += "Waiver Check\n";
          if(result[i].setup_check)
            alertString += "Setup Check\n";
          if(result[i].tent_check_1)
            alertString += "Tent Check 1\n";
          if(result[i].tent_check_2)
            alertString += "Tent Check 2\n";
          if(result[i].tent_check_3)
            alertString += "Tent Check 3\n";
          if(result[i].tent_check_4)
            alertString += "Tent Check 4\n";
          if(result[i].final_check)
            alertString += "Final Check\n";
        }
      }
      alert(alertString)
    }
    else{
      alert("Not in a tent!")
    }
  }
  loadTentDataId = async() =>{
    var tentIdentifier = this.props.navigation.getParam('tentId')
    if(tentIdentifier == null){
      emailArr = [];
      for(var i = 0; i < 6; i++){
        emailArr.push("");
      }
      this.setState({emails: emailArr});
    }
    else if(tentIdentifier != null){
      var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent/"+tentIdentifier, {
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
      var emailArr = [];
      if(result.tenter_1 != null){
        emailArr.push(this.state.data.get(result.tenter_1))
      }
      else{
        emailArr.push("")
      }
      if(result.tenter_2 != null){
        emailArr.push(this.state.data.get(result.tenter_2))
      }
      else{
        emailArr.push("")
      }
      if(result.tenter_3 != null){
        emailArr.push(this.state.data.get(result.tenter_3))
      }
      else{
        emailArr.push("")
      }
      if(result.tenter_4 != null){
        emailArr.push(this.state.data.get(result.tenter_4))
      }
      else{
        emailArr.push("")
      }
      if(result.tenter_5 != null){
        emailArr.push(this.state.data.get(result.tenter_5))
      }
      else{
        emailArr.push("")
      }
      if(result.tenter_6 != null){
        emailArr.push(this.state.data.get(result.tenter_6))
      }
      else{
        emailArr.push("")
      }
      this.setState({emails: emailArr});
    }
    else if(this.props.navigation.getParam('qrString') != undefined){
      var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent/", {
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
      for(var i = 0; i < result.length; i++){
        if(result[i].qr_code_str == this.props.navigation.getParam('qrString')){
          var emailArr = [];
          if(result[i].tenter_1 != null){
            emailArr.push(this.state.data.get(result[i].tenter_1))
          }
          else{
            emailArr.push("")
          }
          if(result[i].tenter_2 != null){
            emailArr.push(this.state.data.get(result[i].tenter_2))
          }
          else{
            emailArr.push("")
          }
          if(result[i].tenter_3 != null){
            emailArr.push(this.state.data.get(result[i].tenter_3))
          }
          else{
            emailArr.push("")
          }
          if(result[i].tenter_4 != null){
            emailArr.push(this.state.data.get(result[i].tenter_4))
          }
          else{
            emailArr.push("")
          }
          if(result[i].tenter_5 != null){
            emailArr.push(this.state.data.get(result[i].tenter_5))
          }
          else{
            emailArr.push("")
          }
          if(result[i].tenter_6 != null){
            emailArr.push(this.state.data.get(result[i].tenter_6))
          }
          else{
            emailArr.push("")
          }
          this.setState({emails: emailArr});
        }
      }
    }
    else{
      console.log("Not in a tent yet!");
    }
  }
  async componentDidMount(){
    var result = await fetch("https://tenting-rewards.gonzaga.edu/api/profile/", {
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
    var userMap = new Map();
    for(var i = 0; i < result.length; i++){
      userMap.set(result[i].id, result[i].email)
    }
    console.log(userMap);
    console.log(this.props.navigation.getParam('tentId'))
    this.setState({data: userMap});
    this.loadTentDataId();
   }

  render() {
    return (
      <Grid style={{backgroundColor: "#C1C6C8"}}>
        <Row size={4}></Row>
        <Row size={8}>
        <Col size ={90}></Col>
        <Col size={10}>
          <Icon
            name='refresh'
            size={35}
            type='fontawesome'
            color='#041E42'
            onPress={() => this.loadTentDataId()}
          />
        </Col>
        </Row>
        <Row size ={6}>
          <Col size={5}></Col>
            <Col size={90}>
              <View style = {styles.container}>
                <Text style={{color:'#041E42', fontSize:30, fontWeight: 'bold',}}>TENT MEMBERS</Text>
              </View>
            </Col>
            <Col size={5}></Col>
        </Row>
        <Row size={9}>
          <Col size={10}><Text style = {styles.numberText}>1.</Text></Col>
          <Col size={90}><Text style = {styles.fillText}>{this.state.emails[0]}</Text>
          </Col>
        </Row>
        
        <Row size={9}>
            <Col size={10}><Text style = {styles.numberText}>2.</Text></Col>
            <Col size={90}><Text style = {styles.fillText}>{this.state.emails[1]}</Text>
            </Col>
            
        </Row>
        
        <Row size={9}>
            <Col size={10}><Text style = {styles.numberText}>3.</Text></Col>
            <Col size={90}><Text style = {styles.fillText}>{this.state.emails[2]}</Text>
            </Col>
            
        </Row>
        
        <Row size={9}>
            <Col size={10}><Text style = {styles.numberText}>4.</Text></Col>
            <Col size={90}><Text style = {styles.fillText}>{this.state.emails[3]}</Text>
            </Col>
            
        </Row>
        
        <Row size={9}>
            <Col size={10}><Text style = {styles.numberText}>5.</Text></Col>
            <Col size={90}><Text style = {styles.fillText}>{this.state.emails[4]}</Text>
            </Col>
        </Row>
        <Row size={9}>
            <Col size={10}><Text style = {styles.numberText}>6.</Text></Col>
            <Col size={90}><Text style = {styles.fillText}>{this.state.emails[5]}</Text>
            </Col>
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
        <Col size={20}></Col>
        <Col size={60}>
        <View style = {styles.container}>
          <TouchableOpacity onPress={() => this.loadChecks()}>
                    <Text style = {styles.textChecks}>
                      View Checks
                    </Text>
          </TouchableOpacity>
          </View>
        </Col>
        <Col size={20}></Col>
        </Row>
        <Row size = {3}></Row>
        <Row size={10}>
        <Col size={20}></Col>
        <Col size={60}>
        <View style = {styles.container}>
          <TouchableOpacity onPress={() => this.logout()}>
                    <Text style = {styles.textLogout}>
                      Logout
                    </Text>
          </TouchableOpacity>
          </View>
        </Col>
        <Col size={20}></Col>
        </Row>
        <Row size={5}></Row>
      </Grid>
      
    );
  }
}
const styles = StyleSheet.create ({
  container: {
     alignItems: 'center',
     width: '100%'
  },
  numberText: {
    padding: 5,
    fontSize: 25,
    color: '#041E42',
 },
  text: {
    color:'white',
    backgroundColor: '#041E42',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 0,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft:20,
    paddingRight: 100,
    borderColor: 'black',
    fontSize: 20,
    textAlign: 'left',
  },
  textJoin: {
    borderWidth: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 25,
    paddingBottom: 25,
    borderColor: 'black',
    fontSize: 30
 },
 textLogout: {
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
 textChecks: {
  color: 'white',
  backgroundColor: '#041E42',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft:35,
  paddingRight: 35,
  borderColor: 'black',
  fontSize: 20
 },
 clearButton: {
  backgroundColor: 'white',
  alignSelf: 'flex-end',
  padding: 0,
},
clearIcon: {
  marginRight: 4,
  marginLeft: 4,
  backgroundColor: 'white',
},
fillText: {
  padding: 5,
  fontSize: 20,
  color: '#041E42',
},
 /*
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
 */
});

export default Settings;
