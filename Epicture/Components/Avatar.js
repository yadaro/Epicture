import React from 'react'
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native'

export default class Avatar extends React.Component {
	constructor(props) {
		super(props)
		//console.log("Constructing avatar")
		this.state = {avatarLink: ""}
		this.loadAvatar()
	}

	loadAvatar() {
		console.log("here loading", this.props.token)
		fetch(this.props.link, {
			headers: {
				Authorization: "Bearer " + this.props.token
			}
		})
		//console.log("Loading avatar")
		//console.log("got first res", res.data.avatar)
		.then(res => res.json())
		.then(res => {
			//console.log("Res", res)
			fetch(res.data.avatar, {
				headers: {
					Authorization: "Bearer " + this.props.token
				}
			})
			.then(res => {
			//console.log("got second res")  
				this.setState({avatarLink: res.url})
			})
			.catch((err) => console.error(err))
		})
		.catch((err) => console.error(err))
		//const url = getAvatar(this.params["account_username"], this.params["access_token"])
		
	}

	render() {
		if (this.state.avatarLink != "") {
			//console.log("Aff avatar")
			return (
				<View style={styles.avatar}>
				<Image style={styles.avatar} source={{uri: this.state.avatarLink}}/>
				</View>
			)
		}
		//console.log("Aff loading")
		return (<View style={styles.avatarLoading}><ActivityIndicator size='small' /></View>)
	}
}

const styles = StyleSheet.create({
	avatar: {
		flex: 1
	},
	avatarLoading: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
})