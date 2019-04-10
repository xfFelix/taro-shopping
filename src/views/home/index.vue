<template>
    <div class="home">
        <home-swipe></home-swipe>
        <search-head :headShowC='headShowP'></search-head>
        <ticket-list></ticket-list>
    </div>
</template>
<script>
export default {
    data: () => ({
        headShowP:false
    }),
    methods:{
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 0) {
                this.headShowP = true;

            } else {
                this.headShowP = false;
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    components: {
        HomeSwipe: () => import('./components/HomeSwipe'),
        SearchHead: () => import('./components/SearchHead'),
        TicketList: () => import('./components/TicketList'),
    }
}
</script>
