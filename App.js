import React from 'react';
import { StyleSheet, Text, View, } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import ProfileNavigation from './Navigation/ProfileNavigation'
import Search from './Components/Search'

const TabNavigation = createBottomTabNavigator({
//	Search: {screen: Search},
	Profile: {screen: ProfileNavigation},
});

export default TabNavigation