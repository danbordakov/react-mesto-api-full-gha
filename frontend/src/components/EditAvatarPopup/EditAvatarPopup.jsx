import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  
  const avatarRef = React.useRef(null);
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]); 

  return (
    <PopupWithForm
    name={"avatar"}
    title={"Обновить аватар"}
    buttonTitle={"Обновить"}
    buttonType={"avatar"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
      <input ref={avatarRef} id="avatar-link-input" type="url" className="popup__field popup__field_type_avatar-link" name="link"
          placeholder="Ссылка на аватар" required />
      <span className="popup__field-error avatar-link-input-error">&nbsp;</span>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;