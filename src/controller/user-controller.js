import UserModel from '../model/user-model.js';
import JobModel from '../model/job-model.js';

export default class UserController {
  getLogin(req, res) {
    if (req.session.userEmail) {
      return res.redirect('/jobs');
    }
    res.render('login', { errors: null });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.redirect('/login');
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    if (!user) {
      return res.render('login', { errors: 'Invalid Credentials' });
    }
    req.session.userEmail = email;
    req.session.userId = user.id;
    res.redirect('/jobs');
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) console.log(err);
      res.redirect('/login');
    });
  }
}