// Ejemplo de configuración para Supabase (o cualquier otra BD)
import { createClient } from '@supabase/supabase-js';

// Configuración del cliente de Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://hhyvvyegqevtttrsdwfl.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '1234';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Exporta la instancia de la base de datos
export default supabase;

