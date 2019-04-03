import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class adminClearData extends Component {
  state = {
    token:'',
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: '#041E42' },
    headerTitleStyle: { color: '#041E42' },
    headerBackTitleStyle: {color: "#C1C6C8"},
  }
  onPressClearTents = () => {
    var url = "https://tenting-rewards.gonzaga.edu/api/remove-tents/";
    var result = fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token '+this.state.token,
    },
    body: JSON.stringify({
    }),
    
  })
    .then(res => res.text())
    .then(res => {
      return res
    })
    .catch(error => {
      console.error(error);
    });
    alert("All tents removed");
  }
  onPressClearGames = () => {
    var url = "https://tenting-rewards.gonzaga.edu/api/remove-games/";
    var result = fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token '+this.state.token,
    },
    body: JSON.stringify({
    }),
    
  })
    .then(res => res.text())
    .then(res => {
      return res
    })
    .catch(error => {
      console.error(error);
    });
    alert("All games removed.")
  }
  componentDidMount(){
    const { navigation } = this.props;
    const adminToken = navigation.getParam('adminToken', 'No ID');
    this.setState({token: adminToken});
  }
  render() {
    return (
      <Grid style={{backgroundColor: "#C1C6C8"}}>
        <Row size={10}></Row>
          <Row size={20}>
            <Col size={24}></Col>
              <Col size={54}><Image source={require('../images/logo.png')} /></Col>
            <Col size={22}></Col>
          </Row>
        <Row size={3}></Row>
        <Row size ={6}>
        <Col size={5}></Col>
          <Col size={90}>
            <View style = {styles.container}>
              <Text style={{color:'#041E42', fontSize:30, fontWeight: 'bold',}}>CLEAR DATA</Text>
            </View>
          </Col>
          <Col size={5}></Col>
        </Row>
        <Row size={11}></Row>
        <Row size={19}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressClearTents}>
                <Text style = {styles.text2}>
                  Clear Tents
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={19}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressClearGames}>
              <Text style = {styles.text}>
                Clear Games
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={12}></Row>
      </Grid>
      
    );
  }
}

export default adminClearData;
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
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft:50,
  paddingRight: 50,
  borderColor: 'black',
  fontSize: 25
 },
 text4: {
  color: 'white',
  backgroundColor: '#041E42',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:105,
  paddingRight: 105,
  borderColor: 'black',
  fontSize: 20
 },
 text2: {
  color: 'white',
  backgroundColor: '#041E42',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft:60,
  paddingRight: 60,
  borderColor: 'black',
  fontSize: 25
},
text3: {
  color: 'white',
  backgroundColor: '#041E42',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:90,
  paddingRight: 90,
  borderColor: 'black',
  fontSize: 20
},
})
