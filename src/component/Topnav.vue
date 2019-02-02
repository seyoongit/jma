<template>
    <div id="TopNav">
        <md-toolbar class="md-large md-primary" md-elevation="1">
            <h3 class="md-display-2">Just Move Alphabet</h3>
            <md-button v-if="!isLoggedIn" class="md-fab md-fab-top-right" @click="login">Login</md-button>
            <md-button v-if="isLoggedIn" class="md-fab md-fab-top-right" @click="login">
                <md-avatar v-if="isLoggedIn" class="md-avatar-icon md-large md-accent" @click="logout">
                    <md-tooltip md-direction="left">{{user.email}}</md-tooltip>
                    <md-tooltip md-direction="bottom">한번더 클릭하면 로그아웃</md-tooltip>
                    <img v-if="user.photoURL !== null" :src="user.photoURL" alt="user's photo">
                    <md-icon v-if="user.photoURL === null">person</md-icon>
                </md-avatar>
            </md-button>
        </md-toolbar>
    </div>
</template>

<script>
import firebase from "firebase"

export default {
    name: 'TopNav',
    data () {
        return {
            isLoggedIn: false,
            user: {
                userName: "",
                email: "",
                photoURL: null
            }
        }
    },
    methods: {
        login () {
            const provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('email')
            firebase.auth().signInWithRedirect(provider);  
        },
        logout () {
            firebase.auth().signOut().then(function () {
                this.isLoggedIn = false
            });
        },
    },
    mounted () {
        //Firebase 로그인 정보가져오기
        const that = this
        setTimeout(function() {
            firebase.auth().getRedirectResult().then(function(result) {
                if (result.credential) {
                    that.isLoggedIn = true
                    that.user.email = result.user.email
                    that.user.userName = result.user.displayName
                    that.user.photoURL = result.user.photoURL
                }
            }).catch(function(error) {
                console.log("Error while Firebase Initiating", error)
            });
        },1500)
    }
}
</script>
<style lang="scss">
</style>
