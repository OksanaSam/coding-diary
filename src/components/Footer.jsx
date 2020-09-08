import React from 'react';
// import googlePlay from '../assets/128x128.jpg';
// import appleStore from '../assets/128x128copy.jpg';
import { FaLinkedinIn, FaExternalLinkAlt, FaTwitter, FaGithub } from 'react-icons/fa';
import Swal from 'sweetalert2';
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

  return (
    <footer>
      <div className="upperFooter">
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
        {/* <div className="languageSelect">
          <label htmlFor="language" className="visuallyHidden">
            Select language
          </label>
          <SelectLanguage />
        </div> */}
        <ul className="appDl">
          <li data-tip data-for="happyFace">
            <a onClick={() => showAlert('Google Play')}>
              <img src="" />
            </a>
          </li>
          <li>
            <a onClick={() => showAlert('AppStore')}>
              <img src="" />
            </a>
          </li>
        </ul>
      </div>
      <p className="copyright"> Copyright © oksanadev {date}</p>
    </footer>
  );
};

export default Footer;
