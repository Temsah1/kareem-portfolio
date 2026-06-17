import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function seedDatabase() {
  if (!supabaseUrl || !supabaseServiceKey || supabaseUrl.includes('your-supabase')) {
    console.log('Supabase credentials missing, skipping seed, utilizing client fallback mock store.');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  console.log('Seeding Supabase database tables...');

  // Create initial admin user
  const { data: userList, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Error listing users:', listError);
  } else {
    const existing = userList?.users.find(u => u.email === 'kareemeltemsah7@gmail.com');
    if (!existing) {
      const { error: signUpError } = await supabase.auth.admin.createUser({
        email: 'kareemeltemsah7@gmail.com',
        password: 'temsah1',
        email_confirm: true
      });
      if (signUpError) console.error('Error creating admin:', signUpError);
      else console.log('Admin user seed completed successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  }
}
