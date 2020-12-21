import React, { Component } from 'react';

import classes from './AddNewProfileScreen.css';
import CustomInput from '../components/CustomInput';
import profile from '../models/profile';

class AddNewProfileScreen extends Component {
	constructor(props) {
		super(props);
		// console.log('<------------------------------------------------------------------------->');
		// console.log('AddNewProfileScreen [Constructor]');
		this.state = {
			values: {
				name: '',
				profession: '',
				imagePath: '',
				companyName: ''
			},
			errors: {
				name: false,
				profession: false,
				imagePath: false,
				companyName: false
			}
		};
	}

	// run at component creation & update
	// static getDerivedStateFromProps(nextProps, nextState) {
	// 	console.log('AddNewProfileScreen [getDerivedStateFromProps]');
	// 	return nextState;
	// }

	// run at component craetion
	// componentDidMount() {
	// 	console.log('AddNewProfileScreen [componentDidMount]');
	// }

	// run at component update
	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log(this.state);
	// 	console.log('AddNewProfileScreen [shouldComponentUpdate]');
	// 	return true;
	// }

	// run at component update
	// getSnapshotBeforeUpdate(preProps, preState) {
	// 	console.log('AddNewProfileScreen [getSnapshotBeforeUpdate]');
	// 	return {
	// 		name: 'Usman'
	// 	};
	// }

	// run at component update
	// componentDidUpdate(preProps, preState, snapShot) {
	// 	console.log(snapShot);
	// 	console.log('AddNewProfileScreen [componentDidUpdate]');
	// }

	// run when component is unmount / destroyed
	// componentWillUnmount() {
		// console.log('AddNewProfileScreen [componentWillUnmount]');
	// }

	onStateChangeHandler = (type, key, value) => {
		this.setState((curState) => ({
			...curState,
			[type]: {
				...curState[type],
				[key]: value
			}
		}));
	};

	saveProfileDataHandler =  () => {
		let error = false;
		if (this.state.values.name.length < 5) {
			this.onStateChangeHandler('errors', 'name', true);
			error = true;
		}
		if (this.state.values.profession.length < 5) {
			this.onStateChangeHandler('errors', 'profession', true);
			error = true;
		}
		if (!this.state.values.imagePath) {
			this.onStateChangeHandler('errors', 'imagePath', true);
			error = true;
		} else {
			const { name } = this.state.values.imagePath;
			const fileExt = name.slice(((name.lastIndexOf('.') - 1) >>> 0) + 2);
			const extensions = 'png jpg jpeg';
			if (!extensions.includes(fileExt)) {
				this.onStateChangeHandler('errors', 'imagePath', true);
				error = true;
			}
		}
		if (!this.state.values.companyName) {
			this.onStateChangeHandler('errors', 'companyName', true);
			error = true;
		}

		if (!error) {
			const fileReader = new FileReader();
			fileReader.onload = () => {
				this.props.addNewProfile(
					new profile(
						this.state.values.name,
						this.state.values.profession,
						fileReader.result,
						this.state.values.companyName
					)
				);
				this.props.switchScreen(true);
			};
			fileReader.readAsDataURL(this.state.values.imagePath);
		}
	};

	render() {
		// console.log('AddNewProfileScreen [render]');
		return (
			<div className={classes.screen}>
				<h1 className={classes.heading}>Profile Information</h1>
				<div className={classes.form}>
					<CustomInput
						id="name"
						inputLabel="Name:"
						inputType="text"
						errorMessage="Error! input should have atleast 5 characters!"
						errorStatus={this.state.errors.name}
						value={this.state.values.name}
						onChange={this.onStateChangeHandler}
					/>
					<CustomInput
						id="profession"
						inputLabel="Profession:"
						inputType="text"
						errorMessage="Error! input should have atleast 5 characters!"
						errorStatus={this.state.errors.profession}
						onChange={this.onStateChangeHandler}
					/>
					<CustomInput
						id="imagePath"
						inputLabel="Image:"
						inputType="file"
						accept=".png, .jpg, .jpeg"
						errorMessage="Error! attach an image (.png, .jpg, .jpeg only)"
						errorStatus={this.state.errors.imagePath}
						onChange={this.onStateChangeHandler}
					/>
					<CustomInput
						id="companyName"
						inputLabel="Company:"
						inputType="select"
						options={[ '', 'Google', 'Facebook', 'Apple', 'Amazon', 'Microsoft' ]}
						errorMessage="Error! select an option!"
						errorStatus={this.state.errors.companyName}
						onChange={this.onStateChangeHandler}
					/>
					<div className={classes.btnsContainer}>
						<button type="submit" className={classes.btn}  onClick={this.saveProfileDataHandler}>
							Add
						</button>
						<button type="button" className={classes.btn} onClick={() => this.props.switchScreen(true)}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default AddNewProfileScreen;
