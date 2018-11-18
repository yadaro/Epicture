import React from 'react';
import { StyleSheet, Text, Image, ScrollView, View, Picker, ActivityIndicator, FlatList } from 'react-native';
import { searchImg } from "../API/API"
import { Header, Input, Item, Icon, Button, CardItem } from 'native-base'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: false,
      query: '',
      // afterReq: false,
      filters: 'top',
      fWindow: 'all'
    }
  }

  _searchImg(filterTop, filterWindow) {
    if (filterTop != 'top') {
      this.fWindow = 'all'
    }
    this.setState({
      isLoading: true
    })
    searchImg(this.state.query, filterTop, filterWindow)
    // this.state.data.map((image, key) => (
    //   this.displayImg(image, key)
    // ))
      .then(response => {
        this.setState({
          filters: filterTop,
          fWindow: filterWindow,
          data: response.data,
          isLoading: false,
          // afterReq: true
        })
      })
    //   var link
		// if (this.props.data == undefined) {
		// 	return (<View></View>)
		// } else if (this.props.data.images == undefined) {
		// 	link = this.props.data.link
		// } else {
		// 	link = this.props.data.images[0].link
		// }
		// console.log(link)
		//
			// return (<Image style={styles.image} resizeMode="contain" source={{uri: link}}/>)
      // return (
      //   <Image
      //     source={{ uri: this.state.data.images[0].link }}
      //     style={styles.image}
      //     resizeMode="contain"
      //   />
      // );
  }

  displayImg(image, key) {
    
      if (image.images) {
        return (
          <Image key={key}
            source={{ uri: image.images[0].link }}
            style={styles.image}
            // resizeMode="contain"
          />
        );
      }
  }

  displayFilters() {
      return (<View style={styles.displayContent2}>
        <Picker
          selectedValue={this.state.filters}
          style={styles.MyPicker}
          onValueChange={(itemValue) => this._searchImg(itemValue, this.state.fWindow)}>
          <Picker.Item label="Top" value="top" />
          <Picker.Item label="Viral" value="viral" />
          <Picker.Item label="Newest" value="time" />
        </Picker>
      </View>);
  }

  filterWindow() {
      if (this.state.filters == 'top') {
      return (
      <Picker
          selectedValue={this.state.fWindow}
          style={styles.MyPicker}
          onValueChange={(itemValue) => this._searchImg(this.state.filters, itemValue)}>
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Month" value="month" />
          <Picker.Item label="Year" value="year" />
        </Picker>);
    }
  }

  isLoading() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size='small' />
        </View>
      );
    }
  }

  render() {
    console.log(this.state.isLoading)
    return (
      <View style={styles.container}>
        <Header searchBar rounded style={{ backgroundColor: 'grey' }}>
          <Item>
            <Icon name="ios-search" />
            <Input
              onChangeText={(query) => this.setState({ query })}
              placeholder="Search..."
              returnKeyType="search"
              onSubmitEditing={() => this._searchImg(this.state.filters, this.state.fWindow)}
            />
          </Item>
        </Header>
        <ScrollView>

          <View style={styles.displayContent}>
          {
            this.displayFilters()
          }
          {
            this.filterWindow()
          }
          </View>
          <View style={styles.displayContent} >
            {
              this.state.data.map((image, key) => (
                this.displayImg(image, key)
              ))
            }
          {/* <FlatList
					contentContainerStyle={styles.flexList}
					data={this.state.data}
					keyExtractor={(item) => item.id.toString()}
					renderItem={(item) => <Search data={item.item}/>}
					numColumns={3}
				  /> */}

          </View>
          {
            this.isLoading()
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09545b',
    marginTop: 20,
    flexWrap: "wrap",
  },
  MyPicker: {
    width: 120,
    height: 50,
    color: 'white',
    borderColor: 'white',
  },
  MyButton: {
    marginVertical: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    width: 80,
    height: 30,
    borderRadius: 8
  },
  textButton: {
    color: 'white',
    fontSize: 15
  },
  displayContent: {
    flex: 1/3,
    alignItems: 'center',
    marginHorizontal: 20,
    flexWrap: "wrap",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    // flex: 1,
    // height: 200,
    // width: "100%",
    width: 100, 
    height: 100, 
    marginVertical: 2,
    marginHorizontal: 1
  }
});