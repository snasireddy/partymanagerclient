import React,{useState} from 'react';
import '../css/PartyManager.css';
import CustomerForm from './customer/CustomerForm';
import PartyTypeSelect from './partytype/PartyTypeSelect';
import NonCustomerForm from './orgtpa/NonCustomerForm';

// PartyManager is main form returned to index.js
const PartyManager = () =>  {

  // Arrays to initialize, store and display customers table
  const [customers,setCustomers] = useState([
    {id:1, firstname:"Mamta" , middlename:"K", lastname:"Solanki" , type:"C"},
    {id:2, firstname:"Salas" , middlename:"S", lastname:"Nasireddy", type:"C" }
  ]);

  // Arrays to initialize, store and display tpas table
  const [tpas, setTpas] = useState([
      {id:1, name:"TPA.ltd", type:"T"}
  ]);

  // Arrays to initialize, store and display organisations table
  const [organisations, setOrganisations] = useState([
      {id:1, name:"cloudsarvis.ltd" ,  type:"O"}
  ]);

  // This function called on click of 'Add Customer' on customer html form
  const addCustomer = (customer) => {
    alert('inside addCustomer...' + customer.id + "::" + customer.firstname + "::" + customer.middlename + "::" + customer.lastname);
    setCustomers([...customers,customer]); //... spread operator for array
  }

  // This function called on click of 'Add Business' on non customer html form for organisation
  const addOrganisation = (organisation) => {
    alert('inside addOrganisation...' + organisation.id + "::" +  organisation.businessname + "::" + organisation.type);
    setOrganisations([...organisations,{id:organisation.id, name:organisation.businessname,type:organisation.type }]); //... spread operator for array
  }

  // This function called on click of 'Add Business' on non customer html form for TPA
  const addTPA = (tpa) => {
    alert('inside addTPA...' + tpa.id + "::" +  tpa.businessname + "::" + tpa.type);
    setTpas([...tpas,{id:tpa.id, name:tpa.businessname,type:tpa.type }]); //... spread operator for array
  }

  /**
   * This html table's row and columns are used to display search result for any existing customer, organisation or tpa 
   * based on user input in search function. 
   */
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

  // This is the html table used to display search result for customer or organisation or TPA
  const ShowPartySearch = () => {
    return (
      <div>
        <h2><b>Party Details</b></h2>
        <table border="1">
          { searchCustomer.length > 0 ? <CustomerHeaderRow />  : <NonCustomerHeaderRow /> }
          { searchCustomer.length > 0 ? <CustomerTableRow data={searchCustomer}/>  : <NonCustomerTableRow data={searchNonCustomer}/> }
        </table>
      </div>
    );
  }

  const [showButtons,setShowButtons] = useState(false);
  const [searchCount,setSearchCount] = useState(0);
  const [searchCustomer,setSearchCustomer] = useState([]);
  const [searchNonCustomer,setSearchNonCustomer] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showAddPartyForm, setShowAddPartyForm] = useState(false);
  const [partyType,setPartyType] = useState("");  

  const ResetPartySearch = () => {
      setSearchNonCustomer([]);
      setSearchCustomer([]);
  }

  const showSearchClick = () => {
    setShowSearch(true);
  }

  const showAddPartyFormClick = () => {
    setShowAddPartyForm(true);
    setShowSearch(false);
  }

  const searchParty = (value) => {
    setShowButtons(true);
    setShowSearch(false);
    setShowAddPartyForm(false);
    setPartyType("");
    if(value.length <= 0){
      ResetPartySearch();
      //setSearchCount(0);
      setShowButtons(false);
    } else {
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
        setShowButtons(true);
      }
    }
  }
  const getPartyType = (selectedOption) => {
      setPartyType(selectedOption);
  }

  return (
      <div>
        Search Party:&nbsp;&nbsp;&nbsp;
        <input 
        type="text" 
        onChange={(e) => searchParty(e.target.value)}/> &nbsp;
        {showButtons?
        searchCount == 1 ? <button onClick={showSearchClick}>Search</button> : <button onClick={showAddPartyFormClick}>Add Party</button> : ""}

        {showSearch ? <ShowPartySearch /> : "" }
          
        {showAddPartyForm && !showSearch ? <PartyTypeSelect selectedPartyType = {getPartyType}/> : ""}
        <br/><br/><br/>
        
        <hr/>
        {
          partyType?
          partyType == "C"?
            <CustomerForm index={customers.length +1} onCreateCustomer={addCustomer}/>:
            partyType == "O"?
            <NonCustomerForm  index={organisations.length +1}  type="O"  onCreateBusiness={addOrganisation} />:
            <NonCustomerForm  index={tpas.length +1}  type="T"  onCreateBusiness={addTPA} />
            : ""
        }
      </div>
  );
  }

export default PartyManager;
