import { useState } from 'react';
import useFormTextField from './useFormTextField';
import { signupAPI } from '../utils/auth-api';

export default (done) => {
  const initialState = { error: false, errorMsg: '', value: '' };

  const [emailState, setEmailError] = useFormTextField(initialState);
  const [passwordState, setPasswordError] = useFormTextField(initialState);
  const [usernameState, setUsernameError] = useFormTextField(initialState);
  const [repeatPasswordState, setRepeatPasswordError] = useFormTextField(initialState);
  const [formError, setFormError] = useState('');

  const setError = {
    password: setPasswordError,
    username: setUsernameError,
    email: setEmailError,
    repeatPassword: setRepeatPasswordError,
  };

  const runFormValidation = (formData) => {
    const { password, repeatPassword } = formData;
    let validationFail = false;
    if (password !== repeatPassword) {
      setError.repeatPassword('Passwords do not match');
      validationFail = true;
    }

    return validationFail;
  };

  const handleErrors = (err) => {
    /**
     * Why the if statements?
     * Sometimes the server sends an array of errors and sometimes it sends a string.
     * We've got to handle both!
     */
    const { errors } = err;
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        setError[error.param](error.msg);
      });
    } else if (typeof errors === 'string') {
      setFormError(errors);
    } else {
      // just in case
      setFormError("Something wen't wrong. Please contact the developer.");
      console.log(err); // eslint-disable-line no-console
    }
  };

  const handleSuccess = (response) => {
    const token = response.headers['x-auth-token'];
    const user = response.data;
    localStorage.setItem('token', token);
    done(user);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { value: password } = passwordState;
    const { value: repeatPassword } = repeatPasswordState;
    const { value: username } = usernameState;
    const { value: email } = emailState;

    const formData = {
      email,
      username,
      password,
      repeatPassword,
    };

    const validationFail = runFormValidation(formData);

    if (validationFail) {
      return;
    }

    const user = {
      email,
      username,
      password,
    };

    signupAPI(user)
      .then(handleSuccess)
      .catch(handleErrors);
  };

  return {
    emailState,
    passwordState,
    usernameState,
    repeatPasswordState,
    handleSubmit,
    formError,
  };
};
