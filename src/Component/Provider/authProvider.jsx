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
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();


    const createUser = async (email, password, userDetails) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

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

            toast.success("Account created successfully!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });

            navigate("/");  // Ensure you're navigating to the desired page after registration
            return updatedUser;
        } catch (error) {
            console.error("Error creating user:", error.message);
            toast.error("Failed to create account. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            throw error;
        }
    };



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

                toast.success("Profile updated successfully!", {
                    position: "top-center",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error.message);
            toast.error("Failed to update profile. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            throw error;
        }
    };


    const signOutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("authToken");
            localStorage.removeItem("userProfile");

            toast.success("Logged out successfully!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            console.error("Sign-out error:", error.message);
            toast.error("Failed to log out. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };


    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const token = await user.getIdToken();
            const userData = {
                email: user.email,
                displayName: user.displayName || "Tourist",
                photoURL: user.photoURL,
                role: "tourist",
            };

            localStorage.setItem("authToken", token);
            localStorage.setItem("userProfile", JSON.stringify(userData));
            setUser(userData);

            toast.success("Google login successful!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });

            return user;
        } catch (error) {
            console.error("Google Sign-In error:", error.message);
            toast.error("Google login failed. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            throw error;
        }
    };

    const signInUser = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const user = response.user;

            const token = await user.getIdToken();
            const userData = {
                email: user.email,
                displayName: user.displayName || "Tourist",
                photoURL: user.photoURL,
                role: "tourist",
            };

            localStorage.setItem("authToken", token);
            localStorage.setItem("userProfile", JSON.stringify(userData));
            setUser(userData);

            toast.success("Login successful!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });

            return response;
        } catch (error) {
            console.error("Error logging in:", error.message);
            toast.error("Invalid email or password. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            throw error;
        }
    };

    const handleForgotPassword = async (email) => {
        if (!email) {
            toast.error("Please provide your email address.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent! Check your inbox.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            console.error("Error sending password reset email:", error.message);
            toast.error("Failed to send password reset email. Try again later.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const localUserData = {
                    email: currentUser.email,
                    displayName: currentUser.displayName || "Tourist",
                    photoURL: currentUser.photoURL,
                };

                try {
                    const response = await fetch(`/users?email=${currentUser.email}`);
                    if (response.ok) {
                        const apiUserData = await response.json();
                        const combinedUserData = {
                            ...localUserData,
                            userName: apiUserData.userName,
                            userRole: apiUserData.userRole,
                        };
                        setUser(combinedUserData);
                        localStorage.setItem("userProfile", JSON.stringify(combinedUserData));
                    } else {
                        console.error("User not found in the database");
                        setUser(localUserData);
                        localStorage.setItem("userProfile", JSON.stringify(localUserData));
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(localUserData);
                    localStorage.setItem("userProfile", JSON.stringify(localUserData));
                }
            } else {
                const storedUser = localStorage.getItem("userProfile");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    setUser(null);
                }
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
                handleForgotPassword,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
