import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function resetForm() {
    setEmail('');
    setPassword('');
  };

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email, password })
    .then(resetForm)
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="register">
      <h1 className="popup__label popup__label_type_register">Регистрация</h1>
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
        Зарегистрироваться  
        </button>
        <p className='register__footer'>Уже зарегистрированы? <Link className='register__footer_link' to='/sign-in'>Войти</Link></p>
      </form>
    </div>
    
  )
}

export default Register