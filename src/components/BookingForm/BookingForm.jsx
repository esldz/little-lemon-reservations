import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ onReservationSuccess }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    tableId: 1, 
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.date || !formData.time) {
      return 'Tarih ve saat girilmelidir.';
    }
    if (formData.guests < 1) {
      return 'Kişi sayısı en az 1 olmalıdır.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }

    try {
      const response = await fetch('/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Rezervasyon yapılamadı.');

      const updateResponse = await fetch(`/tables/${formData.tableId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: false }),
      });

      if (!updateResponse.ok) throw new Error('Masa durumu güncellenemedi.');

      setError(null);
      setSuccess('Rezervasyon başarıyla yapıldı!');
      setFormData({ date: '', time: '', guests: 1, tableId: 1 });

      if (onReservationSuccess) onReservationSuccess();

    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Rezervasyon Formu" className="booking-form">
      <label htmlFor="date">Tarih</label>
      <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

      <label htmlFor="time">Saat</label>
      <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />

      <label htmlFor="guests">Kişi Sayısı</label>
      <input type="number" id="guests" name="guests" min="1" value={formData.guests} onChange={handleChange} required />

      <label htmlFor="tableId">Masa Seç</label>
      <select id="tableId" name="tableId" value={formData.tableId} onChange={handleChange}>
        <option value={1}>Masa 1</option>
        <option value={2}>Masa 2</option>
        <option value={3}>Masa 3</option>
        <option value={4}>Masa 4</option>
      </select>

      <button type="submit">Rezervasyon Yap</button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
};

export default BookingForm;
