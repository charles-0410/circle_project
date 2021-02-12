<template>
  <Loader v-show="isLoading" />
  <router-view />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import Loader from './components/Loader.vue'

export default defineComponent({
  name: 'App',
  components: {
    Loader,
  },
  setup() {
    const store = useStore()
    const isLoading = computed(() => store.state.isLoading)

    return {
      isLoading,
    }
  },
})
</script>
