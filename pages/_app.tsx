import '../sass/main.scss';
import App from 'next/app';
import Router from 'next/router';
import {AuthContext, AuthProvider} from '../src/context';
import {redirects, unprotected} from '../src/pages';
import {DefaultSeo} from 'next-seo';
import SEO from '../next-seo.config';
import Unauthorized from "../src/components/global/Unauthorized";
import Redirect from "../src/components/animation/Redirect";
import Loader from "../src/components/animation/Loader";

interface MyAppState {
  redirect: string | undefined;
  isPublic: boolean;
}

export default class MyApp extends App<{}, {}, MyAppState> {
  state: MyAppState = {
    redirect: undefined,
    isPublic: false,
  };

  componentDidMount(): void {
    const {pathname} = this.props.router;
    const redirect = redirects[pathname] ? redirects[pathname].redirect : undefined;
    const isPublic = unprotected.includes(pathname);

    this.setState({redirect, isPublic});
  };

  redirect(redirect: string) {
    Router.push(redirect);
  }

  render() {
    const {Component, pageProps} = this.props;
    const {redirect, isPublic} = this.state;

    return (
      <AuthProvider>
        <AuthContext.Consumer>
          {({access, loading}) => {
            if (loading) {
              return <Loader />;
            }
            if (access && redirect) {
              this.redirect(redirect);
              return <Redirect />;
            } else if (access || isPublic) {
              return (
                <>
                  <DefaultSeo {...SEO} />
                  <Component {...pageProps} />
                </>
              );
            } else if (!access) {
              return <Unauthorized/>;
            } else {
              Router.push("/authenticate");
              return <Redirect />;
            }
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
  }
}
