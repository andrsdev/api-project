import React, { Component } from "react";
import request from "utils/request";
import styles from "./main.module.css";
import environment from ".env.js";
import Moment from "moment";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
			near_earth_objects: [],
			mars_photos: [],
			apollo: {},
			solar_flare: {}
    };
  }

  componentDidMount() {
		this.fetchNearEarthObjects();
		this.fetchMarsPhotos();
		this.fetchApollo();
		this.fetchSolarFlare();
	}

	getTodayFormattedDate() {
		const today = new Date();
		const formattedDate = Moment(today).format("YYYY-MM-DD");
		return formattedDate;
	}

	async fetchApollo() {
    try {
      this.setState({
        apollo: {},
			});

      const data = await request(
        `https://images-api.nasa.gov/search?q=apollo%1969&description=moon%20landing&media_type=image`
			);

      this.setState({
        apollo: data.collection.items[0]
      });
    } catch (error) {
      console.error(error);
    }
  }

  async fetchNearEarthObjects() {
    try {
      this.setState({
        near_earth_objects: [],
      });

      const formattedDate = this.getTodayFormattedDate();
      const data = await request(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedDate}&end_date=${formattedDate}&api_key=${environment.api_key}`
			);
			
      this.setState({
        near_earth_objects: data.near_earth_objects[formattedDate],
      });
    } catch (error) {
      console.error(error);
    }
	}
	
  async fetchMarsPhotos() {
    try {
      this.setState({
        mars_photos: [],
			});

      const data = await request(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${environment.api_key}`
			);

      this.setState({
        mars_photos: data.photos
      });
    } catch (error) {
      console.error(error);
    }
	}
	
	
  async fetchSolarFlare() {
    try {
      this.setState({
        solar_flare: {},
			});

      const data = await request(
        `https://api.nasa.gov/DONKI/FLR?startDate=2016-01-01&endDate=2016-01-30&api_key=${environment.api_key}`
			);

			console.log(data[0]);

      this.setState({
        solar_flare: data[0]
      });
    } catch (error) {
      console.error(error);
    }
	}
	

  render() {
    return (
      <main className={styles["content"]}>

				<h2>Apollo 11</h2>
				<div className={styles["apollo-grid"]}>
					<img src={this.state.apollo.links?.[0].href} alt="apollo 11"/>
					<p>{this.state.apollo.data?.[0].description}</p>
				</div>
	
				<h2>Mars Rover Photos</h2>
				<div className={styles["mars-cards-container"]}>
					{
						this.state.mars_photos.map((element) => {
							return (
								<div className={styles["mars-card"]} key={element.id}>
									<img src={element.img_src} alt="mars"/>
									<div className={styles["mars-card-text"]}>
										<h3>{element.id}</h3>
										<p><strong>Rover:</strong> {element.rover.name}</p>
										<p><strong>Camera:</strong> {element.camera.full_name}</p>
										<p><strong>Date:</strong> {element.earth_date}</p>
									</div>
								</div>
							);
						})
					}
				</div>


        <h2>Near Earth Objects</h2>
				<div className={styles["object-cards-container"]}>
					{
						this.state.near_earth_objects.map((element) => {
							return (
								<div className={styles["object-card"]} key={element.id}>
									<h3>{element.name}</h3>
									<p><strong>ID:</strong> {element.id}</p>
									<p><strong>Diameter:</strong> {Math.round(element.estimated_diameter.meters.estimated_diameter_max)} m</p>
									<p><strong>Distance:</strong> {Math.round(element.close_approach_data[0].miss_distance.kilometers)} Km</p>
								</div>
							);
						})
					}
				</div>

				<h2>Solar Flare</h2>
				<br></br>
				<br></br>
				<p><strong>Active regions: </strong> {this.state.solar_flare.activeRegionNum}</p>
				<p><strong>Source location: </strong> {this.state.solar_flare.sourceLocation}</p>
				<p><strong>Class type: </strong> {this.state.solar_flare.classType}</p>
				<p><strong>Begin time: </strong> {this.state.solar_flare.beginTime}</p>
				<p><strong>Peak time: </strong> {this.state.solar_flare.peakTime}</p>



      </main>
    );
  }
}

export default Main;
