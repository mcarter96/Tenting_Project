import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../screens/style.js'

class adminGameManage extends Component {
  onPressCreateGame = () => {
    this.props.navigation.navigate('createGame')
  }

  onPressAssignTents = () => {
    this.props.navigation.navigate('tentAssignment');
  }
  render() {
    return (
      <Grid>
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.textBox}>
            <TouchableOpacity onPress={this.onPressCreateGame}>
                <Text style = {styles.description}>
                  Create Game
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.textBox}>
            <TouchableOpacity onPress={this.onPressAssignTents}>
              <Text style = {styles.description}>
                Assign Tents
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={40}>
          <Col size={10}></Col>
          <Col size={80}>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={10}></Row>
      </Grid>
      
    );
  }
}

export default adminGameManage;


