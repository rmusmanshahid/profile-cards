import React, { Component } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import classes from './ProfilesListScreen.css';
import Card from '../components/Card';

SwiperCore.use([Pagination, Navigation]);

class ProfilesListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = this.getStateObject();
	}

	componentDidMount() {
		if (this.props.profiles.length > 0) {
			window.addEventListener('resize', this.onScreenResizeHandler);
		}
	}

	componentDidUpdate() {
		if (this.props.profiles.length > 0) {
			window.addEventListener('resize', this.onScreenResizeHandler);
		} else {
			window.removeEventListener('resize', this.onScreenResizeHandler);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onScreenResizeHandler);
	}

	getStateObject = () => {
		console.log('In function');
		let data;
		if (window.innerWidth > 900 && this.props.profiles.length >= 3) {
			data = { perView: 3, classType: 'large' };
		} else if (window.innerWidth > 650 && this.props.profiles.length >= 2) {
			data = { perView: 2, classType: 'medium' };
		} else if (window.innerWidth > 450 && this.props.profiles.length >= 1) {
			data = { perView: 1, classType: 'small' };
		} else {
			data = { perView: 1, classType: 'xsmall' };
		}

		return {
			profilesPerView: data.perView,
			screenWidthClass: classes[`sw_${data.classType}`],
			cardsWidthClass: this.props.profiles.length === 0 ? classes.hide : classes[`cw_${data.classType}`],
			curInnerWidth: window.innerWidth,
			shouldUpdate: true
		};
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps !== this.props) {
			return true;
		}
		return nextState.shouldUpdate;
	}

	onScreenResizeHandler = () => {
		// preWidth > 900 && curWidth < 900
		// preWidth > 650 && curWidth < 650
		// preWidth > 450 && curWidth < 450

		// preWidth < 450 && curWidth > 450
		// preWidth > 450 && curWidth > 650
		// preWidth > 650 && curWidth > 900
		const curWidth = this.state.curInnerWidth;
		const nextWidth = window.innerWidth;
		if (
			(curWidth > 900 && nextWidth < 900) ||
			(curWidth > 650 && nextWidth < 650) || 
			(curWidth > 450 && nextWidth < 450) ||
			(curWidth < 450 && nextWidth > 450) ||
			(curWidth < 650 && nextWidth > 650) ||
			(curWidth < 900 && nextWidth > 900)
			) {
			this.setState(this.getStateObject());
		} else {
			this.setState(curState => ({ ...curState, shouldUpdate: false }));
		}

	};

	render() {
		return (
			<div className={`${classes.screen} ${this.state.screenWidthClass}`}>
				<Swiper
					slidesPerView={this.state.profilesPerView}
					spaceBetween={this.props.profiles.length > 1 ? 20 : 0}
					navigation
         		pagination={{ clickable: true }}
					className={`${classes.cards} ${this.state.cardsWidthClass}`}
				>
					{this.props.profiles.map((profile) => (
						<SwiperSlide key={profile.profileId}>
							<Card
								imageUrl={profile.imagePath}
								name={profile.name}
								profession={profile.profession}
								companyIcon={require(`../assests/images/${profile.companyName}.png`)}
							/>
						</SwiperSlide>
					))}
				</Swiper>

				<button

					className={classes.btn}

					onClick={() => this.props.switchScreen(false)}
				>
					<img src={require('../assests/images/add.png')} alt="add icon" />
					<p>Add more</p>
				</button>
			</div>
		);
	}
}

export default ProfilesListScreen;
