export interface CraftCardData {
  id: string;
  category: string;
  label: string;
  display: string;
  subLabel: string;
  iconName: 'leather' | 'detailing' | 'character';
  number: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type ModalType = 'catalogue' | 'enquire' | 'collections' | null;
