<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>支付订单</v-card-title>
        <v-card-text v-if="Code === null">
          <v-alert type="info">{{ Text }}</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 200 && Data.Status === '0'">
          <v-row justify="center">
            <v-col md="5">
              <v-card>
                <v-card-title>#{{ Data.Id }}</v-card-title>
                <v-card-subtitle>{{ Data.Remark }}</v-card-subtitle>
                <v-card-text class="text-center">
                  <h1 class="error--text">￥ {{ Data.Amount / 100 }}</h1>
                  <h2 class="mt-4">请使用 <span :class="Data.Type === '0' ? 'success--text' : 'primary--text'">{{ Data.Type === "0" ? "微信" : "支付宝" }}</span> 扫码支付</h2>
                  <p>请在 <span class="info--text">{{ ExpiredDate }}</span> 内完成支付</p>
                  <div v-qr="QrCode"></div>
                  <p>{{ Data.OrderId }}</p>
                  <v-btn
                      @click="Cancel"
                      :loading="Disabled"
                      :disabled="Disabled"
                      color="error">
                    <v-icon>mdi-close-thick</v-icon>
                    <span class="font-weight-medium ml-1">关闭订单</span>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-if="Code === 200 && Data.Status === '1'">
          <v-alert type="success">订单已完成</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 200 && Data.Status === '2'">
          <v-alert type="error">订单已关闭</v-alert>
        </v-card-text>
        <v-card-text v-if="Code === 200 && Data.Status === '3'">
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
    Disabled: false,
    Data: null,
    QrCode: {
      text: "",
      render: "canvas",
      width: 256,
      height: 256,
      typeNumber: -1,
      correctLevel: 2,
      background: "#ffffff",
      foreground: "#000000"
    },
    Timer: null
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push({path: "/Account/Login", query: {Href: window.location.href}})
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* 订单信息 */
    this.Timer = setInterval(this.OrderInfo, 1000)
  },

  destroyed() {
    window.clearInterval(this.Timer)
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
        this.Data = Data.Data
        this.QrCode.text = Data.Data.QrCode
        this.Code = Data.Code
        this.Text = Data.Message
        if (Data.Data.Status !== '0') {
          setTimeout(() => (window.close()), 3000)
        }
      }
      if (Data.Code === 2005) {
        this.Code = Data.Code
        this.Text = Data.Message
      }
    },
    /* 关闭订单 */
    Cancel() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Pay/Cancel", {Id: this.$route.query.Id})
          .then(Response => (
              this.CallBack_Cancel(Response.data)
          ))
    },
    /* 关闭订单回调 */
    CallBack_Cancel(Data) {
      if (Data.Code === 2003) {
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
      if (Data.Code === 2005) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
      if (Data.Code === 2006) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
    }
  },

  computed: {
    ExpiredDate() {
      const ExpiredDate = (new Date(this.Data.ExpiredDate) - new Date()) / 1000
      let Result = parseInt(ExpiredDate)
      let H = Math.floor(Result / 3600) < 10 ? '0' + Math.floor(Result / 3600) : Math.floor(Result / 3600)
      let M = Math.floor((Result / 60 % 60)) < 10 ? '0' + Math.floor((Result / 60 % 60)) : Math.floor((Result / 60 % 60))
      let S = Math.floor((Result % 60)) < 10 ? '0' + Math.floor((Result % 60)) : Math.floor((Result % 60))
      Result = `${H}时${M}分${S}秒`
      return Result
    }
  }
}
</script>