import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.init";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Create new user
    const createUser = async (email, password, userDetails) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            // Update user profile
            await updateProfile(newUser, {
                displayName: userDetails.displayName,
                photoURL: userDetails.photoURL,
            });

            const updatedUser = {
                ...newUser,
                displayName: userDetails.displayName,
                photoURL: userDetails.photoURL,
            };

            setUser(updatedUser);
            localStorage.setItem("userProfile", JSON.stringify(updatedUser));
            return newUser;
        } catch (error) {
            console.error("Error creating user:", error.message);
            throw error;
        }
    };

    // Update user profile
    const updateUserProfile = async (updatedUser) => {
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: updatedUser.displayName,
                    photoURL: updatedUser.photoURL,
                });

                const updatedProfile = {
                    ...auth.currentUser,
                    displayName: updatedUser.displayName,
                    photoURL: updatedUser.photoURL,
                };

                setUser(updatedProfile);
                localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
            }
        } catch (error) {
            console.error("Error updating profile:", error.message);
            throw error;
        }
    };

    // Sign out user
    const signOutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("authToken");
            localStorage.removeItem("userProfile");
        } catch (error) {
            console.error("Sign-out error:", error.message);
        }
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        const token = localStorage.getItem("authToken");
        return !!token;
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user);
            localStorage.setItem("userProfile", JSON.stringify(user));
            return user;
        } catch (error) {
            console.error("Google Sign-In error:", error.message);
            throw error;
        }
    };

    // Sign in with email and password
    const signInUser = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const user = response.user;

            // Assuming the backend sends a token
            const token = await user.getIdToken(); // Get Firebase auth token
            const userData = {
                email: user.email,
                displayName: user.displayName || "Tourist",
                photoURL: user.photoURL,
                role: "tourist", // Default role
            };

            localStorage.setItem("authToken", token);
            localStorage.setItem("userProfile", JSON.stringify(userData));
            setUser(userData);

            return response;
        } catch (error) {
            console.error("Error logging in:", error.message);
            throw error;
        }
    };

    // Send forgot password email
    const sendForgotPasswordEmail = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset email sent!");
        } catch (error) {
            console.error("Error sending password reset email:", error.message);
            throw error;
        }
    };

    // Handle auth state change (user logged in/out)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                localStorage.setItem("userProfile", JSON.stringify(currentUser));
            } else {
                setUser(null);
                localStorage.removeItem("userProfile");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                createUser,
                signInUser,
                signOutUser,
                signInWithGoogle,
                updateUserProfile,
                sendForgotPasswordEmail,
                isAuthenticated,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
