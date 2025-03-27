import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <body></body>
          <Main />
          <NextScript />
        </Head>
      </Html>
    );
  }
}

export default MyDocument;
