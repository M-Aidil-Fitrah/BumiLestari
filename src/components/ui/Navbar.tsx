// src/components/ui/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StaggeredMenu } from './StaggeredMenu';
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu';
import { authService } from '@/lib/auth';

interface NavbarProps {
  isScrolled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [, setUserName] = useState('');

  // Re-check auth status setiap kali route berubah
  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname]);

  const checkAuthStatus = async () => {
    try {
      const user = await authService.getCurrentUser();
      
      if (user) {
        setIsLoggedIn(true);
        
        // Get profile to check role
        const profile = await authService.getProfile(user.id);
        setUserName(profile.full_name || user.email || 'User');
        setIsAdmin(profile.role === 'admin');
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  // Menu items berdasarkan status login dan role
  const getMenuItems = (): StaggeredMenuItem[] => {
    const baseItems: StaggeredMenuItem[] = [
      { label: 'Beranda', ariaLabel: 'Kembali ke halaman utama', link: '/' },
      { label: 'Marketplace', ariaLabel: 'Jelajahi produk ramah lingkungan', link: '/marketplace' },
    ];

    if (isLoggedIn) {
      // User sudah login
      const loggedInItems: StaggeredMenuItem[] = [
        ...baseItems,
      ];

      // Tambah menu Admin jika user adalah admin
      if (isAdmin) {
        loggedInItems.push({
          label: 'Admin',
          ariaLabel: 'Dashboard Admin',
          link: '/admin'
        });
      }

      // Tambah menu Logout dengan link ke /logout
      loggedInItems.push({
        label: 'Logout',
        ariaLabel: 'Keluar dari akun',
        link: '/logout' // ✅ Ganti jadi /logout
      });

      return loggedInItems;
    } else {
      // User belum login
      return [
        ...baseItems,
        { label: 'Masuk', ariaLabel: 'Masuk ke akun Anda', link: '/login' },
        { label: 'Daftar', ariaLabel: 'Buat akun baru', link: '/register' }
      ];
    }
  };

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'Twitter', link: 'https://twitter.com' }
  ];

  return (
    <StaggeredMenu
      position="right"
      items={getMenuItems()}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor={isScrolled ? '#2C2C2C' : '#2C2C2C'}
      openMenuButtonColor="#2C2C2C"
      changeMenuColorOnOpen={true}
      colors={['#8B7355', '#2C2C2C']}
      logoUrl="/BumiLestari.png"
      accentColor="#8B7355"
      isFixed={true}
      closeOnClickAway={true}
    />
  );
};

export default Navbar;