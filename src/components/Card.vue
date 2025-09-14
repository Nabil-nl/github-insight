<template>
  <section class="fixed left-[485px] top-[7rem] mr-4 mt-4 w-full">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-[900px]">
      <div v-for="(repo, index) in repositories" :key="index" class="w-auto h-auto  rounded-lg border-2 border-[#14213d] shadow-lg p-4 flex flex-col">
        <h3 id="add" class="text-lg text-black">{{ repo.name }}</h3>
        <p id="add"  class="text-black">{{ repo.description }}</p>
        <div class="mt-2 flex flex-wrap">
          <span id="add"  v-for="(color, lang) in repo.languages" :key="lang" class="flex items-center mr-2">
            <span  class="inline-block w-4 h-4 rounded-full mr-1" :style="{ backgroundColor: color }" title="Language: {{ lang }}"></span>
            <span class=" text-gray-600">{{ lang }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Card',
  props: {
    repositories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
