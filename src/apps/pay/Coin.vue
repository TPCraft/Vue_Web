<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>先锋币充值</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-cash-multiple</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>先锋币</v-list-item-title>
                  <v-list-item-subtitle>{{ $store.state.PsssInfo.Coin }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-cash-refund</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>兑换率</v-list-item-title>
                  <v-list-item-subtitle>1CNY = 100先锋币</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                  outlined persistent-hint
                  v-model="Amount"
                  label="充值数额"
                  type="num"
                  prepend-inner-icon="mdi-cash-multiple"
                  hint="最小数额为1，最大数额为100000"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                  outlined persistent-hint readonly
                  :value="LevelAmount"
                  label="等级激励"
                  type="num"
                  prepend-inner-icon="mdi-cash-multiple"
                  hint="四舍五入(充值数额 * 等级 * 2%)"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                  @click="WeChatPay"
                  :disabled="Disabled"
                  :loading="Disabled"
                  block
                  color="success">
                <v-icon>mdi-shopping</v-icon>
                <span class="ml-2">微信</span>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                  disabled="disabled"
                  block
                  color="primary">
                <v-icon>mdi-shopping</v-icon>
                <span class="ml-2">支付宝 (未开放)</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title>先锋币订单</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" v-if="Data === null">
              <v-alert type="info">暂无订单</v-alert>
            </v-col>
            <v-expansion-panels>
              <v-col cols="12" md="6" v-for="(Data, I) in Data" :key="I">
                <v-expansion-panel>
                  <v-expansion-panel-header disable-icon-rotate>
                    #{{ Data.Id }} - {{ Data.Remark }}
                    <template v-slot:actions>
                      <v-chip
                          :color="Data.Status === '0' ? 'info' : (Data.Status === '1' ? 'success' : (Data.Status === '2' ? 'error' : 'warning'))"
                          label
                          text-color="white">
                        <v-icon left color="white">
                          {{ Data.Status === "0" ? "mdi-shopping" : (Data.Status === "1" ? "mdi-check" : (Data.Status === "2" ? "mdi-close" : "mdi-timer")) }}
                        </v-icon>
                        {{ Data.Status === "0" ? "待支付" : (Data.Status === "1" ? "已完成" : (Data.Status === "2" ? "已关闭" : "已超时")) }}
                      </v-chip>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-btn color="info" @click="PayWindow(Data.Id)" v-if="Data.Status === '0'">
                      <v-icon>mdi-shopping</v-icon>
                      <v-span class="ml-2">支付</v-span>
                    </v-btn>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-currency-cny</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>金额</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Amount / 100 }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-cash-multiple</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>等级激励</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.LevelAmount === null ? "无" : Data.LevelAmount }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-store</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>支付方式</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Type === "0" ? "微信" : "支付宝" }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-barcode</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>订单号</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.OrderId }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-barcode</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>商户号</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.MerchantId }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-timer</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>创建时间</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.CreateDate }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-timer</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>超时时间</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.ExpiredDate }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-col>
            </v-expansion-panels>
          </v-row>
          <v-pagination v-model="Page" :length="PageTotal"></v-pagination>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Coin",

  data: () => ({
    Amount: null,
    Disabled: false,
    Data: null,
    Page: 1,
    PageTotal: 1
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push("/Account/Login")
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* 订单列表 */
    setInterval(this.OrderList, 1000)
  },

  methods: {
    /* 订单列表 */
    OrderList() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Pay/List", {Page: this.Page})
          .then(Response => (
              this.CallBack_OrderList(Response.data)
          ))
    },
    /* 订单列表回调 */
    CallBack_OrderList(Data) {
      if (Data.Data !== null) {
        this.PageTotal = Math.ceil(Data.Data[0].Total / 10)
      }
      this.Data = Data.Data
    },
    /* 支付窗口 */
    PayWindow(Id) {
      var PayPage
      if (navigator.userAgent.match(/(Mobile|Android|Tablet)/)) {
        PayPage = window.open(this.$store.state.Config.AppUrl + "Pay/PayOrder?Id=" + Id)
        PayPage.open()
      } else {
        var Top = (window.screen.availHeight - 30 - 800) / 2
        var Left = (window.screen.availWidth - 10 - 1000) / 2
        PayPage = window.open(this.$store.state.Config.AppUrl + "Pay/PayOrder?Id=" + Id, null, "top=" + Top + ",left=" + Left + ",width=1000,height=800")
        PayPage.open()
      }
    },
    /* 微信支付 */
    WeChatPay() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Pay/WeChatPay", {Amount: this.Amount})
          .then(Response => (
              this.CallBack_WeChat(Response.data)
          ))
    },
    /* 微信支付回调 */
    CallBack_WeChat(Data) {
      /* 检查响应数据 */
      if (Data.Code === 500) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 2000) {
        this.Disabled = false
        this.PayWindow(Data.Data.Id)
      }
      if (Data.Code === 2007 || Data.Code === 2008) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
    }
  },

  computed: {
    LevelAmount() {
      return Math.round(this.Amount * this.$store.state.PsssInfo.Level.Level * 0.02)
    }
  }
}
</script>