import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import AOS from 'aos'
import axios from 'axios'
import 'aos/dist/aos.css'

const Countries = () => {

    const params = useParams()
    const[Continent, SetContinent] = useState(params.continent)
    const[Countries, SetCountries] = useState([])

    // Endpoint
    var Endpoint = 'http://localhost:5000/api/continent/'+Continent

    useEffect(() =>{
        AOS.init()
        axios.get(Endpoint).then(res => {
            SetCountries(res.data)
        }).catch(err => {
           console.log(err)
        })
    }, [])

    return (
        <div className="row">
            <div className="col-12 col-sm-12 text-center pb-2">
                <h5 className="text-white"> <strong>Selecciona un pais de {Continent}</strong> </h5>
                <div className="row pt-2">       
                    {Countries.map((country,index) => (                         
                        <div className="col-3 col-md-3 col-sm-3 mt-2 mb-2 country" key={index}> 
                            <Link to={`/country/`+country.name}>
                                <img src={process.env.PUBLIC_URL + '/img/countries/' + country.flag + '.png'} data-aos="flip-up" width="60%"/>
                                <h6 className="text-white pt-2"> <strong> {country.name} </strong></h6>
                            </Link>
                        </div>                        
                    ))} 
                </div>
            </div>          
        </div>
    )
}

export default Countries;