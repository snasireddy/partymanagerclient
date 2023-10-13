import React,{useEffect,useState} from 'react';
import axios from 'axios';
import '../css/PartyManager.css';
import CustomerForm from './customer/CustomerForm';
import PartyTypeSelect from './partytype/PartyTypeSelect';
import NonCustomerForm from './orgtpa/NonCustomerForm';

const GET_PARTIES_URL = "http://localhost:9000/partymanager/getparties";

// PartyManager is main form returned to index.js
const PartyManager = () =>  {

  // Flag on progress of parties loading
  const [loading,setLoading] = useState(false);
  const [parties,setParties] = useState([]);

  // Arrays to initialize, store and display customers table
  // const [customers,setCustomers] = useState([
  //   {id:1, firstname:"Mamta1" , middlename:"K1", lastname:"Solanki1" , type:"C"},
  //   {id:2, firstname:"Salas" , middlename:"S", lastname:"Nasireddy", type:"C" }
  // ]);

const [customers,setCustomers] = useState([]);

 //const [customers,setCustomers] = useState({data:[]});


  // Arrays to initialize, store and display tpas table
  // const [tpas, setTpas] = useState([
  //     {id:1, name:"TPA.ltd", type:"T"}
  // ]);

  const [tpas, setTpas] = useState([]);

  // Arrays to initialize, store and display organisations table
  // const [organisations, setOrganisations] = useState([
  //     {id:1, name:"cloudsarvis.ltd" ,  type:"O"}
  // ]);
  const [organisations, setOrganisations] = useState([]);

  // Call API and get all parties
  useEffect(() => {
    setLoading(true);
    axios.get(`${GET_PARTIES_URL}`).then((resp) => setParties(resp.data)).catch(console.error).finally(()=>setLoading(false));
  }, []);

//   useEffect(() => {
//     filterParties();
// }, [parties]);

  const filterParties = () => {

    //console.log("Print Parties ::" + parties.length);
    //console.log("Print Partiesvvvv ::" + parties);

    parties.map(
        party=>{
          console.log(party.partyTypeCode + "firstName" + party.firstName +":middlename1:" + party.middleName +" businessName:" + party.businessName)
          if(party.partyTypeCode == 'C'){
            console.log ("inside c" + party.firstName);
            //if(customers.length > 0){
              var obj = {id:party.partyId, firstname:party.firstName,middlename:party.middleName,lastname:party.lastName,type:party.partyTypeCode };
              setCustomers([...customers,obj]);
              
            //} else{
            //  setCustomers([{id:party.partyId, firstname:party.firstName,middlename:party.middleName,lastname:party.lastName,type:party.partyTypeCode }]);
            //}

          }
          if(party.partyTypeCode == 'O'){
            console.log ("inside o");
            setOrganisations([...organisations,{id:party.partyId, name:party.businessName,type:party.partyTypeCode }]);
          }
          if(party.partyTypeCode == 'T'){
            console.log ("inside t");
            setTpas([...tpas,{id:party.partyId, name:party.businessName,type:party.partyTypeCode }]);
          }
        }
      );

    /*
    console.log("data::" + data);
    var partyFromDB = data.filter((p) => p.partyTypeCode == 'C');
    console.log("Testing123::" + partyFromDB.length);
    console.log("Testing#123::" + partyFromDB);
    if(partyFromDB.length > 0){
      Object.keys(partyFromDB).forEach(function(key){
        console.log("Test123::" +key + "::" + partyFromDB[key])}
        );
      console.log("1234::" );
      //partyFromDB.map((p) => setCustomers([...customers,p]))

      partyFromDB.map((p) => (
        setCustomers([...customers,p])
      ))
    }
    console.log("customers#123::" + customers);
    partyFromDB = data.filter((p) => p.partyTypeCode == 'O');
    console.log("Testing456::" + partyFromDB.length);
    if(partyFromDB.length > 0){
      partyFromDB.map((p) => setOrganisations([...organisations,p]))
    }
    partyFromDB = data.filter((p) => p.partyTypeCode == 'T');
    console.log("Testing789::" + partyFromDB.length);
    if(partyFromDB.length > 0){
      partyFromDB.map((p) => setTpas([...tpas,p]))
    }
    */
    //console.log("customers::" + customers.length);
    // customers.map((c) => (
      
    //   console.log("1234::" + c.firstname)
    //  ))
  }

  // Flag to display successfully added message for customer, organisation and tpa
  const [customerAdded,setCustomerAdded] = useState(false);
  const [organisationAdded,setOrganisationAdded] = useState(false);
  const [TPAAdded,setTPAAdded] = useState(false);

  // This function called on click of 'Add Customer' on customer html form
  const addCustomer = (customer) => {
    alert('inside addCustomer...' + customer.id + "::" + customer.firstname + "::" + customer.middlename + "::" + customer.lastname);
    setCustomers([...customers,customer]); //... spread operator for array
    setCustomerAdded(true);
    setPartyType("");
  }

  // This function called on click of 'Add Business' on non customer html form for organisation
  const addOrganisation = (organisation) => {
    alert('inside addOrganisation...' + organisation.id + "::" +  organisation.businessname + "::" + organisation.type);
    setOrganisations([...organisations,{id:organisation.id, name:organisation.businessname,type:organisation.type }]); //... spread operator for array
    setOrganisationAdded(true);
    setPartyType("");
  }

  // This function called on click of 'Add Business' on non customer html form for TPA
  const addTPA = (tpa) => {
    alert('inside addTPA...' + tpa.id + "::" +  tpa.businessname + "::" + tpa.type);
    setTpas([...tpas,{id:tpa.id, name:tpa.businessname,type:tpa.type }]); //... spread operator for array
    setTPAAdded(true);
    setPartyType("");
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
         // console.log(party.partyTypeCode + "firstName" + party.firstName +":middlename1:" + party.middleName +" businessName:" + party.businessName)
          if(party.partyTypeCode == 'C' && party.firstName.toLowerCase() == value.toLowerCase()){
            console.log(party.partyTypeCode + "firstName-inside" + party.firstName +":middlename1:" + party.middleName +" businessName:" + party.businessName)
            setSearchCustomer([...searchCustomer,{id:party.partyId, firstname:party.firstName,middlename:party.middleName,lastname:party.lastName,type:party.partyTypeCode }]);
            count ++;
          } else if(party.partyTypeCode == 'O' && party.businessName.toLowerCase() == value.toLowerCase()){
            setSearchNonCustomer([...searchNonCustomer,{id:party.partyId, name:party.businessName,type:party.partyTypeCode }]);
            count++;
          } else if(party.partyTypeCode == 'T' && party.businessName.toLowerCase() == value.toLowerCase()){
            setSearchNonCustomer([...searchNonCustomer,{id:party.partyId, name:party.businessName,type:party.partyTypeCode }]);
            count++;
          }
        }
      );
      // var partyData = customers.filter(
      //   (customer) => customer.firstname.toLowerCase() == value.toLowerCase()
      // );
      
      // if(partyData.length == 0){
      //   partyData = organisations.filter(
      //     (organisation) => organisation.name.toLowerCase() == value.toLowerCase()
      //   );
      // } else {
      //     partyData.map((p) => (
      //       setSearchCustomer([...searchCustomer,p])
      //     ))
      // }

      // if(partyData.length == 0){
      //   partyData = tpas.filter(
      //     (tpa) => tpa.name.toLowerCase() == value.toLowerCase()
      //   );
      // } /*else {
      //   partyData.map((p) => (
      //     setSearchNonCustomer([...searchNonCustomer,p])
      //   ))
      // }*/
      console.log("searchNonCustomer" + searchNonCustomer.length + "searchCustomer " + searchCustomer.length);
      // if(partyData.length > 0){
      //   if(searchCustomer.length <= 0 ){
      //     partyData.map((p) => (
      //       setSearchNonCustomer([...searchNonCustomer,p])
      //     ))
      //   }
      //   setSearchCount(partyData.length);
      //   setShowButtons(true);
      // }
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
  
  return (
    
      <div>
        {/* {customers.map((c) => (
          <div>
          <h2>{c.firstname}-{c.lastname}</h2><br/></div>
         ))}  */}
         
        Search Party:&nbsp;&nbsp;&nbsp;
        <input 
        type="text" 
        onChange={(e) => searchParty(e.target.value)}/> &nbsp;
        
        {showButtons?
        searchCount == 1  ? <button onClick={showSearchClick}>Search</button> : <button onClick={showAddPartyFormClick}>Add Party</button> : ""}
        
        <br/><br/><br/><hr/>
        
        {showSearch ? <ShowPartySearch /> : "" }
          
        {showAddPartyForm && !showSearch ? <PartyTypeSelect selectedPartyType = {getPartyType}/> : ""}
        
        <br/><br/><br/>
        
        {
          partyType?
          partyType == "C"?
            <CustomerForm index={customers.length +1} onCreateCustomer={addCustomer}/>:
            partyType == "O"?
            <NonCustomerForm  index={organisations.length +1}  type="O"  onCreateBusiness={addOrganisation} />:
            <NonCustomerForm  index={tpas.length +1}  type="T"  onCreateBusiness={addTPA} />
            : ""
        }
        
        <p style={{color:'green'}}>
          {customerAdded ? "Customer added successfully.":
           organisationAdded? "Organisation added successfully." : TPAAdded? "TPA added successfully.":""
          }
        </p>
      </div>
  );
  }

export default PartyManager;
