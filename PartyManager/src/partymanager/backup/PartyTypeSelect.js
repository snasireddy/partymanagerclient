import React from 'react';
import '../../css/PartyManager.css';
import Select from 'react-select';
import {partyTypeOptions} from './PartyTypeOptions'


function PartyTypeSelect({selectedPartyType}){
    
    const selectPartyType = (selectedOption) => {
        event.preventDefault();
        selectedPartyType(selectedOption);
    }
    return(
        <div>
        
        <br/><br/><hr/>
        Party Type:<Select
            placeholder="Select party type"
            create
            clearable
            separator
            options={partyTypeOptions}
            dropdownPosition="bottom"
            onChange={selectedOption => selectPartyType(selectedOption.value)}
            className="DropDown"
            /> 
          </div>

/* <Select
placeholder="Select party type"
values={[partyTypeOptions[0]]}
create
clearable
separator
options={partyTypeOptions}
labelField="partyName"
valueField="partyCode"
dropdownPosition="bottom"
onChange={(value) => console.log(value)}
noDataLabel="No matches found"
/> 
https://codesandbox.io/s/3kx74jlp0m?file=/src/index.tsx:727-1112
        // <DropdownButton id="dropdown-basic-button" title="Party Type">
        //     <Dropdown.Item eventKey="1">Customer</Dropdown.Item>
        //     <Dropdown.Item eventKey="2">Organisation</Dropdown.Item>
        //     <Dropdown.Item eventKey="3">TPA</Dropdown.Item>
        // </DropdownButton>
        */
    );
} 
export default PartyTypeSelect;
