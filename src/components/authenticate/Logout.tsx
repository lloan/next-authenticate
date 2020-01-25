import React from 'react';
import fetch from 'isomorphic-unfetch';
import {useRouter} from 'next/router';
import AppContext from '../../context';

export default function Logout() {
  const router = useRouter();
  const appContext = React.useContext(AppContext);
  const handleLogout = (e: any) => {
    e.preventDefault();

    // API route that will handle signing out
    const url = '/api/authenticate/logout';

    fetch(url, {
      method: 'POST',
    }).then((response) => response.json()).then((response) => {
      const {status} = response;

      if (status) {
        appContext.clearUser();
        router.push("/logged-out");
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <button className="uk-button black" onClick={(event) =>
      handleLogout(event)
    }>
        logout
    </button>
  );
}
