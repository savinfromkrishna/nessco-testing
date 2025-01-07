'use client';

import React from 'react';
import NavLinksDemo from '@/components/Home/NavLinks';

interface NavLinkClientProps {
  navItems: Array<{ text: string; ref: React.RefObject<HTMLDivElement> }>;
}

export default function NavLinksClient({ navItems }: NavLinkClientProps) {
  return <NavLinksDemo navItems={navItems} />;
}

