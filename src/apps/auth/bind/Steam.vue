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
            <v-card-text v-if="Code === 1015">
              <v-alert type="success">{{ Text }}</v-alert>
            </v-card-text>
            <v-card-text v-if="Code === 1016 || Code === 1028">
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
      this.$router.push("/Account/Login")
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
          .then(Response => (
              this.CallBack_Bind(Response.data)
          ))
    },
    /* 绑定回调 */
    CallBack_Bind(Data) {
      /* 检查响应数据 */
      if (Data.Code === 400) {
        this.Code = Data.Code
        this.Text = Data.Message
      }
      if (Data.Code === 500) {
        this.Code = Data.Code
        this.Text = Data.Message
      }
      if (Data.Code === 1015) {
        this.Code = Data.Code
        this.Text = Data.Message
        setTimeout(() => (close()), 3000)
      }
      if (Data.Code === 1016|| Data.Code === 1028) {
        this.Code = Data.Code
        this.Text = Data.Message
      }
    },
  }
}
</script>