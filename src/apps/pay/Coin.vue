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
            <v-col cols="12" md="4">
              <v-btn
                  @click="Dialog = true"
                  block
                  color="info">
                <v-icon>mdi-xml</v-icon>
                <span class="ml-2">兑换码</span>
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
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
            <v-col cols="12" md="4">
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
          <v-alert type="info" v-if="Data === null">暂无数据</v-alert>
          <v-expansion-panels>
            <v-expansion-panel v-for="(Data, I) in Data" :key="I">
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
                <v-card v-if="Data.Status === '0'" class="mb-2">
                  <v-card-subtitle>操作</v-card-subtitle>
                  <v-card-text>
                    <v-btn color="info" @click="PayWindow(Data.Id)">
                      <v-icon>mdi-shopping</v-icon>
                      <v-span class="ml-2">支付</v-span>
                    </v-btn>
                  </v-card-text>
                </v-card>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-currency-cny</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>金额</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Amount / 100 }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-cash-multiple</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>等级激励</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.LevelAmount === null ? "无" : Data.LevelAmount }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-store</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>支付方式</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Type === "0" ? "微信" : "支付宝" }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-barcode</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>订单号</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.OrderId }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-barcode</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>商户号</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.MerchantId }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-timer</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>创建时间</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.CreateDate }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-timer</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>超时时间</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.ExpiredDate }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-timer</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>支付时间</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.PayDate }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-pagination class="mt-4" v-model="Page" :length="PageTotal" total-visible="6"></v-pagination>
        </v-card-text>
      </v-card>
      <v-dialog
          v-model="Dialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>兑换码</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="Code"
                outlined hide-details
                label="兑换码" class="mt-2"
                prepend-inner-icon="mdi-xml"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="Dialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="RedemptionCode"
                :disabled="Disabled"
                :loading="Disabled"
                color="success">
              <v-icon>mdi-check</v-icon>
              <span class="ml-2">完成</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Coin",

  data: () => ({
    Dialog: false,
    Code: null,
    Amount: null,
    Disabled: false,
    Data: null,
    Page: 1,
    PageTotal: 1,
    Timer: null
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push({path: "/Account/Login", query: {Href: window.location.href}})
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* 获取订单列表 */
    this.OrderList()
    this.Timer = setInterval(this.OrderList, 1000)
  },

  destroyed() {
    window.clearInterval(this.Timer)
  },

  methods: {
    /* 获取订单列表 */
    OrderList() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Pay/List", {Page: this.Page})
          .then(Response => {
            if (Response.data.Data !== null) {
              this.PageTotal = Math.ceil(Response.data.Data[0].Total / 10)
            }
            this.Data = Response.data.Data
          })
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
    RedemptionCode() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Pay/RedemptionCode", {Code: this.Code})
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1109) {
              this.Disabled = false
              this.Dialog = false
              this.Code = null
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
            if (Response.data.Code === 1110 || Response.data.Code === 1111) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
          })
    },
    /* 微信支付 */
    WeChatPay() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Pay/WeChatPay", {Amount: this.Amount})
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1100) {
              this.Disabled = false
              this.PayWindow(Response.data.Data.Id)
            }
            if (Response.data.Code === 1001 || Response.data.Code === 1101 || Response.data.Code === 1102) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
          })
    }
  },

  computed: {
    LevelAmount() {
      return Math.round(this.Amount * this.$store.state.PsssInfo.Level.Level * 0.02)
    }
  }
}
</script>