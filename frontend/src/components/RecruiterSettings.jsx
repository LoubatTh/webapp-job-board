import { useState, useEffect, useContext } from "react";

import { GetCompanyAdvertisement } from "../services/company.service";
import {
  DeleteAdvertisement,
  GetAdvertisementApplications,
} from "../services/advertisement.service";
import RecruiterAdvertisement from "./RecruiterAdvertisement";
import { CircularProgress } from "@nextui-org/react";
import AdvertisementForm from "./forms/AdvertisementForm";
import { AuthContext } from "../context/authContext";

// TODO: Add user put form to update user information
const RecruiterSettings = () => {
  const authContext = useContext(AuthContext);
  const [advertisement, setAdvertisement] = useState([]);
  const [applications, setApplications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch company advertisement
  useEffect(() => {
    GetCompanyAdvertisement().then((res) => setAdvertisement(res.data));
  }, []);

  useEffect(() => {
    GetCompanyAdvertisement().then((res) => setAdvertisement(res.data));
  }, [refresh]);

  // Fetch advertisement applications and check if it's already in the state
  useEffect(() => {
    advertisement.map((ad) => {
      GetAdvertisementApplications(ad.advertisement_id).then((res) => {
        res.data.length === 0
          ? null
          : applications.findIndex((item) => item.id === res.data[0].id) === -1
          ? setApplications([...applications, res.data[0]])
          : null;
      });
    });
  }, [advertisement]);

  console.log(authContext.user.company)

  const refreshData = async () => setRefresh(!refresh[0]);

  const listAdvertisement = () => {
    return advertisement.map((ad) => {
      let app = applications.filter(
        (application) => application.advertisement == ad.advertisement_id
      );
      return (
        <RecruiterAdvertisement
          key={ad.advertisement_id}
          data={ad}
          applications={app}
          del={removeAdvertisement}
          refresh={refreshData}
        />
      );
    });
  };

  const removeAdvertisement = (id) => {
    DeleteAdvertisement(id)
      .then(GetCompanyAdvertisement().then((res) => setAdvertisement(res.data)))
      .catch((e) => console.error(e));
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 mt-5">
        <AdvertisementForm companyId={authContext.user.company}  refreshData={refreshData}/>
        {advertisement.length > 0 ? (
          listAdvertisement()
        ) : (
          <CircularProgress aria-label="loading" />
        )}
      </div>
    </>
  );
};

export default RecruiterSettings;
