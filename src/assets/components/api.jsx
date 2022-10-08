
import React from 'react';
import { useState, useEffect } from "react";

const arr = [];


function Apm() {
    const [img, Setimg] = useState();
    useEffect(() => {
    fetch('https://api.waifu.im/random/').then(response => {
        return response.json();
    }).then(user => {
        var images = user['images'][0]['url'];
        Setimg(images)
    });
    },[]);
    return (
             <img class="omni-image" src={`${img}`} alt=""/>
    
    )


}
export default Apm;
