import React, {Component} from 'react';
import User from './User';
import InstaService from '../services/instaservice';
import ErrorMessageUsers from './ErrorMessageUsers';

export default class Users extends Component {
	InstaService = new InstaService();
	state = {
		posts: [],
		error: false
	}

	componentDidMount() {
		this.updatePosts();
	}

	updatePosts() {
		this.InstaService.getAllPosts()
		.then(this.onPostsLoad)
		.catch(this.onError);
	}
	
	onPostsLoad = (posts) => {
		this.setState({
			posts,
			error: false
		})
	}

	onError = (err) => {
		this.setState({
			error: true
		})
	}

	renderUsers (arr) {
		return arr.map(item => {
			const {name, altname, photo, id} = item;
			return (
				<User
					key={id}
					src={photo}
					alt={altname}
					name={name}
					min/>
			)
		})
	}

	renderActiveUser(arr) {
		return arr.map(item => {
			const {name, altname, photo, id} = item;
			const n = arr.reduce((min, p) => p.id < min ? p.id : min, arr[0].id);
			if (item.id == n) {
				return (
					<User
						key={id}
						src={photo}
						alt={altname}
						name={name}/>
				)
			}
		})
	}

	render() {
		const {error, posts} = this.state;
		if (error) {
			return <ErrorMessageUsers/>
		}
		const items = this.renderUsers(posts);
		const item = this.renderActiveUser(posts);
		return (
			<div className="right">
				{item}
				<div  className="users__block">
					{items}
				</div>
			</div>
		)
	}
}