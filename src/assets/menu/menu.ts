import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    translate:'MENU.STANDARD.STANDARD',
    url: '/standard',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        translate:'MENU.STANDARD.SYSTEMMANAGEMENT',
        url: '/standard',
        icon: 'nav-icon-bullet',
        children: [
          {
            translate:'MENU.STANDARD.REGISTERUSER',
            url: '/standard/user',
            icon: 'nav-icon-bullet'
          }
         
        ]
      },

    ]
   }
];
