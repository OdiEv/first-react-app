import React, {Component} from 'react';
import User from './User';
import InstaService from '../services/instaservice';
import ErrorMessageUsers from './ErrorMessageUsers';

export default class Users extends Component {
	InstaService = new InstaService();
	state = {
		users: [],
		error: false
	}

	componentDidMount() {
		this.updateUsers();
	}

	updateUsers() {
		this.InstaService.getAllUsers()
		.then(this.onUsersLoaded)
		.catch(this.onError);
	}
	
	onUsersLoaded = (users) => {
		this.setState({
			users,
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
			// choose item with min id (for example)
			const n = arr.reduce((min, current) => current.id < min ? current.id : min, arr[0].id);
			if (item.id === n) {
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
		const {error, users} = this.state;
		if (error) {
			return <ErrorMessageUsers/>
		}
		const items = this.renderUsers(users);
		const item = this.renderActiveUser(users);
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