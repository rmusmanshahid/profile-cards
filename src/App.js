import React, { Component } from 'react';
import classes from './App.css';

import ProfilesListScreen from './screens/ProfilesListScreen';
import AddNewProfileScreen from './screens/AddNewProfileScreen';

class App extends Component {
	state = {
		profiles: [],
		showProfilesScreen: true
	};

	addNewProfile = (newProfile) => {
		this.setState((curState) => ({
			...curState,
			profiles: curState.profiles.concat(newProfile)
		}));
	};

	switchScreen = (value) => {
		this.setState((curState) => ({
			...curState,
			showProfilesScreen: value
		}));
	};

	render() {
		return (
			<div className={classes.screen}>
				{this.state.showProfilesScreen ? (
					<ProfilesListScreen switchScreen={this.switchScreen} profiles={this.state.profiles} />
				) : (
					<AddNewProfileScreen switchScreen={this.switchScreen} addNewProfile={this.addNewProfile} />
				)}
			</div>
		);
	}
}

export default App;
