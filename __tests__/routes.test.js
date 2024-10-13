import router from '../src/routes/userRoutes';
import express from 'express';

describe('Routes', () => {
  test('Verify if user routes exist', () => {
    const app = express();
    app.use('/users', router);

    const routes = router.stack;;
    // Verificar si están las rutas correctas
    const registeredRoutes = routes.map((layer) => ({
      method: Object.keys(layer.route.methods)[0], // Obtener el método HTTP
      path: layer.route.path,                      // Obtener la ruta
    }));

    expect(registeredRoutes).toEqual([
      { method: 'get', path: '/' },
      { method: 'get', path: '/:id' },
      { method: 'post', path: '/' },
      { method: 'put', path: '/:id' },
      { method: 'delete', path: '/:id' }
    ]);
  });
});
