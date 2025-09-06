import React from 'react'

function Gallery({photos, onSelect}) {
  return (
    <div>
        {photos.map((p)=>{
            <img
                key={p.id}
                src={p.url}
                alt={p.title}
                style={{width:"150px", height:"200px", margin:"10px"}}
                onClick={()=>onSelect(p)}
            />
        })}
    </div>
  )
}

export default Gallery