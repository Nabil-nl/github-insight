<template>
  <div>
    <!-- Search Form -->
    <form @submit.prevent="performSearch" class="fixed   left-[660px] top-[3.5rem] mr-4 mt-4 w-[500px]">
      <div class="relative">
        <input
          type="search"
          v-model="query"
          id="default-search"
          class="block w-full placeholder-[#48525d] p-4 ps-10 text-[1rem] bg-[#161b22] text-white  rounded-lg border-2 border-[#30363d]"
          placeholder="Search ..."
          required
        />
      </div>
    </form>

    <!-- User List -->
    <div id="all" v-if="showUserList" class="container fixed left-[660px] top-[8rem] mr-4 mt-4 w-[500px] rounded-lg border-2 bg-[#161b22] border-[#161b22]">
      <div id="searchResults" class="w-[490px] text-white">
        <div v-if="searchPerformed">
          <div v-if="users.length" class="p-4">
            <h2 class="text-lg font-bold mb-4">GitHub Users</h2>
            <ul>
              <li v-for="user in users" :key="user.id" class="mb-2">
                <a href="#" @click.prevent="fetchUserRepos(user.login)" class="hover:text-[#00a8e8] text-white">{{ user.login }}</a>
              </li>
            </ul>
          </div>
          <!-- Display loading message while searching -->
          <div v-else-if="loading" class="p-4 text-[#00a8e8]">Wait..</div>
          <!-- Display message if no users are found after search completes -->
          <div v-else class="p-4 text-[#ff3333]">
            I don't find the users
          </div>
        </div>
      </div>
    </div>

    <!-- Show repositories card after fetching -->
    <Card v-if="!showUserList && currentCard === 'repositories'" :repositories="repositories" />

    <!-- Show Profile Card with user flag and name -->
    <Card2 v-if="!showUserList && currentCard === 'userStats'" :userName="selectedUser" />

    <!-- Button to show more content -->
    <div v-if="!showUserList && currentCard === 'repositories' && repositories.length" class="fixed bottom-4 right-4 z-50 flex justify-center">
      <button id="add" @click="showMoreRepositories" class="px-4 py-2 bg-[#e5e5e5] text-black  rounded-lg border-2 border-[#9fa3a6]">
        Show more ..
      </button>
    </div>

    <!-- Button to switch back to repositories -->
    <div v-if="currentCard === 'userStats'" class="fixed bottom-4 right-4 z-50 flex justify-center">
      <button id="add" @click="showLessRepositories" class="px-4 py-2 bg-[#e5e5e5] text-black  rounded-lg border-2 border-[#9fa3a6]">
        Show Repos
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Card from './Card.vue';
import Card2 from './Card2.vue';
import { debounce } from 'lodash';

export default {
  name: 'Search',
  components: { Card, Card2 },
  data() {
    return {
      query: '',
      searchPerformed: false,
      debouncedSearch: null,
      showUserList: true,
      currentCard: null,
      selectedUser: '',
      loading: false,
    };
  },
  computed: {
    ...mapState(['users', 'repositories']),
  },
  methods: {
    ...mapActions(['searchUsers', 'fetchRepositories', 'fetchUserProfile', 'updateSidebarUser']),
    async performSearch() {
      this.searchPerformed = true;
      this.loading = true;
      this.showUserList = true;
      this.currentCard = null;
      
      try {
        await this.debouncedSearch(this.query);
      } finally {
        // Set loading to false after search completes (whether successful or not)
        this.loading = false;
      }
    },
    async fetchUserRepos(username) {
      await this.fetchRepositories(username);
      await this.fetchUserProfile(username);
      this.selectedUser = username;
      this.showUserList = false;
      this.currentCard = 'repositories';
      // Update the sidebar user
      this.updateSidebarUser(username);
    },
    showMoreRepositories() {
      this.currentCard = 'userStats';
    },
    showLessRepositories() {
      this.currentCard = 'repositories';
    },
  },
  created() {
    this.debouncedSearch = debounce(async (query) => {
      await this.searchUsers(query);
    }, 300);
  },
  beforeDestroy() {
    if (this.debouncedSearch) {
      this.debouncedSearch.cancel();
    }
  },
};
</script>

<style scoped>
</style>

