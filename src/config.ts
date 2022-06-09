const BASE_URL = 'http://192.168.0.114:8000';

export const config = {
  signup: `${BASE_URL}/users/signup`,
  signin: `${BASE_URL}/users/signin`,
  emailCheck: `${BASE_URL}/users/email_check`,
  check: `${BASE_URL}/users/check`,
  mains: `${BASE_URL}/reservations/subject`,
  docScheme: `${BASE_URL}/reservations/time`,
};
