import React, { Component } from 'react';

import classes from './CustomInput.css';

class CustomInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFocused: false,
			showError: false
		};
	}

	componentDidUpdate() {
		if (this.props.errorStatus) {
			this.props.onChange('errors', this.props.id, false);
			this.setState((curState) => ({
				...curState,
				showError: true,
				isFocused: true
			}));
		}
	}

	onValueChangeHandler = (e) => {
		const enteredText = this.props.id === 'imagePath' ? e.target.files[0] : e.target.value;
		this.setState((curState) => ({
			...curState,
			showError: this.getErrorStatus(enteredText)
		}));
	};

	onBlurHandler = (e) => {
		const enteredText = this.props.id === 'imagePath' ? e.target.files[0] : e.target.value;
		if (!this.state.isFocused) {
			this.setState((curState) => ({ ...curState, isFocused: true }));
		}
		this.setState((curState) => ({ ...curState, showError: this.getErrorStatus(enteredText) }));
		this.props.onChange('values', this.props.id, enteredText);
	};

	getErrorStatus = (text) => {
		return !text || text.length < 5 ? true : false;
	};

	render() {

		return (
			<div className={classes.inputContainer}>
				<label>{this.props.inputLabel}</label>

				<div className={classes.inputWrapper}>
					{this.props.inputType.toLowerCase() === 'select' ? (
						<select
							key={this.props.id}
							onChange={(e) => this.onValueChangeHandler(e)}
							onBlur={(e) => this.onBlurHandler(e)}
						>
							{this.props.options.map((option) => (
								<option key={option.toLowerCase()} value={option.toLowerCase()}>
									{option}
								</option>
							))}
						</select>
					) : (
						<input
							className={this.state.showError && this.state.isFocused ? classes.redBorder : null}
							type={this.props.inputType}
							accept={this.props.accept}
							onChange={(e) => this.onValueChangeHandler(e)}
							onBlur={(e) => this.onBlurHandler(e)}
						/>
					)}
					<p className={this.state.showError && this.state.isFocused ? classes.showError : null}>
						{this.props.errorMessage}
					</p>
				</div>
			</div>
		);
	}
}

export default CustomInput;
