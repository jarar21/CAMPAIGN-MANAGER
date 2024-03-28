import Head from 'next/head';
import Link from 'next/link';
import styles from '@/src/styles/Index.module.css';
import Header from '@/src/components/Header'; 
import Slider from '@/src/components/Slider'; 
import Footer from '@/src/components/Footer';

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Campaign Manager | Home</title>
        <meta name="description" content="A campaign manager for campaigns" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>

      {/* Use the Header component */}
      <Header />

      <main className={styles.main}>
        {/* Web Summit section */}
        <Slider data={data} />

        {/* Additional content */}
        <div className={styles.additionalContent}>
        <h1 className={styles.title}>“Where the future goes to be born” - The Atlantic • <span style={{ color: '#5D97D1' }}>November 11 - 14</span> • Lisbon</h1>
          <p className={styles.description}>Web Summit will bring together 70,000+ people, and the companies redefining the tech industry.</p>
          <div className={styles.buttons}>
            <Link href="/register">
              <button className={styles.registerButton}>Register Now</button>
            </Link>
            <Link href="/speakers">
              <button className={styles.exploreButton}>Explore Speakers</button>
            </Link>
          </div>
        </div>

        {/* Additional container with white background */}
        <div className={styles.additionalContainer}>
          <div className={styles.leftContent}>
            <h2>Why will 70,000+ gather in Lisbon?</h2>
            <p>Three reasons: incredible speakers, unparalleled networking opportunities, and proprietary software that will maximise your experience.</p>
            <p>We’re proud of our track record when it comes to live events. The Guardian called us “Glastonbury for geeks”. The Financial Times called us “the world’s largest tech conference”.</p>
            <p>Experience it this November. Join us in Lisbon.</p>
          </div>
          <div className={styles.rightContent}>
  <div className={styles.imagebox}>
    <div className={styles.numberblock}>
      <span className={styles.nblabel}>800+</span>
      <br />
      <span className={styles.speakers}>speakers</span> {/* Added speakers with a separate class */}
    </div>
    <div className={styles.imagewrapper}>
      <img src="/Attendees-at-PandaConf-Stage-during-the-opening-day-of-Web-Summit-768x511.jpg" alt="Image Description" />
    </div>
  </div>
</div>
        </div>
        <div className={styles.overlayContainer}>
  <div className={styles.grid}>
    <div className={styles.img + ' ' + styles.img_top}>
      <img src="/pexels-diva-plavalaguna-6150527.jpg" alt="Top Image" />
    </div>
    <div className={styles.img + ' ' + styles.img_bottom}>
      <img src="/pexels-skitterphoto-722708.jpg" alt="Bottom Image" />
    </div>
  </div>
  <div className={styles.contentContainer}>
      <h2>What is Web Summit?</h2>
      <p>Politico has said we run “the world’s premier tech conference”, the Atlantic that Web Summit is “where the future goes to be born”, and the New York Times that we assemble “a grand conclave of the tech industry’s high priests”.

At a time of great uncertainty for many industries and, indeed, the world itself, we gather policymakers, heads of state, and the founders and CEOs of technology companies and fast-growing startups, to ask a simple question: Where to next?</p>
    </div>
</div>
    <div className={styles.OverlayContain}>
      <div className={styles.ContentColumn}>
        <h2>Discover Lisbon</h2>
        <p>In 2016, the city of Lisbon gave us an incredible welcome, and it’s helped make Web Summit a truly unforgettable event year after year ever since. Portugal is still our home and, in 2024, we will share it with the rest of the world again.</p>
        <p>We can’t wait to return to Lisbon in November.</p>
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

      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  let data = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`);
    data = await response.json();
  } catch (err) {
    console.error('Error fetching campaigns:', err);
  }
  return {
    props: {
      data,
    },
  };
}
