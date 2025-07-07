import React, { useEffect, useState } from 'react';
import './TableList.css';

const TableList = ({ refreshFlag }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch('/tables');
        if (!response.ok) throw new Error('Masa bilgileri alınamadı.');
        const data = await response.json();
        setTables(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [refreshFlag]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="table-list">
      <h2>Masa Durumları</h2>
      <ul>
        {tables.map((table) => (
          <li key={table.id} className={table.available ? 'available' : 'reserved'}>
            Masa {table.number} - {table.available ? 'Boş' : 'Dolu'}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TableList;
