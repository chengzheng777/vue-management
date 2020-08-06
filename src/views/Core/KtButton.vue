<template>
  <el-button :size="size" :type="type" 
    :loading="loading" :disabled="!hasPerms(perms)" @click="handleClick">
    {{label}}
  </el-button>
</template>

<script>
import { hasPermission } from '@/permission/index'
export default {
  name: 'KtButton',
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    size: {
      type: String,
      default: 'mini'
    },
    type: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    perms: {
      type: String,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick: function () {
       this.$emit('click', {})
    }, 
    hasPerms: function (perms) {
       return hasPermission(perms) & !this.disabled
        // return 1
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>