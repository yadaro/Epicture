import React from 'react'
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import { Video } from 'expo'
import { withNavigation } from 'react-navigation'

class Post extends React.Component {
	constructor(props) {
		super(props)
		this.state = {preview: ""}
		//console.log("Loading Post", this.props.data.id)
		//this.loadData()
	}

	fileExt(filename) {
		return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
	}	      

	displayContent() {
		//console.log("Heer", this.props.data)
	//	console.log("ABC", this.props.data.images)
		var link
		if (this.props.data == undefined) {
			return (<View></View>)
		} else if (this.props.data.images == undefined) {
			link = this.props.data.link
		} else {
			link = this.props.data.images[0].link
		}
		console.log(link)
		//
		const ext = this.fileExt(link)
		if (ext == "png" || ext == "jpg" || ext == "jpeg" || ext == "gif") {
			return (<Image style={styles.image} resizeMode="contain" source={{uri: link}}/>)
		} else if (ext == "mp4") {
			//console.log("Video")
			return (<Video resizeMode="contain" style={styles.image} repeat ref={(ref) => { this.player = ref }}
			onEnd={()=> this.player.seek(0)} resizeMode={"contain"} volume={0.0} source={{uri: link}} shouldPlay/>)
		}
	}

	render() {
		//console.log("Loading image", this.props.data.images[0].link)
		return (
			<View style={styles.postContainer}>
				{this.displayContent()}
			</View>
		)
	}
}

class PostGallery extends React.Component {
	constructor(props) {
		super(props)
		//console.log("Loading Gallery, link at ", this.props.link)
		this.state = {data: [], isLoading: true}
		//console.log("Loading Gallery, link at ", this.props.link)
		this.loadData()
	}

	galleryClick = (id) => {
		//console.log("Clicked ID is ", id)
		//console.log(this.props.navigation)
		this.props.navigation.navigate(this.props.name == "Favorites" ? "ListFavs" : "ListImgs", 
		{link: this.props.link, data: this.state.data, bearer: this.props.bearer, name: this.props.name})
	}

	loadData() {
		//console.log("Calling link:")
		fetch(this.props.link, {
			headers: {
				"Authorization": "Bearer " + this.props.bearer
			}
		})
		.then(res => {
			//console.log("here")
			return (res.json())
		})
		.then(res => {			
			////console.log("Got results:", res.data)
			// if (res.data.length > 6) {
			// 	res = res.slice(0, 6)
			// }
			this.setState({data: res.data, isLoading: false})
		})
		.catch(err => {
			console.error(err)
		})
	}

	isLoading() {
		if (this.state.isLoading) {
			return (
				<View>
					<ActivityIndicator size='small'/>
				</View>
			)
		}
	}

	render() {
		return (
			<TouchableOpacity style={styles.viewContainer} onPress={() => this.galleryClick(this.props.name)}>
				<FlatList
					contentContainerStyle={styles.flexList}
					data={this.state.data}
					keyExtractor={(item) => item.id.toString()}
					renderItem={(item) => <Post data={item.item}/>}
					numColumns={3}
				/>
			</TouchableOpacity>
		)
	}
}
/**
 * {this.isLoading()}
				<FlatList
					data={this.state.data}
					keyExtractor={(item) => item.id.toString()}
					renderItem={(item) => <Post data={item}/>}
				/>
 */
export default withNavigation(PostGallery)

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		width: Dimensions.get("window").width - 15,
		/*backgroundColor: 'blue',
		alignItems: 'Left'*/
	//	backgroundColor: 'blue'
		///alignItems: 'center',
	},
	flexList: {
		//flexWrap: "wrap",
		textAlign: 'left',
		flexDirection: 'column',
		//backgroundColor: 'blue'
	},
	postContainer: {
		flex: 1,
		margin: 3,
		//width: Dimensions.get("window").width / 3 - 15,
		flex: 1/3,
		//maxWidth: Dimensions.get("window").width / 3 - 15,
		backgroundColor: '#044b51',
	},
	image: {
		flex: 1,
		height: 100,
		width: "100%"
	}
      });