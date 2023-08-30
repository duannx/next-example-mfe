// import styles from "./index.module.scss";
import Head from "next/head";
import styles from "./index-critical.module.scss";

export default function Test({addCss}) {
  console.log('styles', styles)
  addCss && addCss(styles._getCss())
  return (
  <>
  {/* <Head>
    <style>
      {`
      ${styles._getCss()}
      `}
    </style>
  </Head> */}
  <div className={styles.test}>Test</div>
  </>);
}
