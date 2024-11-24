import router from '../src/routes';
import express from 'express';

const {publicRouter, privateRouter} = router;

describe('Routes', () => {
  test('Verify if private routes exist', () => {
    const app = express();
    app.use('/', privateRouter);

    const routes = privateRouter.stack;
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
      { method: 'get', path: '/pqrsd/' },
      { method: 'put', path: '/pqrsd/:id' },
    ]);
  });

  test('Verify if public routes exist', () => {
    const app = express();
    app.use('/', publicRouter);

    const routes = publicRouter.stack;
    const registeredRoutes = routes.map((layer) => ({
      method: Object.keys(layer.route.methods)[0],
      path: layer.route.path,
    }));

    expect(registeredRoutes).toEqual([
      { method: 'post', path: '/users/login/' },
      { method: 'post', path: '/pqrsd/' },
    ]);
  });
});
