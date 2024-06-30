import Header from '@/app/_components/_header/header';
import Banner from './banner';
import BelowBanner from './below_banner';

export default function LandingPage(){
        
    return (
        <>
            <Header user={false} />
            <Banner />   
            <BelowBanner />
        </>
    );
}