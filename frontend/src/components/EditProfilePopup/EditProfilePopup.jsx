import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = React.useState('')
  const [job, setJob] = React.useState('')
  const user = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeJob(e) {
    setJob(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: job,
    });
  }

  React.useEffect(() => {
    setName(user.name);
    setJob(user.about);
  }, [user, isOpen]); 

  return (
    <PopupWithForm
    name={"editinfo"}
    title={"Редактировать профиль"}
    buttonTitle={"Сохранить"}
    buttonType={"save"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    >
      <input id="name-input" type="text" className="popup__field popup__field_type_name" name="name" required
        minLength="2" maxLength="40" placeholder="Введите имя" value={name} onChange={handleChangeName} />
      <span className="popup__field-error name-input-error">&nbsp;</span>
      <input id="job-input" type="text" className="popup__field popup__field_type_job" name="job" required minLength="2"
        maxLength="200" placeholder="Введите деятельность" value={job} onChange={handleChangeJob} />
      <span className="popup__field-error job-input-error">&nbsp;</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;