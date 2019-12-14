import React from "react";
import uikitcss from "../../CSS";
import Footer from "../partial/Footer";
import Button from "../components/Button";


const Confirmation = (options: { url: string; username: string, token: string }) => {
  const {url, username, token} = options; 
  
  if (!url || !username || !token) return (<p>An error has occurred, please contact the administrator</p>)

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width"/>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Email confirmation</title>
        <style>
          {uikitcss}
        </style>
      </head>
      <body className="">
        <span className="preheader">Email confirmation</span>
        <table role="presentation" cellPadding="0" cellSpacing="0" className="body">
          <tr>
            <td>&nbsp;</td>
            <td className="container">
              <div className="content">
                <table role="presentation" className="main">
                  <tr>
                    <td className="wrapper">
                      <table role="presentation" cellPadding="0" cellSpacing="0">
                        <tr>
                          <td>
                            <p>Hello {username},</p>
                            <p>This email was used to sign up for our service. Please confirm that it was you.</p>
                            <p>After you confirm, you will be able to sign in to your account.</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <Button align="left" url={`${url}api/validate/confirm?user=${username}&token=${token}`} label="Confirm"/>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <Footer/>
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export default Confirmation;
