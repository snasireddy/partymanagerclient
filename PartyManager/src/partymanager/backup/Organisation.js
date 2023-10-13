import React , {useState} from "react";
const Organisation = ({key,name,type}) => {
    return (
        <div>
            <h3> {key} - {name} - {type}</h3>
            <hr/>
        </div>
    );
}
export default Organisation;