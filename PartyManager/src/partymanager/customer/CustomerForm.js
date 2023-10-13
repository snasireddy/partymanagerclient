import React , {useState} from "react";
import { useTranslation } from "react-i18next";
import "../translations/i18n";

// This function returns html form for the customer
const CustomerForm = ({type,onCreateCustomer}) => {
    const {t} = useTranslation();

    // Constant Variables
    const [firstname,setFirstName] = useState("");
    const [middlename,setMiddleName] = useState("");
    const [lastname,setLastName] = useState("");
  
    // Constant function
    const createCustomer = () =>{
      event.preventDefault();
      const customer = {firstname,middlename,lastname,type:type };
      onCreateCustomer(customer);
    }

    // CustomerForm Function Code return from here
    return (
      <div className="form-group">
      <form noValidate>
        <h2><b>{t("addcustomer")}</b></h2>
        <br/>
        <table>
          <tr>
            <td>
              <label for="firstnameid" >{t("firstname")}<span className="mandatoryred">*</span> </label>
            </td>
            <td>
              <input id="firstnameid" className="form-control" type="text" noValidate onChange={(e) => setFirstName(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td>
              <label for="middlenameid">{t("middlename")}</label>
            </td>
            <td>
              <input id="middlenameid" className="form-control" type="text" noValidate onChange={(e) => setMiddleName(e.target.value)}/> 
            </td>
          </tr>
          <tr>
            <td>
              <label for="lastnameid">{t("lastname")}</label><span className="mandatoryred">*</span>&nbsp;
            </td>
            <td>
              <input id="lastnameid" className="form-control" type="text" noValidate onChange={(e) => setLastName(e.target.value)}/> 
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="right">
              <button onClick={createCustomer} className="btn btn-primary">{t("addcustomer")}</button>
            </td>
          </tr>
        </table>
      </form>
      </div>
    );
  }
export default CustomerForm;