import { useState, useEffect, useContext } from "react";
import { CircularProgress } from "@nextui-org/react";

import { AuthContext } from "../context/authContext";
import Nav from "../components/Navbar";
import DataTable from "../components/tables/Table";
import { GetCompany, DeleteCompany } from "../services/company.service";
import {
  GetAdvertisement,
  DeleteAdvertisement,
} from "../services/advertisement.service";
import {
  GetApplication,
  DeleteApplication,
} from "../services/application.service";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [companyData, setCompanyData] = useState();
  const [advertisementData, setAdvertisementData] = useState();
  const [applicationData, setApplicationData] = useState();
  const [refresh, setRefresh] = useState([false, "user"]);
  const refreshData = async (type) => setRefresh([!refresh[0], type]);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isLoggedIn && authContext.user.is_superuser) {
      return;
    }
    return navigate("/");
  });

  useEffect(() => {
    GetCompany().then((res) => setCompanyData(res.data));
    GetAdvertisement().then((res) => setAdvertisementData(res.data));
    GetApplication().then((res) => setApplicationData(res.data));
  }, []);

  useEffect(() => {
    switch (refresh[1]) {
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
      <Nav />
      <div className="grid grid-cols-1 gap-5 m-5">
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
    </>
  );
};

export default Dashboard;
