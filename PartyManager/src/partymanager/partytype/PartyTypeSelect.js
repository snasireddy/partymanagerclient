import React,{useEffect,useState} from 'react';
import '../../css/PartyManager.css';
import Select from 'react-select';
import axios from 'axios';
import {GET_PARTYTYPES_URL,LOADING_TEXT}  from '../constant/Constants';
import { useTranslation } from "react-i18next";
import "../translations/i18n";

//Function to prepare party drop down
const PartyTypeSelectDropDown = ({partyTypes,selectedPartyType}) => {

    const {t} = useTranslation();

    const selectPartyType = (selectedOption) => {
        event.preventDefault();
        selectedPartyType(selectedOption);
    }
      return (
        <>
        <table width="100%">
            <tr>
                <td width="7%" align="left">
                <label for="partytypeid">{t("partytype")}<span className="mandatoryred" >*</span></label>
                </td>
                <td width="93%" align="left">
                <Select id="partytypeid"
                placeholder={t("selectpartytype")}
                create
                clearable
                separator
                options={partyTypes}
                dropdownPosition="bottom"
                onChange={selectedOption => selectPartyType(selectedOption.value)}
                className="DropDown"
                />
                </td>
            </tr>
        </table>
        </>
        );
}
// Function to return party type drop down
function PartyTypeSelect({selectedPartyType}){
    const [partyTypes,setPartyTypes] = useState({data:[]});
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${GET_PARTYTYPES_URL}`).then(({data}) => setPartyTypes(data)).catch(console.error).finally(()=>setLoading(false));
      }, []);
    return(
        <div>
            <br/><br/>
            {loading ? LOADING_TEXT : <PartyTypeSelectDropDown partyTypes={partyTypes} selectedPartyType={selectedPartyType}/>}
        </div>
    );
} 
export default PartyTypeSelect;