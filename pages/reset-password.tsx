import Redirect from "../src/components/animation/Redirect";
// import {NextSeo} from "next-seo";
import {useState, useEffect} from "react";
import notify from "../src/components/utility/Notify";
import Password from "../src/components/authenticate/Password";
import Link from "next/link";

/**
 * Check provided input - reset account password if valid.
 * @param {any} props
 * @return {void} checks validity of input provided.
 */
function ResetPassword(props: any) {
  const {query} = props;
  const {user, token, email, action} = query;
  const url = 'api/authenticate/reset';
  const [confirmation, setConfirmation] = useState(undefined);

  useEffect(() => {
    console.log(action);
    if (user && token && email && confirmation === undefined) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...query,
          action: "verify",
        }),
      })
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              notify({
                message: response.message,
                status: 'success',
                pos: 'top-left',
                timeout: 5000,
              });
            } else {
              notify({
                message: response.message,
                status: 'danger',
                pos: 'top-left',
                timeout: 5000,
              });
            }

            setConfirmation(response.status);
          })
          .catch((error) => {
            notify({
              message: error.message,
              status: 'danger',
              pos: 'top-left',
              timeout: 5000,
            });
          });
    }
  }, []);

  // only render page if user, token found in query
  if (props.query.hasOwnProperty('user') && props.query.hasOwnProperty('token')) {
    return (
      <div className="uk-container uk-margin-large-top">
        {confirmation &&
          (<div>
            {/* // TODO: Create a form and function to handle submission of a new password since we're verified */}
            <Password/>
          </div>)
        }
        {!confirmation &&

          <div>
            <h1 className="primary">Password Reset</h1>
            <p className="uk-text-bolder">Check your email.</p>
            <p className="subtitle-text">
                You should have received an email to verify your password reset request.
            </p>
            <p>
                Confirm that you received the email and then try logging in to
                your account with your new password.
            </p>
            <Link href="/authenticate">
              <a>
                  Go to Log In page
              </a>
            </Link>
          </div>
        }
      </div>
    );
  } else {
    setTimeout(()=> {
      if (document) {
        document.location.href = "/authenticate";
      }
    }, 2500);
    return (
      <Redirect/>
    );
  }
}

ResetPassword.getInitialProps = ({query}: any) => {
  return {query};
};

export default ResetPassword;
