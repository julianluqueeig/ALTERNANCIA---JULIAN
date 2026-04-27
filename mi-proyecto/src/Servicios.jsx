import { useState } from 'react';

export default function Servicios() {
    // 1. Lista de imágenes para la galería
    const imagenes = [
        { id: 1, url: 'https://picsum.photos/id/10/600/400', thumb: 'https://picsum.photos/id/10/150/100', alt: 'Montañas' },
        { id: 2, url: 'https://picsum.photos/id/20/600/400', thumb: 'https://picsum.photos/id/20/150/100', alt: 'Escritorio' },
        { id: 3, url: 'https://picsum.photos/id/30/600/400', thumb: 'https://picsum.photos/id/30/150/100', alt: 'Taza de Café' },
        { id: 4, url: 'https://picsum.photos/id/40/600/400', thumb: 'https://picsum.photos/id/40/150/100', alt: 'Gato' },
    ];

    // 2. Estado para saber qué imagen está seleccionada (empezamos con la primera)
    const [seleccionada, setSeleccionada] = useState(imagenes[0]);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Galería de Servicios</h1>
            <p>Haz clic en las miniaturas para ampliar la imagen.</p>

            {/* 3. VISOR PRINCIPAL: Muestra la imagen guardada en el estado */}
            <div style={{ margin: '2rem 0' }}>
                <img
                    src={seleccionada.url}
                    alt={seleccionada.alt}
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        transition: '0.3s transform'
                    }}
                />
                <h3 style={{ marginTop: '1rem', color: '#333' }}>{seleccionada.alt}</h3>
            </div>

            {/* 4. LISTA DE MINIATURAS */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {imagenes.map((img) => (
                    <img
                        key={img.id}
                        src={img.thumb}
                        alt={img.alt}
                        // Al hacer clic, actualizamos el estado con la imagen pinchada
                        onClick={() => setSeleccionada(img)}
                        style={{
                            width: '120px',
                            height: '80px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            // Mejora visual: Borde azul si es la seleccionada
                            border: seleccionada.id === img.id ? '4px solid #3b82f6' : '4px solid transparent',
                            opacity: seleccionada.id === img.id ? 1 : 0.7,
                            transition: '0.2s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
