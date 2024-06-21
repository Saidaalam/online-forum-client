
import { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminCredentials, setAdminCredentials] = useState({
    email: 'admin@example.com',
    password: 'admin123'
  });

  return (
    <AdminContext.Provider value={{ adminCredentials, setAdminCredentials }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
