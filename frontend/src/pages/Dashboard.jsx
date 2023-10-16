import { useState, useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";

import Nav from "../components/Navbar";
import DataTable from "../components/tables/Table";
import { GetUser, PutUser, DeleteUser } from "../services/user.service";
import {
  GetCompany,
  PutCompany,
  DeleteCompany,
} from "../services/company.service";
import {
  GetAdvertisement,
  PutAdvertisement,
  DeleteAdvertisement,
} from "../services/advertisement.service";
import {
  GetApplication,
  PutApplication,
  DeleteApplication,
} from "../services/application.service";

const Dashboard = () => {
  const [userData, setUserData] = useState();
  const [companyData, setCompanyData] = useState();
  const [advertisementData, setAdvertisementData] = useState();
  const [applicationData, setApplicationData] = useState();

  useEffect(() => {
    GetUser().then((res) => setUserData(res.data));
    GetCompany().then((res) => setCompanyData(res.data));
    GetAdvertisement().then((res) => setAdvertisementData(res.data));
    GetApplication().then((res) => setApplicationData(res.data));
  }, []);

  return (
    <>
      {/* TODO: add props to Nav */}
      <Nav />
      <div>
        <div className="grid grid-cols-1 gap-5 m-5">
          {userData ? (
            <DataTable
              type="user"
              data={userData}
              put={PutUser}
              del={DeleteUser}
            />
          ) : (
            <CircularProgress aria-label="loading" />
          )}
          {companyData ? (
            <DataTable
              type="company"
              data={companyData}
              put={PutCompany}
              del={DeleteCompany}
            />
          ) : (
            <CircularProgress aria-label="loading" />
          )}
          {advertisementData ? (
            <DataTable
              type="advertisement"
              data={advertisementData}
              put={PutAdvertisement}
              del={DeleteAdvertisement}
            />
          ) : (
            <CircularProgress aria-label="loading" />
          )}
          {applicationData ? (
            <DataTable
              type="application"
              data={applicationData}
              put={PutApplication}
              del={DeleteApplication}
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
