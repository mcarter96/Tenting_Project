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
    adminToken: '',
    checkData: [
      {
          label: 'Waiver Check',
          value: 'one',
          RNchecked: false,
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
    tentCheckData:'',
    tentCheckId:'',
  }
  _onSelect = ( item ) => {
    console.log(item);
  };
  loadTentChecks = async(token) => {
    var url = "http://tenting-rewards.gonzaga.edu/api/tent-checks/";
    var result = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Token '+token,
    }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    return result;
  }
  
  async componentDidMount(){
    const { navigation } = this.props;
    const tentid = navigation.getParam('tentid', 'No ID');
    const tentnum = navigation.getParam('tentnum', 'No number');
    const token = navigation.getParam('adminToken', 'No token');
    this.setState({tentId: tentid});
    this.setState({tentNum:tentnum});
    this.setState({adminToken:token});
    var tentcheckData = await this.loadTentChecks(token);
    this.setState({tentCheckData:tentcheckData});
    for(var i = 0; i < tentcheckData.length; i++){
      if(tentcheckData[i].tent_id == tentid){
        this.setState({tentCheckId: tentcheckData[i].id});
        var updatedData = [
          {
              label: 'Waiver Check',
              value: 'one',
              RNchecked: tentcheckData[i].waiver_check,
          },
          {
              label: 'Tent Setup',
              value: 'two',
              RNchecked: tentcheckData[i].setup_check,
          },
          {
              label: 'Tent Check 1',
              value: 'three',
              RNchecked: tentcheckData[i].tent_check_1,
          },
          {
            label: 'Tent Check 2',
            value: 'four',
            RNchecked: tentcheckData[i].tent_check_2,
          },
          {
            label: 'Tent Check 3',
            value: 'five',
            RNchecked: tentcheckData[i].tent_check_3,
          },
          {
            label: 'Tent Check 4',
            value: 'six',
            RNchecked: tentcheckData[i].tent_check_4,
          },
          {
            label: 'Final Check',
            value: 'seven',
            RNchecked: tentcheckData[i].final_check,
         },
        ]
        this.setState({checkData: updatedData})
      }
    }
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
