<template>
    <div id="app">
      <Sidebar />
      <Header />
      <Search/>
      <Card/>
      <Card2/>
    </div>
  </template>
  
  <script>
  import Sidebar from './components/Sidebar.vue';
  import Header from './components/Header.vue';
  import Search from './components/Search.vue';
  import Card from './components/Card.vue';
  import Card2 from './components/Card2.vue';
  
  
  export default {
    name: 'App',
    components: {
      Sidebar,
      Header,
      Search,
      Card,
      Card2
    }
  };
  </script>
  
  <style>
  body{
    background-color: #0D1821;
  }
  
  </style>
  