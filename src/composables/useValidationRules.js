export default function useValidationRules() {

  const emailPattern = /^(?=[a-zA-Z0-9@.%+-]{6,254}$)[a-zA-Z0-9.%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  const usernamePattern = /^[a-zA-Z0-9_.]+$/;

  const rules = {
    email: (val) => emailPattern.test(val) || 'Please enter a valid email address',
    required: (val) => !!val || 'Field is required',
    validUsername: (val) => usernamePattern.test(val) || 'Username cannot contain space or sepecial chars',
    password: (val) => val.length > 5 || 'Password must be atleast 6 characters long',
    min3: (val) => val.length >= 3 || 'Must be atleast 3 characters long',
  };

  return {
    rules,
  };
}
