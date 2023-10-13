import React,{useEffect,useState} from 'react';
import axios from 'axios';
import '../css/PartyManager.css';
import PartyManager from './PartyManager';

const GET_PARTYTYPES_URL = "http://localhost:9000/partymanager/getparties";

// PartyManager is main form returned to index.js
const PartyManager1 = () =>  {

  const [parties,setParties] = useState([]);
  

  const filterCustomers = (data) => {
    var partyFromDB = data.filter((p) => p.partyTypeCode == 'C');
    console.log("Testing123::" + partyFromDB.length);
    if(partyFromDB.length > 0){
      partyFromDB.map((p) => setCustomers([...customers,p]))
    }
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
  }
  useEffect(() => {
      setLoading(true);
      axios.get(`${GET_PARTYTYPES_URL}`).then(({data}) => filterCustomers(data)).catch(console.error).finally(()=>setLoading(false));
    }, []);
  return(
      <div>
          <br/><br/>
          {loading ? "Loading" : <PartyManager parties={parties} loading={loading}/>
          // parties.map((p) => (
          // <div key={p.partyId}>
          // <h2>{p.partyId} - {p.firstName} - {p.middleName} - {p.lastName} - {p.businessName} - {p.partyTypeCode} </h2><br/>
          // </div>
          // ))
          }
      </div>
  );

  
  }

export default PartyManager1;
