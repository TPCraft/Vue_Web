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
        <v-btn text href="https://pan.tpcraft.cn/">
          <v-icon>mdi-nas</v-icon>
          <span class="ml-2">网盘</span>
        </v-btn>
        <v-btn text href="https://mcskin.tpcraft.cn/">
          <v-icon>mdi-palette</v-icon>
          <span class="ml-2">皮肤站</span>
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-account-box-multiple</v-icon>
              <span class="ml-2">互联</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group>
              <v-list-item to="/Auth/Game/Login">
                <v-list-item-avatar>
                  <v-icon>mdi-gamepad-variant</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>游戏登入</v-list-item-title>
              </v-list-item>
              <v-list-item to="/Auth/Oauth/Client">
                <v-list-item-avatar>
                  <v-icon>mdi-account-network</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>OauthClient</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
              <span class="ml-2">其他</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group>
              <v-list-item to="/InDevelopment">
                <v-list-item-avatar>
                  <v-icon>mdi-text-box</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>文档</v-list-item-title>
              </v-list-item>
              <v-list-item to="/InDevelopment">
                <v-list-item-avatar>
                  <v-icon>mdi-server</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>服务器</v-list-item-title>
              </v-list-item>
              <v-list-item to="/Account/BanList">
                <v-list-item-avatar>
                  <v-icon>mdi-cancel</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>封禁列表</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
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
              <v-list-item to="/Account/Register">
                <v-list-item-icon>
                  <v-icon>mdi-account-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>注册</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-subheader>第三方登入</v-subheader>
              <v-list-item :href="'https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=' + $store.state.Config.AppUrl + 'Auth/Login/Steam&openid.realm=' + $store.state.Config.AppUrl + 'Auth/Login/Steam&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select'">
                <v-list-item-icon>
                  <v-icon>mdi-steam</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Steam</v-list-item-title>
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
              <v-list-item-avatar>
                <v-icon>mdi-flash</v-icon>
              </v-list-item-avatar>
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
                <v-list-item to="/Pay/Coin">
                  <v-list-item-icon>
                    <v-icon>mdi-cash-multiple</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>先锋币</v-list-item-title>
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
                    <v-list-item-title>登出通行证</v-list-item-title>
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
    <v-navigation-drawer app temporary v-model="Drawer">
      <v-list>
        <div v-if="$store.state.PsssInfo === null">
          <v-list-item-group>
            <v-list-item to="/Account/Login">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>登入</v-list-item-title>
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
            <v-subheader>第三方登入</v-subheader>
            <v-list-item :href="'https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=' + $store.state.Config.AppUrl + 'Auth/Login/Steam&openid.realm=' + $store.state.Config.AppUrl + 'Auth/Login/Steam&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select'">
              <v-list-item-icon>
                <v-icon>mdi-steam</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Steam</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
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
            <v-list-item-avatar>
              <v-icon>mdi-flash</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>等级 Lv.{{ $store.state.PsssInfo.Level.Level }}</v-list-item-title>
              <v-list-item-subtitle>
                <v-progress-linear :value="($store.state.PsssInfo.Level.Exp / $store.state.PsssInfo.Level.NextLevelExp) * 100" height="20">
                  {{ $store.state.PsssInfo.Level.Exp }} / {{ $store.state.PsssInfo.Level.NextLevelExp }}
                </v-progress-linear>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item-group>
            <v-list-item to="/Account/PassCenter">
              <v-list-item-icon>
                <v-icon>mdi-card-account-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>通行证中心</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/Pay/Coin">
              <v-list-item-icon>
                <v-icon>mdi-cash-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>先锋币</v-list-item-title>
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
                <v-list-item-title>登出通行证</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
        <v-divider class="mt-4 mb-4"></v-divider>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>首页</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item href="https://pan.tpcraft.cn/">
            <v-list-item-icon>
              <v-icon>mdi-nas</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>网盘</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item href="https://mcskin.tpcraft.cn/">
            <v-list-item-icon>
              <v-icon>mdi-palette</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>皮肤站</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group no-action prepend-icon="mdi-account-box-multiple">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>互联</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/Auth/Game/Login">
              <v-list-item-icon>
                <v-icon>mdi-gamepad-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>游戏登入</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/Auth/Oauth/Client">
              <v-list-item-icon>
                <v-icon>mdi-account-network</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>OauthClient</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-group no-action prepend-icon="mdi-dots-horizontal">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>其他</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/InDevelopment">
              <v-list-item-avatar>
                <v-icon>mdi-text-box</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>文档</v-list-item-title>
            </v-list-item>
            <v-list-item to="/InDevelopment">
              <v-list-item-avatar>
                <v-icon>mdi-server</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>服务器</v-list-item-title>
            </v-list-item>
            <v-list-item to="/Account/BanList">
              <v-list-item-avatar>
                <v-icon>mdi-cancel</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>封禁列表</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- 页面 -->
    <v-main
        v-if="$store.state.Loading === true"
        style="background-color: #E9E9E9">
      <router-view v-on:Snackbar_Update="Snackbar_Update"></router-view>
    </v-main>
    <v-main
        v-if="$store.state.Loading === false"
        style="background-color: #E9E9E9">
      <v-overlay>
        <v-progress-circular indeterminate size="64"/>
        <p>Loading...</p>
      </v-overlay>
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
    <v-snackbar :color="Snackbar.Color" v-model="Snackbar.Status" timeout="3000" top right>
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
    this.PassInfo()
    setInterval(this.PassInfo, 3000)
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
