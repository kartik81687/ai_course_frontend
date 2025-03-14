import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './pages/forgotpassword';
import ResetPassword from './pages/resetpassword';
import Home from './pages/home';
import Create from './pages/create';
import Topics from './pages/topics';
import Course from './pages/course';
import Certificate from './pages/certificate';
import Profile from './pages/profile';
import Pricing from './pages/pricing';
import Features from './pages/features';
import About from './pages/about';
import Payment from './pages/payment';
import Success from './pages/success';
import Manage from './pages/manage';
import Successful from './pages/successful';
import Failed from './pages/failed';
import Contact from './pages/contact';
import DashBoard from './admin/dashboard';
import Users from './admin/users';
import Courses from './admin/courses';
import PaidUsers from './admin/paidusers';
import Admins from './admin/admins';
import Contacts from './admin/contacts';
import Terms from './admin/terms';
import Privacy from './admin/privacy';
import Cancellation from './admin/cancellation';
import Refund from './admin/refund';
import Billing from './admin/billing';
import TermsPolicy from './pages/termspolicy';
import PrivacyPolicy from './pages/privacypolicy';
import CancelPolicy from './pages/cancelpolicy';
import RefundPolicy from './pages/refundpolicy';
import BillingPolicy from './pages/billingpolicy';
import Error from './pages/error';
import Pending from './pages/pending';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleClientId } from './constants';
import Shareable from './pages/shareable';
import Exam from './pages/exam';

function App() {

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
    <Router>
      <div>
        <ToastContainer
          limit={3}
          progressClassName={sessionStorage.getItem('darkMode') === 'true' ? "toastProgressDark" : "toastProgress"}
          bodyClassName={sessionStorage.getItem('darkMode') === 'true' ? "toastBodyDark" : "toastBody"}
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={sessionStorage.getItem('darkMode') === 'true' ? 'dark' : 'light'}
        />
        <Routes>
          {/* Main App */}
          <Route path="/" exact element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/forgot' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/home' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/topics' element={<Topics />} />
          <Route path='/course' element={<Course />} />
          <Route path='/certificate' element={<Certificate />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/features' element={<Features />} />
          <Route path='/about' element={<About />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/success' element={<Success />} />
          <Route path='/subscription' element={<Manage />} />
          <Route path='/successful' element={<Successful />} />
          <Route path='/failed' element={<Failed />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/terms' element={<TermsPolicy />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/cancellation' element={<CancelPolicy />} />
          <Route path='/refund' element={<RefundPolicy />} />
          <Route path='/billing' element={<BillingPolicy />} />
          <Route path='/pending' element={<Pending />} />
          <Route path='/shareable' element={<Shareable />} />
          <Route path='/exam' element={<Exam />} />
          {/* Admin Panel */}
          <Route path='/admin/dashboard' element={<DashBoard />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/courses' element={<Courses />} />
          <Route path='/admin/paid' element={<PaidUsers />} />
          <Route path='/admin/admins' element={<Admins />} />
          <Route path='/admin/contacts' element={<Contacts />} />
          <Route path='/admin/terms' element={<Terms />} />
          <Route path='/admin/privacy' element={<Privacy />} />
          <Route path='/admin/cancellation' element={<Cancellation />} />
          <Route path='/admin/refund' element={<Refund />} />
          <Route path='/admin/billing' element={<Billing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
