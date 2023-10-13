
import React,{Component, useState} from 'react';
import '../css/PartyManager.css';
import Customer from './customer/Customer';
import CustomerForm from './customer/CustomerForm';
import Organisation from './Organisation';
import TPA from './TPA';

// PartyManager is main form returned to index.js
const PartyManager = () =>  {

  const [customers,setCustomers] = useState([
    {id:1, firstname:"Mamta" , middlename:"K", lastname:"Solanki" },
    {id:2, firstname:"Salas" , middlename:"S", lastname:"Nasireddy" }
  ]);

  const [tpas, setTpas] = useState([
      {id:1, name:"TPA.ltd"}
  ]);

  const [organisations, setOrganisations] = useState([
      {id:1, name:"cloudsarvis.ltd"}
  ]);

  const addCustomer = (customer) => {
    alert('inside addCustomer...' + customer.id + "::" + customer.firstname + "::" + customer.middlename + "::" + customer.lastname);
    setCustomers([...customers,customer]); //... spread operator for array
  }

  const CustomerHeaderRow = () => {
    return <tr><th>ID</th><th>First Name</th><th>Middle Name</th><th>Last Name</th></tr>;
  }

  const TableRow = ({data}) => {
    return data.map((data) =>
      <tr>
        <td>{data.id}</td><td>{data.firstname}</td><td>{data.middlename}</td><td>{data.lastname}</td>
      </tr>
    );
  }

  const [party,setParty] = useState("");
  const [searchCount,setSearchCount] = useState(0);
  const searchParty = (value) => {
    //alert('value' + value);
    const partyData = customers.filter(
      (customer) => customer.firstname.toLocaleLowerCase().indexOf(value.toLowerCase()) == 0

    );
    
    console.log("Length111:" + partyData.length);
    {partyData.map((c) => (console.log("Firstname" + c.firstname)))} 
    setSearchCount(partyData.length);
    //setCustomers([...customers,customer]); //... spread operator for array
  }


  return (
      <div>

        Search Party:
        <input 
        type="text" 
        onChange={(e) => searchParty(e.target.value)}/>
        {searchCount == 1 ? <button onClick={searchParty}>Search</button> : <button onClick={searchParty}>Add Party</button>}
        


        <table border="1">
          <CustomerHeaderRow />
          <TableRow data={customers} />
        </table>

        <CustomerForm index={customers.length +1} onCreateCustomer={addCustomer}/>
        <hr/>
        
 


        <table border="1">
          <CustomerHeaderRow />
          <TableRow data={customers} />
        </table>
      
        {/* {customers.map((c) => (
          <Customer key={c.id} 
          firstname={c.firstname}
          middlename = {c.middlename}
          lastname = {c.lastname}
          />
         ))} */}

         <hr/>
         {organisations.map((o) => (
          <Organisation key={o.id} 
          name={o.name}
          />
         ))}

          <hr/>
         {tpas.map((t) => (
          <TPA key={t.id} 
          name={t.name}
          />
         ))}
        
      </div>
  );
  }

export default PartyManager;
