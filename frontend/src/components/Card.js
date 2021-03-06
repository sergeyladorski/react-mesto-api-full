import {React, useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `gallery__delete-photo ${isOwn && 'gallery__delete-photo_active'}`
  );
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = (
    `gallery__photo-like ${isLiked && 'gallery__photo-like_active'}`
  );
  const cardLikeCounterClassName = (
    `gallery__like-counter  ${(card.likes.length > 0) && 'gallery__like-counter_active'}`
  )

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDeleteClick(card)
  }

  return (
    <li className='gallery__card' key={card._id}>
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className='gallery__photo'
      />
      <button type='button'
        className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className='gallery__photo-desc'>
        <h2 className='gallery__photo-title'>{card.name}</h2>
        <div className='gallery__like-container'>
          <button type='button' className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className={cardLikeCounterClassName}>
            {card.likes.length}
          </p>
        </div>
      </div>
    </li>
  )
}