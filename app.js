
//data
const HomeWins = './AllSeasonsGen2.json';
const stadiumsIcons = './homeWinsIcons.json';

//toggle on and off
function onoffClubs(){
  currentvalue = document.getElementById('onoff').value;
  if(currentvalue == "3D Off"){
    //change button value to ON -> turn ON this layer
    document.getElementById("onoff").value="3D On";
    onoff.style.opacity = 1; 
    

    deckgl.setProps({layers: [
      
      //LAYERs #1 -- Clubs locations
           
      new deck.IconLayer({
        id: 'stadiumsCrests',
        data: stadiumsIcons,
        visible: false,
        getIcon: d => ({
          url: d.iconUrl,
          width: 128,
          height: 128,
          anchorY: 128
        }),
        getSize: d => d.HomeTeam * 0.5,
        pickable: false,
        sizeScale: 1,
        getPosition: d => [d.Longitude, d.Latitude],
        sizeMinPixels: 30,
      }),

      //LAYERs #2 -- HomeWins
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
        getLineColor: d => [0, 0, 0],
        // Interactive props
        pickable: true,
        autoHighlight: true,
      })
    ]
  })
//toggle OFF and turn ON Clubs locations
  }
  else{
    //change button value to OFF -> turn OFF this layer
    document.getElementById("onoff").value="3D Off";
    onoff.style.opacity = 0.5;


    
    deckgl.setProps({layers: [
      
      //LAYERs #1 -- Clubs locations
           
      new deck.IconLayer({
        id: 'stadiumsCrests',
        data: stadiumsIcons,
        visible: true,
        getIcon: d => ({
          url: d.iconUrl,
          width: 128,
          height: 128,
          anchorY: 128
        }),
        getSize: d => d.HomeTeam * 0.5,
        pickable: false,
        sizeScale: 1,
        getPosition: d => [d.Longitude, d.Latitude],
        sizeMinPixels: 35,
      }),

      //LAYERs #2 -- HomeWins

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
        getLineColor: d => [0, 0, 0],
        // Interactive props
        pickable: true,
        autoHighlight: true,
      })
    ]
  })
  }
}



// create color array for choropleth
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
    maxZoom: 10,
    pitch: 40.5,
    bearing: -60
  },
  controller: true,
  
  //some lights
  effects: [
    new deck.LightingEffect({directionalLight, ambientLight})
  ],

  //initial layers
  layers: [

    //LAYERs #2 -- HomeWins

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
      getLineColor: d => [0, 0, 0],
      // Interactive props
      pickable: true,
      autoHighlight: true,
    }),

  ],
  getTooltip
});