import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   iconComponent: { name: 'cil-speedometer' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Thanh Toán'
  // },
  // {
  //   name: 'Thanh Toán',
  //   iconComponent: { name: 'cilWallet' }, // icon tùy chọn
  //   children: [
  //     {
  //       name: 'Thu Ngân',
  //       url: '/theme/colors',
  //       iconComponent: { name: 'cil-cash' }
  //     },
  //     {
  //       name: 'Lịch sử đơn hàng',
  //       url: '/theme/typography',
  //       iconComponent: { name: 'cil-history' }
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Quản lý sản phẩm'
  // },
  // {
  //   name: 'Nhập hàng',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'Tồn kho',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'headings' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  // {
  //   name: 'Đăng ký tiêu chuẩn',
  //   title: true
  // },
  // {
  //   name: 'Loại sản phẩm',
  //   url: '/base',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Thống Kê -Báo Cáo',
  //   title: true
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   iconComponent: { name: 'cil-chart-pie' },
  //   url: '/charts'
  // },
  // {
  //   title: true,
  //   name: 'Đăng ký người dùng'
  // },
  // {
  //   name: 'Đăng ký Khách Hàng',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   translate: 'Đăng ký Nhà Cung Cấp',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  {
    translate:'',
    name: 'Tiêu chuẩn',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        translate:'',
        name: 'Quản lý hệ thống',
        url: '/login',
        icon: 'nav-icon-bullet',
        children: [
          {
            translate:'',
            name: 'Đăng ký người dùng',
            url: '/123',
            icon: 'nav-icon-bullet'
          },
          {
            translate:'',
            name: 'Phân quyền',
            url: '/123',
            icon: 'nav-icon-bullet'
          }
        ]
      },
    
      // {
      //   name: 'Phân Quyền',
      //   url: '/register',
      //   icon: 'nav-icon-bullet'
      // },
    ]
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'mt-auto'
  // },
  // {
  //   name: 'Docs',
  //   url: 'https://coreui.io/angular/docs/',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank' }
   }
];
