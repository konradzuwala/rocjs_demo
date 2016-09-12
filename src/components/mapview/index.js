import React from 'react';
import styles from './style.scss';
import $ from 'jquery'; 

let map = null;
let markers = null;
let REGULAR_ICON;
let request = null;

export default class MapView extends React.Component {
  
  initializeMap() {
    var platform = new H.service.Platform({
      'app_id': 'appid',
      'app_code': 'appcode',
      'useHTTPS': true
    });
    // Create map with default layers (the usual city map)
    var defaultLayers = platform.createDefaultLayers();
    
    // Create map object in element with #map-container
    // save it as global!
    map = new H.Map(
      document.getElementById('map-container'),
      defaultLayers.normal.map,
      {
          zoom: 6,
          center: { lat: 55.7, lng: 12.4 }
      });
    markers = new H.map.Group();
    map.addObject(markers);

    // make map react to default panning and zooming
    //let mapEvents = new H.mapevents.MapEvents(map);
    //let behavior = new H.mapevents.Behavior(mapEvents);
  }
  handleResize() {
    map.getViewPort().resize();
    if (markers.getBounds() !== null) {
      map.setViewBounds(markers.getBounds());
    }
  }
  clearMap() {
    markers.removeAll();
  }
  drawVehicles() {

        var marker = new H.map.Marker({
          lat: 55.676098,
          lng: 12.568337
        });
	
        markers.addObject(marker);
      console.log('done');
      map.setViewBounds(markers.getBounds());
  }
  fetchData() {
    console.log('fetch');
    /*
    fetch('http://jsonplaceholder.typicode.com/posts/1').then(function(response) { // some stupid RESTful call, just for demo
      console.log(response);
      return response.json;
    })
    .then(function(vehicle) {
       this.setState({vehicles: vehicle}, function() {
          console.log('redraw');
          this.redraw();
       }.bind(this));
    }.bind(this));*/

    $.get('http://jsonplaceholder.typicode.com/posts/1', function(response) {
	console.log("responded");
	this.setState({vehicles: response}, function() {
		this.redraw();
		}.bind(this));
		}.bind(this));
  }

  redraw() {
    this.clearMap();
    this.drawVehicles();
  }
  componentDidMount() {
    console.log("mounted");
    this.initializeMap();
    this.fetchData();
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  render() {
    return (
      <div className={ styles.container }>
        <div id="map-container" className={ styles.map }>
        </div>
      </div>
    );
  }
}
