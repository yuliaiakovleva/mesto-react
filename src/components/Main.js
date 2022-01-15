import React from 'react';
import App from './App';
import api from '../utils/api'
import Card from './Card';
import { useEffect, useState } from 'react';

function Main(props) {

    const [userName, setUserName] = useState('Жак-Ив Кусто');
    const [userDescription, setUserDescription] = useState('Исследователь океана');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                const userName = data.name;
                setUserName(userName);
                const userDescription = data.about;
                setUserDescription(userDescription);
                const userAvatar = data.avatar;
                setUserAvatar(userAvatar);
            }
            );
    })

    useEffect(() => {
        api.getInitialCards()
            .then(data => {
                console.log(data);
                setCards(data);
            })
    })

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__image" style={{ backgroundImage: `url(${userAvatar})` }} >
                    {/* сюда обработчик */}
                    <button type="button" className="profile__image-button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="input">
                    <h1 className="input__text input__text_type_name">{userName}</h1>
                    {/* сюда обработчик */}
                    <button type="button" className="input__edit-btn" onClick={props.onEditProfile}></button>
                    <p className="input__text input__text_type_info">{userDescription}</p>
                </div>
                {/* сюда обработчик */}
                <button type="button" className="profile__submit-btn" onClick={props.onAddPlace}></button>
            </section>
            <section className="section">
                <ul className="places">
                    {/* <!-- сюда js будет добавлять карточки --> */}
                    {
                        cards.map(item => {
                            return (
                                <Card
                                    key={item.id}
                                    onCardClick={item.handleCardClick}
                                    link={item.link}
                                    name={item.name}
                                    likes={item.likes.length}
                                />
                            )

                        })
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;


// style={{ backgroundImage: `url(${userAvatar})` }}
// {userName}
// {userDescription}


