<template>
  <v-app>
    <!-- 头部 -->
    <v-app-bar app absolute>
      <a href="/">
        <v-img max-width="128px" src="https://cdn.tpcraft.cn/Images/Tpcraft/Logo/Logo-FontBlack.png" />
      </a>
      <v-spacer></v-spacer>
      <!-- 电脑端 -->
      <div class="d-none d-md-flex">
        <v-btn text to="/">
          <v-icon>mdi-home</v-icon>
          <span class="ml-2">首页</span>
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-server</v-icon>
              <span class="ml-2">服务器</span>
            </v-btn>
          </template>

        </v-menu>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-cash-multiple</v-icon>
              <span class="ml-2">先锋币</span>
            </v-btn>
          </template>

        </v-menu>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-text-box</v-icon>
              <span class="ml-2">文档</span>
            </v-btn>
          </template>

        </v-menu>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-account-box-multiple</v-icon>
              <span class="ml-2">互联</span>
            </v-btn>
          </template>

        </v-menu>
        <v-menu v-if="$store.state.PsssInfo === null">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-card-account-details</v-icon>
              <span class="ml-2">通行证</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group>
              <v-list-item to="/Account/Login">
                <v-list-item-icon>
                  <v-icon>mdi-login</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>登入</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/Account/ResetPassword">
                <v-list-item-icon>
                  <v-icon>mdi-lock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>重置密码</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/Account/Register">
                <v-list-item-icon>
                  <v-icon>mdi-account-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>注册</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-menu v-if="$store.state.PsssInfo !== null">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-avatar size="28">
                <v-img :src="$store.state.PsssInfo.AvatarUrl" />
              </v-avatar>
              <span class="ml-2">{{ $store.state.PsssInfo.Username }}</span>
            </v-btn>
          </template>
          <v-card>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="$store.state.PsssInfo.AvatarUrl" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>#{{ $store.state.PsssInfo.Uid }} {{ $store.state.PsssInfo.Username }}</v-list-item-title>
                <v-list-item-subtitle>{{ $store.state.PsssInfo.Email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>等级 Lv.{{ $store.state.PsssInfo.Level.Level }}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-progress-linear :value="($store.state.PsssInfo.Level.Exp / $store.state.PsssInfo.Level.NextLevelExp) * 100" height="20">
                    {{ $store.state.PsssInfo.Level.Exp }} / {{ $store.state.PsssInfo.Level.NextLevelExp }}
                  </v-progress-linear>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list>
              <v-list-item-group>
                <v-list-item to="/Account/PassCenter">
                  <v-list-item-icon>
                    <v-icon>mdi-card-account-details</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>通行证中心</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/Account/ChangePassword">
                  <v-list-item-icon>
                    <v-icon>mdi-lock</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>修改密码</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/Account/LoginOut">
                  <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>登出</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <!-- 移动端 -->
      <div class="d-xs-flex d-md-none">
        <v-btn text @click.stop="Drawer = !Drawer">
          <v-icon>mdi-menu</v-icon>
          <span class="font-weight-medium ml-1">菜单</span>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer absolute app temporary v-model="Drawer">
      <v-subheader>通行证</v-subheader>
      <div v-if="$store.state.PsssInfo === null">
        <v-list>
          <v-list-item-group>
            <v-list-item to="/Account/Login">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>登入</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/Account/ResetPassword">
              <v-list-item-icon>
                <v-icon>mdi-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>重置密码</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/Account/Register">
              <v-list-item-icon>
                <v-icon>mdi-account-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>注册</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
      <div v-if="$store.state.PsssInfo !== null">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="$store.state.PsssInfo.AvatarUrl" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>#{{ $store.state.PsssInfo.Uid }} {{ $store.state.PsssInfo.Username }}</v-list-item-title>
            <v-list-item-subtitle>{{ $store.state.PsssInfo.Email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>等级 Lv.{{ $store.state.PsssInfo.Level.Level }}</v-list-item-title>
            <v-list-item-subtitle>
              <v-progress-linear :value="($store.state.PsssInfo.Level.Exp / $store.state.PsssInfo.Level.NextLevelExp) * 100" height="20">
                {{ $store.state.PsssInfo.Level.Exp }} / {{ $store.state.PsssInfo.Level.NextLevelExp }}
              </v-progress-linear>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list>
          <v-list-item-group>
            <v-list-item to="/Account/PassCenter">
              <v-list-item-icon>
                <v-icon>mdi-card-account-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>通行证中心</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/Account/ChangePassword">
              <v-list-item-icon>
                <v-icon>mdi-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>修改密码</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/Account/LoginOut">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>登出</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-avatar>
              <v-icon>mdi-home</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>首页</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- 页面 -->
    <v-main style="background-color: #E9E9E9">
      <router-view v-on:Snackbar_Update="Snackbar_Update"/>
    </v-main>
    <!-- 底部 -->
    <v-footer padless>
      <v-card class="text-center flex" flat>
        <v-card-text>
          <span>Copyright © {{new Date().getFullYear()}} <a href="https://www.tpcraft.cn/" target="_blank" class="text-decoration-none">TPCraft 时代先锋</a></span>
          <br/>
          <a href="https://beian.miit.gov.cn/" target="_blank" class="text-decoration-none">沪ICP备20021948号</a>
        </v-card-text>
      </v-card>
    </v-footer>
    <!-- 提示框 -->
    <v-snackbar :color="Snackbar.Color" v-model="Snackbar.Status" timeout="3000" top>
      <v-icon>mdi-alert-octagon</v-icon><span class="ml-2">{{Snackbar.Text}}</span>
    </v-snackbar>
  </v-app>
</template>

<script>
import Axios from "axios";

export default {
  name: 'App',

  data: () => ({
    Drawer: false,
    Snackbar: {
      Status: false,
      Color: null,
      Text: null
    }
  }),

  created() {
    /* Axios设置 */
    Axios.defaults.headers.post['Authorization'] = this.$cookies.get("Token")
    Axios.defaults.headers.get['Authorization'] = this.$cookies.get("Token")
    /* 获取通行证信息 */
    setInterval(this.PassInfo, 1000)
  },

  methods: {
    /* 获取通行证信息 */
    PassInfo() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Account/GetPassInfo", {Mode: "Token"})
          .then(Response => (
              this.$store.commit("Update_PassInfo", Response.data.Data)
          ))
    },
    /* 提示框 */
    Snackbar_Update(Data) {
      this.Snackbar = Data
    }
  }
};
</script>
