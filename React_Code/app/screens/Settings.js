import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class Settings extends Component {
  logout = () => {
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <Grid style={{backgroundColor: "#C1C6C8"}}>
        <Row size={85}></Row>
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
