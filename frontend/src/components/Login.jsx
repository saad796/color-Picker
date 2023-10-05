import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(17, 'Too Long!')
    .required('Required')
});

const Login = () => (
  <div className='form-container register-form-container'>
    <h3>Login</h3>
    <Formik
      initialValues={{
        email: '',
        password : ''
      }}
      validationSchema={LoginSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {/* <div className='form-field'> */}
            <Field name="email" type="email" className='form-inp'/>
            {errors.email && touched.email ? <div className='form-err-msg'>{errors.email}</div> : null}
          {/* </div> */}
          {/* <div className='form-field'> */}
            <Field name="password" type="password" className='form-inp' />
            {errors.password && touched.password ? <div className='form-err-msg'>{errors.password}</div> : null}
          {/* </div> */}
          <button type="submit" className='form-btn'>Login</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Login