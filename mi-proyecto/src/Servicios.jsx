import { useState } from 'react';

export default function Servicios() {
  /* --- ESTADO GALERÍA (Ejercicio 3) --- */
  const imagenes = [
    { id: 1, url: 'https://picsum.photos/id/10/600/400', thumb: 'https://picsum.photos/id/10/150/100', alt: 'Montañas' },
    { id: 2, url: 'https://picsum.photos/id/20/600/400', thumb: 'https://picsum.photos/id/20/150/100', alt: 'Escritorio' },
    { id: 3, url: 'https://picsum.photos/id/30/600/400', thumb: 'https://picsum.photos/id/30/150/100', alt: 'Café' },
  ];
  const [seleccionada, setSeleccionada] = useState(imagenes[0]);

  /* --- ESTADO BLOG (Ejercicio 4) --- */
  const [posts, setPosts] = useState([
    { id: 1, titulo: 'Primer Post', descripcion: 'Este es un post de ejemplo para el blog.' }
  ]);
  const [nuevoPost, setNuevoPost] = useState({ titulo: '', descripcion: '' });

  const agregarPost = (e) => {
    e.preventDefault();
    if (!nuevoPost.titulo || !nuevoPost.descripcion) return;
    const postCompleto = { ...nuevoPost, id: Date.now() };
    setPosts([postCompleto, ...posts]);
    setNuevoPost({ titulo: '', descripcion: '' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* SECCIÓN GALERÍA */}
      <section style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1>🖼️ Galería de Imágenes</h1>
        <div style={{ margin: '1rem 0' }}>
          <img src={seleccionada.url} alt={seleccionada.alt} style={{ width: '100%', maxWidth: '500px', borderRadius: '10px' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {imagenes.map(img => (
            <img 
              key={img.id} src={img.thumb} onClick={() => setSeleccionada(img)} 
              style={{ width: '80px', height: '60px', objectFit: 'cover', cursor: 'pointer', borderRadius: '5px', border: seleccionada.id === img.id ? '3px solid #3b82f6' : '3px solid transparent' }} 
            />
          ))}
        </div>
      </section>

      <hr />

      {/* SECCIÓN BLOG */}
      <section style={{ marginTop: '4rem', textAlign: 'center' }}>
        <h1>✍️ Nuestro Blog</h1>
        <form onSubmit={agregarPost} style={{ maxWidth: '400px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <input 
            placeholder="Título" 
            value={nuevoPost.titulo} 
            onChange={(e) => setNuevoPost({...nuevoPost, titulo: e.target.value})}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <textarea 
            placeholder="Descripción" 
            value={nuevoPost.descripcion} 
            onChange={(e) => setNuevoPost({...nuevoPost, descripcion: e.target.value})}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Añadir Post
          </button>
        </form>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {posts.map(post => (
            <div key={post.id} style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'left', background: '#f9fafb' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{post.titulo}</h3>
              <p style={{ margin: 0 }}>{post.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
