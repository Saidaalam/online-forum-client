import { Link } from "react-router-dom";
import logo from '../../Images/nexora-logo.png'

const Footer = () => {
    return (
        <footer className="footer p-10 mt-10 bg-base-200 text-base-content">
        <aside>
        <Link to='/' className='flex gap-2 mt-4 items-center'>
          <img className='w-auto h-14' src={logo} alt='' />
        </Link>
          <p className="text-lg">Online forum Platform since 2006</p>
        </aside> 
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Data Science</a>
          <a className="link link-hover">Cybersecurity</a> 
          <a className="link link-hover">Web Development</a>
          <a className="link link-hover">Game Development</a>
        </nav> 
        <nav>
          <h6 className="footer-title">Website</h6> 
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Membership</a>
          <a className="link link-hover">Announcement</a>
        </nav> 
        <nav>
          <h6 className="footer-title">Legal</h6> 
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    );
};

export default Footer;