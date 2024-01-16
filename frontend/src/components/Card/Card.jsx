import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const user = React.useContext(CurrentUserContext);
  const isOwn = card.owner === user._id;
  const isLiked = card.likes.some(i => i === user._id);
  const cardLikeButtonClassName = ( 
    `element__button-like ${isLiked ? 'element__button-like_active' : ''}` 
  )

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <>
      <img className="element__image" alt={card.name} src={card.link} onClick={handleClick} />
      <h2 className="element__description">{card.name}</h2>
      <button type="button" className={cardLikeButtonClassName} aria-label="Нравится" onClick={handleLikeClick}></button>
      <p className="element__like-counter">{card.likes.length}</p>
      {isOwn && <button type="button" className="element__button-trash" aria-label="Удалить" onClick={handleDeleteClick} />}
    </>
  )
}

export default Card;