
import React,{Component, useState} from 'react';
import '../css/PartyManager.css';
import Customer from './customer/Customer';
import CustomerForm from './customer/CustomerForm';
import Organisation from './Organisation';
import PartyTypeSelect from './PartyTypeSelect';
import NonCustomerForm from './NonCustomerForm';

import TPA from './TPA';
import Select from 'react-select';

// PartyManager is main form returned to index.js
const PartyManager = () =>  {

  const [customers,setCustomers] = useState([
    {id:1, firstname:"Mamta" , middlename:"K", lastname:"Solanki" , type:"C"},
    {id:2, firstname:"Salas" , middlename:"S", lastname:"Nasireddy", type:"C" }
  ]);

  const [tpas, setTpas] = useState([
      {id:1, name:"TPA.ltd", type:"T"}
  ]);

  const [organisations, setOrganisations] = useState([
      {id:1, name:"cloudsarvis.ltd" ,  type:"O"}
  ]);

  const addCustomer = (customer) => {
    alert('inside addCustomer...' + customer.id + "::" + customer.firstname + "::" + customer.middlename + "::" + customer.lastname);
    setCustomers([...customers,customer]); //... spread operator for array
  }

  const addOrganisation = (organisation) => {
    alert('inside addOrganisation...' + organisation.id + "::" +  organisation.businessname + "::" + organisation.type);
    setOrganisations([...organisations,{id:organisation.id, name:organisation.businessname,type:organisation.type }]); //... spread operator for array
  }

  const CustomerHeaderRow = () => {
    return <tr><th>ID</th><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>Type</th></tr>;
  }

  const NonCustomerHeaderRow = () => {
    return <tr><th>ID</th><th>Name</th><th>Type</th></tr>;
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

  //const [party,setParty] = useState("");
  const [searchCount,setSearchCount] = useState(0);
  const [searchCustomer,setSearchCustomer] = useState([]);
  const [searchNonCustomer,setSearchNonCustomer] = useState([]);
  //const [searchOrganisation,setSearchOrganisation] = useState([]);
  //const [searchTPA,setSearchTPA] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const showSearchClick = () => {
    setShowSearch(true);
  }
  const [showAddPartyForm, setShowAddPartyForm] = useState(false);

  const showAddPartyFormClick = () => {
    setShowAddPartyForm(true);
  }

  const searchParty = (value) => {
    var partyData = customers.filter(
      (customer) => customer.firstname.toLocaleLowerCase().indexOf(value.toLowerCase()) == 0
    );
    
    if(partyData.length == 0){
      partyData = organisations.filter(
        (organisation) => organisation.name.toLocaleLowerCase().indexOf(value.toLowerCase()) == 0
      );
    } else {
      partyData.map((p) => (
        setSearchCustomer([...searchCustomer,p])
       ))
    }

    if(partyData.length == 0){
      partyData = tpas.filter(
        (tpa) => tpa.name.toLocaleLowerCase().indexOf(value.toLowerCase()) == 0
      );
    } else {
      partyData.map((p) => (
        setSearchNonCustomer([...searchNonCustomer,p])
       ))
    }

    if(partyData.length > 0){
      partyData.map((p) => (
        setSearchNonCustomer([...searchNonCustomer,p])
       ))
      setSearchCount(partyData.length);
    }
    //console.log("Length111:" + partyData.length);
    //{partyData.map((c) => (console.log("Firstname" + c.firstname + ":" + c.name)))} 
    
  }

  const ShowPartySearch = () => {
    return (
      <div>
        Display the search result.
        <table border="1">
          { searchCustomer.length > 0 ? <CustomerHeaderRow />  : <NonCustomerHeaderRow /> }
          { searchCustomer.length > 0 ? <CustomerTableRow data={searchCustomer}/>  : <NonCustomerTableRow data={searchNonCustomer}/> }
        </table>
      </div>
    );
  }
  const [partyType,setPartyType] = useState("");  
  const getPartyType = (selectedOption) => {
      setPartyType(selectedOption);
  }

  return (
      <div>
        Search Party:
        <input 
        type="text" 
        onChange={(e) => searchParty(e.target.value)}/> &nbsp;
        {searchCount == 1 ? <button onClick={showSearchClick}>Search</button> : <button onClick={showAddPartyFormClick}>Add Party</button>}

        {showSearch ? <ShowPartySearch /> : "" }

        {showAddPartyForm && !showSearch ? <CustomerForm index={customers.length +1} onCreateCustomer={addCustomer}/> : ""}
        <br/><br/><br/><br/><br/>
        <NonCustomerForm  index={organisations.length +1}  type="O"  onCreateBusiness={addOrganisation} />
       <hr/>
         {organisations.map((o) => (
          <Organisation key={o.id} 
          name={o.name} type={o.type}
          />
         ))}
        
       <br/><br/><br/><br/><br/>
       <br/><br/><br/><br/><br/>

        {partyType}- 123
        <PartyTypeSelect selectedPartyType = {getPartyType}/>
        {/*
        TODO: Create organisation and TPA form
        TODO: Create Party Type DropDown
        TODO: Merge all form
        TODO: Add stylesheet
        */}
                <hr/>
        See Below 
        {partyType == "C"?
          <CustomerForm index={customers.length +1} onCreateCustomer={addCustomer}/>:
          partyType == "O"?
          <NonCustomerForm  index={organisations.length +1}  type="O"  onCreateBusiness={addOrganisation} />:""
        }
       
       <hr/>
      </div>
  );
  }

export default PartyManager;
