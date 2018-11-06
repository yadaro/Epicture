import React from 'react'
import { StyleSheet, Text, View, WebView, ActivityIndicator, FlatList } from 'react-native'
import { getContent, getConnectionURL } from "../API/API"

export default class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = { connected: false }
	}
	render() {
		if (this.state.connected) {
			return (
				<View style={styles.container}>
					<Text>ABC</Text>
				</View>
			)
		}
		console.log(getConnectionURL())
		return (
			<View style={styles.container}>
				 <WebView
				 
        			source={{uri: getConnectionURL()}}
        			style={{marginTop: 20}}
      				/>
			</View>
		)
	}
}
/**
 * <View style={styles.login_container}>
				<WebView
					source={{uri: getConnectionURL()}}
				/>
				</View>
 */
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  flexDirection: 'column',
	  //alignItems: 'center',
	  justifyContent: 'center'
	},
	login_container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		marginLeft: 60,
		marginRight: 60,
		backgroundColor: '#fff'
	}
});