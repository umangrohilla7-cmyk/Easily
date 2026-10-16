import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';

// Controllers (updated to match src/controller/ folder)
import JobController from './src/controller/job-controller.js';
import UserController from './src/controller/user-controller.js';

// Middlewares (updated to match src/middleware/ folder)
import { auth } from './src/middleware/auth.js';
import { setLastVisit } from './src/middleware/lastVisit.js';
import { uploadFile } from './src/middleware/file-upload.js';
import { sendConfirmationEmail } from './src/middleware/email-middleware.js';

const app = express();

// View Engine Setup (updated directory path to 'src/view')
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'view'));

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: 'EasilySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(setLastVisit);

// Controller Instances
const jobController = new JobController();
const userController = new UserController();

// --- Auth Routes ---
app.get('/login', userController.getLogin);
app.post('/register', userController.postRegister);
app.post('/login', userController.postLogin);
app.post('/logout', userController.logout);

// --- Job Routes ---
app.get('/', jobController.getLandingPage);
app.get('/jobs', jobController.getJobs);
app.post('/jobs', auth, jobController.postNewJob);
app.get('/jobs/new', auth, jobController.getNewJob);

app.get('/jobs/:id', jobController.getJobDetails);
app.get('/jobs/:id/update', auth, jobController.getUpdateJob);
app.post('/jobs/:id/update', auth, jobController.postUpdateJob);
app.get('/jobs/:id/delete', auth, jobController.deleteJob);

// --- Application & Applicant Routes ---
app.post('/apply/:id', uploadFile.single('resume'), sendConfirmationEmail, jobController.applyJob);
app.get('/jobs/:id/applicants', auth, jobController.getApplicants);


// 404 Route
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});