const getSidebarFrontend = (role = 'USER_ROLE') => {
  const menu = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Dashboard',
          url: '/dashboard',
        },
        {
          titulo: 'ProgressBar',
          url: './progress',
        },
        {
          titulo: 'Graficas',
          url: './graficas1',
        },
        {
          titulo: 'Promesas',
          url: './promesas',
        },
        {
          titulo: 'RxJs',
          url: './rxjs',
        },
      ],
    },
  ];

  if (role === 'ADMIN_ROLE') {
    menu.push({
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          titulo: 'Usuarios',
          url: 'usuarios',
        },
        {
          titulo: 'Hospitales',
          url: 'hospitales',
        },
        {
          titulo: 'Médicos',
          url: 'medicos',
        },
      ],
    });
  }

  return menu;
};

module.exports = {
  getSidebarFrontend,
};
