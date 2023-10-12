import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

const Nav = ({ isAdmin, isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        {isAdmin ? (
          <NavbarItem className="text-black">
            <Link to="/dashboard">Dashboard</Link>
          </NavbarItem>
        ) : null}
        {isLoggedIn ? (
          <>
            <NavbarItem className="text-black">
              <Link to="/settings">Settings</Link>
            </NavbarItem>
            <NavbarItem>
              <Button color="warning" variant="flat">
                <Link to="/">Log out</Link>
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button color="warning" variant="flat">
                <Link to="/login">Log in</Link>
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color="warning" variant="flat">
                <Link to="/register">Sign in</Link>
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;

Nav.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
