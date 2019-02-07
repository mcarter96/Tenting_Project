import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import { Col, Row, Grid } from "react-native-easy-grid";
const mockData = [
  {
      label: 'label1',
      value: 'one'
  },
  {
      label: 'label2',
      value: 'two'
  },
  {
      label: 'label3',
      value: 'three'
  },
];
class Feed extends Component {
  _onSelect = ( item ) => {
    console.log(item);
  };
  render() {
    return (
      <Grid>
        <Row size={30}>
        <View style={styles.container}>
          <View style={{ marginVertical: 10, backgroundColor: "#E7E7E7" }} >
              <CheckboxFormX
                  style={{ width: 350 - 30 }}
                  dataSource={mockData}
                  itemShowKey="label"
                  itemCheckedKey="RNchecked"
                  iconSize={16}
                  formHorizontal={true}
                  labelHorizontal={false}
                  onChecked={(item) => this._onSelect(item)}
              />
          </View>
     </View>
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
