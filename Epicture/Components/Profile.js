import React from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, WebView, ActivityIndicator, FlatList } from 'react-native'
import { getContent, getConnectionURL } from '../API/API'
import PostGallery from './PostGallery'
import Header from './Header'
import url from 'url'

export default class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.url = ""
		this.state = { connected: false, avatarLink: "" }
		this.params = []
		//this.buttonsReady = true//false
		this.pickingImage = false
	}

	static navigationOptions = {
		header: null
	}

	renderError() {
		console.log("Error")
		return (
			<View style="">
			</View>
		)
	}

	addImage() {
		if (this.pickingImage)
			return
		this.pickingImage = true
		Expo.ImagePicker.launchImageLibraryAsync({mediaTypes: "All", base64: true})
		.then((res) => {
			//console.log("RES:\n", res)
			if (res === { cancelled: false }) {
				this.pickingImage = false
				return
			}
			console.log("Sending")
			//console.log(res)
			const uriParts = res.uri.split('.');
			const fileType = uriParts[uriParts.length - 1];
			const form = new FormData();
			form.append('image', {uri: res.uri, type: 'image/${fileType}'});
			fetch("https://api.imgur.com/3/image", {
				method: 'POST',
				headers: {
					Authorization: "Client-ID 806afd4368f35f7",
					Authorization: "Bearer " + this.params.access_token,
					"Content-Type": 'multipart/form-data',
				},
				body: form,
			})
			.then(res => {
				console.log("Received")
				console.log(res)
			})
			this.pickingImage = false
		})
	}

	componentDidUpdate() {
		//this.buttonsReady = true
	}

	logout() {
		Alert.alert(
			'Logout',
			'Are you sure you want to logout ?',
			[
				{text: 'Cancel', onPress: () => {}, style: 'cancel'},
				{text: 'OK', onPress: () => { 
					this.setState({connected: false})
					//CookieManager.clearAll();
				}},
			],
			{ cancelable: false }
		)
	}

	render() {
		//console.log("load profile")
		if (this.state.connected) {
			//console.log("load connected")
			return (
				<View style={styles.container}>
					<Header user={this.params.account_username} token={this.params.access_token} logoutF={this.logout.bind(this)}/>
					<View style={styles.body}>
						<View style={styles.subtitleContainer}>
							<Image style={styles.icon} source={require("../images/favorites.png")}/>
							<Text style={styles.subtitleText}>Favorites</Text>
						</View>
						<PostGallery
							name={"favorites"}
							link={"https://api.imgur.com/3/account/" + this.params.account_username + "/favorites"}
							bearer={this.params.access_token}
						/>
						<View style={styles.subtitleContainer}>
							<View style={{flex: 9, flexDirection: 'row'}}>
								<Image style={styles.icon} source={require("../images/camera.png")}/>
								<Text style={styles.subtitleText}>Images</Text>
							</View>
							<TouchableOpacity style={{flex: 1, paddingTop: 1}} onPress={() => this.addImage()}>
								<Image style={styles.icon} source={require("../images/add.png")}/>
							</TouchableOpacity>
						</View>
						<PostGallery
							name={"images"}
							link={"https://api.imgur.com/3/account/" + this.params.account_username + "/images"}
							bearer={this.params.access_token}
						/>
					</View>
				</View>
			)
		}
		//console.log("load not connected")
		//console.log(getConnectionURL())
		return (
			<View style={styles.container}>
				 <WebView
					source={{uri: getConnectionURL()}}
					onNavigationStateChange={(e) => {
					console.log("current state is ", e.url, "\n\n", getConnectionURL())
					console.log("=>", e.url.substring(0, 19))
					if (e.url != getConnectionURL() && e.url.substring(0, 19) == "https://imgur.com/#") { //
						//console.log("Different :", e.url, getConnectionURL())
						//console.log("HERE", e)
						this.url = e.url
						regex = /[?&#]([^=#]+)=([^&#]*)/g
  						res = {}
						while (match = regex.exec(this.url)) {
  							res[match[1]] = match[2]
						}
						this.params = res
						//console.log("here ")
						this.setState({connected: true})
					}}}
					renderError={(e) => {
						console.log("ERROR LOADING PAGE")
					}}
					//console.log("here")
      				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  flexDirection: 'column',
	  backgroundColor: '#09545b',
	  justifyContent: 'center'
	},
	body: {
		flex: 7,
		margin: 5,
		padding: 3,
		//borderColor: 'yellow',
		//borderWidth: 1,
		backgroundColor: '#09545b',
		borderRadius: 5,
	},

	subtitleText: {
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 10
	},
	icon: {
		height: 20,
		width: 20
	},
		subtitle: {
			fontSize: 12,
			color: '#fff'
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
});