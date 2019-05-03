import React from 'react';
import { createBottomTabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign"
import {createStackNavigator} from 'react-navigation';

import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Feed from '../screens/Feed';
import TentRegInitial from '../screens/TentRegInitial';
import InitialTentDetails from '../screens/InitialTentDetails'
import addMembers from '../screens/addMembers'
import QRScreen from '../screens/QRScreen'
import Login from '../screens/LoginScreen'
import SearchForTent from '../screens/SearchForTent'
import adminTentFilter from '../screens/adminTentFilter'
import adminManageUsers from '../screens/adminClearData'
import adminMenu from '../screens/adminMenu'
import adminTentChecks from '../screens/adminTentCheck'
import adminGameManage from '../screens/adminGameManage'
import userRegistration from '../screens/userRegistration'
import confirmAccount from '../screens/confirmAccount'
import TentAssignment from '../screens/TentAssignment';
import CreateGame from '../screens/createGame';
import CheckList from '../screens/adminTentCheckList'
import ForgotPassword from '../screens/ForgotPassword'
console.disableYellowBox = true;


export const AdminStack = createStackNavigator({
  adminMenu: {
    screen: adminMenu,
    navigationOptions: {
      title: "Menu"
    },
  },
  adminGameManage: {
    screen: adminGameManage,
    navigationOptions: {
      title: 'Game Management'
    },
  },
  adminTentChecks: {
    screen: adminTentChecks,
    navigationOptions: {
      title: 'Tent Checks'
    },
  },
  adminTentFilter: {
    screen: adminTentFilter,
    navigationOptions: {
      title: 'Filter Tents'
    },
  },
  adminManageUsers: {
    screen: adminManageUsers, 
    navigationOptions: {
      title: 'Clear Data'
    },
  },
  createGame: {
    screen:CreateGame,
    navigationOptions:{
      title: "Create Game"
    }
  },
  tentAssignment: {
    screen: TentAssignment,
    navigationOptions:{
      title: 'Assign Tents'
    }
  },
  checkList: {
    screen: CheckList,
    navigationOptions:{
      title: 'Tent Check List'
    }
  }

});

export const CreateTentStack = createStackNavigator({
  InitialTentDetails: {
    screen: InitialTentDetails,
    navigationOptions: {
      tabBarVisible: false ,
      title: 'Setup Tent',
    },
  },
  addMembers: {
    screen: addMembers,
    navigationOptions: {
      title: 'Add Members',
    },
  },
});


export const CreateJoinStack = createStackNavigator({
  SearchForTent: {
    screen: SearchForTent, 
    navigationOptions: {
      title: 'Search for Tents',
    },
  },
});
export const Tabs = createBottomTabNavigator({
  QRCode: {
    screen: QRScreen,
    navigationOptions: {
      tabBarLabel: 'QR',
      tabBarIcon: ({ tintColor }) => <AntDesign name="qrcode" size={45} color={tintColor} />
    },
  },
  TentRegInitial: {
    screen: TentRegInitial,
    navigationOptions: {
      tabBarLabel: 'Tent',
      tabBarIcon: ({ tintColor }) => <MaterialIcon name="tent" size={45} color={tintColor}
       />,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Info',
      tabBarIcon: ({ tintColor }) => <AntDesign name="info" size={45} color={tintColor} />,
    },
  },
},{
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#C1C6C8',
    style: {
      height: 65,
      backgroundColor: '#041E42',
    },
  }
});

export const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: '',
    },
  },
});

export const Root = createStackNavigator({
  
  Login: {
    screen: LoginStack,
  },
  JoinTentStack:{
    screen: CreateJoinStack,
  },
  TentingStack: {
    screen: CreateTentStack,
  },
  Tabs: {
    screen: Tabs,
  },
  Admin: {
    screen: AdminStack,
  },
  Registration: {
    screen: userRegistration,
  },
  Confirmation: {
    screen: confirmAccount,
  },
  ResetPassword:{
    screen:ForgotPassword,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});


