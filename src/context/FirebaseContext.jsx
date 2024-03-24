import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'



const FirebaseContext = createContext(null);

export const useFirebaseContext = () => useContext(FirebaseContext);

export const FirebaseContextProvider = ({ children }) => {
    // for sigin and signup page
    const [loginStatus, setLoginStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    // to check if user is log in or logout
    const [user, setUser] = useState(null)
    // to show logout btn
    const [logoutBtn, setLogoutBtn] = useState(false)


    // created instances for using firebase
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const storage = getStorage(app);

    // for sign up
    const handleSignup = async (email, password, firstName, lastName) => {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`
        })
        // console.log(user);
    }
    //for log in
    const handleLogin = async (email, password) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            setErrorMessage('')
            return user
        } catch (error) {
            setErrorMessage('Invalid Credential')
            console.log(error.message)
        }


    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user)
            else setUser(null)
            // console.log("user", user);
        })
    }, [])

    // log out user

    const handleLogout = () => {
        signOut(auth).then(() => {
            setUser(null);

        })
    }

    const handleBlogCreation = async (data) => {
        const storageRef = ref(storage, `images/${data.file.name}`)
        const imgPath = await uploadBytes(storageRef, data.file)
        console.log(imgPath);
        return await addDoc(collection(firestore, "blogs"), {
            title: data.title,
            timeStamp: serverTimestamp(),
            tags: data.tags,
            trending: data.trending,
            category: data.category,
            des: data.des,
            imgURL: imgPath.ref.fullPath,
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
        })

    }

    const handleDocUpdate = async (data, id) => {

        return await updateDoc(doc(firestore, "blogs", id), {
            title: data.title,
            timeStamp: serverTimestamp(),
            tags: data.tags,
            trending: data.trending,
            category: data.category,
            des: data.des,
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
        })

    }

    const getAllBlogs = () => {
        return getDocs(collection(firestore, 'blogs'))
    }

    const getDataById = async (id) => {
        const ref = doc(firestore, 'blogs', id);
        return await getDoc(ref)
    }

    const getImage = (path) => {
        return getDownloadURL(ref(storage, path))
    }
    // delete the document by id
    const handleDeleteBtn = async (id) => {
        if (window.confirm('Are you sure')) {
            try {
                await deleteDoc(doc(firestore, 'blogs', id))


            } catch (error) {
                console.log(error)
            }
        }
    }
    const getTags = async () => {
        let tags = []
        const blogRef = collection(firestore, 'blogs');
        return await getDocs(blogRef)



    }
    const getTrendingBlogs = async () => {
        return await getDocs(query(collection(firestore, 'blogs'), where('trending', '==', 'yes')))


    }
    return (
        <FirebaseContext.Provider value={{ loginStatus, setLoginStatus, handleSignup, handleLogin, user, handleLogout, logoutBtn, handleBlogCreation, setLogoutBtn, getAllBlogs, getImage, getDataById, handleDeleteBtn, handleDocUpdate, getTags, getTrendingBlogs, errorMessage }}>
            {children}
        </FirebaseContext.Provider>
    )
}