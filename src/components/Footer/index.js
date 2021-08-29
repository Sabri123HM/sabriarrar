import Link from 'components/Link';
import './index.css';

const Footer = () => (
  <footer className="footer">
    <span className="footer__date">{`© ${new Date().getFullYear()} Sabri Arrar.`}</span>
  </footer>
);

export default Footer;
