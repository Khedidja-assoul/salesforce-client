import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
var FormData = require("form-data");

const Home = ({ candidature }: any) => {
  console.log(candidature);
  return (
    <div className={styles.container}>
      <Head>
        <title>SALESFORCE API TEST</title>
        <meta name="description" content="SALESFORCE API TEST" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SALESFORCE API TEST</h1>

        <p className={styles.description}>
          Détails de la candidature:
          <code className={styles.code}>a004L000002gCJK</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>First Name</h2>
            <p>{candidature.First_Name__c}</p>
          </div>

          <div className={styles.card}>
            <h2>Last Name</h2>
            <p>{candidature.Last_Name__c}</p>
          </div>

          <div className={styles.card}>
            <h2>Year</h2>
            <p>{candidature.Year__c}</p>
          </div>

          <div className={styles.card}>
            <h2>Year Of Experience</h2>
            <p>{candidature.Year_Of_Experience__c}</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};
const BASE_URL = "https://soljit35-dev-ed.my.salesforce.com";

export async function getStaticProps() {
  try {
    let formData = new FormData();
    formData.append(
      "client_id",
      "3MVG9I9urWjeUW051PumYX1mbS5HkS3kpZsbCEzYWjgivRyDno1MjvM08EfVf2be52s0vrthHamsgMpQCrm5Z"
    );
    formData.append(
      "client_secret",
      "EC97DAFBF9F6F2399DE5E7BADA2E9BBEF6B3B6E832DC435668AA452940AD9501"
    );
    formData.append("password", "entretient_1235zoLmTaUDLiouUaOAN6WhOQPi");
    formData.append("username", "soljit_algeria2@soljit.com");
    formData.append("grant_type", "password");
    const authResults = await fetch(`${BASE_URL}/services/oauth2/token`, {
      method: "POST",
      body: formData,
    });
    const res1 = await authResults.json();
    const { access_token } = res1;

    const mainResults = await fetch(
      `${BASE_URL}/services/data/v53.0/sobjects/Candidature__c/a004L000002gCJK?fields=First_Name__c,Last_Name__c,Year__c,Year_Of_Experience__c`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        method: "GET",
      }
    );

    const { First_Name__c, Last_Name__c, Year__c, Year_Of_Experience__c, Id } =
      await mainResults.json();


    return {
      props: {
        candidature: {
          First_Name__c,
          Last_Name__c,
          Year__c,
          Year_Of_Experience__c,
          Id,
        },
      },
    };
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      candidature: {},
    },
  };
}

export default Home;
