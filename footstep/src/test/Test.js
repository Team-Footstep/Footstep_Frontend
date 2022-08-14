import React from "react";
import {useEffect} from "react";
import MyFootstep from "../routes/MyFootstep/MyFootstep";



function Test() {
    useEffect(() => {
        fetch("/users/profile/2")
            .then((response) => {
                return response.json();
            })
            .then(function (data) {
                console.log(JSON.stringify(data));
            });
    }, []);
    
    return (
        <div>
            <MyFootstep/>
        </div>
    );
}


export default Test;
