// components/withAuth.tsx

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

interface WithAuthProps {
  showSideBar: boolean;
  userData: any;
}

export default function withAuth<T extends WithAuthProps>(Component: ComponentType<T>): ComponentType<T> {
  const WithAuth = (props: T) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
      const getUser = async () => {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/login");
        } else {
          setAuthenticated(true);
        }
      };
      getUser();
    });

    return !!authenticated ? <Component {...props} /> : null;
  };

  return WithAuth;
}
