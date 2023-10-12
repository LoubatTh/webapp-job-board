import { useState, useEffect } from "react";

import { GetAdvertisement } from "../services/advertisement.service";
import Advertisement from "../components/Advertisement";
import { GetCompany } from "../services/company.service";
import { CircularProgress } from "@nextui-org/react";

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
    return <Advertisement data={item} key={item.id} />;
  });

  return (
    <div className="container mx-auto flex flex-col items-center">
      <p className="text-3xl my-3 text-center">Home</p>
      <div className="grid grid-cols-1 gap-5 ">
      {companyData ? listAdvertisements : <CircularProgress aria-label="loading"/>}
      </div>
    </div>
  );
};

export default Home;
