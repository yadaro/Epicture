import React from 'react';
import { StyleSheet, Text, Image, View, FlatList, Dimensions} from 'react-native';

export default class ImagePreview extends React.Component {
	render() {
		const data = this.props.data
		if (data.images == undefined || data.images.length == 0) {
			return (<View></View>)
		}
		//console.log(data.images[0].link)
		heightW = Dimensions.get('window').height
		widthW = Dimensions.get('window').width
		return (
			<View style={styles.container}>
				<Image style={{height: heightW, width: widthW}} source={{uri: data.images[0].link}}/>
			</View>
		)
	}
}
/*
<FlatList style={styles.album}
				data={data.images}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => 
				<Image style={styles.image} source={{uri: item.link}}/>}
				/>
 */

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  flexDirection: 'row',
	  backgroundColor: 'red',
	  margin: 2
	},
	image: {
		flex: 1,
	},
	album: {
		flex:1,
		flexDirection: 'row'
	}
});
