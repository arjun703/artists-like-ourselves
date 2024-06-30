// useAuth.js
import eng from '@/app/lang/en';
const useLang = () => {

    const token= 'en'
    if (token == 'en') {
        // If authenticated, set the user state
        return eng
    }
    return eng;
};

export default useLang;
