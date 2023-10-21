import { useContext, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

import { Login, Register } from "../../services/user.service";
import { AuthContext } from "../../context/authContext";

const RegisterForm = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    let data = {
      email: email,
      username: name,
      number: phone,
      password: password,
    };

    Register(JSON.stringify(data))
      .then(() => {
        Login(
          JSON.stringify({
            email: email,
            password: password,
          })
        )
          .then(() => {
            authContext.SetLogIn(true)
            navigate("/")
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="flex flex-col gap-4 bg-slate-50 p-7 rounded-lg border-2 border-slate-300">
      <p className="text-xl text-start">Sign in</p>
      <Input
        autoFocus
        label="name"
        aria-label="name"
        placeholder="Enter a name"
        variant="faded"
        color="default"
        type="name"
        value={name}
        onValueChange={setName}
      />
      <Input
        label="phone"
        aria-label="phone"
        placeholder="Enter a phone"
        variant="faded"
        color="default"
        type="phone"
        value={phone}
        onValueChange={setPhone}
      />
      <Input
        label="email"
        aria-label="email"
        placeholder="Enter a email"
        variant="faded"
        color="default"
        type="email"
        value={email}
        onValueChange={setEmail}
      />
      <Input
        label="password"
        aria-label="password"
        placeholder="Enter a password"
        variant="faded"
        color="default"
        type="password"
        value={password}
        onValueChange={setPassword}
      />
      <div className="flex flex-row gap-3 justify-center">
        <Button color="danger" className="flex self-center w-1/3">
          <Link to="/">Cancel</Link>
        </Button>
        <Button
          color="primary"
          onPress={() => handleSubmit()}
          className="flex self-center w-1/3"
        >
          Apply
        </Button>
      </div>
      <p className="text-xs text-end text-gray-400">
        Already have an account ?{" "}
        <Link to="/login" className="font-semibold text-blue-500">
          Log in
        </Link>{" "}
      </p>
    </div>
  );
};

export default RegisterForm;
