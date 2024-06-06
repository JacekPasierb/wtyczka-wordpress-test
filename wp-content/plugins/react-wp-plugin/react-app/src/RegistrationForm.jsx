import React, { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        tournament: 'Tournament A' // Domyślny wybór turnieju
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Wysłanie danych do API Przelew24 i obsługa odpowiedzi
        console.log('Form submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Imię:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="age">Wiek:</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="phone">Telefon:</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="tournament">Turniej:</label>
                <select id="tournament" name="tournament" value={formData.tournament} onChange={handleChange}>
                    <option value="Tournament A">Turniej A</option>
                    <option value="Tournament B">Turniej B</option>
                    <option value="Tournament C">Turniej C</option>
                </select>
            </div>
            <button type="submit">Zarejestruj się</button>
        </form>
    );
};

export default RegistrationForm;
