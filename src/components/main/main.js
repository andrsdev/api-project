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
    };
  }

  componentDidMount() {
    this.fetchNearEarthObjects();
  }

  async fetchNearEarthObjects() {
    try {
      this.setState({
        near_earth_objects: [],
      });

      const today = new Date();
      const formattedDate = Moment(today).format("YYYY-MM-DD");

      const data = await request(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedDate}&end_date=${formattedDate}&api_key=${environment.api_key}`
      );
      console.log(data.near_earth_objects[formattedDate][0]);
      this.setState({
        near_earth_objects: data.near_earth_objects[formattedDate],
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <main className={styles["content"]}>
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

      </main>
    );
  }
}

export default Main;
