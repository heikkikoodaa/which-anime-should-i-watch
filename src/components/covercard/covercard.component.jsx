import './covercard.styles.scss';

const CoverCard = ({data}) => {
  return (
    <img
      className="covercard--cover"
      alt={data.title}
      src={data.images.jpg.image_url}
    />
  );
};

export default CoverCard;
