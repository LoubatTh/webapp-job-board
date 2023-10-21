import { useState, useEffect } from "react";

import { GetAdvertisement } from "../services/advertisement.service";
import Advertisement from "../components/Advertisement";
import { GetCompany } from "../services/company.service";
import { CircularProgress } from "@nextui-org/react";
import Nav from "../components/Navbar";

const Home = () => {
  const [data, setData] = useState();
  const [companyData, setCompanyData] = useState();

  useEffect(() => {
    GetAdvertisement().then((res) => setData(res.data));
    GetCompany().then((res) => setCompanyData(res.data));
  }, []);

  const listAdvertisements = data?.map((item) => {
    item.company = companyData?.find(
      (company) => company.id === item.company_id
    );
    return <Advertisement data={item} key={item.advertisement_id} />;
  });

  return (
    <>
      <Nav />
      <div className="container mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 gap-5 mt-5">
          {companyData ? (
            listAdvertisements
          ) : (
            <CircularProgress aria-label="loading" />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
