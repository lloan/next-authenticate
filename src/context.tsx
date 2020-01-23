import React from "react";
import {useRouter} from "next/router";


export interface MyAuthContext {
  user: string | undefined;
  access: boolean;
  loading: boolean;
  verifyAuthUser(): void;
  logout(): void;
}


const defaultAuthContext: MyAuthContext = {
  user: undefined,
  access: false,
  loading: false,
  verifyAuthUser: () => {
    return;
  },
  logout: () => {
    return;
  },
};


const AuthContext = React.createContext<MyAuthContext>(defaultAuthContext);

const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [access, setAccess] = React.useState<boolean>(false);
  const router = useRouter();

  const verifyAuthUser = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.HOST}api/authenticate/auth`, {
      method: 'POST',
    });
    const data = await res.json();
    setUser(data.user);
    setAccess(data.access);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.HOST}api/authenticate/logout`, {
      method: 'POST',
    });
    const json = await res.json();
    const {status} = json;
    if (status) {
      setAccess(false);
      setLoading(false);
      router.push("/logged-out");
    }

    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      access,
      loading,
      verifyAuthUser,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
