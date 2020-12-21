import React, { Component } from 'react';

import classes from './Card.css';
class Card extends Component {
	render() {
		return (
			<div className={classes.card}>
				<div
					className={classes.image}
					style={{
						backgroundImage: `url(${this.props.imageUrl})`
					}}
				/>
				<div className={classes.content}>
					<h2>{this.props.name}</h2>
					<h4>{this.props.profession}</h4>
					<p>Previously</p>
					<img src={this.props.companyIcon} alt="company icon" />
				</div>
			</div>
		);
	}
}

export default Card;
