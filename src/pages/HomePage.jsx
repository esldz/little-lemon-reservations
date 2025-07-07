import React from 'react';
import BookingForm from '../components/BookingForm/BookingForm';
import TableList from '../components/TableList/TableList';

const HomePage = () => {
  return (
    <main>
      <h1>Little Lemon Rezervasyon</h1>
      <BookingForm />
      <TableList />
    </main>
  );
};

export default HomePage;
