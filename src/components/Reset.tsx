function Reset(): JSX.Element {
  const handleReset = (e: any) => {
    e.preventDefault();

    // API route that will handle recovering password
    const url = '/api/authenticate/reset';

    fetch(url, {
      method: 'POST',
    }).then((response) => response.json())
        .then((response) => {
          const {state} = response;

          if (state) {
            // TODO: update view to show that password has been sent
            if (document) {
              document.location.href = "/reset-password";
            }
          }
        }).catch((error) => {
          console.log(error);
        });
  };

  return (
    <section className="auth-recovery">
      <h3 className="uk-text-center">Forgot your password?</h3>
      <p className="uk-text-center uk-width-medium@s uk-margin-auto">Enter your email address and we will send you a link to reset your password.</p>
      <form>
        <div className="uk-margin">
          <div className="uk-inline uk-width-1-1">
            <i className="uk-form-icon fa fa-envelope"/>
            <input className="uk-input uk-form-large" type="text" placeholder="Email address" />
          </div>
        </div>
        <div className="uk-margin">
          <button className="uk-button bg-primary black uk-button-large uk-width-1-1" onClick={(event) =>
            handleReset(event)
          }>Send Email</button>
        </div>
        <div className="uk-text-small uk-text-center">
          <a href="#" uk-switcher-item="0">Back to login</a>
        </div>
      </form>
    </section>
  );
}

export default Reset;
