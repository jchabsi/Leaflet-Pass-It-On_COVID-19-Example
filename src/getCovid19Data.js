import { provincias } from './provincias.js'; //GeoJSON Data from Argentina Provinces
import { addConfirmedToMap } from './addConfirmed.js'; //GeoJSON Data from Argentina Provinces

export function getCovid19Data() {
    let xhttp = new XMLHttpRequest();
    let useAPI = true; //set to NO allows you to work with mocked data if the API doesn't work 
    let parsed = false
    if (useAPI) {
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let covid19Data = JSON.parse(xhttp.responseText);
                parseCovid19Data(provincias, covid19Data);
                addConfirmedToMap();
                parsed = true;
            }
        };

        //COVID-19 API by Alan Campora - Source code https://github.com/alancampora/argentina-covid19-data
        //You might need to allow cross origin resourse sharing (CORS) to make it work
        xhttp.open("GET", "https://argentina-covid19-data.now.sh/api/v0/daily", true);
        xhttp.send();
    }
    else {
        parseCovid19Data(provincias, mockedCovid19Data);
        addConfirmedToMap();
        parsed = true;
    }
    return parsed;
}

//Parse retrieved COVID-19 data and adds it to the GeoJSON object
export function parseCovid19Data(provincias, covid19Data) {
    let covidLastInfo = covid19Data[Object.keys(covid19Data)[Object.keys(covid19Data).length - 1]];
    provincias.total_infections = covidLastInfo.total_infections;
    provincias.features.forEach( item => {
        let name = item.properties.nam;
        switch (name) {
            case "Ciudad Autónoma de Buenos Aires":
                item.properties.confirmed = covidLastInfo.caba.confirmed;
                break;
            case "Neuquén":
                item.properties.confirmed = covidLastInfo.neuquen.confirmed;
                break;
            case "La Pampa":
                item.properties.confirmed = covidLastInfo.la_pampa.confirmed;
                break;
            case "Mendoza":
                item.properties.confirmed = covidLastInfo.mendoza.confirmed;
                break;
            case "San Luis":
                item.properties.confirmed = covidLastInfo.san_luis.confirmed;
                break;
            case "Córdoba":
                item.properties.confirmed = covidLastInfo.cordoba.confirmed;
                break;
            case "Santa Fe":
                item.properties.confirmed = covidLastInfo.santa_fe.confirmed;
                break;
            case "Entre Ríos":
                item.properties.confirmed = covidLastInfo.entre_rios.confirmed;
                break;
            case "San Juan":
                item.properties.confirmed = covidLastInfo.san_juan.confirmed;
                break;
            case "La Rioja":
                item.properties.confirmed = covidLastInfo.la_rioja.confirmed;
                break;
            case "Catamarca":
                item.properties.confirmed = covidLastInfo.catamarca ? covidLastInfo.catamarca.confirmed : 0;
                break;
            case "Tucumán":
                item.properties.confirmed = covidLastInfo.tucuman.confirmed;
                break;
            case "Jujuy":
                item.properties.confirmed = covidLastInfo.jujuy.confirmed;
                break;
            case "Chaco":
                item.properties.confirmed = covidLastInfo.chaco.confirmed;
                break;
            case "Formosa":
                item.properties.confirmed = covidLastInfo.formosa ? covidLastInfo.formosa.confirmed : 0;
                break;
            case "Santiago del Estero":
                item.properties.confirmed = covidLastInfo.sgo_del_stero.confirmed;
                break;
            case "Tierra del Fuego, Antártida e Islas del Atlántico Sur":
                item.properties.confirmed = covidLastInfo.tierra_del_fuego.confirmed;
                break;
            case "Santa Cruz":
                item.properties.confirmed = covidLastInfo.santa_cruz.confirmed;
                break;
            case "Chubut":
                item.properties.confirmed = covidLastInfo.chubut ? covidLastInfo.chubut.confirmed : 0;
                break;
            case "Río Negro":
                item.properties.confirmed = covidLastInfo.rio_negro.confirmed;
                break;
            case "Buenos Aires":
                item.properties.confirmed = covidLastInfo.buenos_aires.confirmed;
                break;
            case "Corrientes":
                item.properties.confirmed = covidLastInfo.corrientes.confirmed;
                break;
            case "Misiones":
                item.properties.confirmed = covidLastInfo.misiones.confirmed;
                break;
            case "Salta":
                item.properties.confirmed = covidLastInfo.salta.confirmed;
                break;
        }
    });
}
