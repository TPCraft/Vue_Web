<template>
  <div>
    <v-container>
      <v-row justify="center" class="mt-10">
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
      this.$router.push("/Account/PassCenter")
      this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: "已登入通行证"})
    }
  },

  methods: {
    /* 登入 */
    Login() {
      this.LoginData.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Account/Login", this.LoginData.Data)
          .then(Response => (
              this.CallBack_Login(Response.data)
          ))
    },
    /* 登入回调 */
    CallBack_Login(Data) {
      /* 检查响应数据 */
      if (Data.Code === 1000) {
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
        this.$cookies.set("Token", Data.Data.Token, "7d", "/")
        this.$cookies.set("Token", Data.Data.Token, "7d", "/", "tpcraft.cn")
        this.$cookies.set("flarum_remember", Data.Data.CommunityToken, "7d", "/", "tpcraft.cn")
        setTimeout(() => (window.location.href = "/Account/PassCenter"), 3000)
      }
      if (Data.Code === 1003) {
        this.LoginData.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
    }
  }
}
</script>