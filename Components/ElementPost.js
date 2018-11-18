import React from 'react'
import { ScrollView, TouchableOpacity, StyleSheet, Dimensions, Text, View, Image, WebView, ActivityIndicator, FlatList } from 'react-native'
import { Video } from 'expo'
import { withNavigation } from 'react-navigation'

class ElementPost extends React.Component {
	constructor(props) {
		super(props)
		this.state = {preview: ""}
		//console.log("QSdqsdLoading Post", this.props.data.id)
		//this.loadData()
	//	console.log(this.props.data)
	}

	fileExt(filename) {
		return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
	}

	displayImage(link) {
		const ext = this.fileExt(link)
		if (ext == "png" || ext == "jpg" || ext == "jpeg" || ext == "gif") {
			return (
				<Image resizeMode={"contain"} style={styles.image} source={{uri: link}}/>
			)
		} else if (ext == "mp4") {
			//console.log("Video")
			return (<Video style={styles.image} repeat={"true"} ref={(ref) => { this.player = ref }}
			onEnd={()=> this.player.seek(0)} resizeMode={"contain"} volume={0.0} source={{uri: link}} shouldPlay/>)
		}
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
		if (!this.props.showAll || this.props.data.images == undefined) {
			return (
				<View style={styles.postContent}>
				{this.displayImage(link)}
				</View>
			)
		}
		/*data = this.props.data.images.map((item) => {
			return {"${item.id}": item}
		})*/
		return (
			this.props.data.images.map((item, key) => {
				return (
					<View>
						{this.displayImage(item.link)}
					</View>
				)
			})
			/*<FlatList
				contentContainerStyle={styles.flexList}
				data={this.props.data.images}
				keyExtractor={(item) => item.id.toString()}
				renderItem={(item) => <ElementPost data={item.item} showAll={false} clickable={false}/>}
			/>*/
		)
	}

	postClick = (id) => {
		//console.log("Clicked ID is ", id)
		//console.log(this.props.navigation)
		this.props.navigation.navigate("PostView", {data: this.props.data})
	}

	render() {
		if (false && (this.props.showAll || !this.props.clickable)) {
			return (
				<View style={styles.postLarge}>
					<View style={styles.subTitleContainer}>
						<Text style={styles.subTitle}>{this.props.data.title}</Text>
					</View>
					{this.displayContent()}
				</View>
			)
		}
		return (
			<TouchableOpacity style={styles.post} onPress={() => this.postClick()}>
				<View style={styles.subTitleContainer}>
					<Text style={styles.subTitle}>{this.props.data.title}</Text>
				</View>				
				{this.displayContent()}
			</TouchableOpacity>
		)
	}
}

export default withNavigation(ElementPost)

const styles =  StyleSheet.create({
	image: {
		flex: 1,
		width: "100%"
	},
	subTitle: {
		marginLeft: 8,
		color: '#fff',
		fontSize: 15,
	},
	subTitleContainer: {
		flex: 1/10,
	},
	postContent: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
		alignItems: 'center',
		backgroundColor: 'blue',
		width: Dimensions.get("window").width,
	},
	post: {
		width: "100%",
		height: 350,
		backgroundColor: '#034649',
		marginBottom: 5,
		marginTop: 5,
	},
	postLarge: {
		paddingTop: 20,
		flex: 1,
		width: "100%",
		margin: 5
	}
})