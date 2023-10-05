import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

async function sendSigninData(formValues, setSubmitting, setErrors) {
  try {
      const response = await axios.post("http://localhost:8000/signin", formValues);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        // Server responded with an error status (e.g., 400 Bad Request)
        setErrors({ serverError: error.response.data.message });
      } else {
        // Network error or other unexpected issues
        setErrors({ serverError: "An unexpected error occurred" });
      }
    } finally {
      setSubmitting(false);
    }
};


const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(17, 'Too Long!')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      "Password must contain at least one numeric character and one special symbol"
    )
    .required('Required')
});

const Signup = () => (
  <div className='form-container register-form-container'>
    <h3>Signup</h3>
    <Formik
      initialValues={{
        userName: '',
        email: '',
        password : ''
      }}
      validationSchema={SignupSchema}
      onSubmit={(values ,{setSubmitting , setErrors})=> {
        console.log(values);
        sendSigninData(values , setSubmitting,setErrors);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className='form-field'>
            <Field name="userName" className='form-inp'/>
            {errors.userName && touched.userName ? (
              <div className='form-err-msg'>{errors.userName}</div>
            ) : null}
          </div>
          <div className='form-field'>
            <Field name="email" type="email" className='form-inp'/>
            {errors.email && touched.email ? <div className='form-err-msg'>{errors.email}</div> : null}
          </div>
          <div className='form-field'>
            <Field name="password" type="password" className='form-inp' />
            {errors.password && touched.password ? <div className='form-err-msg'>{errors.password}</div> : null}
          </div>
          <button type="submit" className='form-btn'>Signin</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Signup