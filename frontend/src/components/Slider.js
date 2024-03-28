import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Import default styles of react-slideshow-image
import styles from '@/src/styles/slider.module.css'; // Import your CSS module

const Slider = ({ data }) => {
  return (
    <div className={styles.carouselContainer}>
      <Slide
        indicators={true}
        arrows={false}
        autoplay={true}
        duration={3000}
        transitionDuration={500}
        infinite={true}
        pauseOnHover={true}
              >
        {data.map((campaign, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.imageContainer}>
              <img src={`https://res.cloudinary.com/dzplxvf5r/${campaign.logo}`} alt={campaign.title} className={styles.image} />
            </div>
            <div className={styles.textContainer}>
              <h2 className={styles.title}>{campaign.title}</h2>
              <p className={styles.description}>{campaign.description.substring(0, 200)}</p>
              <div className={styles.buttons}>
              <button className={styles.exploreButton} onClick={() => handleExploreClick(campaign.slug)}>
                  Explore
                </button>
                <button className={styles.registerButton} onClick={() => handleRegisterClick(campaign.slug)}>
                  Register Now
                </button>
                
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slider;