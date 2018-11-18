import React from 'react'
import { ScrollView, StyleSheet, Dimensions, Text, View, Image, WebView, ActivityIndicator, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Video } from 'expo'

class Post extends React.Component {
	constructor(props) {
		super(props)
		this.state = {preview: ""}
		//console.log("QSdqsdLoading Post", this.props.data.id)
		//this.loadData()
	}

	fileExt(filename) {
		return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
	}

	displayContent() {
		var link
		if (this.props.data == undefined) {
			return (<View></View>)
		} else if (this.props.data.images == undefined) {
			link = this.props.data.link
		} else {
			link = this.props.data.images[0].link
		}
		const ext = this.fileExt(link)
		if (ext == "png" || ext == "jpg" || ext == "jpeg" || ext == "gif") {
			return (<Image resizeMode={"contain"} style={styles.image} source={{uri: link}}/>)
		} else if (ext == "mp4") {
			//console.log("Video")
			return (<Video style={styles.image} repeat={"true"} ref={(ref) => { this.player = ref }}
			onEnd={()=> this.player.seek(0)} resizeMode={"contain"} volume={0.0} source={{uri: link}} shouldPlay/>)
		}
	}

	render() {
		return (
			<View style={styles.post}>
				{this.displayContent()}
			</View>
		)
	}
}

class ListPosts extends React.Component {
	constructor(props) {
		super(props)
		//console.log("\n\n", this.props, "\n\n")
		this.link = this.props.navigation.state.params.link
		this.bearer = this.props.navigation.state.params.bearer
		this.state = {data: this.props.navigation.state.params.data, isLoading: false, page: 1, maxpage: -1}
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
				<ScrollView>
					<FlatList
						contentContainerStyle={styles.flexList}
						data={this.state.data}
						keyExtractor={(item) => item.id.toString()}
						renderItem={(item) => <Post data={item.item}/>}
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
	post: {
		width: "100%",
		height: 350,
		backgroundColor: '#044b51',
		marginBottom: 5,
		marginTop: 5,
	},
	flexList: {
		flex: 1,
		width: "100%",
		alignItems: 'center'
	},
	image: {
		flex: 1,
		width: Dimensions.get("window").width,
	}
})

export default withNavigation(ListPosts)