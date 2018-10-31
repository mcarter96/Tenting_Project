import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class addMembers extends Component {
  state = {
    members: [],
  }
  newMember = (text) => {
    this.setState({members:[...this.state.members, text]});
  }
  submit = (members) => {
    console.log(members);
    this.props.navigation.navigate('TentRegInitial');
    this.props.navigation.navigate('QRCode');
 }
  render() {
    return (
      <Grid>
        <Row size={2}></Row>
        <Row size={10}>
          <Col size={10}><Text style = {styles.numberText}>1.</Text></Col>
          <Col size={80}>
            <TextInput style = {styles.input}
                  editable = {false}
                  placeholder = "User Name"
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
                  onChangeText = {this.newMember}/>
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
                    onChangeText = {this.newMember}/>
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
                    onChangeText = {this.newMember}/>
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
                    onChangeText = {this.newMember}/>
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
                    onChangeText = {this.newMember}/>
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size={7}></Row>
        <Row size={20}>
          <Col size={20}></Col>
            <Col size={60}>
              <View style = {styles.container}>
              <TouchableOpacity onPress={() => this.submit(this.state.members)}>
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