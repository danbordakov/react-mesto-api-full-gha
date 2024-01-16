function PopupWithForm({ name, title, buttonTitle, buttonType, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${name}`}>
      <button
        type="button"
        className="popup__button-close"
        aria-label="Закрыть"
        onClick={onClose}>
      </button>
      <h2 className="popup__label">{title}</h2>
      <form name={`form_type_${name}`} className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit} noValidate>
        {children}
        <button
          type="submit"
          className={`popup__button-submit popup__button-submit_type_${buttonType}`}
          aria-label={buttonTitle}>
            {buttonTitle}
        </button>
      </form>
      </div>
    </div>
  )
}

export default PopupWithForm;