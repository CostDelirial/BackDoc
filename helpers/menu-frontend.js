const getMenuFrontEnd = ( role )  => {

 
   const menu =  [
        { 
          titulo: 'Inicio',
          icono: 'mdi mdi-attachment',
          submenu:[
            
          ]
        },
        {
          titulo: 'Panel Admin',
          icono:'mdi mdi-hexagon-multiple',
          submenu:[ 
            //{titulo: 'Usuarios', url: 'usuarios'}
           ],
        }
      ];

      if(role === 'USER_DETONANTE' || role === 'USER_RESPUESTA' || role === 'USER_VALIDACION'){
        menu[0].submenu.unshift(
            { titulo: 'Dashboard', url:'dashboard'},
            { titulo: 'En tramite', url: 'en_tramite'},
            { titulo: 'Finalizado', url: 'finalizado'},
            { titulo: 'En revision', url: 'en_revision'},
            { titulo: 'Pendiente', url: 'pendiente'},
            { titulo: 'Rxjs', url:'rxjs' }
        );
      }

      if( role === 'ADMINISTRADOR'){
          menu[1].submenu.unshift(
            { titulo: 'Usuarios', url: 'usuarios' },
            { titulo: 'Dashboard', url:'dashboard'}
          );
      }
return menu;
}

module.exports = {
    getMenuFrontEnd,
}