import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { useRecoilState } from 'recoil';
import { authState } from '../../state';

import { useNavigate } from 'react-router-dom';

const Initialstate = {
  name: '',
  email: '',
  password: '',
  password2: '',
  errors: {}
};

function Register() {
  const navigate = useNavigate();
  const [auth] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerModel, setRegisterModel] = useState(Initialstate);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newUser = {
      name: registerModel.name,
      email: registerModel.email,
      password: registerModel.password,
      password2: registerModel.password2
    };
    await axios
      .post('/api/users/register', newUser)
      .then(() => {
        setIsLoading(false);
        if (auth) navigate('/landing');
      })
      .catch((err) => {
        setErrors(err.response.data);
        console.log('err.response.data', err.response.data);
        console.log('errors', errors);
        setIsLoading(false);
      });
  };
  const onChange = (e) => {
    setRegisterModel({ ...registerModel, [e.target.id]: e.target.value });
  };
  /*
  useEffect(() => {
    if (auth) navigate('/landing');
  }, [auth, navigate]);
*/
  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to home
          </Link>
          <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={registerModel.name}
                // eslint-disable-next-line react/no-unknown-property
                error={errors.name}
                id="name"
                type="text"
              />
              <label htmlFor="name">Name</label>
              <span style={{ color: 'red' }}>{errors.name}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={registerModel.email}
                // eslint-disable-next-line react/no-unknown-property
                error={errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span style={{ color: 'red' }}>{errors.email}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={registerModel.password}
                // eslint-disable-next-line react/no-unknown-property
                error={errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span style={{ color: 'red' }}>{errors.password}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={registerModel.password2}
                // eslint-disable-next-line react/no-unknown-property
                error={errors.password2}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
              <span style={{ color: 'red' }}>{errors.password2}</span>
            </div>
            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
              <button
                disabled={isLoading}
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem'
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
