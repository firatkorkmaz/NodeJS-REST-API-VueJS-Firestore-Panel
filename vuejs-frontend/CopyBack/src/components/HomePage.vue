<template>
    <header>
        <TheHeader />
    </header>


    <body>
        <table align="center" id="dbTable">

            <thead>
                <tr style="font-size: 24px;" id="head" align="left">
                    <th style="font-weight:normal">Parameter Key</th>
                    <th style="font-weight:normal">Value</th>
                    <th style="font-weight:normal">Description</th>
                    <th style="font-weight:normal">Create Date <span @click="reSort()" id="clickSort">{{ ascendingDate ?
                        '&darr;' : '&uarr;' }}</span></th>
                    <!--<th v-bind:class="(ascendingDate)?'headerSortDown':'headerSortUp'" @click="reSort()">Create Date</th>-->
                    <th id="th1"></th>
                    <th id="th2"></th>
                </tr>
            </thead>

            <tbody>
                <tr style="font-size: 16px;" id="list" align="left" v-for="post in posts" :key="post.id">
                    <td :id="'parameter_key_' + post.id" :contenteditable="post.editFlag">{{ post.parameter_key }}</td>
                    <td :id="'value_' + post.id" :contenteditable="post.editFlag">{{ post.value }}</td>
                    <td :id="'description_' + post.id" :contenteditable="post.editFlag">{{ post.description }}</td>
                    <td :id="'create_date_' + post.id" :contenteditable="false">{{ post.create_date }}</td>
                    <td align="center"><button id="edit_button" style="width: 100%; height: 30px;"
                            @click="editPost(post)">{{ post.editFlag ? 'Save' : 'Edit' }}</button></td>
                    <td align="center"><button id="delete_button" style="width: 100%; height: 30px;"
                            @click="deletePost(post.id)">Delete</button></td>
                </tr>
                <tr style="font-size: 16px;" id="add" align="left">
                    <td id="add_parameter_key"><input style="height: 40px;" type="text" v-model="add_row.parameter_key"
                            id="parameter_key" placeholder="New Parameter"></td>
                    <td id="add_value"><input style="height: 40px;" type="text" v-model="add_row.value" id="value"
                            placeholder="Value"></td>
                    <td id="add_description"><input style="height: 40px;" type="text" v-model="add_row.description"
                            id="description" placeholder="New Description:"></td>
                    <td id="create_date"></td>
                    <td align="center"><button id="add_button" style="width: 100%; height: 30px; margin-bottom: 0px;"
                            @click="addPost(add_row)">ADD</button>
                    </td>
                </tr>
            </tbody>

        </table>
    </body>
</template>

<!---------------------------------->
<!---------------------------------->

<script>
/* eslint-disable */
/******************/

const api_read = process.env.VUE_APP_DESTINATION + process.env.VUE_APP_API_READ;
const api_create = process.env.VUE_APP_DESTINATION + process.env.VUE_APP_API_CREATE;
const api_update = process.env.VUE_APP_DESTINATION + process.env.VUE_APP_API_UPDATE;
const api_delete = process.env.VUE_APP_DESTINATION + process.env.VUE_APP_API_DELETE;

import TheHeader from './TheHeader.vue';
import axios from 'axios'

export default {
    inheritAttrs: false,
    name: 'HomePage',
    components: {
        TheHeader,
    },
    emits: {
    },
    props: {
    },

    data() {
        return {
            loadpage: true,
            accessToken: "",
            posts: [],
            // Epmty Row Data for New Row Addition
            add_row: {
                "parameter_key": "",
                "value": "",
                "description": "",
            },
            // Epmty Row Data for Edited Row Addition
            edit_row: {
                "parameter_key": "",
                "value": "",
                "description": "",
            },
            // The First Page Visit will Show Rows Sorted by Ascending Create Dates
            ascendingDate: true,
        }
    },

    created() {
        this.accessToken = localStorage.getItem("access-token");
        // If there is no token data in Local Storage:
        if (this.accessToken == null || this.accessToken == "null" || this.accessToken == "") {
            this.loadpage = false;
            this.$router.push({ name: 'SignIn' });
        }
        else {
            this.loadpage = true;
        }
    },

    methods: {
        async addPost(add_row) {
            try {
                // If all the input sections are non-empty, add the new row entry to the database:
                if (add_row.parameter_key != "" && add_row.value != "" && add_row.description != "") {

                    //let response = await axios.post(api_create, add_row, { headers: { "Authorization": `${this.accessToken}` }, withCredentials: true });
                    let response = await axios.post(api_create, add_row);
                    this.posts = response.data.map(item => ({ ...item, "editFlag": false }));

                    // Sort Rows by Ascending Create Dates
                    this.posts.sort(function (a, b) {
                        return (a.create_date < b.create_date ? -1 :
                            (a.create_date > b.create_date ? 1 : 0));
                    });

                    console.log(this.posts);
                    // Clear the temporary "row" dictionary for future add operations:
                    for (var key in this.add_row) this.add_row[key] = "";
                }
                else {
                    alert("Please Fill out All Required Fields!");
                }
            }
            catch (error) {
                // If the system fails to add data to the database:
                console.log(error.response);                // Print the error to the console.
                alert(error.response.data.error);           // Pop up an alert window (optional)
                localStorage.removeItem('access-token');    // Remove token data from Local Storage. 
                this.$router.push({ name: 'SignIn' });      // Go to SignIn page.
            }
        },

        async deletePost(id) {
            try {
                //let response = await axios.post(api_delete + '/' + id, {}, { headers: { "Authorization": `${this.accessToken}` }, withCredentials: true });
                let response = await axios.post(api_delete + '/' + id);
                this.posts = response.data.map(item => ({ ...item, "editFlag": false }));

                // Sort Rows by Ascending Create Dates
                this.posts.sort(function (a, b) {
                    return (a.create_date < b.create_date ? -1 :
                        (a.create_date > b.create_date ? 1 : 0));
                });

                console.log(this.posts);
            }
            catch (error) {
                // If the system fails to delete data from the database:
                console.log(error.response);                // Print the error to the console.
                alert(error.response.data.error);           // Pop up an alert window (optional)
                localStorage.removeItem('access-token');    // Remove token data from Local Storage. 
                this.$router.push({ name: 'SignIn' });      // Go to SignIn page.
            }
        },

        async editPost(post) {
            try {
                if (post.editFlag) {
                    // Get the new input data and save to "row" dictionary:
                    this.edit_row.parameter_key = document.getElementById("parameter_key_" + post.id).innerHTML;
                    this.edit_row.value = document.getElementById("value_" + post.id).innerHTML;
                    this.edit_row.description = document.getElementById("description_" + post.id).innerHTML;

                    // If all the input sections are non-empty:
                    if (this.edit_row.parameter_key != "" && this.edit_row.value != "" && this.edit_row.description != "") {
                        //let response = await axios.post(api_update + '/' + post.id, this.edit_row, { headers: { "Authorization": `${this.accessToken}` }, withCredentials: true });
                        let response = await axios.post(api_update + '/' + post.id, this.edit_row);
                        this.posts = response.data.map(item => ({ ...item, "editFlag": false }));

                        // Sort Rows by Ascending Create Dates
                        this.posts.sort(function (a, b) {
                            return (a.create_date < b.create_date ? -1 :
                                (a.create_date > b.create_date ? 1 : 0));
                        });

                        console.log(this.posts);
                    }
                    // Else, do not update the database with empty input sections and show the previous data:
                    else {
                        document.getElementById("parameter_key_" + post.id).innerHTML = post.parameter_key;
                        document.getElementById("value_" + post.id).innerHTML = post.value;
                        document.getElementById("description_" + post.id).innerHTML = post.description;
                    }
                    // Clear the temporary "row" dictionary for future edit operations:
                    for (var key in this.edit_row) this.edit_row[key] = "";
                }
                post.editFlag = !post.editFlag;
            }
            catch (error) {
                // If the system fails to edit data in the database:
                console.log(error.response);                // Print the error to the console.
                alert(error.response.data.error);           // Pop up an alert window (optional)
                localStorage.removeItem('access-token');    // Remove token data from Local Storage. 
                this.$router.push({ name: 'SignIn' });      // Go to SignIn page.
            }
        },

        async reSort() {
            function reverseDate(strDate) {
                let wordsDate = strDate.split(" ");
                let revDate = [wordsDate[0].split("/").reverse().join("/"), wordsDate[1]].join(" ");
                return revDate;
            }

            if (this.ascendingDate) {
                this.posts.sort(function (b, a) {
                    return (reverseDate(a.create_date) < reverseDate(b.create_date) ? -1 :
                        (reverseDate(a.create_date) > reverseDate(b.create_date) ? 1 : 0));
                });
            }
            else {
                this.posts.sort(function (a, b) {
                    return (reverseDate(a.create_date) < reverseDate(b.create_date) ? -1 :
                        (reverseDate(a.create_date) > reverseDate(b.create_date) ? 1 : 0));
                });
            }
            this.ascendingDate = !this.ascendingDate;
        }
    },

    async mounted() {
        if (this.loadpage == true) {
            axios.defaults.withCredentials = true;
            axios.defaults.headers.common['Authorization'] = this.accessToken;

            try {
                // Read Post on Page Visit
                let response = await axios.get(api_read);
                this.posts = response.data.map(item => ({ ...item, "editFlag": false }));

                // Sort Rows by Ascending Create Dates
                this.posts.sort(function (a, b) {
                    return (a.create_date < b.create_date ? -1 :
                        (a.create_date > b.create_date ? 1 : 0));
                });

                console.log(this.posts);
            }
            catch (error) {
                // If the system fails to read the database:
                console.log(error.response);                // Print the error to the console.
                localStorage.removeItem('access-token');    // Remove token data from Local Storage. 
                this.$router.push({ name: 'SignIn' });      // Go to SignIn page.
            }
        }
    },
}



</script>

<!---------------------------------->
<!---------------------------------->

<style>
/* Buttons */
button {
    width: 100%;
    border: 0px;
    color: white;
    border-radius: 5px;
}

button[id="edit_button"] {
    background-color: rgb(44, 113, 245);
}

button[id="delete_button"] {
    background-color: rgb(241, 60, 73);
}

button[id="add_button"] {
    background-color: rgb(0, 177, 228);
}


/* Rounded Corners */
th {
    border-radius: 8px;
}

td {
    border-radius: 8px;
}

input {
    border-radius: 8px;
}


/* Default Text in Input Cells */
[placeholder] {
    font-size: 16px;
    padding-left: 8px;
    color: rgb(109, 118, 124)
}


/* General Body Settings */
body {
    margin: 0px;
    padding: 0px;
    background-color: rgb(30, 30, 40);
}


/* Font Colors of Table Data */
tr[id="head"] {
    color: rgb(125, 145, 170);
}

tr[id="list"] {
    color: rgb(226, 226, 228);
}


/* Show Clicking Hand When Cursor is on Buttons  */
label[for],
button,
a[href],
.pointer,
select,
input[type='image'],
input[type='submit'],
span[id="clickSort"],
th[class='headerSortDown'],
th[class='headerSortUp'] {
    cursor: pointer;
}

/***************************/
table,
thead,
th,
td,
tr {
    border: 0px solid white;
}

/***************************/

/* Input Text General Settings */
input[type="text"] {
    width: 100%;
    color: white;
    outline: 0px;
    background-color: rgb(30, 30, 42);
    border: 1px solid rgb(45, 55, 88);
    box-sizing: border-box;
}

input[type="text"]:focus {
    outline: 0px;
    border: 1px solid rgb(240, 81, 215);
}

/* Input Text Width */
td[id="add_description"]>input[type='text'] {
    width: 145%;
}

td[id="add_value"]>input[type='text'] {
    width: 90%;
}

td[id="add_parameter_key"]>input[type='text'] {
    width: 90%;
}

/* Table Width */
table {
    /* border: 0px #AAA solid; */
    width: 90%;
    border: 0px solid black;
}

/* Content-Editable Cells */
[contenteditable="true"],
[contenteditable="true"]:hover {
    color: white;
    outline: 0px;
    background-color: rgb(30, 30, 42);
    border: 1px solid rgb(45, 55, 88);
}

[contenteditable="true"]:focus {
    color: white;
    outline: 0px;
    background-color: rgb(30, 30, 42);
    border: 1px solid rgb(240, 81, 215);
}

/* Cell Prpoerties */
td {
    padding: 6px;
}

td.label {
    background-color: #DDD;
}

td.value input {
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

/* Cell Width Above Buttons */
th[id="th1"] {
    width: 4%;
}

th[id="th2"] {
    width: 4%;
}

/***********************************************/

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>