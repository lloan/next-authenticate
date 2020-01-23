import {useContext} from 'react';
import AppContext from '../src/context';
import Logout from '../src/components/authenticate/Logout';
import {DefaultSeo} from "next-seo";
import SEO from "../next-seo.config";
import {NextPage} from 'next';

const Dashboard: NextPage = () => {
  const {user} = useContext(AppContext);

  return (
    <div className="uk-container uk-margin-large-top">
      <DefaultSeo {...Object.assign(SEO, {
        title: `${user} - dashboard`,
      })}
      />
      <h1>Hello {user}!</h1>
      <Logout/>
    </div>
  );
};

export default Dashboard;
