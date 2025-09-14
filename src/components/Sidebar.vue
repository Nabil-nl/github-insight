<template>
  <aside class="w-80  bg-slate-900 border-r border-slate-700 flex flex-col overflow-y-auto">
    <!-- Header Card -->
    <div class="m-4 bg-slate-800 rounded-lg border border-slate-700 p-6">
      <div class="text-center">
        <!-- Avatar -->
        <div class="mx-auto w-20 h-20 mb-4">
          <img 
            :src="avatarUrl" 
            alt="User Avatar"
            class="w-full h-full rounded-full object-cover border-2 border-slate-600"
          />
        </div>
        
        <!-- Country Flag -->
        <img 
          v-if="flagUrl" 
          :src="flagUrl" 
          alt="Country Flag"
          class="absolute top-4 right-4 w-6 h-4 rounded border border-slate-600"
        />
        
        <!-- Name -->
        <h2 class="text-lg font-semibold text-white mb-2">
          {{ name || "Anonymous" }}
        </h2>
        
      </div>
    </div>

    <!-- Stats Cards Grid -->
    <div class="px-4 mb-4">
      <div class="grid grid-cols-2 gap-3">
        <!-- Followers Card -->
        <div class="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-750 transition-colors">
          <div class="text-center">
            <div class="text-xl font-semibold text-blue-400 mb-1">{{ followers || 0 }}</div>
            <div class="text-xs text-slate-400 uppercase">Followers</div>
          </div>
        </div>
        
        <!-- Following Card -->
        <div class="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-750 transition-colors">
          <div class="text-center">
            <div class="text-xl font-semibold text-blue-400 mb-1">{{ following || 0 }}</div>
            <div class="text-xs text-slate-400 uppercase">Following</div>
          </div>
        </div>
        
        <!-- Repos Card -->
        <div class="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-750 transition-colors">
          <div class="text-center">
            <div class="text-xl font-semibold text-blue-400 mb-1">{{ publicRepos || 0 }}</div>
            <div class="text-xs text-slate-400 uppercase">Repositories</div>
          </div>
        </div>
        
        <!-- Years Card -->
        <div class="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-750 transition-colors">
          <div class="text-center">
            <div class="text-xl font-semibold text-blue-400 mb-1">{{ membershipYears }}</div>
            <div class="text-xs text-slate-400 uppercase">Years</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Membership Card -->
    <div class="mx-4 mb-4">
      <div class="bg-blue-900 border border-blue-800 rounded-lg p-5">
        <div class="text-center">
          <div class="text-sm text-blue-300 font-medium mb-2">GitHub Member</div>
          <div class="text-white text-lg font-semibold">Since {{ joinYear }}</div>
          <div class="text-blue-200 text-sm mt-1">{{ membershipYears }} years of coding</div>
        </div>
      </div>
    </div>


  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'Sidebar',
  computed: {
    ...mapState(['userProfile']),
    avatarUrl() {
      return this.userProfile?.avatar_url || '/placeholder.svg?height=96&width=96';
    },
    name() {
      return this.userProfile?.name || this.userProfile?.login || '';
    },
    followers() {
      return this.userProfile?.followers || 0;
    },
    following() {
      return this.userProfile?.following || 0;
    },
    publicRepos() {
      return this.userProfile?.public_repos || 0;
    },
    membershipYears() {
      if (!this.userProfile?.created_at) return 0;
      const joinDate = moment(this.userProfile.created_at);
      const currentDate = moment();
      return currentDate.diff(joinDate, 'years');
    },
    joinYear() {
      if (!this.userProfile?.created_at) return '';
      return moment(this.userProfile.created_at).format('YYYY');
    },
    flagUrl() {
      return this.userProfile?.flagUrl || '';
    },
    lastUpdated() {
      return moment().format('MMM DD, HH:mm');
    },
  },
  methods: {
    ...mapActions(['fetchUserProfile']),
  },
  watch: {
    $store: {
      handler(newStore) {
        if (newStore.sidebarUser) {
          this.fetchUserProfile(newStore.sidebarUser);
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.$store.state.sidebarUser) {
      this.fetchUserProfile(this.$store.state.sidebarUser);
    }
  },
};
</script>

