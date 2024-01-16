import React from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CardsContext } from "../../contexts/CardsContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const user = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  return (
    <main>
      <section className="profile" aria-label="Профиль">
        <button
          type="button"
          className="profile__change-avatar-button"
          aria-label="Изменить аватар"
          onClick={onEditAvatar}>
        </button>
        <img src={user.avatar} alt="фотография профиля" className="profile__avatar" />
        <h1 className="profile__name">{user.name}</h1>
        <p className="profile__description">{user.about}</p>
        <button
          type="button"
          className="profile__edit-button"
          aria-label="Изменить"
          onClick={onEditProfile}>
        </button>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить"
          onClick={onAddPlace}>
        </button>
      </section>
      <section aria-label="Элементы" className="elements-container">
        <ul className="elements">
          {
            cards.map((item) => (
              <li key={item._id} className="element">
                <Card
                  card={item}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;