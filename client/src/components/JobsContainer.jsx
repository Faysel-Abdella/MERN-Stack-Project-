import Job from "./job.jsx";
import Wrapper from "../assets/wrappers/JobsContainer.js";
import { useAllJobsContext } from "../pages/AllJobs.jsx";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs } = data;
  // now jobs is array of objects

  if (jobs.length === 0) {
    return <Wrapper>No jobs found...</Wrapper>;
  }

  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
          // pass all property of job to Job component as a prop
          return <Job key={job._id} {...job}></Job>;
        })}
      </div>
    </Wrapper>
  );
};
export default JobsContainer;
