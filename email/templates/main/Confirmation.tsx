import React from "react";
import mailCSS from "../../CSS";


const Confirmation = (options: { url: string; username: string; token: string }) => {
  const {url, username, token} = options;

  if (!url || !username || !token) return (<p>An error has occurred, please contact the administrator</p>);

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="x-apple-disable-message-reformatting"/>
        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"/>
        <title>Email Confirmation</title>
        <style>
          {mailCSS}
        </style>
      </head>
      <body style={{margin: 0, width: '100%', padding: '0 !important', backgroundColor: '#ffffff'}}>
        <div style={{width: '100%', backgroundColor: '#ffffff'}}>
          <div style={{display: 'none', fontSize: '1px', lineHeight: '1px', maxHeight: '0px', maxWidth: '0px', opacity: 0, overflow: 'hidden', fontFamily: 'sans-serif'}}>
          Email confirmation.
          </div>
          <div style={{display: 'none', fontSize: '1px', lineHeight: '1px', maxHeight: '0px', maxWidth: '0px', opacity: 0, overflow: 'hidden', fontFamily: 'sans-serif'}}>
          ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
          </div>
          <div style={{maxWidth: '600px', margin: '0 auto'}} className="email-container">
            <table role="presentation" cellSpacing={0} cellPadding={0} style={{margin: 'auto', width: '100%'}}>
              <tbody><tr>
                <td style={{backgroundColor: '#ffffff'}}>
                  <table role="presentation" cellSpacing={0} cellPadding={0} style={{width: '100%'}}>
                    <tbody><tr>
                      <td style={{padding: '20px', fontFamily: 'sans-serif', fontSize: '15px', lineHeight: '20px', color: '#555555'}}>
                        <h1 style={{margin: '0 0 10px 0', fontFamily: 'sans-serif', fontSize: '25px', lineHeight: '30px', color: '#333333', fontWeight: 'normal'}}>Email confirmation</h1>
                        <p style={{margin: '10px 0 10px 0'}}>Hello {username},</p>
                        <p style={{margin: 0}}>This email was used to sign up for our service.</p>
                        <p style={{margin: 0}}>Please confirm that it was you.</p>
                        <p style={{margin: '10px 0 0 0'}}>After you confirm, you will be able to sign in to your account.</p>
                        <p style={{margin: '10px 0 0 0'}}><a href="{`${url}api/validate/confirm?user=${username}&token=${token}`}">Confirm</a></p>
                      </td>
                    </tr>
                    </tbody></table>
                </td>
              </tr>
              <tr>
                <td aria-hidden="true" style={{fontSize: '0px', height: '40px', lineHeight: '0px'}}>
                  &nbsp;
                </td>
              </tr>
              </tbody></table>
            <table role="presentation" cellSpacing={0} cellPadding={0} style={{margin: 'auto', width: '100%'}}>
              <tbody><tr>
                <td style={{padding: '20px', fontFamily: 'sans-serif', fontSize: '12px', lineHeight: '15px', textAlign: 'center', color: '#888888'}}>
                  <br /><br />
                  Inland Empire Software Development, Inc.<br /><span className="unstyle-auto-detected-links">3499 Tenth St. Riverside, CA, 92501 US<br />(800)437-0267</span>
                  <br /><br />
                </td>
              </tr>
              </tbody></table>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Confirmation;
