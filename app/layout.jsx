// app/layout.jsx
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/layout/Header/Header';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Footer from './components/layout/Footer/Footer';
import MainContent from './components/layout/MainContent/MainContent';
import './globals.css';

export const metadata = {
  title: 'Analytics Dashboard',
  description: 'A comprehensive analytics dashboard application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <NotificationProvider>
              <div className="app-layout">
                <Header />
                <div className="app-container">
                  <Sidebar />
                  <main className="main-content">
                    {children}
                  </main>
                </div>
                <Footer />
              </div>
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}