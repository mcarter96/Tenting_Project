import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../screens/style.js'

class Feed extends Component {
  render() {
    return (
      <Grid>
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
