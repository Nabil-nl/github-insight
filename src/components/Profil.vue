<template>
<div class=" flex justify-center items-center ">
    <div class="w-[500px] h-[100px] bg-[#ffffff] rounded-lg border-2 border-[#14213d]  p-4 flex items-center">
      <!-- Profile Flag -->
      <img :src="profile.avatar_url" alt="Profile Flag" class="w-12 h-12 rounded-full mr-4">

      <!-- Profile Name -->
      <div class="text-black  text-xl flex items-center" id="add">
        <p>{{ profile.name || profile.login }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import '@/css/header.css'
import { mapState } from 'vuex';

export default {
  name: 'Profil',
  computed: {
    ...mapState(['userProfile']),
    profile() {
      return this.userProfile || {}; // Default to an empty object if userProfile is not available
    }
  }
};
</script>

<style scoped>
/* Scoped styles here */
</style>
