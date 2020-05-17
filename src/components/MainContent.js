import React from "react";
import Forecast from "./Forecast"
import ReactDOM from "react-dom"
class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      lat: null,
      lon: null,
    };

    this.getWeather = this.getWeather.bind(this);
    this.getWeatheratCity = this.getWeatheratCity.bind(this);
    this.displayForecast = this.displayForecast.bind(this)
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude);
        this.getWeather(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  getWeather(lat, lon) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric&appid=c1547e16f89f47b9711cb39aa31ce3a9"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          cityId: data["id"],
          Temperature: data["main"]["temp"],
          desc: data["weather"][0]["description"],
          minTemp: data["main"]["temp_min"],
          maxTemp: data["main"]["temp_max"],
          humidity: data["main"]["humidity"],
          name: data["name"],
          date: data["dt"],
          lat: null,
          lon: null,
        });
      })
      .catch(console.log);
  }

  getWeatheratCity() {
    var city = document.getElementById("userinput").value;
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=c1547e16f89f47b9711cb39aa31ce3a9"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          cityId: data["id"],
          Temperature: data["main"]["temp"],
          desc: data["weather"][0]["description"],
          minTemp: data["main"]["temp_min"],
          maxTemp: data["main"]["temp_max"],
          humidity: data["main"]["humidity"],
          name: data["name"],
          date: data["dt"],
          lat: null,
          lon: null,
        });
        console.log(data);
      })
      .catch(console.log);
    this.render();
  }

  displayForecast() {
    ReactDOM.render(< Forecast city={this.state.cityId}/>, document.getElementById("root"))
  }

  render() {
    var date = new Date(this.state.date * 1000);

    return (
      <div align="center">
        <div id="inputdiv">
          <input id="userinput" type="text" className="form-control"></input>
          <input
            id="subinput"
            className="btn btn-primary"
            type="submit"
            value="submit"
            onClick={this.getWeatheratCity}
          />
        </div>
        <h2>{this.state.name}</h2>
        <h1>{this.state.Temperature + "°C"}</h1>
        <div>
          <h2 className="maxmin">{"Max Temp: " + this.state.maxTemp + "°C"}</h2>
          <h2 className="maxmin">{"Min Temp: " + this.state.minTemp + "°C"}</h2>
          <h2>{this.state.desc}</h2>
        </div>
        <div>
          <input
            id="forecastButton"
            className="btn btn-primary"
            value="Show Forecast"
            onClick={this.displayForecast}
          />
        </div>
        <div>
          <br />
          <h4>
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h4>
          <h4>{date.toLocaleDateString()}</h4>
        </div>
      </div>
    );
  }
}

export default MainContent;