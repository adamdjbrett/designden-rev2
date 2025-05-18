import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'staff' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  avatarUrl?: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

const ALLOWED_DOMAIN = 'designden.space'; // Example domain restriction

// Mock function to validate email domain
const isValidEmailDomain = (email: string): boolean => {
  const domain = email.split('@')[1];
  return domain === ALLOWED_DOMAIN;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would make an API request
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email === 'admin@designden.space' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@designden.space',
          role: 'admin',
          avatarUrl: 'https://i.pravatar.cc/150?u=admin',
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else if (email === 'staff@designden.space' && password === 'password') {
        const user: User = {
          id: '2',
          name: 'Staff User',
          email: 'staff@designden.space',
          role: 'staff',
          avatarUrl: 'https://i.pravatar.cc/150?u=staff',
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else if (email === 'student@designden.space' && password === 'password') {
        const user: User = {
          id: '3',
          name: 'Student User',
          email: 'student@designden.space',
          studentId: 'S12345',
          role: 'student',
          avatarUrl: 'https://i.pravatar.cc/150?u=student',
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock registration function - in a real app, this would make an API request
  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Domain validation
      if (!isValidEmailDomain(email)) {
        setError('Registration is only allowed for designden.space domain');
        setIsLoading(false);
        return;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role,
        studentId: role === 'student' ? `S${Math.floor(10000 + Math.random() * 90000)}` : undefined,
        avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      register, 
      logout,
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};