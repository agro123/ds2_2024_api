import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo `dev.env`
// Asegúrate de que la ruta sea correcta y que el archivo dev.env esté en la ubicación adecuada.
dotenv.config({ path: './.env/dev.env' });

// Imprimir las variables de entorno para verificar que se cargaron correctamente (puedes eliminar esto después de verificar).
//console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
//console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);
