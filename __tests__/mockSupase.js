// mockSupabase.js

const mockSelect = jest.fn();
const mockInsert = jest.fn();
const mockFrom = jest.fn(() => ({
    select: mockSelect,
    insert: mockInsert,
}));

const supabase = {
    from: mockFrom,
};

export default supabase;
