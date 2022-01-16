import React from 'react';
import Main from './Main';

function Card(props) {

    function handleClick() {
        props.onCardClick(props);
      }  

    return (
        <li className="card">
            <button className="card__button-image" type="button" onClick={handleClick}>
                <img className="card__illustration" src={props.link} alt={props.name} />
            </button>
            <button className="card__button-delete" id='yulia' type="button"></button>
            <div className="card__container">

                <p className="card__title">{props.name}</p>
                <div className="card__likescontainer">
                    <button type="button" className="card__button"></button>
                    <p className="card__likes">{props.likes}</p>
                </div>
            </div>
        </li>
    )

}

export default Card;