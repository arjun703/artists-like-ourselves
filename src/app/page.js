'use client'
import { useRouter } from 'next/navigation';
import useAuth  from './_components/useauth';
import LandingPage from './_landing-page/landing_page';


export default function Home() {
  const user  = useAuth();
  const router = useRouter();

  if(user){
    router.push('/feed');
  }

  return (
    <LandingPage />
  );
}

