<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col md="6">
          <v-card>
            <v-card-title>登入通行证</v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="LoginData.Data.Pass"
                  outlined persistent-hint
                  label="通行证"
                  hint="用户名 / 邮箱 / QQ"
                  prepend-inner-icon="mdi-card-account-details"
              ></v-text-field>
              <v-text-field
                  v-model="LoginData.Data.Password"
                  outlined hide-details
                  type="password"
                  label="密码"
                  prepend-inner-icon="mdi-lock"
              ></v-text-field>
              <v-btn
                  @click="Login"
                  :disabled="LoginData.Disabled"
                  :loading="LoginData.Disabled"
                  block
                  class="mt-4"
                  color="primary">
                <v-icon>mdi-login</v-icon>
                <span class="ml-2">登入</span>
              </v-btn>
              <div class="mt-4">
                <v-btn text to="/Account/Register">注册通行证</v-btn>
                <v-btn text class="float-right" to="/Account/ResetPassword">重置密码</v-btn>
              </div>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-title>第三方登入</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item-group>
                  <v-row dense>
                    <v-col md="6">
                      <v-list-item :href="'https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=' + $store.state.Config.AppUrl + 'Auth/Login/Steam&openid.realm=' + $store.state.Config.AppUrl + 'Auth/Login/Steam&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select'">
                        <v-list-item-avatar>
                          <v-icon>mdi-steam</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>Steam</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Login",

  data: () => ({
    LoginData: {
      Disabled: false,
      Data: {
        Pass: null,
        Password: null
      }
    }
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo !== null) {
      this.$router.push("/Account/PassCenter");
      this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: "已登入通行证"})
    }
  },

  methods: {
    /* 登入 */
    Login() {
      this.LoginData.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Account/Login", this.LoginData.Data)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 500) {
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1000) {
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
              this.$cookies.remove("Token", "/", "tpcraft.cn")
              this.$cookies.set("Token", Response.data.Data.Token, "7d", "/", "tpcraft.cn")
              if (this.$route.query.Href === null || this.$route.query.Href === "") {
                setTimeout(() => ("/Account/PassCenter"), 3000)
              } else {
                setTimeout(() => (window.location.href = this.$route.query.Href), 3000)
              }
            }
            if (Response.data.Code === 1003) {
              this.LoginData.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
          })
    }
  }
}
</script>