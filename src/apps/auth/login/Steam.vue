<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col md="6">
          <v-card>
            <v-card-title>Steam 登入</v-card-title>
            <v-card-subtitle>登入通行证</v-card-subtitle>
            <v-card-text v-if="Code === null">
              <v-alert type="info">{{ Text }}</v-alert>
              <v-progress-linear indeterminate></v-progress-linear>
            </v-card-text>
            <v-card-text v-if="Code === 1000">
              <v-alert type="success">{{ Text }}</v-alert>
            </v-card-text>
            <v-card-text v-if="Code === 1027 || Code === 1020">
              <v-alert type="warning">{{ Text }}</v-alert>
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
  name: "Steam",

  data: () => ({
    Code: null,
    Text: "正在登入，请稍后......"
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo !== null) {
      this.$router.push("/Account/PassCenter")
      this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: "已登入通行证"})
    }
    /* 登入 */
    this.Login()
  },

  methods: {
    /* 登入 */
    Login() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Auth/Login/Steam", this.$route.query)
          .then(Response => (
              this.CallBack_Login(Response.data)
          ))
    },
    /* 登入回调 */
    CallBack_Login(Data) {
      /* 检查响应数据 */
      if (Data.Code === 1000) {
        this.Code = Data.Code
        this.Text = Data.Message
        this.$cookies.remove("Token", "/", "tpcraft.cn")
        this.$cookies.remove("flarum_remember", "/", "tpcraft.cn")
        this.$cookies.set("Token", Data.Data.Token, "7d", "/", "tpcraft.cn")
        this.$cookies.set("flarum_remember", Data.Data.CommunityToken, "7d", "/", "tpcraft.cn")
        setTimeout(() => (window.location.href = "/Account/PassCenter"), 3000)
      } else {
        this.Code = Data.Code
        this.Text = Data.Message
      }
    }
  }
}
</script>