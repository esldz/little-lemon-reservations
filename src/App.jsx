import React, { useState } from 'react';
import BookingForm from './components/BookingForm/BookingForm';
import TableList from './components/TableList/TableList';

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleReservationSuccess = () => {
    setRefreshFlag((prev) => !prev); 
  };

  return (
    <div className="App">
      <BookingForm onReservationSuccess={handleReservationSuccess} />
      <TableList refreshFlag={refreshFlag} />
    </div>
  );
}

export default App;
