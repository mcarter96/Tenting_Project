import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import CheckBox from 'react-native-check-box';

class adminTentChecks extends Component {
  state = {
    isCheckedOne: true,
    isCheckedTwo: true,
  }
  render() {
    return (
      <Grid>
        <Text>Admin Tent Check</Text>
      </Grid>
      
    );
  }
}

export default adminTentChecks;
