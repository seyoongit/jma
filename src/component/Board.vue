<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div class="md-layout md-gutter md-alignment-center-center">
            <div id="Board" class="md-layout-item md-size-90" ref="board">
                <div
                class="md-elevation-10 md-size-20"
                :style="style"
                @dragenter.prevent="() => {}"
                @dragover.prevent="() => {}"
                @drop="onDrop">
                    <Alphabet
                    v-for="n in howMany"
                    :id="parseInt(n-1)"   
                    :x="alphabets[n-1].x" 
                    :y="alphabets[n-1].y" 
                    :color="parseInt(n % 6)"
                    :charactor="alphabets[n-1].charactor" 
                    :lastMoved="alphabets[n-1].lastMoved"
                    :email="alphabets[n-1].email"
                    :isLoggedIn="!!user.uid"
                    @aDragstart="onADragstart"
                    :key="n-1" />
                </div>
            </div>
        </div>
        <md-snackbar md-position="center" :md-duration="2000" :md-active.sync="messageBarActive">
            <span>{{message}}</span>
        </md-snackbar>
    </div>
</template>

<script>
import firebase from "firebase"
import Alphabet from "./Alphabet.vue"
import axios from "axios"
import apiURL from "./apiURL.json"
import { setTimeout } from 'timers';

export default {
    name: "Board",
    components: {
        Alphabet,
    },
    data () {
        return {
            howMany: 1,
            board: {
                height: 0,
                width: 0,
                x: 0,
                y: 0,
            },
            drag: {},
            alphabets: {
                0: {
                    x: 10,
                    y: 10,
                    charactor: "a",
                    lastMoved: 1234567890,
                    email: "Default",
                }
            },
            user: {
                uid: "",
                email: ""
            },
            message: "",
            messageBarActive: false,
        }
    },
    computed: {
        style () {
            return {
                height: `${this.board.height}px`,
            }
        },
    },
    methods: {
        onDrop (e) {
            const { height: bh, width: bw, offsetLeft: bx, offsetTop: by } = this.board;
            const { id, offsetX: aox, offsetY: aoy } = this.drag; // aox means 'Alphabet offsetX'
            const toX = (e.pageX - bx - aox)*100 / bw;
            const toY = (e.pageY - by - aoy)*100 / bh;
            if (toX > 0 && toY > 0 && toX < 100 && toY < 100) {
                this.moveA(id, toX, toY)
            }
            this.drag = {}
        },
        moveA (id, toX, toY) {
            const { uid, email } = this.user
            // update UI
            this.alphabets[id].x = toX;
            this.alphabets[id].y = toY;
            this.alphabets[id].email = email;
            this.alphabets[id].lastMoved = Date.now();
            // update request to Firestore
            const that = this
            const option = { params: {id, x: toX, y: toY, uid, charactor: this.alphabets[id].charactor}}
            axios.get(apiURL.moveAlphabet, option).then(res => {
                this.showMessage(res.data.message)
            })
        },
        onADragstart (drag) {
            this.drag = drag
        },
        showMessage (message) {
            this.message = message
            this.messageBarActive = true
            const that = this
            setTimeout(function() {
                that.messageBarActive = false
            } ,2000)
        }
    },
    mounted () {
        // Board css info
        const boardRef = this.$refs.board
        this.board = {
            height      : window.outerHeight,
            width       : boardRef.offsetWidth,
            offsetLeft  : boardRef.offsetLeft,
            offsetTop   : boardRef.offsetTop,
        };
        // Firebase 초기화
        if (firebase.apps.length === 0) {
            const aa = firebase.initializeApp({
                apiKey: "AIzaSyDdQRJcbXtTX6Cad1Cd5NmNcdVgPvUF0OM",
                authDomain: "project2426-3ab97.firebaseapp.com",
                databaseURL: "https://project2426-3ab97.firebaseio.com",
                projectId: "project2426-3ab97",
                timestampsInSnapshots: true
            });
        }
        // alphabets 변경 수신
        const that = this
        firebase.firestore().collection("alphabets").doc("info").onSnapshot(function(doc) {
            const alphabets = doc.data()
            that.howMany = Object.keys(alphabets).length
            that.alphabets = alphabets
        });
        //Firebase 로그인 정보가져오기
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // 유저 정보를 data에 등록
                that.user.uid = result.user.uid
                that.user.email = result.user.email
            }   
        }).catch(function(error) {
            console.log("Error while Firebase Initiating", error)
        });
    },
}   
</script>


<style lang="scss">
#Board {
    position: relative;
    margin-top: 10px;
    background: aliceblue;
}
</style>
