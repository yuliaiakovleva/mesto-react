// import logo from './logo.svg';
// import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({
        name: '',
        link: ''
    })
    const [currentUser, setCurrentUser] = React.useState({
        name: '',
        about: '',
        avatar: ''
    })


    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                // const userName = data.name;
                // setUserName(userName);
                // const userDescription = data.about;
                // setUserDescription(userDescription);
                // const userAvatar = data.avatar;
                // setUserAvatar(userAvatar);
                setCurrentUser(data);
                // console.log(data);
            }
            )
            .catch((err) => {
                console.log('Ошибка.', err)
            })
    }, [])
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

    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then(data => {
                console.log(data);
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
    }

    function handleUpdateAvatar(data) {
        console.log(data);
        api.changeAvatar(data)
            ///????????????????????????????????????/
            .then(response => {
                console.log(response);
                setCurrentUser(response);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
    }

    // про карточки

    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getInitialCards()
            .then(data => {
                // console.log(data);
                setCards(data);
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
    }, [])

    function handleCardLike(card) {
        console.log(card);
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(likeAutor => likeAutor._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card.id, isLiked)
            .then((newCard) => {
                console.log(newCard);
                setCards((state) => state.map((c) => {
                    // console.log(c);
                    return c._id === card.id ? newCard : c
                }));
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
    }

    function handleCardDlete(card) {
        api.deleteCard(card.id)
            .then(() => {
                setCards((state) => state.filter((element) => element._id !== card.id))
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })

    }

    function handleAddPlaceSubmit(data) {
        // console.log(data);
        api.addNewCard(data)
            .then(newCard => {
                setCards([newCard, ...cards]); 
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка.', err)
            })
    }



    return (
        <>
            {/* распространяем контекст по всему dom-дереву */}
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    handleCardClick={handleCardClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDlete}
                />
                <Footer />
                {/* <!-- попап с редактированием профиля --> */}
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                >
                </EditProfilePopup>

                {/* <!-- попап с обновлением аватара --> */}
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                >
                </EditAvatarPopup>

                {/* <!-- попап с добавлением карточек --> */}
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                >
                </AddPlacePopup>

            </CurrentUserContext.Provider>

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


