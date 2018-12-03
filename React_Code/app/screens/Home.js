import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class Home extends Component {

  state = {
    data: '',
  }
  
  logout = () => {
    console.log(this.state.data);
    this.props.navigation.navigate('Login');
  }

  render() {
    
    return (
      <Grid>
        <Row size={30}></Row>
        <Row size={50}></Row>
        <Row size={20}>
        <Col size={20}></Col>
        <Col size={60}>
        <View style = {styles.container}>
          <TouchableOpacity onPress={() => this.logout()}>
                    <Text style = {styles.text}>
                      Logout
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

export default Home;

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
