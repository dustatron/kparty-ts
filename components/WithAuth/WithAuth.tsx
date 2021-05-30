import React from "react";
import { useAuth, IAuth } from "../../utils";
import { SignInBox } from "../SignInBox";

interface Props {
  WrappedComponent: React.ReactNode;
}

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const { currentUser, loading }: IAuth = useAuth();

    if (!loading && currentUser) {
      return <WrappedComponent {...props} />;
    }

    return <SignInBox />;
  };
};

export default WithAuth;
