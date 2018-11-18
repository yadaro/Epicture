import { createStackNavigator } from 'react-navigation'
import Profile from '../Components/Profile'
import ListPosts from '../Components/ListPosts'
import PostView from '../Components/PostView'

const SearchStackNavigator = createStackNavigator({
	Profile: {
		screen: Profile,
		navigationOptions: {
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
		screen: PostView,
		navigationOptions: {
			title: "Post"
		}
	}
})

export default SearchStackNavigator