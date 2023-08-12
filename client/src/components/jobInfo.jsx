import Wrapper from "../assets/wrappers/JobInfo.js";
const jobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-icon">{text}</span>
    </Wrapper>
  );
};
export default jobInfo;
