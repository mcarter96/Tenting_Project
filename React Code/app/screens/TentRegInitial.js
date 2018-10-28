import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Text} from 'react-native';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { me } from '../config/data';

class TentRegInitial extends Component {
  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

  render() {
    return (
      <Grid>
        <Row size={30}></Row>
        <Row size={40}>
          <Col size={20}></Col>
          <Col size={60}><Text style={{fontSize: 50}}>Tent Reg</Text></Col>
          <Col size={20}></Col>
        </Row>
        <Row size={30}></Row>
      </Grid>
    );
  }
}

//Me.defaultProps = { ...me };

export default TentRegInitial;
