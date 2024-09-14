'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/feed');
  }, [router]); // Trigger this only once when the component mounts

  return null; // You can return null since you're navigating away
}
