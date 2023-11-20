import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Map from '../components/map'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Country = () => {

    const params = useParams()
    const[Country, SetCountry] = useState(params.country)

    useEffect(() =>{
        AOS.init()
    }, [])

    return (
        <div className="row">
            <div className="col-12 col-sm-12 text-center pb-2">
                <h5 className="text-white"> <strong>Estadios de {Country} </strong> </h5>
                <div className="row pt-3">       
                    <div className="col-12 col-sm-12"> 
                        <Map Country={Country} /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Country;