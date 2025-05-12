import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    translate:'MENU.STANDARD.STANDARD',
    //name: 'Tiêu chuẩn',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        translate:'MENU.STANDARD.SYSTEMMANAGEMENT',
        url: '/login',
        icon: 'nav-icon-bullet',
        children: [
          {
            name:"",
            translate:'MENU.STANDARD.REGISTERUSER',
            url: '/123',
            icon: 'nav-icon-bullet'
          },
          {
            translate:'MENU.STANDARD.ROLEUSER',
            url: '/123',
            icon: 'nav-icon-bullet'
          }
        ]
      },

    ]
   }
];
