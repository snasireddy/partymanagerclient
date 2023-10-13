import React , {useState} from "react";
const Customer = ({id,firstname,middlename,lastname}) => {

    //const [customer , setCustomer] = useState();

    return (
        <div>
                <tr>
                    <td>{id}</td>
                    <td>{firstname}</td>
                    <td>{middlename}</td>
                    <td>{lastname}</td>
                </tr>
        </div>
    );
}

const CustomerList = () => {

    return (
        <div>
            <Customer firstname="mamta 1" middlename="k1" lastname="solanki1"/>
            <Customer firstname="Twi 1" middlename="kl2" lastname="solanki2"/>
            <Customer firstname="Salas 1" middlename="S1" lastname="Nasireddy1"/>
        </div>
    );
}
//export default {Customer,CustomerList};
export default Customer;