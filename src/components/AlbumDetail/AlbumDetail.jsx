import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AlbumDetail.css'; 

const AlbumDetail = () => {
    const { nasa_id } = useParams();
    const [albumDetail, setAlbumDetail] = useState(null);
    const [detailResponses, setDetailResponses] = useState([]);

    useEffect(() => {
        const fetchAlbumDetail = async () => {
            try {
                const response = await axios.get(`https://images-api.nasa.gov/search?q=${nasa_id}`);
                setAlbumDetail(response.data.collection.items);
                
                const firstHref = response.data.collection.items[0].href;
                const detailResponse = await axios.get(firstHref);
                console.log('detailResponse:', detailResponse.data); 
                setDetailResponses(detailResponse.data); 

            } catch (error) {
                console.error("error:", error);
            }
        };

        fetchAlbumDetail();
        
    }, [nasa_id]);

    if (!albumDetail) {
        return <div className='loading-details'>Loading...</div>;
    }

    return (
        <div className="album-detail">
            <h1>Detalhes do Álbum</h1>
            <div className="album-detail-content">
                {albumDetail.map((item, index) => (
                    <div key={index} className="album-detail-item">
                        <h2>{item.data[0].title}</h2>
                        <p>{item.data[0].description}</p>
                      
                        {detailResponses && detailResponses.map((media, idx) => (
                            <div key={idx} className="album-detail-media">
                                {media.includes('video') ? (
                                    <video controls>
                                        <source src={media} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img src={media} alt={item.data[0].title} />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumDetail;
