import Document, {Html, Head, Main, NextScript} from 'next/document';

class Doc extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* add all icons here for app*/}
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.11.2/css/all.css" />
        </Head>

        <body className="portal">
          <Main />
          <NextScript />

          <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit-icons.min.js"></script>
        </body>

      </Html>
    );
  }
}

export default Doc;
