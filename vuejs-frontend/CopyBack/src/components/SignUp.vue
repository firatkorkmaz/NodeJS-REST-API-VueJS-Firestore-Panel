<template>
    <br><br><br>
    <img class="signup_logo" src="../assets/logo.png" />
    <br><br><br>
    <p style="color: rgb(51, 51, 94); font-size: 26px;">Please sign up</p>

    <div align="center">
        <input style="color: white;" id="signup_email" type="text" v-model="user.email" placeholder="E-mail address" />
        <input style="color: white;" id="signup_password" type="text" v-model="user.password" placeholder="Password" />
        <button style="font-size: 16px;" id="signup_button" v-on:click="SignUp()">Sign up</button>
        <p><router-link style="color: rgb(67, 90, 206);" to="/signin">Sign in</router-link></p>
    </div>

    <br>
    <p style="color: rgb(104, 113, 121); font-size: 16px">Company © 2024</p>
</template>

<script>
/* eslint-disable */
/******************/

const sign_up = process.env.VUE_APP_DESTINATION + process.env.VUE_APP_SIGN_UP;

import axios from "axios"

export default {
    name: 'SignUp',
    components: {
    },
    emits: {
    },
    props: {
    },

    data() {
        return {
            user: {
                "email": "",
                "password": ""
            },
        }
    },

    methods: {
        async SignUp() {
            try {
                // Try to send a post request to sign up:
                let result = await axios.post(sign_up, this.user);
                console.log(result.data.message);               // Print the result message to the console (optional).
                alert(result.data.message);                     // Pop up an alert window.

                if (result.status == 201) {                     // If the sign up process is successful:
                    //for (var key in this.user) this.user[key] = "";   // Clear the temporary user{} data (optional).
                    this.$router.push({ name: 'HomePage' });
                }
            }
            catch (error) {
                // If the system fails to get the result:
                alert(error.response.data.error);       // Pop up an alert window.
                console.log(error.response);            // Print the error to the console (optional).
            }

        }
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

input[id="signup_email"],
input[id="signup_password"] {
    background-color: rgb(30, 30, 42);
    border: 1px solid rgb(45, 56, 89)
}

.signup_logo {
    width: 270px;
    background-color: rgb(30, 30, 40);
}

input[id="signup_email"],
input[id="signup_password"],
button[id="signup_button"] {
    width: 320px;
    height: 50px;
    padding-left: 12px;
    display: block;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
}

input[id="signup_email"]:focus,
input[id="signup_password"]:focus {
    outline: 1px solid rgb(240, 81, 215);
}

button[id="signup_button"] {
    border: 0px;
    background: rgb(67, 90, 206);
    color: white;
    cursor: pointer;
}
</style>