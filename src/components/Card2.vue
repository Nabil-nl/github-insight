<template>
  <section v-if="userName" class="fixed left-[400px] w-[900px] h-[550px] bottom-[50px] mr-4 mt-4 bg-[#ffffff] rounded-lg border-2 border-[#14213d] shadow-lg p-4 flex flex-col">
    <Profil :profile="userProfile" />
    <Chart1 :userData="userData" />

    <Chart2 />
  </section>
</template>

<script>
import Profil from '@/components/Profil.vue';
import Chart1 from '@/components/Chart1.vue';
import Chart2 from '@/components/Chart2.vue';
import { mapState, mapActions } from 'vuex';


export default {
  components: {
    Profil,
    Chart1,
    Chart2,
  },
  name: 'Card2',
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['userProfile']),
  },
  watch: {
    userName: 'fetchUserProfile'
  },
  methods: {
    ...mapActions(['fetchUserProfile']),
  },
  created() {
    this.fetchUserProfile(this.userName);
  }
};
</script>

<style scoped>
</style>
