import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../screens/style.js'


class Settings extends Component {
  render() {
    return (
      <Grid>
        <Row size={30}></Row>
        <Row size={40}>
          <Col size={20}></Col>
          <Col size={60}><Text style={ styles.title }>Settings</Text></Col>
          <Col size={20}></Col>
        </Row>
        <Row size={30}></Row>
      </Grid>
    );
  }
}


export default Settings;
