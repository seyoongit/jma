<template>
    <transition>
        <md-content 
        id="Alphabet"
        :style="style"
        draggable="true" 
        v-if="!isDragging"
        @dragstart="onDragstart"
        @dragend="isDragging = false">
            <md-icon class="md-size-1x" :md-src="svgSrc" />
            <md-tooltip md-direction="top">{{email}}</md-tooltip>
        </md-content>
    </transition>
</template>

<script>
import iconNamesOfEachCharactor from "./iconNamesOfEachCharactor.json"
const colors = ["dodgerblue", "#f2711c", "red", "MediumVioletRed", "LimeGreen", "darkblue"]

export default {
    name: 'Alphabet',
    props: {
        id: Number,
        x: Number,
        y: Number,
        color: Number,
        charactor: String,
        lastMoved: Number,
        email: String,
        isLoggedIn: Boolean
    },
    data () {
        return { isDragging: false }
    },
    computed: {
        style () {
            return {
                color: colors[this.color],
                left: `${this.x}%`,
                top: `${this.y}%`,
                zIndex: `${Math.floor(this.lastMoved % 1234567890)}`
            }
        },
        svgSrc () {
            const iconNames = iconNamesOfEachCharactor[this.charactor]
            const iconName = iconNames[this.id % iconNames.length]
            return require(`../asset/${iconName}.svg`)
        }
    },
    methods: {
        onDragstart (e) {
            if (this.isLoggedIn === false) return
            this.isDragging = true;
            this.$emit("aDragstart", {
                id: this.id,
                offsetX: e.offsetX,
                offsetY: e.offsetY,
            })
        },
    }
}   
</script>


<style lang="scss">
#Alphabet {
    position: absolute;
    display: inline-block;
    height: 25px;
    width: 25px;
    background: rgba(255,255,255,0);
    &:hover {
        cursor: pointer;
        background: rgba(30,144,255,0.5);
    }
    transition: 0.5s;
}
.dragging {
    display: none;
}
</style>
