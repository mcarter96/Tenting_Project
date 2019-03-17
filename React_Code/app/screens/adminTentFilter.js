import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class adminTentFilter extends Component {
  state = {
    token: '',
    tentData: '',
    idToNum: '',
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: '#9aadce' },
    headerTitleStyle: { color: 'white' },
    }
    getFilteredTents = async(token) =>{
      
      var result = await fetch("http://tenting-rewards.gonzaga.edu/api/tent-checks/",{
        method: 'GET',
        headers: {
          Authorization: 'Token '+ token,
        },
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
      tentIdstoNumbers = async(token)=>{
        var result = await fetch("http://tenting-rewards.gonzaga.edu/api/tent/",{
        method: 'GET',
        headers: {
          Authorization: 'Token '+ token,
        },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
        var userMap = new Map();
        for(var i = 0; i < result.length; i++){
          userMap.set(result[i].id,result[i].tent_number)
        }
        this.setState({idToNum: userMap});
      }
      getMissingTentCheck(checkNum){
        var result = []
        //Waiver
        if(checkNum == 1){
          for(var i = 0; i < this.state.tentData.length; i++){
            if(this.state.tentData[i].waiver_check == false){
              result.push(this.state.idToNum.get(this.state.tentData[i].id))
            }
          }
        }
        //Setup
        else if(checkNum == 2){
          for(var i = 0; i < this.state.tentData.length; i++){
            if(this.state.tentData[i].setup_check == false){
              result.push(this.state.idToNum.get(this.state.tentData[i].id))
            }
          }
        }
        //Check 1
        else if(checkNum == 3){
          for(var i = 0; i < this.state.tentData.length; i++){
            if(this.state.tentData[i].tent_check_1 == false){
              result.push(this.state.idToNum.get(this.state.tentData[i].id))
            }
          }
        }
        //Check 2
        else if(checkNum == 4){
          for(var i = 0; i < this.state.tentData.length; i++){
            if(this.state.tentData[i].tent_check_2 == false){
              result.push(this.state.idToNum.get(this.state.tentData[i].id))
            }
          }
        }
        //Check 3
        else if(checkNum == 5){
          for(var i = 0; i < this.state.tentData.length; i++){
            if(this.state.tentData[i].tent_check_3 == false){
              result.push(this.state.idToNum.get(this.state.tentData[i].id))
            }
          }
        }
        //Check 4
        else if(checkNum == 6){
          for(var i = 0; i < this.state.tentData.length; i++){
            if(this.state.tentData[i].tent_check_4 == false){
              result.push(this.state.idToNum.get(this.state.tentData[i].id))
            }
          }
        }
        //Final check
        else if(checkNum == 7){
          for(var i = 0; i < this.state.tentData.length; i++){
            if(this.state.tentData[i].final_check == false){
              result.push(this.state.idToNum.get(this.state.tentData[i].id))
            }
          }
        }
        return result;
      }
     async componentDidMount(){
      const { navigation } = this.props;
      const adminToken = navigation.getParam('token', 'No ID');
      this.setState({token: adminToken});
      var result =  await this.getFilteredTents(adminToken)
      await this.tentIdstoNumbers(adminToken);
      this.setState({tentData:result});
      console.log(this.getMissingTentCheck(4))

     }
  render() {
    return (
      <Grid style={{backgroundColor: "#639aff"}}>
        <Row size={30}></Row>
        <Row size={40}>
          <Col size={30}></Col>
          <Col size={40}><Text style={{fontSize: 50}}>Admin Feed</Text></Col>
          <Col size={30}></Col>
        </Row>
        <Row size={30}></Row>
      </Grid>
      
    );
  }
}

export default adminTentFilter;
