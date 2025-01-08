import { useEffect, useState } from 'react';
import { getUserData } from '../utils/userUtils';
import { db } from '../config/config';
import { useAuth } from '../contexts/AuthContext';
import { UserDetails } from '../types/User';

function useUserData() {
    const [userData, setUserData] = useState(null)
    const { currentUser }: UserDetails | any = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: UserDetails | any = await getUserData(db, currentUser.uid);
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    return userData;

}


export default useUserData;