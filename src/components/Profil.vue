<template>
<div class=" flex justify-center items-center   bg-gray-900">
    <div class="w-[500px] h-[100px] bg-[#0D1821] rounded-lg border-4 border-[#87bcde] shadow-lg p-4 flex items-center">
      <!-- Profile Flag -->
      <img :src="profile.avatar_url" alt="Profile Flag" class="w-12 h-12 rounded-full mr-4">

      <!-- Profile Name -->
      <div class="text-white text-lg flex items-center" id="add">
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
