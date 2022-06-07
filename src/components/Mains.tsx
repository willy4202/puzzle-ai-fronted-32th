import React from 'react';
import styled from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStackParamList} from '~/App';
import Main from '@screens/Main/Main';
import REZList from '@screens/REZList/REZList';
import homeIcon from '@assets/images/home_icon.png';
import homeActive from '@assets/images/home_icon_active.png';
import ListIcon from '@assets/images/list_icon.png';
import ListActive from '@assets/images/list_active.png';

const Tab = createBottomTabNavigator<HomeStackParamList>();

function Mains() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {flex: 0.1},
      })}>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <Icon source={homeActive} /> : <Icon source={homeIcon} />,
        }}
      />
      <Tab.Screen
        name="REZList"
        component={REZList}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <Icon source={ListActive} /> : <Icon source={ListIcon} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default Mains;

const Icon = styled.Image``;
