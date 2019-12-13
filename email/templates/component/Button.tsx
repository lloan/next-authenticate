function Button(props: {label: string; url: string; align: any}) {
  const {label, url, align} = props;
  return (
    <table role="presentation" cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td align={align}>
            <table role="presentation" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <a className="uk-button uk-button-primary" href={url} rel="noopener noreferrer" target="_blank">
                      {label}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Button;
