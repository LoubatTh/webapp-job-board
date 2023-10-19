import { useState, useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";

import Nav from "../components/Navbar";
import DataTable from "../components/tables/Table";
// import { GetUser, DeleteUser } from "../services/user.service";
import { GetCompany, DeleteCompany } from "../services/company.service";
import {
  GetAdvertisement,
  DeleteAdvertisement,
} from "../services/advertisement.service";
import {
  GetApplication,
  DeleteApplication,
} from "../services/application.service";

const Dashboard = () => {
  // const [userData, setUserData] = useState();
  const [companyData, setCompanyData] = useState();
  const [advertisementData, setAdvertisementData] = useState();
  const [applicationData, setApplicationData] = useState();
  const [refresh, setRefresh] = useState([false, "user"]);
  const refreshData = async (type) => setRefresh([!refresh[0], type]);

  useEffect(() => {
    // GetUser().then((res) => setUserData(res.data));
    GetCompany().then((res) => setCompanyData(res.data));
    GetAdvertisement().then((res) => setAdvertisementData(res.data));
    GetApplication().then((res) => setApplicationData(res.data));
  }, []);

  useEffect(() => {
    switch (refresh[1]) {
      // case "user":
      //   GetUser().then((res) => setUserData(res.data));
      //   break;
      case "company":
        GetCompany().then((res) => setCompanyData(res.data));
        break;
      case "advertisement":
        GetAdvertisement().then((res) => setAdvertisementData(res.data));
        break;
      case "application":
        GetApplication().then((res) => setApplicationData(res.data));
        break;
    }
  }, [refresh]);


  return (
    <>
      {/* TODO: add props to Nav */}
      <Nav />
      <div>
        <div className="grid grid-cols-1 gap-5 m-5">
          {/* {userData ? (
            <DataTable
              type="user"
              data={userData}
              del={DeleteUser}
              refreshData={refreshData}
            />
          ) : (
            <CircularProgress aria-label="loading" />
          )} */}
          {companyData ? (
            <DataTable
              type="company"
              data={companyData}
              del={DeleteCompany}
              refreshData={refreshData}
            />
          ) : (
            <CircularProgress aria-label="loading" />
          )}
          {advertisementData ? (
            <DataTable
              type="advertisement"
              data={advertisementData}
              del={DeleteAdvertisement}
              refreshData={refreshData}
            />
          ) : (
            <CircularProgress aria-label="loading" />
          )}
          {applicationData ? (
            <DataTable
              type="application"
              data={applicationData}
              del={DeleteApplication}
              refreshData={refreshData}
            />
          ) : (
            <CircularProgress aria-label="loading" />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
