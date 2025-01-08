import { User } from "firebase/auth";
import { Firestore, doc, DocumentSnapshot, DocumentData, getDoc } from "firebase/firestore";

export async function getUserData(db: Firestore, uid: string): Promise<User | null> {
    try {
        const docRef = doc(db, 'users', uid);
        const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData: User = docSnap.data() as User;
            return userData;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching e data:", error);
        throw error;
    }
}