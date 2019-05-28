export default class InstaService {
	constructor() {
		this._apiBase = 'http://localhost:3000/'
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, recieved ${res.status}`)
		}
		return res.json();
	}

	getAllPosts = async () => {
		const res = await this.getResource('posts/');
		return res;
	}

	getAllUsers =  async () => {
		const res = await this.getResource('posts/');
		return res.map(this._transformForUsers);
	}

	_transformForUsers = (post) => {
		return {
			name: post.name,
			altname: post.altname,
			photo: post.photo,
			id: post.id
		}
	}

	getAllPhotos = async () => {
		const res = await this.getResource('posts/');
		return res.map(this._transformPosts);
	}

	_transformPosts = (post) => {
		return {
			src: post.src,
			alt: post.alt,
			id: post.id
		}
	}
}