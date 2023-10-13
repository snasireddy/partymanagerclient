import React,{useEffect,useState} from 'react';
import axios from 'axios';
import '../css/PartyManager.css';
import CustomerForm from './customer/CustomerForm';
import PartyTypeSelect from './partytype/PartyTypeSelect';
import NonCustomerForm from './orgtpa/NonCustomerForm';
import {GET_PARTIES_URL,ADD_PARTY_URL,STATUS_CODE_200,CONTENT_TYPE,CONTENT_TYPE_JSON,PARTY_TYPE_CUSTOMER,PARTY_TYPE_ORGANISATION,PARTY_TYPE_TPA}  from './constant/Constants'
import { useTranslation } from "react-i18next";
import "./translations/i18n";
import '../css/bootstrap.min.css';

// PartyManager is main form returned to index.js
const PartyManager = () =>  {

  const {t} = useTranslation();

  // Flag on progress of parties loading
  const [loading,setLoading] = useState(false);
  const [parties,setParties] = useState([]);

  // Call API and get all parties
  useEffect(() => {
    setLoading(true);
    axios.get(`${GET_PARTIES_URL}`).then((resp) => setParties(resp.data)).catch(console.error).finally(()=>setLoading(false));
  }, []);

  // Flag to display successfully added message for customer, organisation and tpa
  const [customerAdded,setCustomerAdded] = useState(false);
  const [organisationAdded,setOrganisationAdded] = useState(false);
  const [TPAAdded,setTPAAdded] = useState(false);

  const addParty = (party) => {
    var partyObj;
    if(party.type == PARTY_TYPE_CUSTOMER){
      partyObj = {firstName:party.firstname,middleName:party.middlename,lastName:party.lastname,businessName:null,partyTypeCode:party.type}
      setCustomerAdded(true);
    } else if (party.type == PARTY_TYPE_ORGANISATION) {
      partyObj =  {firstName:null,middleName:null,lastName:null,businessName:party.businessname,partyTypeCode:party.type};
      setOrganisationAdded(true);
    } else if (party.type == PARTY_TYPE_TPA){
      partyObj = {firstName:null,middleName:null,lastName:null,businessName:party.businessname,partyTypeCode:party.type};
      setTPAAdded(true);
    }
    setPartyType("");
    //Make api call  to add the party and take action based on http response  
    axios.post(`${ADD_PARTY_URL}`, JSON.parse(JSON.stringify(partyObj)),{ 
      CONTENT_TYPE: CONTENT_TYPE_JSON
     }).then(response => {
                        if(response.status == STATUS_CODE_200 && response.data.partyAdded){
                          setPartyType("");
                          partyObj = {partyId:response.data.partyManagerId,firstName:party.firstname,middleName:party.middlename,lastName:party.lastname,businessName:party.businessname,partyTypeCode:party.type}
                          setParties([...parties,partyObj]);
                        } else {
                          setCustomerAdded(false);
                          setOrganisationAdded(false);
                          setTPAAdded(false);
                        }
                      }
        );
  }

  /**
   * This html table's row and columns are used to display search result for any existing customer, organisation or tpa 
   * based on user input in search function. 
   */
  const CustomerHeaderRow = () => {
    return <tr><th>{t("id")}</th><th>{t("firstname")}</th><th>{t("middlename")}</th><th>{t("lastname")}</th><th>{t("type")}</th></tr>;
  }

  const NonCustomerHeaderRow = () => {
    return <tr><th>{t("id")}</th><th>{t("name")}</th><th>{t("type")}</th></tr>;
  }

  const CustomerTableRow = ({data}) => {
    return data.map((data) =>
      <tr>
        <td>{data.id}</td><td>{data.firstname}</td><td>{data.middlename}</td><td>{data.lastname}</td><td>{data.type}</td>
      </tr>
    );
  }

  const NonCustomerTableRow = ({data}) => {
    return data.map((data) =>
      <tr>
        <td>{data.id}</td><td>{data.name}</td><td>{data.type}</td>
      </tr>
    );
  }

  // This is the html table used to display search result for customer or organisation or TPA
  const ShowPartySearch = () => {
    return (
      <div>
        <h2><b>{t("partydetails")}</b></h2>
        <table border="1">
          { searchCustomer.length > 0 ? <CustomerHeaderRow />  : <NonCustomerHeaderRow /> }
          { searchCustomer.length > 0 ? <CustomerTableRow data={searchCustomer}/>  : <NonCustomerTableRow data={searchNonCustomer}/> }
        </table>
      </div>
    );
  }


  /**
   * All below is used to filter and search customer or organisation or tpa as well as
   * rendring page based on flags and value of the controls
   */
  const [showButtons,setShowButtons] = useState(false);
  const [searchCount,setSearchCount] = useState(0);
  const [searchCustomer,setSearchCustomer] = useState([]);
  const [searchNonCustomer,setSearchNonCustomer] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showAddPartyForm, setShowAddPartyForm] = useState(false);
  const [partyType,setPartyType] = useState("");  

  //Function to reset any filtered customers or organisation or tpas
  const ResetPartySearch = () => {
      setSearchNonCustomer([]);
      setSearchCustomer([]);
  }

  // Function to set the flag whether to display search result or not
  const showSearchClick = () => {
    setShowSearch(true);
  }

  // Function to set the flag whether to display add functionality section or not
  const showAddPartyFormClick = () => {
    setShowAddPartyForm(true);
    setShowSearch(false);
    setCustomerAdded(false);
    setOrganisationAdded(false);
    setTPAAdded(false);
  }

  // Main function to search and filter the customer or organisation or TPA based on user input
  const searchParty = (value) => {
    setShowButtons(true);
    setShowSearch(false);
    setShowAddPartyForm(false);
    setPartyType("");
    setCustomerAdded(false);
    setOrganisationAdded(false);
    setTPAAdded(false);   
    ResetPartySearch();
    if(value.length <= 0){
      ResetPartySearch();
      setSearchCount(0);
      setShowButtons(false);
    } else {
      setSearchCount(0);
      var count=0;
      parties.map(
        party=>{
          if(party.partyTypeCode == PARTY_TYPE_CUSTOMER && party.firstName.toLowerCase() == value.toLowerCase()){
            setSearchCustomer([...searchCustomer,{id:party.partyId, firstname:party.firstName,middlename:party.middleName,lastname:party.lastName,type:party.partyTypeCode }]);
            count ++;
          } else if(party.partyTypeCode == PARTY_TYPE_ORGANISATION && party.businessName.toLowerCase() == value.toLowerCase()){
            setSearchNonCustomer([...searchNonCustomer,{id:party.partyId, name:party.businessName,type:party.partyTypeCode }]);
            count++;
          } else if(party.partyTypeCode == PARTY_TYPE_TPA && party.businessName.toLowerCase() == value.toLowerCase()){
            setSearchNonCustomer([...searchNonCustomer,{id:party.partyId, name:party.businessName,type:party.partyTypeCode }]);
            count++;
          }
        }
      );
      if(count > 0){
        setSearchCount(count);
        setShowButtons(true);
      }
    }
  }
  
  // This function is used to get the party type selected by user for add functionality
  const getPartyType = (selectedOption) => {
      setPartyType(selectedOption);
      setCustomerAdded(false);
      setOrganisationAdded(false);
      setTPAAdded(false);
  }
  
  const mystyle = {
    vertical: "bottom"
  };

  return (
    
      <div className="form-group">
        <table>
          <tr>
            <td>
              <label for="seachpartyid">{t("searchparty")}<span className="mandatoryred">*</span></label>&nbsp;&nbsp;&nbsp;
            </td>
            <td>
              <input id="seachpartyid"  className="form-control" type="text" onChange={(e) => searchParty(e.target.value)}/> &nbsp;
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="right">
            {showButtons?
              searchCount == 1  ? <button onClick={showSearchClick} className="btn btn-primary">{t("search")}</button> : <button onClick={showAddPartyFormClick} className="btn btn-primary">{t("addparty")}</button> : ""}
            </td>
          </tr>
        </table>
        <br/><hr/>
        
        {showSearch ? <ShowPartySearch /> : "" }
          
        {showAddPartyForm && !showSearch ? <PartyTypeSelect selectedPartyType = {getPartyType}/> : ""}
        
        <br/>
        
        {
          partyType && partyType.length > 0 ?
          partyType == PARTY_TYPE_CUSTOMER?
            <CustomerForm  type={PARTY_TYPE_CUSTOMER} onCreateCustomer={addParty}/>:
            partyType == PARTY_TYPE_ORGANISATION?
            <NonCustomerForm  type={PARTY_TYPE_ORGANISATION}  onCreateBusiness={addParty} />:
            <NonCustomerForm  type={PARTY_TYPE_TPA}  onCreateBusiness={addParty} />
            : ""
        }
        <p style={{color:'green'}}>
          {customerAdded ? t("customeraddedmessage"):
           organisationAdded? t("organisationaddedmessage") : TPAAdded? t("tpaaddedmessage"):""
          }
        </p>
      </div>
  );
  }

export default PartyManager;