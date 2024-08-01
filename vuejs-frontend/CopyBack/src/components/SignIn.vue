<template>
    <br><br><br>
    <img class="signin_logo" src="../assets/logo.png" />
    <br><br><br>
    <p style="color: rgb(51, 51, 94); font-size: 26px;">Please sign in</p>

    <div align="center">
        <input style="color: white;" id="signin_email" type="text" v-model="user.email" placeholder="E-mail address" />
        <input style="color: white;" id="signin_password" type="text" v-model="user.password" placeholder="Password" />
        <button style="font-size: 16px;" id="signin_button" v-on:click="SignIn()">Sign in</button>
        <p><router-link style="color: rgb(67, 90, 206);" to="/signup">Sign up</router-link></p>
    </div>

    <br>
    <p style="color: rgb(104, 113, 121); font-size: 16px">Company © 2024</p>
</template>

<script>
/* eslint-disable */
/******************/

const sign_in = process.env.VUE_APP_DESTINATION + process.env.VUE_APP_SIGN_IN;

import axios from 'axios'

export default {
    inheritAttrs: false,
    name: 'SignIn',
    components: {
    },
    emits: {
    },
    props: {
    },

    data() {
        return {
            accessToken: "",
            user: {
                "email": "",
                "password": ""
            },
        }
    },

    created() {
        this.accessToken = localStorage.getItem("access-token");
        if (this.accessToken != null) {
            this.$router.push({ name: 'HomePage' });
        }
    },

    methods: {
        async SignIn() {
            try {
                // Try to send a post request to sign in:
                let result = await axios.post(sign_in, this.user);
                console.log(result.data.message);               // Print the result message to the console (optional).

                if (result.status == 200) {                     // If the sign in process is successful:
                    //for (var key in this.user) this.user[key] = "";   // Clear the temporary user{} data (optional).
                    // Save the returned access_token data to the Local Storage:
                    localStorage.setItem("access-token", result.data.userCredential.user.stsTokenManager.accessToken);
                    localStorage.setItem("active-session", this.user.email);
                    this.$router.push({ name: 'HomePage' });    // Then, go to the HomePage.
                }
                else {
                    // If the returned status is not "200" (i.e. 500: Internal Error):
                    alert(result.data.message);             // Pop up an alert window.
                }
            }
            catch (error) {
                // If the system fails to get the result:
                alert(error.response.data.error);       // Pop up an alert window.
                console.log(error.response);            // Print the error to the console (optional).
            }
        },
    },

    async mounted() {
        axios.defaults.withCredentials = true;
    },
}

</script>


<style>
input {
    color: white;
    font-size: 16px;
}

input::placeholder {
    font-size: 16px;
}

input[id="signin_email"],
input[id="signin_password"] {
    background-color: rgb(30, 30, 42);
    border: 1px solid rgb(45, 56, 89)
}

.signin_logo {
    width: 270px;
    background-color: rgb(30, 30, 40);
}

input[id="signin_email"],
input[id="signin_password"],
button[id="signin_button"] {
    width: 320px;
    height: 50px;
    padding-left: 12px;
    display: block;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
}

input[id="signin_email"]:focus,
input[id="signin_password"]:focus {
    outline: 1px solid rgb(240, 81, 215);
}

button[id="signin_button"] {
    border: 0px;
    background: rgb(67, 90, 206);
    color: white;
    cursor: pointer;
}
</style>