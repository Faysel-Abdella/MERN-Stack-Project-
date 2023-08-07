import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "Front-end" },
  { id: nanoid(), company: "google", position: "Back-end" },
];

export const getAllJobs = async (req, res, next) => {
  res.status(200).json({ jobs: jobs });
};

export const createJob = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ message: "Please provide the full information" });
  }
  const job = { id: nanoid(10), company: company, position, position };
  jobs.push(job);
  res.status(201).json({ job: job });
};

export const getJob = async (req, res, next) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: "No job with such id" });
  }
  res.status(200).json({ job: job });
};

export const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const { newCompany, newPosition } = req.body;
  if (!newCompany || !newPosition) {
    return res
      .status(400)
      .json({ message: "Please to edit provide all informations" });
  }
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: "Job not found for edit" });
  }
  job.company = newCompany;
  job.position = newPosition;
  res.status(201).json({ message: "job edited", job: job });
};

export const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({
      message: "Job not found for delete, please provide a correct id",
    });
  }
  jobs = jobs.filter((job) => job.id !== id);
  res.status(200).json({ message: "job deleted" });
};
