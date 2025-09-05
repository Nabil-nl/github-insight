<template>
  <aside
    class="Rectangle1 w-[300px] h-[730px] left-[2px] top-[6px]  bg-opacity-99 rounded-[10px] border-2 border-[#14213d] fixed">
    <div>
      <img id="1" class="nabil w-[187px] h-44 left-[50px] top-[40px] absolute rounded-full" :src="avatarUrl"
        alt="User Avatar" />
      <div id="2"
        class="Nab w-[171px] h-[31px] left-[60px] top-[250px] absolute text-[#000000] text-[27px] font-normal">
        {{ name || "Not provided" }}
      </div>
      <img id="17" class="Morocco1 w-[50px] h-[35px] left-[230px] top-[20px] absolute" :src="flagUrl" alt="Country Flag"
        v-if="flagUrl" />
      <div
        class="Rectangle2 w-[280px] h-[180px] left-[6px] top-[340px] absolute  rounded-[9px] border-2 border-[#14213d] animate-border">
      </div>
    </div>
    <div class="Group2 w-[245px] h-[150px] left-[77px] top-[360px] absolute">
      <div class="PublicRepos w-[220px] h-[50px] left-0 top-[100px] absolute text-[#000000] text-[20px] font-normal">
        <span>Public Repos: <span>{{ publicRepos || "Not provided" }}</span></span>
      </div>
      <div class="Following w-[220px] h-[50px] left-0 top-[50px] absolute text-[#000000] text-[20px] font-normal">
        <span>Following: <span>{{ following || "Not provided" }}</span></span>
      </div>
      <div class="Followers w-[220px] h-[50px] left-0 top-0 absolute text-[#000000] text-[20px] font-normal">
        <span>Followers: <span>{{ followers || "Not provided" }}</span></span>
      </div>
    </div>
    <div
      class="MembershipYears w-[280px] h-[50px] border-2 border-[#14213d] left-[6px] top-[450px] absolute rounded-[9px] text-[#000000] text-[20px] font-normal flex items-center justify-center">
      <span>Membership: <span id="1000">{{ membershipYears }}</span> Years</span>
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
      return this.userProfile?.avatar_url || '';
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
    flagUrl() {
      return this.userProfile?.flagUrl || '';
    },
  },
  methods: {
    ...mapActions(['fetchUserProfile']),
  },
  watch: {
    // Watch for changes in sidebarUser to fetch new profile
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
    // Fetch profile on load
    if (this.$store.state.sidebarUser) {
      this.fetchUserProfile(this.$store.state.sidebarUser);
    }
  },
};
</script>

<style scoped>
</style>
