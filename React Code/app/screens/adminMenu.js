import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class adminMenu extends Component {
  render() {
    return (
      <Grid>
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressCreateTent}>
                <Text style = {styles.text}>
                  Tent Registration
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressJoinTent}>
              <Text style = {styles.textJoin}>
                Tent Checks
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={30}></Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressCreateTent}>
                <Text style = {styles.text}>
                  Manage Users
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={40}></Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressCreateTent}>
                <Text style = {styles.text}>
                  Update Feed
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
export default adminMenu;
