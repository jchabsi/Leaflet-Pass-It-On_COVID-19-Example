import { getCovid19Data } from './getCovid19Data.js'; //Covid-19 Data Parser Module
import { addControls } from './addConfirmed.js'; //Covid-19 mocked data module

//First creates the map object
export var mymap = L.map('mapid').setView([-38.4160957, -63.6166725], 5);   

//Adds the tile layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 18
}).addTo(mymap);

//Gets COVID-19 Argentina Data from an API
getCovid19Data();

//Add leyend and info controls to the map
addControls();





