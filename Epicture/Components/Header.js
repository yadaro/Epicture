import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, WebView, ActivityIndicator, FlatList } from 'react-native'
import Avatar from './Avatar'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
		//console.log("props :", this.props.user, this.props.token)
		this.state = {info: {reputation: undefined, reputation_name: undefined}, isLoading: true}
		this.loadData()
	}

	loadData() {
		//console.log()
		return fetch("https://api.imgur.com/3/account/" + this.props.user, {
			headers: {
				"Authorization": "Client-ID 806afd4368f35f7"
			}
		})
		.then((res) => res.json())
		.then((res) => {
			this.data = res.data
			//console.log("FIRST res", res.data)
			//console.log("Calling ", res.data.cover)
			this.setState({info: res.data, isLoading: false})
			/*fetch(res.data.cover, {
				headers: {
					"Authorization": "Client-ID 806afd4368f35f7"
				}
			})
			//.then(res => res.json())
			.then(res => {
				console.log("Got res", res)
				this.setState({info: this.data, isLoading: false})
				this.props.cover = res.url
			})*/

		})
		.catch((err) => console.error(err))
		
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.header}>
				</View>
			)
		}
		return (
			<View style={styles.header}>
				<ImageBackground style={{flex: 1, flexDirection: 'row', paddingTop: 23}} source={{uri: this.state.info.cover}}>
				<Avatar
					link={"https://api.imgur.com/3/account/" + this.props.user + "/avatar"}
					token={this.props.token}
				/>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{this.props.user}</Text>
					<Text style={styles.subtitle}>{this.state.isLoading == true ? " - " : this.state.info.reputation + " points - " + this.state.info.reputation_name} </Text>
				</View>
					<TouchableOpacity style={styles.iconContainer} onPress={() => {this.props.logoutF()}}>
						<Image style={styles.icon} source={require("../images/logout.png")} resizeMode={"contain"}/>
					</TouchableOpacity>
				</ImageBackground>
			</View>
		)
	}
}//

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 10,
		backgroundColor: '#044b51'
	},
	titleContainer: {
		flex: 4,
		justifyContent: 'center',
		marginLeft: 10
	},
	title: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold'
	},
	subtitleContainer: {
		height: 30,
		marginBottom: 10,
		marginTop: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#044b51'
	},
	subtitle: {
		fontSize: 12,
		color: '#fff'
	},
	iconContainer: {
		flex: 1,
		width: 80,
		flexDirection: 'row',
		//textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',

	},
	icon: {
		height: 20,
		width: 20,
	}
})