<template>
  <div class="app">
    <el-container>
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
          <img src="@/assets/sun.jpg"
               height="60"
               width="225" />
        </div>
        <div>
          <el-menu
        :default-active="activeIndex"
        router
    >
      <NavMenu :navMenus="menuData"></NavMenu>
    </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header class="app-header">
          <div>
            データ利活用基盤
          </div>
          <div class="app-header-userinfo">
            <el-dropdown trigger="hover"
                         :hide-on-click="false">
              <span class="el-dropdown-link">
                {{ username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>マイページ</el-dropdown-item>
                <el-dropdown-item>設定</el-dropdown-item>
                <el-dropdown-item divided
                                  @click.native="logout">ログアウト</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <router-view/>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Router from 'vue-router'
import NavMenu from "./components/NavMenu/NavMenu.vue";
export default {
  name: 'Container',
  components: {
    NavMenu: NavMenu
  },
  data() {
    return {
      username: '',
      isCollapse: false,
      activeIndex: '',
      menuData: [
        {
          //一级
          entity: {
            name: "weather",
            icon: "el-icon-menu",
            alias: "天気"
          },
         childs: [
            {
              entity: {
                name: "/",
                alias: "一覧",
              }
            },
            {
              entity:{
                name: "/graph",
                alias: "グラフ",
              }
            }
         ]
        }
      ]
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse
    },
    logout: function () {
      this.$confirm('終了を確認しますか？', 'プロンプト', {})
        .then(() => {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        })
        .catch(() => { });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted: function () {
    let user = sessionStorage.getItem('user');
    if (user) {
      this.username = user;
    }
  },
}
</script>

<style>
.app-header{
  background:#20a0ff
}
</style>