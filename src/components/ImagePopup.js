import React from 'react';


function ImagePopup(props) {
    return (
        <section className={`popup ${props.card.name === '' ? '' : 'popup_is-opened'}`} id="popup-image">
            <div className="popup__image-container">
                <button className="popup__close-btn popup__close-btn_image" type="submit" onClick={props.onClose}></button>
                <img className="popup__image-item" src={props.card.link} alt={props.card.name} />
                <p className="popup__image-name">{props.card.name}</p>
            </div>
        </section>
    )
}

export default ImagePopup;