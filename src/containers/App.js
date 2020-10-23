import React, { Component } from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components//SearchBox.js';
import './app.css';
import Scroll from '../components/Scroll.js';

class App extends Component {
	constructor() {
		super();

		this.state = {
				robots: [],
				searchfield: '',
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users').then(response => {
			return response.json();
		}).then(users => {
			this.setState({ robots: users});
		});
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
	}

	render() {
		const filteredRobots = this.state.robots.filter(robots => {
			return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		});

		if (this.state.robots.length === 0) {
			return (
				<div className="tc">
					<h1 className="f1">RoboFriends</h1>
					<h1 classBane="f1">Loading...</h1>
				</div>
			);
		} else {
			return (
				<div className="tc">
					<h1 className="f1">RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<CardList robots={filteredRobots}/>
					</Scroll>
				</div>
			);
		}
	}
};

export default App;