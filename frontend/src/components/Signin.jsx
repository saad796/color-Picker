import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
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

const Signup = (props) => {
  const navigate = useNavigate();

  async function sendSigninData(formValues, setSubmitting, setErrors) {
    try {
        const response = await axios.post("http://localhost:8000/signin", formValues);
        const {username , status , id} = response.data;
        props.userData((prev)=>{
          return {...prev,
            loginStatus : status,
            username : username,
            userid : id
          }
          })
          navigate('/');
      } catch (error) {
        console.error(error);
        if (error.response) {
          // Server responded with an error status (e.g., 400 Bad Request)
          setErrors({ serverError: error.response.data.message });
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

  return (
  <div className='form-container register-form-container'>
    <h3>SignIn</h3>
    <Formik
      initialValues={{
        username: '',
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
            <label>Username :</label>
            <Field name="username" className='form-inp'/>
            {errors.username && touched.username ? (
              <div className='form-err-msg'>{errors.username}</div>
            ) : null}
          </div>
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
          <button type="submit" className='form-btn'>Signin</button>
        </Form>
      )}
    </Formik>
  </div>)
};

export default Signup