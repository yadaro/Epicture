import React from 'react'
import { ScrollView, TouchableOpacity, StyleSheet, Dimensions, Text, View, Image, WebView, ActivityIndicator, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import ElementPost from "./ElementPost"

class ListPosts extends React.Component {
	constructor(props) {
		super(props)
		//console.log("\n\n", this.props, "\n\n")
		this.link = this.props.navigation.state.params.link
		this.bearer = this.props.navigation.state.params.bearer
		this.state = {data: this.props.navigation.state.params.data, isLoading: false, page: 1, maxpage: -1}
		this.name = this.props.navigation.state.params.name
		//this.loadData()
	}

	static navigationOptions = {
		header: null
	}

	loadData() {
		//console.log("ABC")
		fetch(this.link, {
			headers: {
				Authorization: "Bearer " + this.bearer
			}
		})
		.then(res => {
			return (res.json())
		})
		.then(res => {
			//console.log("RES")
			this.setState({data: res.data, isLoading: false})
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>{this.name}</Text>
				</View>
				<ScrollView style={styles.body}>
					<FlatList
						contentContainerStyle={styles.flexList}
						data={this.state.data}
						keyExtractor={(item) => item.id.toString()}
						renderItem={(item) => <ElementPost data={item.item} showAll={false} clickable={true}/>}
					/>
				</ScrollView>
			</View>
		)
	}
}

const styles =  StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#09545b',
	},
	header: {
		//flex: 1,
		flex: 1/10,
		justifyContent: 'center',
		textAlign: 'left',
		backgroundColor: '#034649'
	},
	title: {
		paddingTop: 3,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
		marginLeft: 3
	},
	body: {
		flex: 1,
		margin: 5,
		//backgroundColor: '#09545b',
	},
	flexList: {
		flex: 1,
		width: "100%",
		alignItems: 'center'
	},
})

export default withNavigation(ListPosts)