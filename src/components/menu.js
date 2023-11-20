import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Menu = () => {

    useEffect(() =>{
        AOS.init()
    }, [])

    return (
        <div className="row">
            <div className="col-12 col-sm-12 text-center pb-2">
                <h5 className="text-white"> <strong> Selecciona un continente </strong> </h5>
            </div>
            <div className="col-6 col-sm-6 text-center" data-aos="flip-left">
                <Link to={`/countries/Sudamerica`}>
                    <img src={process.env.PUBLIC_URL + '/img/continents/Sudamerica.png'} className="continent" width="80%"  alt="Sudamerica"/>
                </Link>
                <img src={process.env.PUBLIC_URL + '/img/text/Sudamerica.png'} width="30%" alt="Sudamerica" />
            </div>
            <div className="col-6 col-sm-6 text-center" data-aos="flip-right">
                <Link to={`/countries/Europa`}>
                    <img src={process.env.PUBLIC_URL + '/img/continents/Europa.png'} className="continent" width="80%"  alt="Europa"/>
                </Link>
                <img src={process.env.PUBLIC_URL + '/img/text/Europa.png'} width="25%" alt="Europa"/>
            </div>
        </div>
    )
}

export default Menu;