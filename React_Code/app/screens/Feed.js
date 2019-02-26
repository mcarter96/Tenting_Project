import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
class Feed extends Component {
  render() {
    return (
      <Grid style={{backgroundColor: "#639aff"}}>
        <Row size={30}>
        </Row>
        <Row size={40}>
        </Row>
        <Row size={30}></Row>
      </Grid>
      
    );
  }
}

export default Feed;

const styles = StyleSheet.create ({
  container: {
     //alignItems: 'center',
     width: '100%'
  },
  containerOne:{
      alignItems: 'center',
      width: '100%'
  },
  text: {
      borderWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:30,
      paddingRight:30,
      borderColor: 'black',
      fontSize: 20
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
