import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import dateFormat from "dateformat";
import styles from "@/src/styles/Home.module.css";
import Header from '@/src/components/Header'; 
import Slider from '@/src/components/Slider'; 
import Footer from '@/src/components/Footer';

export default function Campaign({ data }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleNavigation = (slug) => {
    router.push("/" + slug);
  };

  const filteredCampaigns = data.filter((element) =>
    element.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <Head>
          <title>Campaign Manager | Campaign</title>
          <meta name="description" content="Campaign details" />
        </Head>

        <main className={styles.main}>
        <div className={styles.OverlayContain}>
      <div className={styles.ContentColumn}>
        <h2>Browse the Web Summit 2023 schedule</h2>
        <p>Check out the talks, masterclasses, Q&As and more that took place at Web Summit 2023.</p>
        <a href="/discover-lisbon" role="button" tabIndex="0" className={styles.Button}>
          <span>Discover more</span>
        </a>
      </div>
      <div className={styles.GridContainer}>
        <div className={styles.BackgroundImage}></div>
        <div className={styles.ImageColumnLeft}>
          <img src="https://websummit.com/wp-media/2023/08/tram.jpg" alt="Image 2" />
        </div>
        <div className={styles.ImageColumnRight}>
          <img src="https://websummit.com/wp-media/2023/08/Nightlife-in-the-terraces-of-bars-and-restaurants-in-the-Chiado-neighborhood-social-1.jpg" alt="Image 3" />
        </div>
      </div>
    </div>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search Campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>Search</button>
          </div>
          <div className={styles.grid}>
            {filteredCampaigns.map((element) => (
              <div
                key={element.slug}
                className={styles.card}
                onClick={() => handleNavigation(element.slug)}
              >
                <div className={styles.image}>
                  <Image
                    src={
                      "https://res.cloudinary.com/dzplxvf5r/" + element.logo
                    }
                    height={120}
                    width={120}
                    alt="Campaign Banner"
                  />
                </div>
                <div className={styles.details}>
                  <h2 className={styles.cardTitle}>{element.title}</h2>
                  <p className={styles.description}>
                    {element.description.substring(0, 200)}
                  </p>
                  <p className={styles.date}>
                    Created at:{" "}
                    {dateFormat(
                      new Date(element.created_at),
                      "dddd, mmmm dS, yyyy, h:MM:ss TT"
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  let data = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`
    );
    data = await response.json();
  } catch (err) {
    console.error("Error fetching campaigns:", err);
  }
  return {
    props: {
      data,
    },
  };
}