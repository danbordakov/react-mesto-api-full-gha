import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import '../index.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ImagePopup from './ImagePopup/ImagePopup';
import api from '../utils/API';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import Register from './Register/Register';
import Login from './Login/Login';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { register, authorize, getContent } from '../utils/Auth.jsx';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [InfoTooltipType, setIsInfoTooltipType] = useState('');
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([user, items]) => {
        setCurrentUser(user);
        setCards(items);
      })
      .catch((err) => {
        console.log(err);
      }) }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltipSuccess() {
    setIsInfoTooltipPopupOpen(true);
    setIsInfoTooltipType('success');
  }

  function handleInfoTooltipFail() {
    setIsInfoTooltipPopupOpen(true);
    setIsInfoTooltipType('fail');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter(item => item._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({
      newName: name,
      newJob: about
    })
    .then(() => {
      setCurrentUser({...currentUser, name, about});
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar({ avatar }) {
    api.setAvatar({newAvatar: avatar})
    .then(() => {
      setCurrentUser({...currentUser, avatar});
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.postNewCard({
      cardName: name,
      cardLink: link
    })
    .then((newCard) => {
      setCards([newCard, ...cards])
    })
    .then(closeAllPopups)
    .catch((err) => {
      console.log(err);
    })
  }

  // Регистрация, вход, выход
  // ----------------------------------------------------------------

  //использую для определения auth реакт колбэк, потому что без него
  //авторизация уходила в бесконечный цикл
  const auth = useCallback((jwt) => {
    return getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData({email: res.data.email})
        }
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('userId');
    if (jwt) {
      auth(jwt);
    }
  }, [auth]);

  useEffect(() => {
    if (loggedIn)
      {navigate('/')};
  }, [navigate, loggedIn]);

  function onRegister({ email, password }) {
    return register(email, password)
    .then((res) => {
      handleInfoTooltipSuccess();
      return res;
    })
    .then(() => navigate('/sign-in'))
    .catch(() => handleInfoTooltipFail())
  };

  function onLogin({ email, password }) {
    return authorize(email, password)
    .then((res) => {
      if (res) {
        setUserData({email})
        setLoggedIn(true);
        localStorage.setItem('userId', res._id);
        navigate('/');
      }
    })
    .catch(() => handleInfoTooltipFail());
  };

  function onSignOut() {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    navigate('/sign-in');
    setUserData({})
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className='page'>
          <Header email={userData.email} onSignOut={onSignOut}/>
          <Routes>
            <Route path='*' element={loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />}/>
            <Route path='/sign-up' element={<Register onRegister={onRegister} />} />
            <Route path='/sign-in' element={<Login onLogin={onLogin} />} />
            <Route
              path='/'
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  onSignOut={onSignOut}
                  component={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={onCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Routes>
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          type={InfoTooltipType}
          />
          <Footer />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
