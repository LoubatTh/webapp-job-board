import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { Logout } from "../services/user.service";
import { AuthContext } from "../context/authContext";

const Nav = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    Logout().then(() => {
      authContext.SetLogIn(false);
      navigate('/')
    });
  };
  

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent className="flex sm:hidden" justify="start">
        <NavbarBrand>
          <Link to="/">
          <Image
            src="https://quecarta.com/uploads/2020/06/01/233654162374.256x256.jpg"
            height={40}
            width={40}
          />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarBrand>
          <Link to="/">
            <Image
              src="https://quecarta.com/uploads/2020/06/01/233654162374.256x256.jpg"
              height={40}
              width={40}
            />
          </Link>
        </NavbarBrand>
        {authContext.isLoggedIn && authContext.user ? (
          authContext.user.is_staff && authContext.user.is_superuser ? (
            <NavbarItem className="text-black">
              <Link to="/dashboard">Dashboard</Link>
            </NavbarItem>
          ) : null
        ) : null}
        {authContext.isLoggedIn ? (
          <>
            <NavbarItem className="text-black">
              <Link to="/settings">Settings</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="warning"
                variant="flat"
                onPress={() => handleLogout()}
              >
                <Link to="/">Log out</Link>
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button color="warning" variant="flat" onPress={() => navigate("/login")}>
                Log in
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color="warning" variant="flat" onPress={() => navigate("/register")}>
                Sign in
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
