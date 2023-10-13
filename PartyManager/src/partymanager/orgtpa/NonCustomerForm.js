import React , {useState} from "react";
import {PARTY_TYPE_ORGANISATION}  from '../constant/Constants'
import { useTranslation } from "react-i18next";
import "../translations/i18n";

//This function returns the html form for organisation and TPA
const NonCustomerForm = ({type, onCreateBusiness}) => {
    const {t} = useTranslation();

    // Constant Variables
    const [businessname,setBusinessName] = useState("");
  
    // Constant function
    const createBusiness = () =>{
      event.preventDefault();
      const business = {businessname,type:type};
      onCreateBusiness(business);
    }

    // NonCustomerForm Function Code return from here
    return (
      <>
      <h2><b>{type == PARTY_TYPE_ORGANISATION ? t("addorganisation") : t("addtpa")}</b></h2>
      <form noValidate>
        <table>
          <tr>
            <td>
              <label for="businessnameid">{t("businessname")}</label><span className="mandatoryred">*</span>&nbsp;
            </td>
            <td>
              <input id="businessnameid" className="form-control" type="text" noValidate onChange={(e) => setBusinessName(e.target.value)}/> 
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="right">
              <button onClick={createBusiness} className="btn btn-primary">{t("addbusiness")}</button>
            </td>
          </tr>
        </table>
      </form>
      </>
    );
  }
export default NonCustomerForm;