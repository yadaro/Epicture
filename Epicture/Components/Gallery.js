import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import ImagePreview from "./ImagePreview"
import { getContent } from "../API/API"

export default class Gallery extends React.Component {
  constructor(props) {
	  super(props)
	  this.state = { data: [], isLoading: true }
	  this.page = 0
	  this.totalPages = 0
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View>
	  <ActivityIndicator size='large'/>
	</View>
	 )
    }
  }

  _loadData() {
	  //this.setState()
	getContent()
	.then(response => {
		//console.log(resposdata)
		this.setState({ 
			data: response.data.items, 
			isLoading: false
		      })
		//console.log(response.data.items)
		console.log("data")
		console.log(this.state.data[0])
		
	})
  }

  render() {
	  console.log("RENDER")
	if (this.state.isLoading) {
		console.log("Loading")
		this._loadData()
		return (
		<View>
	  	<ActivityIndicator size='large'/>
		</View>
		)
	}
	console.log("Loaded")
	return (
	<View style={styles.container}>
		<FlatList style={styles.list}
			data={this.state.data}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({item}) => <ImagePreview data={item}/>}
		/>
		{this._displayLoading()}
	</View>
    );
  }
}

/*
<FlatList
			data={this.state.data.items}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({item}) => <ImagePreview item={item}/>}
		/>
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  list: {
	  backgroundColor: 'green',
	  flex: 1,
  }
});