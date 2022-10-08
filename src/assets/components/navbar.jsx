import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartminus, faCartPlus, faCartShopping, faHamburger, faList, faMagnifyingGlass, faUserAstronaut}  from '@fortawesome/free-solid-svg-icons';
import '../../style.scss'
import { Fragment } from 'react';
import React from 'react';
import Wave from '../SVG/wave-top.svg'
import WaveB from '../SVG/wavin-bottom.svg'
import Saturn from '../SVG/saturn.png'
import Cancan from './canvas'
import Apm from './api'
import Main from './main';
function block(){
    var e = document.getElementById('input');
    e.classList.toggle('active')
}
const Header = props => {
    return (
        <nav className='w-full h-auto flex justify-between'>
            <div>
                <img class="saturn-png ml-[3rem] cursor-pointer" src={Saturn} alt="" />
            </div>
            <div className='nav-glass'>
                <button onClick={block}>
                    <FontAwesomeIcon className='desktop'icon={faMagnifyingGlass}/>

            </button>
                <input class="nav-search" type="text" name="" id="input" />
            </div>
            <ul className="flex navbar items-center mr-[3rem]">
                <li className="nav-item">teste </li>
                <li className="nav-item">teste </li>
                <li className="nav-item">teste </li>
                <li className="nav-item sexo sexo2"><FontAwesomeIcon icon={faUserAstronaut} />
                </li>
                <li className='nav-item sexo'><FontAwesomeIcon icon={faCartPlus}/>
                <span className='animate-ping'></span>
                    <span></span>
                    </li>
            </ul>
            <button className='mobile'>
                    <FontAwesomeIcon icon={faList}/>
            </button>
        </nav>
    )
}

const Fold = props => {
    return (
        <>
    <div className="canvas_folder w-full h-[35rem] relative">
    <img Class="svgkk z-2" src={Wave}></img>
    <Cancan></Cancan>
    <img Class="svgkkk z-2" src={WaveB}></img>
    </div>
    </>
    )
}
const Carrousel = props => {
    return (
    <div className='Car w-full'>
        <Main></Main>
    </div>
    )
}

function Navbar() {
    return (
        <React.Fragment>
        <Header />
        <Fold />
        <Carrousel />
        </React.Fragment>
    )
}
export default Navbar;
