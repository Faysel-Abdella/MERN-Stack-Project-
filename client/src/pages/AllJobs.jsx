import { JobsContainer, SearchContainer } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../util/constants";
import { useContext, createContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../util/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    // console.log({ data });

    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData();
  // console.log(data);
  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => {
  return useContext(AllJobsContext);
};

export default AllJobs;
