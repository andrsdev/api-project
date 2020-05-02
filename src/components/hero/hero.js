import React, { Component } from 'react';
import request from 'utils/request';
import styles from './hero.module.css';

class Hero extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {}
		}
	}

	componentDidMount() {
		this.fetchData();
	}


	async fetchData() {
		try {
			this.setState({
				data: {}
			});

			const data = await request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
			console.log(data);
			  this.setState({
			    data: data
			  });
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		return (
			<div className={styles["content"]}>
				<img src={this.state.data.url} alt="background"/>
				<div className={styles["hero"]}>
					<h3>{this.state.data.date} </h3>
					<h1>{this.state.data.title}</h1>
					<p className={styles["description"]}>
						{this.state.data.explanation}
					</p>
					
				</div>
			</div>
		);
	}

}

export default Hero;