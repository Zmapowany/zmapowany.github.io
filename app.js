
// const HomeWins = './HomeWins2019_2020.geojson';
const HomeWins = './data/AllSeasons.json';

// create color array for geojson layer
function createColor (input) {
    if (input <= 4){
        colArr = [1, 152, 189]
    }
    else if (input > 4 && input <= 12 ) {
        colArr = [73, 227, 206]
    }
    else if (input > 12 && input <= 33 ){
        colArr = [216, 254, 181]
    }
    else if (input > 33 && input <= 57 ){
        colArr = [216, 254, 181]
    }
    else if (input > 57 && input <= 135 ){
        colArr = [216, 254, 181]
    }
    else {
        colArr = [209, 55, 78]
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
    pitch: 40.5
  },
  controller: true,

  layers: [

//add homeWins as 2D
    new deck.GeoJsonLayer({
      // data
      id: 'homewins',
      data: HomeWins,
      
      // Styles
      filled: true,
      extruded: true,
      wireframe: false,
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
