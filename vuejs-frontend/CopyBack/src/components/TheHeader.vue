<template>
    <div class="nav">
        <a href="https://companywebsite" target="_blank"><img id="header_logo" src="../assets/logo.png" /></a>
        <p id="session">{{ activeSession }}</p>
        <img id="arrowdown_button" @click="showDropDown = !showDropDown" src="../assets/user.png" />
        <div class="div_click" v-if="showDropDown">
            <img id="clicklogo_button" @click="SignOut()" src="../assets/off.png" />
        </div>

    </div>

</template>

<script>
/* eslint-disable */
/******************/

const sign_out = process.env.VUE_APP_DESTINATION + process.env.VUE_APP_SIGN_OUT;

import axios from 'axios';

export default {
    inheritAttrs: false,
    name: 'TheHeader',
    components: {
    },
    emits: {
    },
    props: {
    },
    data() {
        return {
            activeSession: "",
            showDropDown: false,
        }
    },

    created() {
        this.activeSession = localStorage.getItem('active-session');
    },

    methods: {
        async SignOut() {
            try {
                // Try to send a post request to sign out:
                let result = await axios.post(sign_out);
                console.log(result.data.message);               // Print the result message to the console (optional).

                if (result.status == 200) {                     // If the sign out process is successful:
                    localStorage.removeItem("access-token");    // Remove the access_token data from the Local Storage:
                    localStorage.removeItem("active-session");
                    this.$router.push({ name: 'SignIn' });
                }
                else {
                    // If the returned status is not "200" (i.e. 500: Internal Error):
                    alert(result.data.message);             // Pop up an alert window.
                }
            }
            catch (error) {
                // If the system fails to get the result:
                alert(error.response.data.error);       // Pop up an alert window.
                //console.log(error.response);            // Print the error to the console (optional).
            }
        },
    },

    async mounted() {
        axios.defaults.withCredentials = true;
    },
}

</script>

<style>
div {
    margin: 0 !important;
    padding: 0 !important;
}

.nav {
    overflow: hidden;
    background-color: rgb(30, 30, 40);
}

img[id="header_logo"] {
    float: left;
    width: 40px;
    color: transparent;
    background-color: transparent;
    padding: 0px 0px;
    font-size: 16px;
    margin-left: 100px;
    margin-top: 2px;
    cursor: pointer;
}

p[id="session"] {
    float: center;
    color: rgb(125, 145, 170);
    padding: 0px 0px;
    margin-right: 90px;
    margin-top: 8px;
    margin-bottom: 0px;
    text-align: right;
    font-style: italic;
}

img[id="arrowdown_button"] {
    float: right;
    width: 26px;
    height: 26px;
    color: transparent;
    background: transparent;
    padding: 0px 0px;
    font-size: 16px;
    margin-right: 50px;
    margin-top: -24px;
    margin-bottom: 40px;
    cursor: pointer;
}

img[id="clicklogo_button"] {
    float: right;
    width: 22px;
    color: transparent;
    background: transparent;
    margin-top: 10px;
    padding: 0px 0px;
    margin-right: -24px;
    cursor: pointer;
}
</style>