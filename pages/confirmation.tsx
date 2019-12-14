import Footer from '../src/components/global/Footer';
import { NextSeo } from "next-seo";

function Confirmation(props: any)  { 
  const {query} = props;
  const {user = ''} = query;

  return (
    <main>
      <section>
        <div className="uk-container" >
          <NextSeo
            title={ user ? `${user} - account confirmed!` : `Account confirmed!`}
          />
          <section id="authorized" className="uk-padding">
            <img src="/images/illustrations/access-granted.gif" alt="access granted" />
          </section>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

Confirmation.getInitialProps = ({query}: any) => {
  return {query}
}

export default Confirmation;
