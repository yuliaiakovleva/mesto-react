import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup ${props.isOpen ? 'popup_is-opened' : ''}`} id={props.name} >
            <form className={`popup__container ${props.name}-container`}>
                <button className="popup__close-btn" type="reset" onClick={props.onClose}></button>
                <h2 className="popup__title popup__question-title">{props.title}</h2>
                {props.children}
                <button className="popup__button popup__question-button" type="submit">{props.button}</button>
            </form>
        </section>
    );
}
export default PopupWithForm;

