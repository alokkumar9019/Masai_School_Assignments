import React from 'react'

function Gallery({photos, onSelect}) {
    if(!photos || photos.length===0){
        return <p>No photos Added yet. Add one!</p>
    }
  return (
    <div>
<p>hello</p>
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

export default Gallery;