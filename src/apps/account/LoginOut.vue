<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col md="6">
          <v-card>
            <v-card-title>登出通行证</v-card-title>
            <v-card-text>请稍后......</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "LoginOut",

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push("/Account/Login")
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* 登出 */
    this.LoginOut()
  },

  methods: {
    /* 登出 */
    LoginOut() {
      Axios
          .get(this.$store.state.Config.ApiUrl + "Tpcraft/Account/LoginOut")
          .then(Response => (
              this.CallBack_LoginOut(Response.data)
          ))
    },
    /* 登出回调 */
    CallBack_LoginOut(Data) {
      /* 检查响应数据 */
      if (Data.Code === 1002) {
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
        setTimeout(() => (window.location.href = "/Account/Login"), 3000)
      }
    }
  }
}
</script>