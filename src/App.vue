<template>
  <div id="app">
    <TopNav />
    <Board />
    <Footer />
  </div>
</template>

<script>
import TopNav from "./component/Topnav.vue"
import Board from "./component/Board.vue"
import Footer from "./component/Footer.vue"

export default {
  name: 'app',
  components: {
    TopNav,
    Board,
    Footer,
  },
}
</script>

<style lang="scss">
#app {
  font-family: Hanna !important;
  overflow: hidden;
}
::-webkit-scrollbar{ width: 4px; }
::-webkit-scrollbar-track { background-color: white;}
::-webkit-scrollbar-thumb { background-color: dodgerblue; border-radius: 10px; }
</style>
