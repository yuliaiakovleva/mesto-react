import React from 'react';
import api from '../utils/api'
import Card from './Card';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
            <main className="content">
                <section className="profile">
                    <div className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})` }} >
                        {/* сюда обработчик */}
                        <button type="button" className="profile__image-button" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="input">
                        <h1 className="input__text input__text_type_name">{currentUser.name}</h1>
                        {/* сюда обработчик */}
                        <button type="button" className="input__edit-btn" onClick={props.onEditProfile}></button>
                        <p className="input__text input__text_type_info">{currentUser.about}</p>
                    </div>
                    {/* сюда обработчик */}
                    <button type="button" className="profile__submit-btn" onClick={props.onAddPlace}></button>
                </section>
                <section className="section">
                    <ul className="places">
                        {/* <!-- сюда js будет добавлять карточки --> */}
                        {

                            props.cards.map(item => {
                                // console.log(item)
                                return (
                                    <Card
                                        key={item._id}
                                        ownerId={item.owner._id}
                                        link={item.link}
                                        name={item.name}
                                        likes={item.likes}
                                        likesNumber={item.likes.length}
                                        onCardClick={props.handleCardClick}
                                        onCardLike={props.onCardLike}
                                        id={item._id}
                                        onCardDelete={props.onCardDelete}
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




