import React from 'react';
import { StyleSheet, Text, Image, ScrollView, View } from 'react-native';
import { searchImg } from "../API/API"
import { Header, Input, Item, Icon, Button, CardItem } from 'native-base'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true,
      query: '',
      afterReq: false
    }
    afterReq = false
  }

  _searchImg(filterTop, filterWindow) {
    searchImg(this.state.query, filterTop, filterWindow)
      .then(response => {
        this.setState({
          data: response.data,
          isLoading: false,
        })
      })
  }

  displayImg(image, key) {
    if (this.state.isLoading == false) {
      if (image.images) {
        // console.log("before", this.props.afterReq)
        // this.props.afterReq = true
        // console.log("after", this.props.afterReq)
        return (
          <Image key={key}
            source={{ uri: image.images[0].link }}
            style={{ width: 100, height: 100, marginVertical: 2, marginHorizontal: 1 }}
          />
        );
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header searchBar rounded style={{ backgroundColor: 'grey',  }}>
          <Item>
            <Icon name="ios-search"/>
            <Input
              onChangeText={(query) => this.setState({ query })}
              placeholder="Search..."
              returnKeyType="search"
              onSubmitEditing={() => this._searchImg("top", "all")}
          />
      </Item>
        </Header>
        <ScrollView>
          {/* {this.state.afterReq ? <Test/> : null} */}
          
          
          {
          <View hide={this.state.afterReq} style={styles.displayContent2}>
            <Button style={styles.MyButton} onPress={() => this._searchImg("top", "all")}>
              <Text style={styles.textButton} >Top</Text>
            </Button>

       <Button style={styles.MyButton} onPress={() => this._searchImg("viral", "all")}>
         <Text style={styles.textButton}>Viral</Text>
       </Button>

       <Button style={styles.MyButton} onPress={() => this._searchImg("time", "all")}>
         <Text style={styles.textButton}>Newest</Text>
       </Button>
     </View>
        // : null 
        }
          <View style={styles.displayContent}>
            {
              this.state.data.map((image, key) => (
                this.displayImg(image, key)
              ))
            }
          </View>
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
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    flexWrap: "wrap",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayContent2: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    flexWrap: "wrap",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
});

// class Test extends React.Component {
//   render() {
//     return (<View style={styles.displayContent2}>
//       <Button style={styles.MyButton} onPress={() => Search._searchImg("top", "all")}>
//         <Text style={styles.textButton} >TOP</Text>
//       </Button>

//       <Button style={styles.MyButton} onPress={() => Search._searchImg("viral", "all")}>
//         <Text style={styles.textButton}>VIRAL</Text>
//       </Button>

//       <Button style={styles.MyButton} onPress={() => Search._searchImg("time", "all")}>
//         <Text style={styles.textButton}>TIME</Text>
//       </Button>

//     </View>);
//   }
// }