import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth, IAuth } from "../../utils";

interface Props {
  WrappedComponent: React.ReactNode;
}

const WithAuth = (WrappedComponent) => {
  const { currentUser }: IAuth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      // remember the page that user tried to access
      // setRedirect(router.route);
      // redirect
      router.push("/restricted");
    }
  }, [router, currentUser]);
  return (props) => {
    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;
