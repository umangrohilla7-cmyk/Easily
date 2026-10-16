import JobModel from '../model/job-model.js';

export default class JobController {
  getLandingPage(req, res) {
    res.render('landing');
  }

  getJobs(req, res) {
    const { search } = req.query;
    let jobs = search ? JobModel.search(search) : JobModel.getAll();
    res.render('jobs', { jobs, userEmail: req.session.userEmail });
  }

  getJobDetails(req, res) {
    const id = req.params.id;
    const job = JobModel.getById(id);
    if (!job) {
      return res.status(404).render('404');
    }
    res.render('job-details', { job, userEmail: req.session.userEmail });
  }

  getNewJob(req, res) {
    res.render('new-job', { userEmail: req.session.userEmail });
  }

  postNewJob(req, res) {
    JobModel.add(req.body, req.session.userId);
    res.redirect('/jobs');
  }

  getUpdateJob(req, res) {
    const id = req.params.id;
    const job = JobModel.getById(id);
    if (!job) {
      return res.status(404).render('404');
    }
    res.render('update-job', { job, userEmail: req.session.userEmail });
  }

  postUpdateJob(req, res) {
    const id = req.params.id;
    JobModel.update(id, req.body);
    res.redirect(`/jobs/${id}`);
  }

  deleteJob(req, res) {
    const id = req.params.id;
    JobModel.delete(id);
    res.redirect('/jobs');
  }

  applyJob(req, res) {
    const jobId = req.params.id;
    const { name, email, contact } = req.body;
    const resumePath = req.file ? '/uploads/' + req.file.filename : '';
    JobModel.addApplicant(jobId, name, email, contact, resumePath);
    res.redirect('/jobs');
  }

  getApplicants(req, res) {
    const jobId = req.params.id;
    const applicants = JobModel.getApplicants(jobId);
    res.render('applicant', { applicants, userEmail: req.session.userEmail }); // render('applicant') matches applicant.ejs
  }
}