import React from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, WebView, ActivityIndicator, FlatList } from 'react-native'
import ElementPost from "./ElementPost"

export default class PostView extends React.Component {
	constructor(props) {
		super(props)
		console.log(this.props)
		this.data = this.props.navigation.state.params.data
	}

	static navigationOptions = {
		header: null
	}

	render() {
		return (
			<View style={styles.container}>
				<ElementPost data={this.data} showAll={true} clickable={false}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#044b51"
	}
})