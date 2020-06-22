
// const HomeWins = './HomeWins2019_2020.geojson';
const HomeWins = './AllSeasonsGen2.json';

// create color array for geojson layer
function createColor (input) {
    if (input <= 4){
        colArr = [21, 74, 234]
    }
    else if (input > 4 && input <= 12 ) {
        colArr = [43, 131, 186]
    }
    else if (input > 12 && input <= 33 ){
        colArr = [171, 221, 164]
    }
    else if (input > 33 && input <= 57 ){
        colArr = [255, 255, 191]
    }
    else if (input > 57 && input <= 135 ){
        colArr = [253, 174, 97]
    }
    else {
        colArr = [215, 25, 28]
    }
    return colArr
}

//create pop-up
function getTooltip({object}) {
    return object && `Total County Wins:
  ${object.properties.sumHWins}
  Teams:
  ${object.properties.TeamsNames}`;
  }
//shadow

/*
const ambientLight = new deck.AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const directionalLight = new deck.DirectionalLight({
  color: [255, 255, 255],
  direction: [0, 0, -1],
  intensity: 1,
  _shadow: false
});
*/
  //Map
const deckgl = new deck.DeckGL({
  container: 'container',
  // Set your Mapbox access token here
  mapboxApiAccessToken: 'pk.eyJ1Ijoib2xvb2NraSIsImEiOiJja2E3enBpZG4wODhkMnJydTg5c2V5a280In0.U-h43N-R4QbrEe6J90T6GA',
  mapStyle: 'mapbox://styles/mapbox/dark-v9',

  initialViewState: {
    longitude: -1.4157,
    latitude: 52.2324,
    zoom: 6,
    minZoom: 5,
    maxZoom: 15,
    pitch: 40.5,
    // bearing: -27.396674584323023
    bearing: -60
  },
  controller: true,
  
  //some lights
  /*
  effects: [
    new deck.LightingEffect({directionalLight})
  ],
*/


  layers: [

//add homeWins
    new deck.GeoJsonLayer({
      // data
      id: 'homewins',
      data: HomeWins,
      
      // Styles
      opacity: 0.9,
      filled: true,
      extruded: true,
      wireframe: true,
      fp64: false,
      getElevation: d => d.properties.sumHWins * 500,
      getFillColor: d => createColor(d.properties.sumHWins),
      getLineColor: d => [255, 255, 255],

      // Interactive props
      pickable: true,
      autoHighlight: true,
      //onClick: info => info.object && alert(`${info.object.properties.sumHWins} (${info.object.properties.TeamsNames}) (${info.object.properties.sumCapacity})`)
      //onHover: info => setTooltip(info.object, info.x, info.y)
    })

  ],
  getTooltip

  
});
