import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import { Col, Row, Grid } from "react-native-easy-grid";
class CheckList extends Component {
  state = {
    tentId: '',
    tentNum: '',
    checkData: [
      {
          label: 'Waiver Check',
          value: 'one',
          RNchecked: true,
      },
      {
          label: 'Tent Setup',
          value: 'two',
          RNchecked: false,
      },
      {
          label: 'Tent Check 1',
          value: 'three',
          RNchecked: false,
      },
      {
        label: 'Tent Check 2',
        value: 'four',
        RNchecked: false,
      },
      {
        label: 'Tent Check 3',
        value: 'five',
        RNchecked: false,
      },
      {
        label: 'Tent Check 4',
        value: 'six',
        RNchecked: false,
      },
      {
        label: 'Final Check',
        value: 'seven',
        RNchecked: false,
     },
    ],
  }
  _onSelect = ( item ) => {
    console.log(item);
  };
  componentDidMount(){
    const { navigation } = this.props;
    const tentid = navigation.getParam('tentid', 'No ID');
    const tentnum = navigation.getParam('tentnum', 'No number');
    this.setState({tentId: tentid});
    this.setState({tentNum:tentnum});
};
  render() {
    return (
      <Grid>
        <Row size ={2}></Row>
        <Row size ={6}>
          <Col size={10}></Col>
            <Col size={80}>
              <View style = {styles.container}>
                <Text style={{fontSize: 30}}>Tent #{this.state.tentId}</Text>
              </View>
            </Col>
            <Col size={10}></Col>
        </Row>
        <Row size ={2}></Row>
        <Row size={65}>
        <View style={styles.container}>
          <View style={{ marginVertical:10}} >
              <CheckboxFormX
                  style={{ width: '100%', marginLeft: 0}}
                  dataSource={this.state.checkData}
                  itemShowKey="label"
                  itemCheckedKey="RNchecked"
                  iconSize={30}
                  formHorizontal={false}
                  labelHorizontal={false}
                  onChecked={(item) => this._onSelect(item)}
              />
          </View>
        </View>
        </Row>
        <Row size={35}>
        </Row>
      </Grid>
      
    );
  }
}

export default CheckList;

const styles = StyleSheet.create ({
  container: {
     alignItems: 'center',
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
