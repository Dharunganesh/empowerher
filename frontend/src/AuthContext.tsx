import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import securityService from '../services/securityService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  needsSecurityCheck: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name: string; phoneNumber: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateSecuritySettings: (settings: any) => Promise<void>;
  validateSecurity: (pin: string) => Promise<boolean>;
  updateLastActivity: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [needsSecurityCheck, setNeedsSecurityCheck] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await authService.getToken();
      if (token) {
        setIsAuthenticated(true);
        // Check if security verification is needed
        const settings = await securityService.getSecuritySettings();
        const shouldCheck = await securityService.checkSessionTimeout();
        setNeedsSecurityCheck(
          (settings.pinEnabled || settings.biometricEnabled) && shouldCheck
        );
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);
      const settings = await securityService.getSecuritySettings();
      setNeedsSecurityCheck(settings.pinEnabled || settings.biometricEnabled);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: { email: string; password: string; name: string; phoneNumber: string }) => {
    try {
      const response = await authService.register(data);
      setUser(response.user);
      setIsAuthenticated(true);
      setNeedsSecurityCheck(true); // Always show security setup after registration
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      setNeedsSecurityCheck(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateSecuritySettings = async (settings: any) => {
    try {
      await securityService.updateSecuritySettings(settings);
      setNeedsSecurityCheck(settings.pinEnabled || settings.biometricEnabled);
    } catch (error) {
      throw error;
    }
  };

  const validateSecurity = async (pin: string) => {
    try {
      const isValid = await securityService.validatePin(pin);
      if (isValid) {
        await securityService.updateLastActivity();
        setNeedsSecurityCheck(false);
      }
      return isValid;
    } catch (error) {
      throw error;
    }
  };

  const updateLastActivity = async () => {
    try {
      await securityService.updateLastActivity();
    } catch (error) {
      console.error('Error updating last activity:', error);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    needsSecurityCheck,
    user,
    login,
    register,
    logout,
    updateSecuritySettings,
    validateSecurity,
    updateLastActivity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 