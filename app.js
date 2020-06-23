
//data
const HomeWins = './AllSeasonsGen2.json';
const stadiums = './HomeWinsAllSeasons.geojson';


//toggle on and off
function onoffBournemouth(){
  currentvalue = document.getElementById('onoff').value;
  if(currentvalue == "3D Off"){
    //change button value to ON -> turn ON this layer
    document.getElementById("onoff").value="3D On";
    onoff.style.opacity = 1; 
    
    deckgl.setProps({layers: [
      new deck.GeoJsonLayer({
        id: 'stadiums',
        data: stadiums,
        visible: false,
        // Styles
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusScale: 1000,
        //getRadius: 1000,
        getFillColor: [209, 29, 39],
        // Interactive props
        pickable: false,
        autoHighlight: true,
        onClick: info =>
          // eslint-disable-next-line
          info.object && alert(`Team: ${info.object.properties.Team} \n Nr of Nations:  (${info.object.properties.nrOfNations}) \n List of Nations: (${info.object.properties.listOfNations}) \n List of Nations and Players: (${info.object.properties.listOfNationsPlayers})`)
          
      }),
      //LAYERs #2 -- clubs players and their home locations
      new deck.GeoJsonLayer({
        // data
        id: 'homewins',
        data: HomeWins,
        visible: true,
        // Styles
        opacity: 0.9,
        filled: true,
        extruded: true,
        wireframe: true,
        fp64: false,
        getElevation: d => d.properties.sumHWins * 500,
        getFillColor: d => createColor(d.properties.sumHWins),
        //getLineColor: d => [255, 255, 255],
        getLineColor: d => [0, 0, 0],
  
        // Interactive props
        pickable: true,
        autoHighlight: true,
        //onClick: info => info.object && alert(`${info.object.properties.sumHWins} (${info.object.properties.TeamsNames}) (${info.object.properties.sumCapacity})`)
        //onHover: info => setTooltip(info.object, info.x, info.y)
      })
    ]
  })
//toggle OFF
  }
  else{
    //change button value to OFF -> turn OFF this layer
    document.getElementById("onoff").value="3D Off";
    onoff.style.opacity = 0.5;

    deckgl.setProps({layers: [
      new deck.GeoJsonLayer({
        id: 'stadiums',
        data: stadiums,
        visible: true,
        // Styles
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusScale: 1000,
        //getRadius: 1000,
        getFillColor: [209, 29, 39],
        // Interactive props
        pickable: false,
        autoHighlight: true,
        onClick: info =>
          // eslint-disable-next-line
          info.object && alert(`Team: ${info.object.properties.Team} \n Nr of Nations:  (${info.object.properties.nrOfNations}) \n List of Nations: (${info.object.properties.listOfNations}) \n List of Nations and Players: (${info.object.properties.listOfNationsPlayers})`)
          
      }),
      //LAYERs #2 -- clubs players and their home locations

      new deck.GeoJsonLayer({
        // data
        id: 'homewins',
        data: HomeWins,
        visible: false,
        // Styles
        opacity: 0.9,
        filled: true,
        extruded: true,
        wireframe: true,
        fp64: false,
        getElevation: d => d.properties.sumHWins * 500,
        getFillColor: d => createColor(d.properties.sumHWins),
        //getLineColor: d => [255, 255, 255],
        getLineColor: d => [0, 0, 0],
  
        // Interactive props
        pickable: true,
        autoHighlight: true,
        //onClick: info => info.object && alert(`${info.object.properties.sumHWins} (${info.object.properties.TeamsNames}) (${info.object.properties.sumCapacity})`)
        //onHover: info => setTooltip(info.object, info.x, info.y)
      })
    ]
  })
  }
}




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

  //make artificial ground for shadows 
  //const landCover = [[[-5.840542, 49.255583], [-5.840542, 58.207266], [5.183309, 58.207266], [5.183309, 49.196]]];

  //lighting effects
const ambientLight = new deck.AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const directionalLight = new deck.DirectionalLight({
  color: [255, 255, 255],
  //direction: [0, 0, -1],
  direction: [0.5, 5, -5],
  intensity: 1.5,
  _shadow: false
});


  //Map
const deckgl = new deck.DeckGL({
  container: 'container',
  // Set your Mapbox access token here
  mapboxApiAccessToken: 'pk.eyJ1Ijoib2xvb2NraSIsImEiOiJja2E3enBpZG4wODhkMnJydTg5c2V5a280In0.U-h43N-R4QbrEe6J90T6GA',
  //mapStyle: 'mapbox://styles/mapbox/dark-v9',
  mapStyle: 'mapbox://styles/mapbox/light-v10',

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
  
  effects: [
    new deck.LightingEffect({directionalLight, ambientLight})
  ],



  layers: [

//add homeWins

//in case shadow needed
/*
new deck.PolygonLayer({
  id: 'ground',
  data: landCover,
  stroked: false,
  getPolygon: f => f,
  getFillColor: [0, 0, 0, 0]
}),
*/
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
      //getLineColor: d => [255, 255, 255],
      getLineColor: d => [0, 0, 0],

      // Interactive props
      pickable: true,
      autoHighlight: true,
      //onClick: info => info.object && alert(`${info.object.properties.sumHWins} (${info.object.properties.TeamsNames}) (${info.object.properties.sumCapacity})`)
      //onHover: info => setTooltip(info.object, info.x, info.y)
    })

  ],
  getTooltip

  
});
