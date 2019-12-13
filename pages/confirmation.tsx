import {NextSeo} from 'next-seo';
import Link from "next/link";
import Footer from '../src/components/global/Footer';

function Confirmation() {
  return (
    <main>
      <section>
        <div className="uk-container" >
          <NextSeo
            config={{
              title: "Confirmation",
            }}
          />
          <section className="uk-padding">
            <p className="uk-heading-small green">Confirmed</p>
            <p>Thank you for confirming!</p>
            <Link href="/auth">
              <button className="uk-button">Log in</button>
            </Link>
          </section>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

Confirmation.getInitialProps = (ctx: any) => {
  if (!(process as any).browser && ctx.hasOwnProperty('query')) {
    const {token, user} = ctx.query;

    // user must have token in query and user name
    console.log(user, token);
    // check DB for user and their token within confirmation column

    // if column value !== match, let user know

    // if column value matches, set to false or null
  }

  return {};
};

export default Confirmation;
