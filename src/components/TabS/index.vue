<template>
    <el-tabs
        v-model="editableTabsValue"
        type="card"
        editable
        @tab-click="selectedTabHandle"
        @tab-remove="removeTabHandle">
        <el-tab-pane
            v-for="item in mainTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name">
            {{ item.title }}
        </el-tab-pane>
    </el-tabs>                   
</template>

<script>
  export default {
    data() {
        return {
        }
    },
    computed: {
        mainTabs: {
        get () { return this.$store.state.tab.mainTabs },
        set (val) { this.$store.commit('updateMainTabs', val) }
        },
        mainTabsActiveName: {
        get () { return this.$store.state.tab.mainTabsActiveName },
        set (val) { this.$store.commit('updateMainTabsActiveName', val) }
        }
    },
    methods: {
        // tabs,选中tab
        selectedTabHandle(tab) {
            tab = this.mainTabs.filter(item => item.name === tab.name)
            if(tab.length >= -1) {
                this.$router.push({ name: tab[0].name })
            }
        },
        // tabs，删除tab
        removeTabHandle(tabName) {
            this.mainTabs = this.mainTabs.filter(item => item.name !== tabName);
            // 当 tab 有一个及以上标签
            if(this.mainTabs.length >= 1) {
                // 当前选中的tab被删除，并且指向上一个tab
                this.$router.push({ name: this.mainTabs[this.mainTabs.length - 1].name }, () => {
                    this.mainTabsActiveName = this.$route.name
                })
            } else {
                this.$router.push("/")
            }
        }
    }
  }
  
</script>
