<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>支付订单</v-card-title>
        <v-card-text v-if="Code === null">
          <v-alert type="info">{{ Text }}</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 200 && Status === '0'">
          <v-alert type="info">订单待支付</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 200 && Status === '1'">
          <v-alert type="success">订单已完成</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 200 && Status === '2'">
          <v-alert type="error">订单已取消</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 200 && Status === '3'">
          <v-alert type="warning">订单已超时</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 400 || Code === 400">
          <v-alert type="error">{{ Text }}</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 2005">
          <v-alert type="warning">{{ Text }}</v-alert>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Pay",

  data: () => ({
    Code: null,
    Text: "请稍后......",
    Status: null
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push("/Account/Login")
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* 订单信息 */
    setInterval(this.OrderInfo, 1000)
  },

  methods: {
    /* 订单信息 */
    OrderInfo() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Pay/Info", {Id: this.$route.query.Id})
          .then(Response => (
              this.CallBack_OrderInfo(Response.data)
          ))
    },
    /* 订单信息回调 */
    CallBack_OrderInfo(Data) {
      /* 检查响应数据 */
      if (Data.Code === 400) {
        this.Code = Data.Code
        this.Text = Data.Message
      }
      if (Data.Code === 500) {
        this.Code = Data.Code
        this.Text = Data.Message
      }
      if (Data.Code === 200) {
        this.Status = Data.Data.Status
        this.Code = Data.Code
        this.Text = Data.Message
      }
      if (Data.Code === 2005) {
        this.Code = Data.Code
        this.Text = Data.Message
      }
    }
  }
}
</script>