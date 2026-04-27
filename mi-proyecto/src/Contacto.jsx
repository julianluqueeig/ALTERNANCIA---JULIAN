import { useState } from 'react';

export default function Contacto() {
    // 1. Estado para los datos del formulario
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

    // 2. Estado para los errores
    const [errors, setErrors] = useState({});

    // 3. Estado para saber si el usuario ha "tocado" el campo (requisito onBlur)
    const [touched, setTouched] = useState({});

    // Función de validación centralizada
    const validar = (name, value) => {
        if (name === 'nombre' && !value.trim()) return "El nombre es obligatorio.";
        if (name === 'email') {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) return "El email es obligatorio.";
            if (!regexEmail.test(value)) return "Formato de email no válido.";
        }
        if (name === 'mensaje' && value.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
        return ""; // Sin errores
    };

    // Evento: Al escribir (onChange)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Si el usuario ya salió del campo una vez (touched), validamos en tiempo real
        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validar(name, value) }));
        }
    };

    // Evento: Al salir del campo (onBlur - Requisito)
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validar(name, value) }));
    };

    // Evento: Al enviar (onSubmit)
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita recarga de página (SPA)

        // Validamos todo antes de enviar
        const nuevosErrores = {
            nombre: validar('nombre', formData.nombre),
            email: validar('email', formData.email),
            mensaje: validar('mensaje', formData.mensaje)
        };

        setErrors(nuevosErrores);
        setTouched({ nombre: true, email: true, mensaje: true });

        // Comprobamos si hay algún error
        const tieneErrores = Object.values(nuevosErrores).some(err => err !== "");

        if (!tieneErrores) {
            alert("¡Formulario enviado con éxito!");
            console.log("Datos:", formData);
            // Limpiar formulario
            setFormData({ nombre: '', email: '', mensaje: '' });
            setErrors({});
            setTouched({});
        }
    };

    // Mejora: Estilo visual dinámico (verde si ok, rojo si error)
    const getEstiloInput = (name) => {
        if (!touched[name]) return { border: '1px solid #ccc' };
        return {
            border: errors[name] ? '2px solid #ef4444' : '2px solid #22c55e',
            backgroundColor: errors[name] ? '#fef2f2' : '#f0fdf4',
            outline: 'none',
            padding: '10px',
            borderRadius: '4px'
        };
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Contacto</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem', textAlign: 'left' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Nombre:</label>
                    <input
                        type="text" name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={getEstiloInput('nombre')}
                    />
                    {touched.nombre && errors.nombre && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.nombre}</span>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Email:</label>
                    <input
                        type="email" name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={getEstiloInput('email')}
                    />
                    {touched.email && errors.email && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.email}</span>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Mensaje:</label>
                    <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="4"
                        style={getEstiloInput('mensaje')}
                    />
                    {touched.mensaje && errors.mensaje && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.mensaje}</span>}
                </div>

                <button type="submit" style={{ padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Enviar Mensaje
                </button>
            </form>
        </div>
    );
}
