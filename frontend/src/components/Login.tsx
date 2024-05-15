import { useContext, useState } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { login } from '../common/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn, setAccessToken, setRefreshToken } =
    useContext(LoginContext);

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      if (username && password) {
        const tokens = await login(username, password);
        console.log(tokens);
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
        setLoggedIn(true);
      }
    } catch (error: any) {
      setLoggedIn(false);
      console.error(error.message);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Submit</button>
    </div>
  );
};

export default Login;
