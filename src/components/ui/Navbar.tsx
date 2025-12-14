import React from 'react';
import { StaggeredMenu } from './StaggeredMenu';
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu';

interface NavbarProps {
  isScrolled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const menuItems: StaggeredMenuItem[] = [
    { label: 'Beranda', ariaLabel: 'Kembali ke halaman utama', link: '/' },
    { label: 'Marketplace', ariaLabel: 'Jelajahi produk ramah lingkungan', link: '/marketplace' },
    { label: 'Masuk', ariaLabel: 'Masuk ke akun Anda', link: '/login' },
    { label: 'Daftar', ariaLabel: 'Buat akun baru', link: '/register' }
  ];

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'Twitter', link: 'https://twitter.com' }
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
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
