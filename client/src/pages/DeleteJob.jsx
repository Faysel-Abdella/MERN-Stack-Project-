import { toast } from "react-toastify";
import customFetch from "../util/customFetch.js";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Job deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  // in both cases redirect to ''
  return redirect("/dashboard/all-jobs");
};
