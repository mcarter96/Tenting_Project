import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class addMembers extends Component {
  state = {
    memberOne: '',
    memberTwo: '',
    memberThree: '',
    memberFour: '',
    memberFive: '',

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
  submit = (thisUser,memberone, membertwo, memberthree, memberfour, memberfive) => {
    let members = [thisUser,memberone, membertwo, memberthree, memberfour, memberfive];
    this.props.navigation.navigate('TentRegInitial');
    this.props.navigation.navigate('QRCode', {tentMembers: members});
 }
  render() {
    const { navigation } = this.props;
    const userName = navigation.getParam('creatorName', 'No Name');
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
                this.state.memberThree, this.state.memberFour, this.state.memberFive)}>
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