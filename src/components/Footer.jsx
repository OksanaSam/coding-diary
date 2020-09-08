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
// * * * * Smooth Scroll Library
import { animateScroll as scroll } from 'react-scroll';

function Footer() {
  const date = new Date().getFullYear();

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
              <a href="https://github.com/OksanaSam/" target="_blank" rel="noopener noreferrer">
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
}

export default Footer;
