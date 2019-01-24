import React, { Component } from 'react';
import { InputAutoSuggest } from 'react-native-autocomplete-search';

import Autocomplete from 'react-native-autocomplete-input';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class addMembers extends Component {
  state = {
    data: '',
    tentData: '',
    memberOne: '',
    tentPin: '',
    qrString: '',
    emails: [],
    query: '',
    tentMembers: [],
  }

  findEmail(query) {
    if (query === '') {
      return [];
    }
    const { emails } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return emails.filter(email => email.name.search(regex) >= 0);
  }
  genQrCodeStr = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  fetchDataFromApi = (members, tentPin, qrString)  => {
    var qrStr = qrString
    console.log(members);
    members = [...new Set(members)]
    var i;
    for(i = members.length; i < 6; i++){
      members.push(null);
    }
    console.log(members);
    this.setState({qrString: qrStr})
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
        game_id: null,
        tent_number: null,
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
      if(!members[i]){
        regIds.push(null);
      }
      else{
        regIds.push(this.state.data.get(members[i]));
      }
    }
    return regIds;
  }
  updateTentMembers = (name) =>{
    this.setState({ tentMembers: this.state.tentMembers.concat([name])})
  }
  submit = (thisUser,tentMember, tentPin, qrString) => {
    let members = [thisUser,tentMember[0], tentMember[1], tentMember[2], tentMember[3], tentMember[4]];
    var allNotInTent = true;
    var alertString2 = "The following members are already in a tent: \n";
    for(var i = 0; i < members.length; i++){
      if(this.state.tentData.get(members[i]) != null){
        alertString2 = alertString2.concat(members[i]);
        alertString2 = alertString2.concat("\n");
        allNotInTent = false;
      }
    }
    if(allNotInTent){
      var idArray = this.email2id(members);
      var qrStr = this.genQrCodeStr();
      this.fetchDataFromApi(idArray, tentPin, qrStr);
      this.props.navigation.navigate('TentRegInitial');
      this.props.navigation.navigate('QRCode', {tentMembers: members, qrString: qrStr});
    }
    else{
      alert(alertString2);
    }
      
    
 }
 async componentDidMount(){
  var result = await fetch("http://tenting-rewards.gonzaga.edu/api/profile/", {
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
  for(var i = 0; i < result.length; i++){
    userMap.set(result[i].email,result[i].id)
  }
  this.setState({data: userMap});
  var userMap2 = new Map();
  var emailArr = [];
  for(var i = 0; i < result.length; i++){
    userMap2.set(result[i].email, result[i].tent_id);
    if(result[i].tent_id == null){
      emailArr.push({id: String(i+1), name: result[i].email})
    }
  }
  this.setState({emails:emailArr})
  this.setState({tentData:userMap2});
 }
  render() {
    const { navigation } = this.props;
    const userName = navigation.getParam('creatorName', 'No Name');
    const tentPin = navigation.getParam('tentPin', 'noPin');
    const { query } = this.state;
    const emails = this.findEmail(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <Grid>
        <Row size={2}></Row>
        <Row size={10}>
          <Col size={100}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            data={emails.length === 1 && comp(query, emails[0].name) ? [] : emails}
            defaultValue={query}
            listStyle={{maxHeight: 20}}
            onChangeText={text => this.setState({ query: text })}
            placeholder="Search for a user"
            renderItem={({ name }) => (
            <TouchableOpacity onPress={() => this.setState({ tentMembers: this.state.tentMembers.concat([name])})}>
              <Text style = {styles.autoFillText}>
                {name} 
              </Text>
            </TouchableOpacity>
          )}
        />
            
          </Col>
        </Row>
        <Row size={2}>
        </Row>
        <Row size={10}>
          <Col size={10}><Text style = {styles.numberText}>1.</Text></Col>
          <Col size={90}><Text style = {styles.fillText}>{this.state.tentMembers[0]}</Text>
          </Col>
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}><Text style = {styles.numberText}>2.</Text></Col>
            <Col size={90}><Text style = {styles.fillText}>{this.state.tentMembers[1]}</Text>
            </Col>
            
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}><Text style = {styles.numberText}>3.</Text></Col>
            <Col size={90}><Text style = {styles.fillText}>{this.state.tentMembers[2]}</Text>
            </Col>
            
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}><Text style = {styles.numberText}>4.</Text></Col>
            <Col size={90}><Text style = {styles.fillText}>{this.state.tentMembers[3]}</Text>
            </Col>
            
        </Row>
        <Row size={2}></Row>
        <Row size={10}>
            <Col size={10}><Text style = {styles.numberText}>5.</Text></Col>
            <Col size={90}><Text style = {styles.fillText}>{this.state.tentMembers[4]}</Text>
            </Col>
        </Row>
        <Row size={7}></Row>
        <Row size={20}>
          <Col size={10}></Col>
            <Col size={30}>
              <View style = {styles.container}>
              <TouchableOpacity onPress={() => this.submit(userName,this.state.tentMembers, tentPin, this.state.qrString)}>
                  <Text style = {styles.text}>
                    Submit
                  </Text>
              </TouchableOpacity>
              </View>
            </Col>
            <Col size={10}></Col>
            <Col size={30}>
              <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.setState({ tentMembers: []})}>
                    <Text style = {styles.text2}>
                      Clear
                    </Text>
                </TouchableOpacity>
                </View>
              </Col>
            <Col size={10}></Col>
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
 text2: {
  borderWidth: 1,
  paddingLeft: 25,
  paddingRight: 25,
  paddingTop: 15,
  paddingBottom:15,
  borderColor: 'black',
  fontSize: 20
},
 numberText: {
    padding: 5,
    fontSize: 25,
    color: 'black',
 },
 fillText: {
  padding: 5,
  fontSize: 20,
  color: 'black',
},
 autoFillText: {
  padding: 0,
  fontSize: 14,
  color: 'black',
},
autocompleteContainer: {
  marginLeft: 10,
  marginRight: 10
},
})