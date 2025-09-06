import React from 'react'

function PhotoModal({photo, onClose}) {
  return (
    <div>
        <div>
            <button onClick={onClose}>Close</button>
            <h2>{photo.title}</h2>
            <img src={photo.url} alt={photo.title} style={{maxWidth:"90%"}}/>
            {photo.tags && <p>Tags: {photo.tags.join(", ")}</p>}
        </div>
    </div>
  )
}

export default PhotoModal