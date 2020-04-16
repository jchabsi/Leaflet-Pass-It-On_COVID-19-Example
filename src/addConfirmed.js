import { provincias } from './provincias.js'; //GeoJSON Data from Argentina Provinces
import { mymap } from './main.js'; 

let info, legend; // Map controls ]

const confirmedScale = {
    L1: 10,
    L2: 20,
    L3: 50,
    L4: 100,
    L5: 200,
    L6: 500,
    L7: 1000    
}

//Variable that stores the GeoJSON object
let geojson;

//Add GeoJson layers data with confirmed cases to the map
export function addConfirmedToMap(){
    geojson = L.geoJson(provincias, {
        style: style,                   //call to style funtion
        onEachFeature: onEachFeature    //call to onEachFeature funtion
    }).addTo(mymap);
}

//Applies a style for the map. Here we set a color per province according the confirmed cases
function style(feature) {
    return {
        fillColor: getColor(feature.properties.confirmed),
        weight: 1,
        opacity: 1,
        color: '#555',
        dashArray: '3',
        fillOpacity: 0.5
    };
}

//Funtion that chooses a color according confirmed cases
function getColor(confirmed) {
    return confirmed > confirmedScale.L7 ? '#8c2d04' :
           confirmed > confirmedScale.L6  ? '#d94801' :
           confirmed > confirmedScale.L5  ? '#f16913' :
           confirmed > confirmedScale.L4  ? '#fd8d3c' :
           confirmed > confirmedScale.L3   ? '#fdae6b' :
           confirmed > confirmedScale.L2   ? '#fdd0a2' :
           confirmed > confirmedScale.L1   ? '#fee6ce' :
                      '#fff5eb';
}

//This adds interaction with the map
//Adds event listeners on the GeoJson (provinces) layers:
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

//Mouse Over Event listener for highlight feature
//Highlights the hovered layer (province)
function highlightFeature(e) {
    let layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties, provincias.total_infections);
}

//Mouse Out event listener that resets the highlighted layer
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

//Click event listener. Zooms to the clicked layer using the fitBounds funtion
function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

export function addControls()
{
    ///////////////
    // Info Control
    // Shows the data for the hovered province
    info = L.control();

    info.onAdd = function (mymap) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props, total_infections) {
        this._div.innerHTML = '<h4>Casos COVID-19 por provincia</h4>' +  (props ?
            '<b>' + props.nam + '</b><br /><b>' + props.confirmed + '</b> casos</br />' +
            'de ' + total_infections + ' casos totales' 
            : 'Posiciónate sobre una provincia');
    };

    info.addTo(mymap);

    //////////////////
    // Leyend Control
    // Shows the confirmed cases color scale
    legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

        let div = L.DomUtil.create('div', 'info legend'),
            scale = [0, confirmedScale.L1, confirmedScale.L2, confirmedScale.L3, confirmedScale.L4, confirmedScale.L5, confirmedScale.L6, confirmedScale.L7],
            labels = [];

        // loop through our confirmed cases intervals and generate a label with a colored square for each interval
        for (var i = 0; i < scale.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(scale[i] + 1) + '"></i> ' +
                scale[i] + (scale[i + 1] ? '&ndash;' + scale[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(mymap);

}
