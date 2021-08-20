import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {

  render() {
    return (
      <Html lang='ko'>
        <Head>
          <title>Injection</title>
          <meta charSet="utf-8"></meta>
        </Head>
          <body>
            <Main />
            <NextScript />
          </body>
      </Html>
    );
  }
}