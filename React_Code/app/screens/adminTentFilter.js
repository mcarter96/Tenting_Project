import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
      
      var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent-checks/",{
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
        var result = await fetch("https://tenting-rewards.gonzaga.edu/api/tent/",{
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
      missingSetup = () =>{
        var alertString = "Tents:\n" 
        var result = this.getMissingTentCheck(1);
        for(var i = 0; i < result.length; i++){
          alertString += String(result[i])
          alertString += "\n"
        }
        alert(alertString)
      }
      missingWaiver = () =>{
        var alertString = "Tents:\n" 
        var result = this.getMissingTentCheck(2);
        for(var i = 0; i < result.length; i++){
          alertString += String(result[i])
          alertString += "\n"
        }
        alert(alertString)
      }
      missingCheckOne = () =>{
        var alertString = "Tents:\n" 
        var result = this.getMissingTentCheck(3);
        for(var i = 0; i < result.length; i++){
          alertString += String(result[i])
          alertString += "\n"
        }
        alert(alertString)
      }
      missingCheckTwo = () =>{
        var alertString = "Tents:\n" 
        var result = this.getMissingTentCheck(4);
        for(var i = 0; i < result.length; i++){
          alertString += String(result[i])
          alertString += "\n"
        }
        alert(alertString)
      } 
      missingCheckThree = () =>{
        var alertString = "Tents:\n" 
        var result = this.getMissingTentCheck(5);
        for(var i = 0; i < result.length; i++){
          alertString += String(result[i])
          alertString += "\n"
        }
        alert(alertString)
      }
      missingCheckFour = () =>{
        var alertString = "Tents:\n" 
        var result = this.getMissingTentCheck(6);
        for(var i = 0; i < result.length; i++){
          alertString += String(result[i])
          alertString += "\n"
        }
        alert(alertString)
      }
      missingFinalCheck = () =>{
        var alertString = "Tents:\n" 
        var result = this.getMissingTentCheck(7);
        for(var i = 0; i < result.length; i++){
          alertString += String(result[i])
          alertString += "\n"
        }
        alert(alertString)
      }
     async componentDidMount(){
      const { navigation } = this.props;
      const adminToken = navigation.getParam('token', 'No ID');
      this.setState({token: adminToken});
      var result =  await this.getFilteredTents(adminToken)
      await this.tentIdstoNumbers(adminToken);
      this.setState({tentData:result});
     }
  render() {
    return (
      <Grid style={{backgroundColor: "#639aff"}}>
        <Row size={5}></Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.missingSetup}>
                <Text style = {styles.text}>
                  Missing Setup
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>

        <Row size={5}></Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.missingWaiver}>
              <Text style = {styles.text2}>
                Missing Waiver
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>        
        <Row size={5}></Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.missingCheckOne}>
                <Text style = {styles.text4}>
                  Missing Check 1
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={5}></Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.missingCheckTwo}>
                <Text style = {styles.text4}>
                  Missing Check 2
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={5}></Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.missingCheckThree}>
                <Text style = {styles.text4}>
                  Missing Check 3
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={5}></Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.missingCheckFour}>
                <Text style = {styles.text4}>
                  Missing Check 4
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={5}></Row>
        <Row size={10}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.missingFinalCheck}>
                <Text style = {styles.text3}>
                  Missing Final Check
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
      </Grid>
      
    );
  }
}

export default adminTentFilter;
const styles = StyleSheet.create({
  input: {
    color: 'white',
    backgroundColor: '#639aff',
    borderRadius: 10,
    textAlign: 'center',
    height: 40,
    borderColor: 'white',
    borderWidth: 0.5,
    width: '100%'
 },
  container: {
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
  paddingLeft:60,
  paddingRight: 60,
  borderColor: 'black',
  fontSize: 20
 },
 text4: {
  color: 'white',
  backgroundColor: '#9aadce',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:50,
  paddingRight: 50,
  borderColor: 'black',
  fontSize: 20
 },
 text2: {
  color: 'white',
  backgroundColor: '#9aadce',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:55,
  paddingRight: 55,
  borderColor: 'black',
  fontSize: 20
   
},
text3: {
  color: 'white',
  backgroundColor: '#9aadce',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:35,
  paddingRight: 35,
  borderColor: 'black',
  fontSize: 20

},
})
