export default class JobModel {
  constructor(
    id,
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings,
    jobposted,
    applicants = [],
    recruiterId = 1
  ) {
    this.id = id;
    this.jobcategory = jobcategory;
    this.jobdesignation = jobdesignation;
    this.joblocation = joblocation;
    this.companyname = companyname;
    this.salary = salary;
    this.applyby = applyby;
    this.skillsrequired = skillsrequired;
    this.numberofopenings = numberofopenings;
    this.jobposted = jobposted;
    this.applicants = applicants;
    this.recruiterId = recruiterId;
  }

  static getAll() {
    return jobs;
  }

  static getById(id) {
    return jobs.find((j) => j.id == id);
  }

  static add(jobObj, recruiterId) {
    const newJob = new JobModel(
      jobs.length + 1,
      jobObj.jobcategory,
      jobObj.jobdesignation,
      jobObj.joblocation,
      jobObj.companyname,
      jobObj.salary,
      jobObj.applyby,
      Array.isArray(jobObj.skillsrequired) ? jobObj.skillsrequired : [jobObj.skillsrequired],
      jobObj.numberofopenings,
      new Date().toLocaleString(),
      [],
      recruiterId
    );
    jobs.push(newJob);
    return newJob;
  }

  static update(id, jobObj) {
    const index = jobs.findIndex((j) => j.id == id);
    if (index !== -1) {
      jobs[index] = {
        ...jobs[index],
        ...jobObj,
        skillsrequired: Array.isArray(jobObj.skillsrequired)
          ? jobObj.skillsrequired
          : [jobObj.skillsrequired]
      };
      return jobs[index];
    }
    return null;
  }

  static delete(id) {
    const index = jobs.findIndex((j) => j.id == id);
    if (index !== -1) {
      jobs.splice(index, 1);
      return true;
    }
    return false;
  }

  static addApplicant(jobId, name, email, contact, resumePath) {
    const job = JobModel.getById(jobId);
    if (job) {
      const newApplicant = {
        applicantid: job.applicants.length + 1,
        name,
        email,
        contact,
        resumePath
      };
      job.applicants.push(newApplicant);
      return newApplicant;
    }
    return null;
  }

  static getApplicants(jobId) {
    const job = JobModel.getById(jobId);
    return job ? job.applicants : [];
  }

  static search(query) {
    return jobs.filter((j) =>
      j.jobdesignation.toLowerCase().includes(query.toLowerCase()) ||
      j.companyname.toLowerCase().includes(query.toLowerCase())
    );
  }
}

var jobs = [
  new JobModel(
    1,
    'Tech',
    'SDE-1',
    'Remote',
    'Coding Ninjas',
    '10-15 LPA',
    '2026-12-31',
    ['Node.js', 'Express', 'MongoDB'],
    5,
    new Date().toLocaleString(),
    [],
    1
  )
];