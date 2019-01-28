import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

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
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressCreateGame}>
                <Text style = {styles.text}>
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
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressAssignTents}>
              <Text style = {styles.text}>
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

const styles = StyleSheet.create ({
  container: {
     alignItems: 'center',
     width: '100%'
  },
  text: {
     borderWidth: 1,
     padding: 25,
     borderColor: 'black',
     fontSize: 30
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
})
