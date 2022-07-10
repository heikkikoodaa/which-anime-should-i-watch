import { ReactComponent as HeartIcon } from '../../assets/heart.svg';
import './header.styles.scss';

const Header = () => {
  return (
    <header>
      <h2>Which Anime Should I Watch?</h2>
      <HeartIcon className="header--heart-icon" />
    </header>
  );
};

export default Header;
