import React from 'react';
import { Link } from 'react-router-dom';
import './AlbumCard.css'; 

const AlbumCard = ({ album }) => {
    const { title, date_created, nasa_id } = album.data[0];
    const previewImage = album.links[0].href;
    const formattedDate = new Date(date_created).toLocaleDateString('pt-BR');

    return (
        <Link to={`/album/${nasa_id}`} className="album-card">
            <img src={previewImage} alt={title} />
            <h2>{title}</h2>
            <p>{formattedDate}</p>
        </Link>
    );
};

export default AlbumCard;
