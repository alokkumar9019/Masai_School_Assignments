import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import PhotoModal from "./PhotoModal";
import LoginForm from "./LoginForm";

const DB_URl =
  "https://photo-gallery-app-60a24-default-rtdb.asia-southeast1.firebasedatabase.app";

function Homepage() {
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [title, setTitle]=useState("");
  const [url, setUrl]=useState("");
  const [tags, setTags]=useState("");


  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await fetch(`${DB_URl}/photos.json`);
      const data = await res.json();

      if (data) {
        const arr = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        setPhotos(arr);
      }
    };
    fetchPhotos();
  }, []);

  const handleAddPhoto= async()=>{
    if(!title || !url) return ;

    const newPhoto={
        title,url, tags: tags? tags.split(",").map((t)=>t.trim()): [],
        addedBy:user.email
    };

    const res=await fetch(`${DB_URl}/photos.json`,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(newPhoto)
    });
    const data=await res.json();
    const createdPhoto={id: data.name, ...newPhoto};
    setPhotos(((prev)=> [...prev, createdPhoto]));

    setTitle("");
    setUrl("");
    setTags("");
  }

  if (!user) return <LoginForm setUser={setUser} />;
  return (
    <>
      <button onClick={() => setUser(null)}>Sign Out</button>
      <h3>Add Photo</h3>
      <input type="text" placeholder="TItle" value={title} onChange={(e)=> setTitle(e.target.value)} />
      <input type="text" placeholder="Image Url" value={url} onChange={(e)=> setUrl(e.target.value)} />
      <input type="text" placeholder="Tags" value={tags} onChange={(e)=> setTags(e.target.value)} />
      <button onClick={handleAddPhoto}> Add Photo</button>
      <Gallery photos={photos} onSelect={setSelected} />
      {selected && (
        <PhotoModal photo={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

export default Homepage;
