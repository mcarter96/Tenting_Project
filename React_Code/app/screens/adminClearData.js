import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class adminClearData extends Component {
  state = {
    token:'',
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: '#9aadce' },
    headerTitleStyle: { color: 'white' },
    }
  onPressClearTents = () => {
    var url = "http://tenting-rewards.gonzaga.edu/api/remove-tents/";
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
    var url = "http://tenting-rewards.gonzaga.edu/api/remove-games/";
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
      <Grid style={{backgroundColor: "#639aff"}}>
        <Row size={10}></Row>
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
        <Row size={52}></Row>
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
  backgroundColor: '#9aadce',
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
  backgroundColor: '#9aadce',
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
  backgroundColor: '#9aadce',
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
  backgroundColor: '#9aadce',
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
