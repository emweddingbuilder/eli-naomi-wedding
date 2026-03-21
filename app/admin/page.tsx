import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata = { title: 'Admin — Eli & Naomi' };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ pw?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Allow login via ?pw=password
  if (params.pw && params.pw === adminPassword) {
    // Set auth cookie and redirect to clean URL
    const response = redirect('/admin');
    return response;
  }

  const authCookie = cookieStore.get('admin_auth');
  const isAuthed = authCookie?.value === adminPassword;

  if (!isAuthed) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}

function AdminLogin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="text-center mb-8">
        <h1 className="font-display-sc" style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--charcoal)' }}>
          Admin Access
        </h1>
      </div>
      <form
        className="flex flex-col items-center gap-4"
        action="/api/admin/login"
        method="POST"
      >
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-4 py-3 bg-white border border-gray-200 rounded text-center font-display"
          style={{ fontSize: '1rem', outline: 'none', minWidth: '16rem' }}
          autoFocus
        />
        <button type="submit" className="btn-dark">Enter</button>
      </form>
    </div>
  );
}
