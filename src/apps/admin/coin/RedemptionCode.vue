<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>先锋币兑换码</v-card-title>
        <v-card-text>
          <v-card class="mb-4" v-if="NoPermission === false">
            <v-card-subtitle>操作</v-card-subtitle>
            <v-card-text>
              <v-btn color="primary" @click="Dialog = true">
                <v-icon>mdi-plus</v-icon>
                <span class="ml-2">添加</span>
              </v-btn>
            </v-card-text>
          </v-card>
          <v-alert type="info" v-if="Data === null && NoPermission === false">暂无数据</v-alert>
          <v-alert type="warning" v-if="NoPermission === true">权限不足</v-alert>
          <v-expansion-panels v-if="Data !== null">
            <v-expansion-panel v-for="(Data, I) in Data" :key="I">
              <v-expansion-panel-header disable-icon-rotate>
                #{{ Data.Id }} - {{ Data.Coin }} 先锋币
                <template v-slot:actions>
                  <v-chip
                      :color="Data.Username === null ? 'success' : 'warning'"
                      label
                      text-color="white">
                    <v-icon left color="white">
                      {{ Data.Username === null ? "mdi-check" : "mdi-close" }}
                    </v-icon>
                    {{ Data.Username === null ? "未使用" : "已使用" }}
                  </v-chip>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="mb-2">
                  <v-card-subtitle>操作</v-card-subtitle>
                  <v-card-text>
                    <v-btn
                        @click="DeleteCode(I)"
                        :disabled="Disabled"
                        :loading="Disabled"
                        color="error">
                      <v-icon>mdi-delete</v-icon>
                      <span class="ml-2">删除</span>
                    </v-btn>
                  </v-card-text>
                </v-card>
                <v-row dense>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-link</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>兑换码</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Code }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" v-clipboard:copy="Data.Code">
                              <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>复制兑换码</span>
                        </v-tooltip>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-card-account-details</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>使用通行证</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Username === null ? "未使用" : Data.Username }}</v-list-item-subtitle>
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
                        <v-list-item-title>使用时间</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.UsedDate === null ? "未使用" : Data.UsedDate }}</v-list-item-subtitle>
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
          <v-card-title>添加兑换码</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="RedemptionCodeAddData.Amount"
                outlined hide-details
                label="数量" type="number"
                prepend-inner-icon="mdi-numeric"
            ></v-text-field>
            <v-text-field
                v-model="RedemptionCodeAddData.Coin"
                outlined hide-details
                label="先锋币" class="mt-2" type="number"
                prepend-inner-icon="mdi-cash-multiple"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="Dialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="AddCode"
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
  name: "RedemptionCode",

  data: () => ({
    Page: 1,
    PageTotal: 1,
    Dialog: false,
    RedemptionCodeAddData: {
      Amount: null,
      Coin: null
    },
    Disabled: false,
    Data: null,
    NoPermission: false,
    Timer: null
  }),

  created() {
    /* 获取兑换码列表 */
    this.GetRedemptionCodeList()
    this.Timer = setInterval(this.GetRedemptionCodeList, 1000)
  },

  destroyed() {
    window.clearInterval(this.Timer)
  },

  methods: {
    /* 获取兑换码列表 */
    GetRedemptionCodeList() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Coin/RedemptionCodeList", {Page: this.Page, Search: this.Search})
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
    },
    /* 添加兑换码 */
    AddCode() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Coin/RedemptionCodeAdd", this.RedemptionCodeAddData)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1401) {
              this.RedemptionCodeAddData.Amount = null
              this.RedemptionCodeAddData.Coin = null
              this.Dialog = false
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
          })
    },
    /* 删除兑换码 */
    DeleteCode(Id) {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Coin/RedemptionCodeDelete", {Code: this.Data[Id].Code})
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1404) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
          })
    }
  }
}
</script>