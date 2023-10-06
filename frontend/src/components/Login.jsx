import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';import axios from 'axios';



const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(17, 'Too Long!')
    .required('Required')
});

const Login = (props) => {
  const navigate = useNavigate();
  async function sendLoginData(formValues, setSubmitting, setErrors) {
    try {
        const response = await axios.post("http://localhost:8000/login", formValues);
        console.log(response.data);
        const {username , status} = response.data;
        navigate('/', {state:{username :username,loginStatus:status } ,replace: true });
      } catch (error) {
        console.error(error);
        if (error.response) {
          // Server responded with an error status (e.g., 400 Bad Request)
          setErrors({ serverError: error.response.data.error });
          alert(error.response.data.error)
        } else {
          // Network error or other unexpected issues
          setErrors({ serverError: "An unexpected error occurred" });
          alert("An unexpected error occurred")
        }
      } finally {
        setSubmitting(false);
      }
  };


  return(
  <div className='form-container register-form-container'>
    <h3>Login</h3>
    <Formik
      initialValues={{
        email: '',
        password : ''
      }}
      validationSchema={LoginSchema}
      onSubmit={(values , {setSubmitting , setStatus}) => {
        console.log(values);
        sendLoginData(values , setSubmitting , setStatus );
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className='form-field'>
            <label>Email :</label>
            <Field name="email" type="email" className='form-inp'/>
            {errors.email && touched.email ? <div className='form-err-msg'>{errors.email}</div> : null}
          </div>
          <div className='form-field'>
            <label>Password :</label>
            <Field name="password" type="password" className='form-inp' />
            {errors.password && touched.password ? <div className='form-err-msg'>{errors.password}</div> : null}
          </div>
          <button type="submit" className='form-btn'>Login</button>
        </Form>
      )}
    </Formik>
  </div>
  )
};

export default Login