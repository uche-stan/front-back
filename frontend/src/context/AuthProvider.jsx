import React, { createContext, useState, useEffect, useContext} from 'react';
import { Toast } from '../utils/alert';


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    
  

    const contextValues= {
      
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ()=> useContext(AuthContext)

export default AuthProvider;
