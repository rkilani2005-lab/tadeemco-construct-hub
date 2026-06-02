import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/lib/admin-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export const AdminLogin = () => {
  const { signIn, session, isAdmin, loading } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session && isAdmin) navigate('/admin', { replace: true });
  }, [loading, session, isAdmin, navigate]);

  const submit = async () => {
    setError(null);
    setBusy(true);
    const { error } = await signIn(email.trim(), password);
    setBusy(false);
    if (error) { setError(error); return; }
    navigate('/admin', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-2xl font-black" style={{ color: 'hsl(var(--primary))' }}>Tadeemco</p>
          <p className="text-sm text-muted-foreground">Content Management — sign in</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} autoComplete="username"
                   onChange={(e) => setEmail(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && submit()} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} autoComplete="current-password"
                   onChange={(e) => setPassword(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && submit()} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button className="w-full" disabled={busy || !email || !password} onClick={submit}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};
