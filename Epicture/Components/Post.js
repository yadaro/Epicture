import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, WebView, ActivityIndicator, FlatList } from 'react-native'

export default class Post extends React.Component {
	constructor(props) {

	}

	render() {
		return (
			<View style={styles.container}>
			<Text>ABC</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#09545b',
	}
})