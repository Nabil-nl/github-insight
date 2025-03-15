// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';


function getLanguageColor(lang) {
  const colors = {
    Assembly: '#6E4C13',
    C: '#555555',
    'C#': '#178600',
    'C++': '#00599C',
    CSS: '#2965F1',
    Dart: '#00B4AB',
    SCSS: '#ff3f62',
    Blade: '#ff5733',
    Dockerfile: '#384d54',
    Elixir: '#6e4a7e',
    Elm: '#60B5CC',
    Erlang: '#B83998',
    Fortran: '#4d41b1',
    Go: '#00ADD8',
    Groovy: '#e69f56',
    Haskell: '#5e5086',
    HTML: '#E44D26',
    Java: '#b07219',
    JavaScript: '#f1e05a',
    Julia: '#a270ba',
    Kotlin: '#F18E33',
    Lua: '#000080',
    MATLAB: '#e16737',
    'Objective-C': '#438eff',
    OCaml: '#3be133',
    Perl: '#0298c3',
    PHP: '#4F5D95',
    PowerShell: '#012456',
    Python: '#3572A5',
    R: '#198CE7',
    Ruby: '#701516',
    Rust: '#000000',
    Scala: '#c22d40',
    Shell: '#89e051',
    SQL: '#e38c00',
    Swift: '#F05138',
    TypeScript: '#2B7488',
    VBA: '#867db1',
    Vue: '#42b883',
    'Vue.js': '#42b883',
    YAML: '#cb171e',
    Ada: '#02f88c',
    ApacheConf: '#d12127',
    Bash: '#4EAA25',
    Batchfile: '#C1F12E',
    Clojure: '#db5855',
    CoffeeScript: '#244776',
    ColdFusion: '#ed2cd6',
    D: '#ba595e',
    Delphi: '#b0ce4e',
    Dylan: '#6c616e',
    EmacsLisp: '#c065db',
    Falcon: '#4bc0c0',
    FreeMarker: '#0050b2',
    GLSL: '#5686a5',
    Haxe: '#df7900',
    IDL: '#a3522f',
    Io: '#a9188d',
    J: '#9EEDFF',
    LabVIEW: '#fede06',
    Lasso: '#999999',
    Lex: '#DBCA00',
    LiveScript: '#499886',
    Logos: '#00ACD7',
    Logtalk: '#295b9a',
    Makefile: '#427819',
    Mercury: '#ff2b2b',
    Nim: '#37775b',
    Nix: '#7e7eff',
    Nu: '#c9df40',
    Pascal: '#E3F171',
    PDL: '#ce2229',
    Pike: '#005390',
    PogoScript: '#d80074',
    Processing: '#0096D8',
    Prolog: '#74283c',
    PureBasic: '#5a6986',
    Racket: '#3c5caa',
    Reason: '#ff5847',
    Ring: '#2D54CB',
    Sass: '#a53b70',
    Smalltalk: '#596706',
    Solidity: '#AA6746',
    Tcl: '#e4cc98',
    VHDL: '#adb2cb',
    VimL: '#199f4b',
    XProc: '#0096d6',
    Xtend: '#24255d',
    Zephir: '#118f9e',
    Hack: '#637081'
  };
  return colors[lang] || '#87bcde'; // Default color for unknown languages
}

export default createStore({
  state: {
    repositories: [],
    users: [],
    userProfile: null,
    languageData: {},// For chart data
    sidebarUser: 'Nabil-nl', 
  },
  mutations: {
    setRepositories(state, repositories ,username) {
      state.repositories = repositories;
      state.sidebarUser = username;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setUserProfile(state, profile) {
      state.userProfile = profile;
    },
    setLanguageData(state, languageData) {
      state.languageData = languageData;
    },
  },
  actions: {
    async fetchRepositories({ commit }, username) {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
 
        const repositories = response.data;

        // Aggregate language data for chart
        const languageData = {};
        const repositoryData = await Promise.all(
          repositories.map(async (repo) => {
            // const languagesResponse = await axios.get(repo.languages_url);
             const languagesResponse = await axios.get(repo.languages_url, {
          headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
            const languages = languagesResponse.data;

            // Update language data
            for (const lang in languages) {
              languageData[lang] = (languageData[lang] || 0) + languages[lang];
            }

            // Prepare repository data with language colors
            const colors = {};
            for (const lang in languages) {
              colors[lang] = getLanguageColor(lang);
            }

            return {
              name: repo.name,
              description: repo.description || 'No description available.',
              languages: colors,
            };
          })
        );

        // Prepare chart data
        const sortedLanguages = Object.entries(languageData)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10); // Top 10 languages

        const chartData = {
          labels: sortedLanguages.map(([lang]) => lang),
          datasets: [
            {
              label: 'Language Usage',
              data: sortedLanguages.map(([, count]) => count),
              backgroundColor: sortedLanguages.map(([lang]) => getLanguageColor(lang)),
              borderColor: '#000',
              borderWidth: 1,
            },
          ],
        };

        commit('setLanguageData', chartData);
        commit('setRepositories', repositoryData.slice(0, 6)); // Limit to first 6 repositories
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    },
    async searchUsers({ commit }, query) {
      try {
        const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
 
        commit('setUsers', response.data.items);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    },
    async fetchUserProfile({ commit }, username) {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
    
        commit('setUserProfile', response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    async updateSidebarUser({ commit }, username) {
      try {
        commit('setSidebarUser', username);
      } catch (error) {
        console.error('Error updating sidebar user:', error);
      }
    },
  },
  getters: {
    repositories: (state) => state.repositories,
    users: (state) => state.users,
    userProfile: (state) => state.userProfile,
    languageData: (state) => state.languageData,
    sidebarUser: (state) => state.sidebarUser,
  },
});
