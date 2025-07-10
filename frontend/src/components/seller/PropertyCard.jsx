import React, { useState } from 'react';
import { formatPrice, formatDate } from '../../utils/formatters';
import styles from './PropertyCard.module.css';

const PropertyCard = ({ property, onEdit, onDelete, onView }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <article className={styles.propertyCard}>
      <div className={styles.propertyCardImageContainer}>
        <img 
          src={property.thumbnail || '/placeholder-property.jpg'} 
          alt={property.title}
          className={styles.propertyCardImage}
          loading="lazy"
        />
        <div className={styles.propertyCardBadge}>
          <span className={styles.propertyCardType}>{property.propertyType}</span>
        </div>
      </div>

      <div className={styles.propertyCardContent}>
        <header className={styles.propertyCardHeader}>
          <h3 className={styles.propertyCardTitle}>{property.title}</h3>
          <div className={styles.propertyCardPrice}>
            {formatPrice(property.price)}
          </div>
        </header>

        <div className={styles.propertyCardDetails}>
          <p className={styles.propertyCardAddress}>
            <span className={styles.propertyCardIcon} aria-hidden="true">📍</span>
            {property.address}
          </p>
          <div className={styles.propertyCardMeta}>
            <span className={styles.propertyCardDate}>
              Listed {formatDate(property.createdAt)}
            </span>
            <span className={`${styles.propertyCardStatus} ${styles.propertyCardStatusActive}`}>
              Active
            </span>
          </div>
        </div>

        <div className={styles.propertyCardActions}>
          <button
            className="btn btn--ghost btn--small"
            onClick={() => onView(property.id)}
            aria-label={`View ${property.title}`}
          >
            <span className="btn__icon" aria-hidden="true">👁</span>
            View
          </button>
          <button
            className="btn btn--ghost btn--small"
            onClick={() => onEdit(property.id)}
            aria-label={`Edit ${property.title}`}
          >
            <span className="btn__icon" aria-hidden="true">✏️</span>
            Edit
          </button>
          <button
            className="btn btn--ghost btn--small btn--danger"
            onClick={() => onDelete(property.id)}
            aria-label={`Delete ${property.title}`}
          >
            <span className="btn__icon" aria-hidden="true">🗑</span>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;