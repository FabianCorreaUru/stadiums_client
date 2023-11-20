/* global google */
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api"
import {useState, useRef, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const App = (Param) => {

  const bottomRef = useRef(null);
  const {isLoaded} = useLoadScript({ googleMapsApiKey: 'AIzaSyC5NcTWZ9fnwM2E4RB7pm2AS0gia4KRC6Y' })

  const params = useParams()
  const [Country, SetCountry] = useState(params.country)
  const [Stadiums, SetStadiums] = useState([])  
  const [mapRef, setMapRef] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [infoWindowData, setInfoWindowData] = useState()
  const [markers, setMarker] = useState([])
  const [CenterLatitude, setCenterLatitude] = useState()
  const [CenterLongitude, setCenterLongitude] = useState()
  const [Selected, setSelected] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  // Endpoint
  var Endpoint = 'http://localhost:5000/api/country/'+Country

  useEffect(() => {
    async function fetchData() {
       setIsLoading(true);
       axios.get(Endpoint).then(res => {
         SetStadiums(res.data)
         setCenterLatitude(res.data[0].latitude)
         setCenterLongitude(res.data[0].longitude)
      }).catch(err => {
         console.log(err)
      }).finally(() => {
         setIsLoading(false);
      })      
    }
    fetchData();
 }, []);
 if(isLoading){
    return  
      <div className="row">
        <div className="smt-spinner-circle text-center">
            <div className="smt-spinner text-center"> </div>
            <h6 className="text-white mt-2"> <strong> Loading </strong> </h6>
        </div>
     </div>
 }
 if(Stadiums){

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds()
    setMarker([]);

    Stadiums.forEach(function(node){
      node.desc = node.stadium
      node.lat = node.latitude
      node.lng = node.longitude  
      setMarker(markers => [...markers, node])
    }, Stadiums)    

    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }))
    map.fitBounds(bounds)
    setTimeout(() => {
       map.setZoom(10)
       if(CenterLatitude!==undefined){
          map.setCenter(new google.maps.LatLng(CenterLatitude, CenterLongitude))
       }       
    }, 1000)
  }

  const handleMarkerClick = (id, lat, lng, desc) => {
    mapRef?.panTo({ lat, lng })
    setInfoWindowData({ id, desc })
    setIsOpen(true)
    ShowStadium(id)
  }

  const ShowStadium = (id) => {
    setSelected(Stadiums[id])
    mapRef.setCenter(new google.maps.LatLng(Stadiums[id].lat, Stadiums[id].lng))
    mapRef.setZoom(15)
    document.getElementById('SelectedTeam').scrollIntoView({ behavior: 'smooth' })
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div>
      <div className="row">
        {markers.map(({ desc, team, lat, lng }, ind) => (
          <div className="col-3 col-sm-3 text-center pb-2 stadium" key={ind} onClick={() => ShowStadium(ind)}> 
            <img src={process.env.PUBLIC_URL + "/img/shields/" + Country + "/" + team + ".png"} alt={team} width="40%" className="pb-2"/>
            <h6 className="text-white"> <strong> {desc} </strong> </h6>
          </div>
        ))}
      </div>
      <div className="App-Map" id="Map">      
        {!isLoaded ? ( 
             <div className="row">
                <div className="smt-spinner-circle text-center">
                    <div className="smt-spinner text-center"> </div>
                    <h6 className="text-white mt-2"> <strong> Loading Map... </strong> </h6>
                </div>
             </div>
        ) : (
          <GoogleMap mapContainerClassName="map-container" onLoad={onMapLoad} onClick={() => setIsOpen(false)}>
            {markers.map(({ desc, lat, lng }, ind) => (
              <Marker key={ind} position={{ lat, lng }} icon={process.env.PUBLIC_URL + "/img/marks/mark.png"}
              onClick={() => { handleMarkerClick(ind, lat, lng, desc); }}>
                {isOpen && infoWindowData?.id === ind && (
                  <InfoWindow onCloseClick={() => { setIsOpen(false); }} >
                    <div> 
                        <h6 className="mt-3"> <strong> {infoWindowData.desc} </strong> </h6> 
                    </div> 
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        )}
      </div>

      <div className="row pt-4 pb-4" id="SelectedTeam" ref={bottomRef}>      
        {Selected && (
          <div className="col-12">
            <div className="row selected-team">
              <div className="col-1"> </div> 
              <div className="col-4"> <img src={process.env.PUBLIC_URL + "/img/shields/" + Country + "/" + Selected.team + ".png"} alt={Selected.team} width="60%"/> </div>
              <div className="col-6"> 
                  <div className="row">
                    <div className="col-12"> <h5 className="text-white"> Equipo: {Selected.team} </h5> </div>
                    <div className="col-12"> <h5 className="text-white"> Estadio: {Selected.stadium} </h5> </div>
                    <div className="col-12"> <h5 className="text-white"> Ciudad: {Selected.city} </h5> </div>
                    <div className="col-12"> <h5 className="text-white"> Dirección: {Selected.address} </h5> </div>
                    <div className="col-12"> <h5 className="text-white"> Fundación: {Selected.fundation} </h5> </div>
                    <div className="col-12"> <h5 className="text-white"> Capacitad: {Selected.capacity} </h5> </div>
                    <div className="col-12"> <h5 className="text-white"> Dimensiones: {Selected.dimensions} </h5> </div>
                  </div>
              </div>           
              <div className="col-1"> </div> 
            </div> 
          </div> 
        )}
      </div>

    </div>
  )
 }
}
  
export default App;