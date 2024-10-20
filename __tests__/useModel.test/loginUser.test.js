// Mockear las dependencias
jest.mock('bcrypt');
jest.mock('../../src/db', () => ({
  __esModule: true,
  default: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn()
  }
}));

import bcrypt from 'bcrypt';
import supabase from '../../src/db';
import loginUser from '../../src/models/user/loginUser';

describe('loginUser', () => {
  const mockUsername = 'johndoe';
  const mockPassword = 'password123';
  const mockUser = {
    id: 1,
    username: mockUsername,
    password: 'hashedPassword123'
  };

jest.spyOn(console, 'error').mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return user without password if login is successful', async () => {
    supabase.single.mockResolvedValue({ data: mockUser, error: null });
    bcrypt.compare.mockResolvedValue(true);

    const result = await loginUser(mockUsername, mockPassword);
    expect(supabase.from).toHaveBeenCalledWith('users');
    expect(supabase.from().select).toHaveBeenCalledWith('*');
    expect(supabase.from().eq).toHaveBeenCalledWith('username', mockUsername);
    expect(supabase.from().single).toHaveBeenCalled();
    expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockUser.password);
    expect(result).toEqual({ id: 1, username: mockUsername });
  });

  test('should return error if user is not found', async () => {
    supabase.single.mockResolvedValue({ data: null, error: null });

    const result = await loginUser(mockUsername, mockPassword);

    expect(result).toEqual({ error: 'Usuario o contraseña incorrectos' });
  });

  test('should return error if password does not match', async () => {
    supabase.single.mockResolvedValue({ data: mockUser, error: null });
    bcrypt.compare.mockResolvedValue(false);

    const result = await loginUser(mockUsername, mockPassword);
    expect(result).toEqual({ error: 'Usuario o contraseña incorrectos' });
  });

  test('should handle errors during user fetch', async () => {
    const fetchError = new Error('Fetch error');
    supabase.single.mockResolvedValue({ data: null, error: fetchError });

    const result = await loginUser(mockUsername, mockPassword);
    expect(result).toEqual({ error: 'Usuario o contraseña incorrectos' });
  });
});
