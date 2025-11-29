interface ICredentials {
  username: string;
  password: string;
}

interface IUserData {
  title: string;
  loginCredentials?: ICredentials;
  credentials: ICredentials;
  message: string;
}

enum NOTIFICATIONS{
    REGISTER_SUCCESS = 'Successfully registered! Please, click Back to return on login page',
    INVALID_WITHOUT_USERNAME = 'Username is required',
    INVALID_WITHOUT_PASSWORD = 'Password is required',
    INVALID_WITHOUT_CREDS = 'Please, provide valid data',
    INVALID_PASSWORD_LESS_THAN_EIGHT = 'Password should contain at least 8 characters',
    INVALID_USERNAME_LESS_THAN_THREE = 'Username should contain at least 3 characters',
    INVALID_USERNAME_POSTFIX_PREFIX = 'Prefix and postfix spaces are not allowed is username',
    INVALID_CREDS_IN_USE = 'Username is in use',
    INVALID_USERNAME_EXCEEDED = 'Username must be at most 40 characters',
    INVALID_PASSWORD_EXCEEDED = 'Password must be at most 20 characters',
    LOGIN_INVALID_CREDS = 'Invalid credentials',
    LOGIN_EMPTY_CREDS = 'Credentials are required',
    LOGIN_EMPTY_PASSWORD = 'Password is required',
    LOGIN_EMPTY_USERNAME= 'Username is required'
}

const validCredentials: ICredentials = {
    username: 'MTuser1',
    password: 'MTpassword1',
};

const invalidTestData: IUserData[] = [
  {
    credentials: { username: '', password: validCredentials.password },
    message: NOTIFICATIONS.INVALID_WITHOUT_USERNAME,
    title: 'Register without username',
  },
  {
    credentials: { username: validCredentials.username, password: '' },
    message: NOTIFICATIONS.INVALID_WITHOUT_PASSWORD,
    title: 'Register without password',
  },
  {
    credentials: { username: '', password: '' },
    message: NOTIFICATIONS.INVALID_WITHOUT_CREDS,
    title: 'Register without credentials',
  },
  {
    credentials: { username: 'MT', password: validCredentials.password },
    message: NOTIFICATIONS.INVALID_USERNAME_LESS_THAN_THREE,
    title: 'Register with less than 3 character username',
  },
  {
    credentials: { username: validCredentials.username, password: 'Passwor' },
    message: NOTIFICATIONS.INVALID_PASSWORD_LESS_THAN_EIGHT,
    title: 'Register with less than 8 character password',
  },
  {
    credentials: { username: ' MTuser2 ', password: validCredentials.password },
    message: NOTIFICATIONS.INVALID_USERNAME_POSTFIX_PREFIX,
    title: 'Register with postfix and prefix spaces in username',
  },
  {
    credentials: { username: 'Mexceededusername41charactersinvalidinput', password: validCredentials.password },
    message: NOTIFICATIONS.INVALID_USERNAME_EXCEEDED,
    title: 'Register with exceeded max length username',
  },
  {
    credentials: { username: validCredentials.username, password: 'MT1Exceededpassword21' },
    message: NOTIFICATIONS.INVALID_PASSWORD_EXCEEDED,
    title: 'Register with exceeded max length password',
  },
];

const invalidLoginData: IUserData[] = [
    { 
        credentials: {username: 'MTuser1', password: validCredentials.password}, 
        loginCredentials: {username: 'MTuser1', password: 'InvalidPassword1'},
        message: NOTIFICATIONS.LOGIN_INVALID_CREDS, 
        title: 'Login with invalid password'
    },
    { 
        credentials: {username: 'MTuser2', password: validCredentials.password}, 
        loginCredentials: {username: 'InvalidUsername', password: validCredentials.password},
        message: NOTIFICATIONS.LOGIN_INVALID_CREDS, 
        title: 'Login with invalid username'
    },
    { 
        credentials: {username: 'MTuser3', password: validCredentials.password}, 
        loginCredentials: {username: '', password: ''},
        message: NOTIFICATIONS.LOGIN_EMPTY_CREDS, 
        title: 'Login without credentials'
    },
    { 
        credentials: {username: 'MTuser4', password: validCredentials.password}, 
        loginCredentials: {username:'MTuser4', password: ''},
        message: NOTIFICATIONS.LOGIN_EMPTY_PASSWORD, 
        title: 'Login without password'
    },
    { 
        credentials: {username: 'MTuser5', password: validCredentials.password}, 
        loginCredentials: {username: '', password: validCredentials.password},
        message: NOTIFICATIONS.LOGIN_EMPTY_USERNAME, 
        title: 'Login without username'
    },
    ]
export { invalidTestData, invalidLoginData, NOTIFICATIONS };