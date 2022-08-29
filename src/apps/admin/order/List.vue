<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>先锋币订单</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="Search"
              outlined persistent-hint
              label="搜索先锋币订单"
              hint="订单号 / 商户单号"
              prepend-inner-icon="mdi-magnify-expand"
          ></v-text-field>
          <v-alert type="info" v-if="Data === null && NoPermission === false">暂无数据</v-alert>
          <v-alert type="warning" v-if="NoPermission === true">权限不足</v-alert>
          <v-expansion-panels v-if="Data !== null">
            <v-expansion-panel v-for="(Data, I) in Data" :key="I">
              <v-expansion-panel-header disable-icon-rotate>
                #{{ Data.Id }} - {{ Data.Username }}
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
                  <v-col cols="12" md="6">
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
                  <v-col cols="12" md="6">
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
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-pagination class="mt-4" v-model="Page" :length="PageTotal" total-visible="6"></v-pagination>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "List",

  data: () => ({
    Page: 1,
    PageTotal: 1,
    Search: null,
    Data: null,
    NoPermission: false,
    Timer: null
  }),

  created() {
    /* 获取订单列表 */
    this.GetOrderList()
    this.Timer = setInterval(this.GetOrderList, 1000)
  },

  destroyed() {
    window.clearInterval(this.Timer)
  },

  methods: {
    /* 获取订单列表 */
    GetOrderList() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Order/List", {Page: this.Page, Search: this.Search})
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 200) {
              if (Response.data.Data !== null) {
                this.PageTotal = Math.ceil(Response.data.Data[0].Total / 20)
              }
              this.Data = Response.data.Data
            }
            if (Response.data.Code === 401) {
              this.NoPermission = true
            }
            if (Response.data.Code === 500) {
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1400) {
              this.$router.push("/")
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
          })
    }
  }
}
</script>