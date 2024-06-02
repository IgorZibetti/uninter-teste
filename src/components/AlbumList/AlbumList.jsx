import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlbumCard from '../AlbumCard/AlbumCard';
import './AlbumList.css'; // Adicione esta linha para importar o CSS

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            const response = await axios.get('https://images-assets.nasa.gov/recent.json');
            const items = response.data.collection.items;
            const uniqueAlbums = Array.from(new Set(items.map(item => item.data[0].nasa_id)))
                .map(id => items.find(item => item.data[0].nasa_id === id));
            const randomAlbums = uniqueAlbums.sort(() => 0.5 - Math.random()).slice(0, 16);
            setAlbums(randomAlbums);
        };
        fetchAlbums();
    }, []);

    return (
        <div>
            <h1 className='title-list'>Álbuns Recentes da NASA</h1>
            <div className="album-list">
                {albums.map(album => (
                    <AlbumCard key={album.data[0].nasa_id} album={album} />
                ))}
            </div>
        </div>
    );
};

export default AlbumList;
