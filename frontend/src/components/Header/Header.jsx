import logoPath from '../../images/logo.svg';
import { Route, Routes, Link } from 'react-router-dom';
import React from 'react';

function Header({email, onSignOut}) {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип сайта" className="header__logo" />
      <p className='header__email'>{email}</p>
      <Routes>
        <Route path='/sign-in' element={<Link className='header__link' to='/sign-up'>Регистрация</Link>} />
        <Route path='/sign-up' element={<Link className='header__link' to='/sign-in'>Войти</Link>} />
        <Route path='/' element={<Link className='header__link' to='/sign-in' onClick={onSignOut}>Выход</Link>} />
      </Routes>
    </header>
  )
}

export default Header;