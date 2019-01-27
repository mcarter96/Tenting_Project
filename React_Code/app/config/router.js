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
import TentRuleConfirmation from '../screens/TentRuleConfirmation';
import InitialTentDetails from '../screens/InitialTentDetails'
import addMembers from '../screens/addMembers'
import QRScreen from '../screens/QRScreen'
import Login from '../screens/LoginScreen'
import SearchForTent from '../screens/SearchForTent'
import adminFeed from '../screens/adminFeed'
import adminManageUsers from '../screens/adminManageUsers'
import adminMenu from '../screens/adminMenu'
import adminTentChecks from '../screens/adminTentCheck'
import adminGameManage from '../screens/adminGameManage'
import userRegistration from '../screens/userRegistration'
import confirmAccount from '../screens/confirmAccount'
import tentAssignment from '../screens/TentAssignment'
import TentAssignment from '../screens/TentAssignment';

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
  adminFeed: {
    screen: adminFeed,
    navigationOptions: {
      title: 'Admin Feed'
    },
  },
  adminManageUsers: {
    screen: adminManageUsers, 
    navigationOptions: {
      title: 'Manage Users'
    },
  },
  tentAssignment: {
    screen: TentAssignment,
    navigationOptions:{
      title: 'Assign Tents'
    }
  },

});

export const CreateTentStack = createStackNavigator({
  InitialTentDetails: {
    screen: InitialTentDetails,
    navigationOptions: {
      title: 'Setup Tent',
    },
  },
  addMembers: {
    screen: addMembers,
    navigationOptions: {
      title: 'Add Members',
    },
  },
  SearchForTent: {
    screen: SearchForTent, 
    navigationOptions: {
      title: 'Search for Tents',
    },
  },
});

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor} />,
    },
  },
  Feed: {
    screen: Feed,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Entypo name="news" size={35} color={tintColor} />
    },
  },
  TentRegInitial: {
    screen: TentRegInitial,
    navigationOptions: {
      tabBarLabel: 'Tent',
      tabBarIcon: ({ tintColor }) => <MaterialIcon name="tent" size={35} color={tintColor} />
    },
  },
  QRCode: {
    screen: QRScreen,
    navigationOptions: {
      tabBarLabel: 'QR',
      tabBarIcon: ({ tintColor }) => <AntDesign name="qrcode" size={35} color={tintColor} />
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" size={35} color={tintColor} />
    },
  },
  
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
  }
}, {
  mode: 'modal',
  headerMode: 'none',
});

