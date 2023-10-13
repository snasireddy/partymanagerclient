import axios from 'axios';
import { useState } from 'react';
//Party type drop down options
const GET_PARTYTYPES_URL = "http://localhost:9000/partymanager/getpartytypes";
// export const partyTypeOptions = [
//     { label: "Customer", value: "C" },
//     { label: "Organisation", value: "O" },
//     { label: "TPA", value: "T" }
// ];

const partyTypeOptions = () => {
    const [partyTypes,setPartyTypes] = useState({data:[]});
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        //axios
        //   .get(`${BASE_URL}/user?limit=5`, { headers: { "app-id": APP_ID } })
        //   .then(({ data }) => setContacts(data))
        //   .catch(console.error)
        //   .finally(() => setLoading(false));
          axios.get(`${GET_PARTYTYPES_URL}`).then(({data}) => setPartyTypes(data)).catch(console.error).finally(()=>setLoading(false));

      }, []);



};