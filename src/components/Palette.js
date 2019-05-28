import React, {Component} from 'react';
import ErrorMessage from './ErrorMessage';
import InstaService from '../services/instaservice';
import Spinner from './Spinner';

export default class Palette extends Component {
    InstaService = new InstaService();
	state = {
		photos: [],
		spinner: true,
		error: false
    }

    componentDidMount() {
		this.updatePhotos();
	}

	updatePhotos() {
		this.InstaService.getAllPhotos()
		.then(this.onPhotosLoaded)
		.catch(this.onError);
	}
	
	onPhotosLoaded = (photos) => {
		this.setState({
			photos,
			spinner: false,
			error: false
		})
	}

	onError = (err) => {
		this.setState({
			spinner: false,
			error: true			
		})
	}

	renderItems(arr) {
		return arr.map(item => {
			const { src, alt, id} = item;
			return (
				<img src={src} alt={alt} key={id}></img>
			)
		})
    }
    
    render () {
        const {error, spinner, photos} = this.state;
		if (spinner) {
			return <Spinner/>
		}
		
		if (error) {
            return <ErrorMessage/>
		}

        const items = this.renderItems(photos);

        return (
            <div className="palette">
                {items}
            </div>
        )
    }
} 