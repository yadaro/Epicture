const API_TOKEN = "806afd4368f35f7"

export function getContent(page) {
	const url = "https://api.imgur.com/3/gallery/t/hot/viral"
	console.log("Get")
	return fetch(url, {
		headers: {
			'Authorization': "Client-ID " + API_TOKEN
		}
	})
	.then((response) => response.json())
	.catch((err) => console.error(err))
}

export function searchImg(query, sort, window) {

	// var url = "https://api.imgur.com/3/gallery/search/time/1?q=" + query
	var url = "https://api.imgur.com/3/gallery/search/" + sort + "/" + window + "/1?q=" + query
	console.log("Search")
	return fetch(url, {
		headers: {
			'Authorization': "Client-ID " + API_TOKEN
		}
	})
	.then((response) => response.json())
	.catch((err) => console.error(err))
}

export function getConnectionURL() {
	const url = "https://api.imgur.com/oauth2/authorize?client_id=" + API_TOKEN + "&response_type=token"
	return (url)
}