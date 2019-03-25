import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import { Col, Row, Grid } from "react-native-easy-grid";
class CheckList extends Component {
  state = {
    tentId: '',
    tentNum: '',
    adminToken: '',
    checkData: [],
    tentCheckData:'',
    tentCheckId:'',
  }
  _onSelect = ( item ) => {
    console.log(item);
  };
  loadTentChecks = async(token) => {
    var url = "https://tenting-rewards.gonzaga.edu/api/tent-checks/";
    var result = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Token '+token,
    },
    ),
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
  updateTentCheck =(checkdata)=>{
    var url = "https://tenting-rewards.gonzaga.edu/api/tent-checks/"+this.state.tentCheckId+"/";
    var result = fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token '+this.state.adminToken,
    },
    body: JSON.stringify({
      tent_id: this.state.tentId,
      waiver_check: checkdata[0].RNchecked,
      setup_check: checkdata[1].RNchecked,
      tent_check_1: checkdata[2].RNchecked,
      tent_check_2: checkdata[3].RNchecked,
      tent_check_3: checkdata[4].RNchecked,
      tent_check_4: checkdata[5].RNchecked,
      final_check: checkdata[6].RNchecked,
    }),
    
  })
    .then(res => res.text())
    .then(res => {
      return res
    })
    .catch(error => {
      console.error(error);
    });
    this.props.navigation.navigate('adminTentChecks');
    alert("Tent successfully checked!")
  }
  createTentCheck = async(tentid) =>{
    var url = "https://tenting-rewards.gonzaga.edu/api/tent-checks/";
    var result = fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token '+this.state.adminToken,
    },
    body: JSON.stringify({
      tent_id: tentid,
      waiver_check: false,
      setup_check: false,
      tent_check_1: false,
      tent_check_2: false,
      tent_check_3: false,
      tent_check_4: false,
      final_check: false,
    }),
    
  })
    .then(res => res.text())
    .then(res => {
      return res
    })
    .catch(error => {
      console.error(error);
    });
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
    var noTentCheck = true;
    
    for(var i = 0; i < tentcheckData.length; i++){
      if(tentcheckData[i].tent_id == tentid){
        noTentCheck = false;
        this.setState({tentCheckId: tentcheckData[i].id});
        var updatedData = [
          {
              label: 'Waiver Check ',
              value: 'one',
              RNchecked: tentcheckData[i].waiver_check,
          },
          {
              label: 'Tent Setup      ',
              value: 'two',
              RNchecked: tentcheckData[i].setup_check,
          },
          {
              label: 'Tent Check 1  ',
              value: 'three',
              RNchecked: tentcheckData[i].tent_check_1,
          },
          {
            label: 'Tent Check 2  ',
            value: 'four',
            RNchecked: tentcheckData[i].tent_check_2,
          },
          {
            label: 'Tent Check 3  ',
            value: 'five',
            RNchecked: tentcheckData[i].tent_check_3,
          },
          {
            label: 'Tent Check 4  ',
            value: 'six',
            RNchecked: tentcheckData[i].tent_check_4,
          },
          {
            label: 'Final  Check    ',
            value: 'seven',
            RNchecked: tentcheckData[i].final_check,
         },
        ];
        this.setState({checkData: updatedData});
      }
      
    }
    if(noTentCheck){
      this.createTentCheck(tentid)
      var updatedData = [
        {
            label: 'Waiver Check ',
            value: 'one',
            RNchecked: false,
        },
        {
            label: 'Tent Setup      ',
            value: 'two',
            RNchecked: false,
        },
        {
            label: 'Tent Check 1  ',
            value: 'three',
            RNchecked: false,
        },
        {
          label: 'Tent Check 2  ',
          value: 'four',
          RNchecked: false,
        },
        {
          label: 'Tent Check 3  ',
          value: 'five',
          RNchecked: false,
        },
        {
          label: 'Tent Check 4  ',
          value: 'six',
          RNchecked: false,
        },
        {
          label: 'Final  Check     ',
          value: 'seven',
          RNchecked: false,
       },
      ];
      this.setState({checkData: updatedData});
      noTentCheck = false;
    }
};
  static navigationOptions = {
    headerStyle: { backgroundColor: '#9aadce' },
    headerTitleStyle: { color: 'white' },
  }
  render() {
    return (
      <Grid style={{backgroundColor: "#639aff"}}>
        <Row size ={2}></Row>
        <Row size ={6}>
          <Col size={10}></Col>
            <Col size={80}>
              <View style = {styles.container}>
                <Text style={{fontSize: 30, color:'white'}}>Tent #{this.state.tentNum}</Text>
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
                  textStyle={{color: 'white'}}
                  itemShowKey="label"
                  itemCheckedKey="RNchecked"
                  iconColor="white"
                  iconSize={30}
                  formHorizontal={false}
                  labelHorizontal={true}
                  onChecked={(item) => this._onSelect(item)}
              />
          </View>
        </View>
        </Row>
        <Row size={5}>
        </Row>
        <Row size={15}>
            <Col size={20}></Col>
              <Col size={60}>
                <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.updateTentCheck(this.state.checkData)}>
                    <Text style = {styles.text}>
                      Submit
                    </Text>
                </TouchableOpacity>
                </View>
              </Col>
              <Col size={20}></Col>
          </Row>
        <Row size={15}></Row>
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
    color: 'white',
    backgroundColor: '#9aadce',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:30,
    paddingRight: 30,
    borderColor: 'black',
    fontSize: 20
    /*
      borderWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:30,
      paddingRight:30,
      borderColor: 'black',
      fontSize: 20*/
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
