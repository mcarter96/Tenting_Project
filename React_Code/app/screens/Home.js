import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../screens/style.js'

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
        <View style = {styles.textBox}>
          <TouchableOpacity onPress={() => this.logout()}>
                    <Text style = {styles.description2}>
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
