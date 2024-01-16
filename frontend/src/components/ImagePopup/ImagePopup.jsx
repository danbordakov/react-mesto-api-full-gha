function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup popup_type_fullview ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__button-close"
          aria-label="Закрыть"
          onClick={onClose}>
        </button>
        <figure>
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__image-name">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;