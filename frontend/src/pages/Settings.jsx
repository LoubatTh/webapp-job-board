import { useContext, useEffect } from "react";
import Nav from "../components/Navbar";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import RecruiterSettings from "../components/RecruiterSettings";

const Settings = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isLoggedIn) {
      return;
    }
    return navigate("/");
  });

  return (
    <>
      <Nav />
      <div>
        {authContext.isLoggedIn ? (
          authContext.user.is_staff && authContext.user.company !== null ? (
              // annonce publiés
              // candidatures par annonces
              <RecruiterSettings />
          ) : (
            // infos perso
            // voir les annonces auxquels il a postulé
            <h1>User Settings</h1>
          )
        ) : null}
      </div>
    </>
  );
};

export default Settings;
