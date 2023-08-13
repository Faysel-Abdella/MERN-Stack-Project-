import Job from "./job.jsx";
import Wrapper from "../assets/wrappers/JobsContainer.js";
import { useAllJobsContext } from "../pages/AllJobs.jsx";
import PageBtnContainer from "./PageBtnContainer.jsx";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;
  console.log(numOfPages);
  // now jobs is array of objects

  if (jobs.length === 0) {
    return <Wrapper>No jobs found...</Wrapper>;
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          // pass all property of job to Job component as a prop
          return <Job key={job._id} {...job}></Job>;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
