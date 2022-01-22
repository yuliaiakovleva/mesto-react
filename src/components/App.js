// import logo from './logo.svg';
// import './App.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({
        name: '',
        link: ''
    })


    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
        // document.querySelector('#popup-profile').classList.add('popup_is-opened');
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
        // document.querySelector('#popup__avatar').classList.add('popup_is-opened');
    }


    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
        // document.querySelector('#popup-card').classList.add('popup_is-opened');
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }



    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard({
            name: '',
            link: ''
        });
    }


    return (
        <>
            <Header />
            <Main handleCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
            <Footer />

            {/* <!-- попап с редактированием профиля --> */}
            <PopupWithForm name="popup-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                children={
                    <fieldset className="popup__fieldset">
                        <label className="popup__row">
                            <input className="popup__input popup__input_type_name" type="text" name="name" placeholder="Имя"
                                minLength='2' maxLength='40' required id="name-input" />
                            <span className="name-input-error popup__input-error" id="name-error-input"></span>
                        </label>
                        <label className="popup__row">
                            <input className="popup__input popup__input_type_info" type="text" name="about" placeholder="О себе"
                                minLength='2' maxLength='200' required id="info-input" />
                            <span className="info-input-error popup__input-error"></span>
                        </label>
                    </fieldset>}
                button="Сохранить"
            >
            </PopupWithForm>

            {/* <!-- попап с обновлением аватара --> */}
            <PopupWithForm name="popup__avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                children={
                    <fieldset className="popup__fieldset">
                        <label className="popup__row">
                            <input className="popup__input popup__avatar-link" type="url" name="link"
                                placeholder="Ссылка на картинку" id="avatar-input" required />
                            <span className="avatar-input-error popup__input-error"></span>
                        </label>
                    </fieldset>
                }
                button="Сохранить"
            >
            </PopupWithForm>

            {/* <!-- попап с добавлением карточек --> */}
            <PopupWithForm name="popup-card" title="Новое место" isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                children={ 
                    <fieldset className="popup__fieldset">
                    <label className="popup__row">
                        <input className="popup__input popup__input_type_name" type="text" name="name" placeholder="Название"
                            required minLength='2' maxLength='30' id="name-mesto-input" />
                        <span className="name-mesto-input-error popup__input-error"></span>
                    </label>
                    <label className="popup__row">
                        <input className="popup__input popup__input_type_info" type="url" name="link"
                            placeholder="Ссылка на картинку" required id="url-input" />
                        <span className="url-input-error popup__input-error"></span>
                    </label>
                </fieldset>
                }
                button="Создать"
            >
            </PopupWithForm>

            {/* <!-- попап с вопросом "вы уверены?" --> */}
            <PopupWithForm name="popup__question" title="Вы уверены?"
                button="Да"
            >
            </PopupWithForm>

            {/* попап с картинкой на всю страницу */}
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}

            />


            {/* <!-- попап с вопросом "вы уверены?" --> */}
            {/* <section className="popup" id="popup-question">
        <form className="popup__container popup__question-container" name="popup" novalidate>
            <button className="popup__close-btn" type="reset"></button>
            <h2 className="popup__title popup__question-title">Вы уверены?</h2>
            <button className="popup__button popup__question-button" type="submit">Да</button>
        </form>
    </section> */}

        </>
    );
}

export default App;


