import { useState, useEffect } from "react";

import { GetAdvertisement } from "../services/advertisement.service";
import Advertisement from "../components/Advertisement";

const Home = () => {
  const [data, setData] = useState();
  useEffect(() => {
    GetAdvertisement().then((res) => setData(res.data));
  }, []);

  console.log(data);
  const listAdvertisements = data?.map((item) => (
    <Advertisement data={item} key={item.id} />
  ));

  return (
    <div className="container mx-auto flex flex-col items-center">
      <p className="text-3xl my-3 text-center">Home</p>
      {listAdvertisements}
    </div>
  );
};

export default Home;
