import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const { user, isAdmin, isLoading, signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (user && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user && !isAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-4 max-w-sm">
          <h2 className="font-heading text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setSubmitting(true);

    const { error } = mode === 'login'
      ? await signIn(email.trim(), password)
      : await signUp(email.trim(), password);

    setSubmitting(false);
    if (error) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    } else if (mode === 'signup') {
      toast({ title: 'Account created', description: 'Check your email to confirm, then log in.' });
      setMode('login');
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-heading text-3xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">
            {mode === 'login' ? 'Sign in to manage your store' : 'Create your admin account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body" disabled={submitting}>
            {submitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-primary underline">
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
        <p className="text-center text-xs text-muted-foreground">
          The first account created automatically becomes admin.
        </p>
      </div>
    </div>
  );
}
