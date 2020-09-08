import React from 'react';
import {
  FaArrowCircleUp,
  FaLinkedinIn,
  FaExternalLinkAlt,
  FaTwitter,
  FaGithub,
  FaReact,
  FaRegCopyright,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
// * * * * Smooth Scroll Library
import { animateScroll as scroll } from 'react-scroll';
// import SelectLanguage from './SelectLanguage';

const Footer = (props) => {
  const date = new Date().getFullYear();
  const colorTheme = props.colorTheme;

  const showAlert = (store) => {
    Swal.fire({
      title: 'Hang on for updates!',
      imageWidth: 400,
      imageHeight: 400,
      confirmButtonColor: '#192B4D',
      text: `The app will be soon available in ${store}!`,
      confirmButtonText: 'Cool',
    });
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <footer>
      <div className="wrapper">
        <div className="upperFooter">
          <span className="scrollTop" onClick={scrollToTop}>
            <FaArrowCircleUp />
          </span>
          <ul className="socials">
            <li>
              <a
                href="https://www.linkedin.com/in/oksana-samokhvalova/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/oksanadev/" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://www.oksanadev.com/" target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/OksanaSam/"
                data-toggle="tooltip"
                role="tooltip"
                data-placement="top"
                title="Some tooltip text!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>
        <p className="copyright">
          <FaRegCopyright /> {date} oksanadev.com{' '}
          <span>
            <FaReact />
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
