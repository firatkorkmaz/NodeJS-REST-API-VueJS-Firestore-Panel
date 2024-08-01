// Set Duration Time for the Session Cookie!
const days = 1;
const hours = 0;
const minutes = 0;
const duration = (days * 24 * 3600000) + (hours * 3600000) + (minutes * 60000);
const cookie_life = new Date(Date.now() + duration);

// Firebase Authentication Controller
const {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} = require('../config/firebase');

const auth = getAuth();

class FirebaseAuthController {

    registerUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({
                email: "Email is Required!",
                password: "Password is Required!",
            });
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        res.status(201).json({ message: "User Created Successfully! Verification Email Sent!" });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).json({ error: "Error Sending Email Verification!" });
                    });
            })
            .catch((error) => {
                const errorMessage = error.message || "An Error Occurred While Registering the User!";
                res.status(500).json({ error: errorMessage });
            });
    }

    loginUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({
                email: "Email is Required!",
                password: "Password is Required!",
            });
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const idToken = userCredential._tokenResponse.idToken
                if (idToken) {
                    res.cookie('access_token', idToken, {
                        httpOnly: true, secure: true, sameSite: 'None', expires: cookie_life
                    });
                    res.status(200).json({ message: "User Logged in Successfully!", userCredential });
                } else {
                    res.status(500).json({ error: "Internal Server Error!" });
                }
            })
            .catch((error) => {
                console.error(error);
                const errorMessage = error.message || "An Error Occurred While Logging in!";
                res.status(500).json({ error: errorMessage });
            });
    }

    logoutUser(req, res) {
        signOut(auth)
            .then(() => {
                res.clearCookie('access_token', {
                    httpOnly: true, secure: true, sameSite: 'None'
                });
                res.status(200).json({ message: "User Logged out Successfully!" });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error!" });
            });
    }

    resetPassword(req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(422).json({
                email: "Email is required!"
            });
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                res.status(200).json({ message: "Password Reset Email Sent Successfully!" });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error!" });
            });
    }

}

module.exports = new FirebaseAuthController();
