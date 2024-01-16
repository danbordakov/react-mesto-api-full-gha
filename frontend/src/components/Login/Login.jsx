import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  function resetForm() {
    setEmail('');
    setPassword('');
  };

  function handleChangeEmail(e) {
      setEmail(e.target.value);
  }

  function handleChangePassword(e) {
      setPassword(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault();
      onLogin({ email, password })
      .then(resetForm)
      .then(() => navigate('/'))
  }

  React.useEffect(() => {
      if (localStorage.getItem('jwt')) {
          navigate('/');
      }
  }, [navigate]);

  return (
    <div className="register">
      <h1 className="popup__label popup__label_type_register">Вход</h1>
      <form onSubmit={handleSubmit} className="popup__form popup__form_type_register">
        <input
          id="email"
          type="email"
          className="popup__field popup__field_type_register"
          name="email"
          required
          minLength="2"
          maxLength="40"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          id="password"
          type="password"
          className="popup__field popup__field_type_register"
          name="password"
          required
          minLength="2"
          maxLength="200"
          placeholder="Пароль"
          value={password}
          onChange={handleChangePassword}
        />
        <button
          type="submit"
          className="popup__button-submit popup__button-submit_type_register"
        >
        Войти  
        </button>
      </form>
    </div>
    
  )
}

export default Login