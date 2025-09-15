<template>
  <aside class="w-80 h-screen bg-[#0d1117] border-r border-[#30363d] flex flex-col overflow-y-auto">
    <!-- Header Card -->
    <div class="m-4 bg-[#161b22] rounded-lg border border-[#30363d] p-6">
      <div class="text-center">
        <!-- Avatar -->
        <div class="mx-auto w-20 h-20 mb-4">
          <img 
            :src="avatarUrl" 
            alt="User Avatar"
            class="w-full h-full rounded-full object-cover border-2 border-[#30363d]"
          />
        </div>
        
        <!-- Country Flag -->
        <img 
          v-if="flagUrl" 
          :src="flagUrl" 
          alt="Country Flag"
          class="absolute top-4 right-4 w-6 h-4 rounded border border-[#30363d]"
        />
        
        <!-- Name -->
        <h2 class="text-lg font-semibold text-[#f0f6fc] mb-2">
          {{ name || "Anonymous" }}
        </h2>
        
      </div>
    </div>

    <!-- Stats Cards Grid -->
    <div class="px-4 mb-4">
      <div class="grid grid-cols-2 gap-3">
        <!-- Followers Card -->
        <div class="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:bg-[#21262d] transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-xl font-semibold text-[#56d364] mb-1">{{ followers || 0 }}</div>
            <div class="text-xs text-[#8b949e] uppercase tracking-wide">Followers</div>
          </div>
        </div>
        
        <!-- Following Card -->
        <div class="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:bg-[#21262d] transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-xl font-semibold text-[#56d364] mb-1">{{ following || 0 }}</div>
            <div class="text-xs text-[#8b949e] uppercase tracking-wide">Following</div>
          </div>
        </div>
        
        <!-- Repos Card -->
        <div class="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:bg-[#21262d] transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-xl font-semibold text-[#56d364] mb-1">{{ publicRepos || 0 }}</div>
            <div class="text-xs text-[#8b949e] uppercase tracking-wide">Repositories</div>
          </div>
        </div>
        
        <!-- Years Card -->
        <div class="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:bg-[#21262d] transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-xl font-semibold text-[#56d364] mb-1">{{ membershipYears }}</div>
            <div class="text-xs text-[#8b949e] uppercase tracking-wide">Years</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Membership Card -->
    <div class="mx-4 mb-4">
      <div class="bg-[#161b22] border border-[#30363d] rounded-lg p-5">
        <div class="text-center">
          <div class="text-sm text-white font-mono mb-2">GitHub Member</div>
          <div class="text-[#56d364] text-lg font-mono">Since {{ joinYear }}</div>
          <div class="text-[#8b949e] text-sm font-mono mt-1">{{ membershipYears }} years of coding</div>
        </div>
      </div>
    </div>

  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'GitHubSidebar',
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
