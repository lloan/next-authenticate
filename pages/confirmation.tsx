import Footer from '../src/components/global/Footer';
import { NextSeo } from "next-seo";

function Confirmation()  { 
  
  return (
    <main>
      <section>
        <div className="uk-container" >
          <NextSeo
            title="Confirmed!"
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

export default Confirmation;
