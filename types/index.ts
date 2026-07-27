/** Shared application types. */

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  divider?: never;
}

export interface NavDivider {
  divider: true;
  label?: never;
  href?: never;
  icon?: never;
}

export type NavDropdownItem = NavLink | NavDivider;

export interface NavGroup {
  label: string;
  href: string;
  items: NavDropdownItem[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

/** WebGL scene variants mounted by <Scene3D />. */
export type SceneName = 'core' | 'lattice';

export interface ScenePalette {
  core: number;
  rim: number;
  particle: number;
  wire: number;
  grid: number;
  fog: number;
  coreAlpha: number;
  wireAlpha: number;
  partAlpha: number;
  gridAlpha: number;
  additive: boolean;
}

/** Payload accepted by POST /api/contact. */
export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';
