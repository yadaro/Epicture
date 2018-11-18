import { createStackNavigator } from 'react-navigation'
import Profile from '../Components/Profile'
import ListPosts from '../Components/ListPosts'
import Post from '../Components/Post'

const SearchStackNavigator = createStackNavigator({
	Profile: {
		screen: Profile,
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
			title: 'Profile'
		}
	},
	ListFavs: {
		screen: ListPosts,
		navigationOptions: {
			title: 'Favorites'
		}
	},
	ListImgs: {
		screen: ListPosts,
		navigationOptions: {
			title: 'Images'
		}
	},
	PostView: {
		screen: Post,
		navigationOptions: {
			title: "Post"
		}
	}
})

export default SearchStackNavigator