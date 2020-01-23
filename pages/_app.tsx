import '../sass/main.scss';
import App from 'next/app';
import AppContext from '../src/context';
import {redirects, unprotected} from '../src/pages';
import {DefaultSeo} from 'next-seo';
import SEO from '../next-seo.config';
import Unauthorized from "../src/components/global/Unauthorized";
import Redirect from "../src/components/animation/Redirect";
// import Loader from "../src/components/animation/Loader";
import {User} from '..';


interface MyAppState {
  user: User;
  access: boolean;
  redirect: string | undefined;
  isPublic: boolean;
  loading: boolean;
}


export default class MyApp extends App<{}, {}, MyAppState> {
  state: MyAppState = {
    user: undefined,
    access: false,
    redirect: undefined,
    isPublic: false,
    loading: false,
  };

  componentDidMount(): void {
    const {pathname} = this.props.router;
    const redirect = redirects[pathname] ? redirects[pathname].redirect : undefined;
    const isPublic = unprotected.includes(pathname);
    this.setState({redirect, isPublic});
    this.fetchUser();
  };

  componentDidUpdate(_: any, prevState: MyAppState): void {
    // any state change, check the path and for redirects
    const {pathname} = this.props.router;
    const redirect = redirects[pathname] ? redirects[pathname].redirect : undefined;
    const isPublic = unprotected.includes(pathname);
    if (redirect !== prevState.redirect || isPublic !== prevState.isPublic) {
      this.setState({redirect, isPublic});
    }
  };

  redirect(redirect: string) {
    this.props.router.push(redirect);
  }

  setUser(user: User) {
    this.setState({user});
  }

  clearUser() {
    this.setState({user: undefined});
  }

  fetchUser() {
    this.setState({loading: true});
    fetch(`${process.env.HOST}api/authenticate/auth`, {
      method: 'POST',
    })
        .then((res) => res.json())
        .then((data) => {
          const access = data.access;
          const user = data.user !== "null" ? data.user : undefined;
          this.setState({access, user, loading: false});
        }).catch(() => {
          this.setState({loading: false});
        });
  }

  render() {
    const {Component, pageProps} = this.props;
    const {access, redirect, isPublic, loading} = this.state;

    if (loading) {
      return <h1>Loading</h1>;
      // return <Loader />;
    }

    if (access && redirect) {
      // send user to proper page if they're logged in
      this.redirect(redirect);
      return <Redirect />;
    } else if (access || isPublic) {
      return (
        <AppContext.Provider value={{
          user: this.state.user,
          setUser: this.setUser,
          clearUser: this.clearUser,
          fetchUser: this.fetchUser,
        }}>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </AppContext.Provider>
      );
    } else if (!access) {
      return <Unauthorized/>;
    } else {
      this.redirect("/authenticate");
      return <Redirect/>;
    }
  }
}
