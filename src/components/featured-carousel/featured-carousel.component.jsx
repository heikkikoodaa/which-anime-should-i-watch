import './featured-carousel.styles.scss';

const FeaturedCarousel = () => {
  return (
    <div className="search--featured-container">
      <div className="featured--button-left">
        <span>&lt;</span>
      </div>
      <div className="featured-covers"></div>
      <div className="featured--button-right">
        <span>&gt;</span>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
