import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput, 
  TouchableOpacity
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../screens/style.js'

class adminMenu extends Component {
  onPressTentReg = () => {
    this.props.navigation.navigate('adminGameManage');
  }

  onPressTentChecks = () => {
    this.props.navigation.navigate('adminTentChecks');
  }

  onPressManageUsers = () => {
    this.props.navigation.navigate('adminManageUsers');
  }

  onPressUpdateFeed = () => {
    this.props.navigation.navigate('adminFeed');
  }

  render() {
    return (
      <Grid>
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.textBox}>
            <TouchableOpacity onPress={this.onPressTentReg}>
                <Text style = {styles.description}>
                  Game Management
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>

        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.textBox}>
            <TouchableOpacity onPress={this.onPressTentChecks}>
              <Text style = {styles.description}>
                Tent Checks
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>

        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.textBox}>
            <TouchableOpacity onPress={this.onPressManageUsers}>
                <Text style = {styles.description}>
                  Manage Users
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.textBox}>
            <TouchableOpacity onPress={this.onPressUpdateFeed}>
                <Text style = {styles.description}>
                  Update Feed
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

// description3, textInput, textBox
export default adminMenu;