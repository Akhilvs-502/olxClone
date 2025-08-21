import React from 'react';

import './Footer.css';
import facebookImg from '../../assets/facebook-app-symbol.png'
import instagramImg from '../../assets/instagram (1).png'
import twitterImg from '../../assets/twitter (3).png'
function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li>kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul>
              <li>About OLX Group</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>OLXPeople</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>OLX</p>
          </div>
          <div className="list">
            <ul>
            <li>Help</li>
            <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>Follow Us
            </p>
          </div>
          <div className="list">
            <ul>
              <li><img src={facebookImg} alt="" /> <img src={instagramImg} alt="" />
              <img src={twitterImg} alt="" /></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Other Countries Pakistan - South Africa - Indonesia</p>
        <p>Free Classifieds in India. © 2006-2025 OLX</p>
      </div>
    </div>
  );
}

export default Footer;
