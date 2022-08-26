<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col md="6">
          <v-card>
            <v-card-title>Steam 绑定</v-card-title>
            <v-card-text v-if="Code === null">
              <v-alert type="info">{{ Text }}</v-alert>
              <v-progress-linear indeterminate></v-progress-linear>
            </v-card-text>
            <v-card-text v-if="Code === 400 || Code === 500">
              <v-alert type="error">{{ Text }}</v-alert>
            </v-card-text>
            <v-card-text v-if="Code === 1214">
              <v-alert type="success">{{ Text }}</v-alert>
            </v-card-text>
            <v-card-text v-if="Code === 1001 || Code === 1216 || Code === 1215 || Code === 1217">
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
    Text: "正在绑定，请稍后......"
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push({path: "/Account/Login", query: {Href: window.location.href}})
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* 登入 */
    this.Bind()
  },

  methods: {
    /* 绑定 */
    Bind() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Auth/Bind/Steam", this.$route.query)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 400) {
              this.Code = Response.data.Code
              this.Text = Response.data.Message
            }
            if (Response.data.Code === 500) {
              this.Code = Response.data.Code
              this.Text = Response.data.Message
            }
            if (Response.data.Code === 1214) {
              this.Code = Response.data.Code
              this.Text = Response.data.Message
              setTimeout(() => (close()), 3000)
            }
            if (Response.data.Code === 1001 || Response.data.Code === 1216 || Response.data.Code === 1215 || Response.data.Code === 1217) {
              this.Code = Response.data.Code
              this.Text = Response.data.Message
            }
          })
    }
  }
}
</script>