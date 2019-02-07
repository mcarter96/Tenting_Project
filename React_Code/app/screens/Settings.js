import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";


class Settings extends Component {
  render() {
    return (
       <Grid>
         <Row size={30}></Row>
         <Row size={40}>
           <Col size={20}></Col>
          <Col size={60}><Text style={styles.myState}>Settings</Text></Col>
           <Col size={20}></Col>
         </Row>
         <Row size={30}></Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  myState: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default Settings;
