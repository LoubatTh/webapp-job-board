import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { Login } from "../../services/user.service";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    let data = {
      email: email,
      password: password,
    };

    try {
      Login(JSON.stringify(data)).then((res) => console.log(res));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-slate-50 p-7 rounded-lg border-2 border-slate-300">
      <p className="text-xl text-start">Log in</p>
      <Input
        autoFocus
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
        <Button
          color="danger"
          className="flex self-center w-1/3"
        >
          <Link to="/">Cancel</Link>
        </Button>
        <Button
          color="primary"
          onPress={handleSubmit()}
          className="flex self-center w-1/3"
        >
          Apply
        </Button>
      </div>
      <p className="text-xs text-end text-gray-400">
        Need an account ?{" "}
        <Link to="/register" className="font-semibold text-blue-500">
          Sign in
        </Link>{" "}
      </p>
    </div>
  );
};

export default LoginForm;
