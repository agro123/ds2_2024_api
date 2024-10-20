import router from '../src/routes';
import express from 'express';

describe('Routes', () => {
  test('Verify if user routes exist', () => {
    const app = express();
    app.use('/', router);

    const routes = router.stack;;
    // Verificar si están las rutas correctas
    const registeredRoutes = routes.map((layer) => ({
      method: Object.keys(layer.route.methods)[0], // Obtener el método HTTP
      path: layer.route.path,                      // Obtener la ruta
    }));

    expect(registeredRoutes).toEqual([
      { method: 'get', path: '/users/' },
      { method: 'get', path: '/users/:id' },
      { method: 'post', path: '/users/' },
      { method: 'put', path: '/users/:id' },
      { method: 'delete', path: '/users/:id' },
      { method: 'post', path: '/users/login/' },
      { method: 'get', path: '/pqrsd/' },
      { method: 'post', path: '/pqrsd/' },
    ]);
  });
});
