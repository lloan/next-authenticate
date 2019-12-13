import React from "react";

function Footer(): JSX:Element {
  return (
    <div className="footer">
      <table role="presentation" border="0" cellPadding="0" cellSpacing="0">
        <tr>
          <td className="content-block">
            <span className="apple-link">3499 Tenth Street Riverside CA 92501</span>
          </td>
        </tr>
        <tr>
          <td className="content-block powered-by">
            Powered by <a href="https://github.com/lloan/next-authenticate">next-authenticate</a>.
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Footer;
