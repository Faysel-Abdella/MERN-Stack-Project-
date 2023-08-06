import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import main from "../assets/images/main.svg";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Our job tracking app revolutionizes your job search with a
            user-friendly interface. Easily input and track application details
            in one place. Stay organized with comprehensive status tracking and
            timely reminders. Integration with job search platforms saves time.
            Gain insights with analytics and reporting. Rest assured with secure
            data storage. Accessible across devices for convenience.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo user
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
