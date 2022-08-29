<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>OauthClient</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="Search"
              outlined persistent-hint
              label="搜索OauthClient"
              hint="ClientID / 名称"
              prepend-inner-icon="mdi-magnify-expand"
          ></v-text-field>
          <v-alert type="info" v-if="Data === null && NoPermission === false">暂无数据</v-alert>
          <v-alert type="warning" v-if="NoPermission === true">权限不足</v-alert>
          <v-expansion-panels v-if="Data !== null">
            <v-expansion-panel v-for="(Data, I) in Data" :key="I">
              <v-expansion-panel-header disable-icon-rotate>
                {{ Data.Name }}
                <template v-slot:actions>
                  <v-chip
                      :color="Data.Status === '0' ? 'warning' : 'success'"
                      label
                      text-color="white">
                    <v-icon left color="white">
                      {{ Data.Status === "0" ? "mdi-timer" : "mdi-checkbox-marked" }}
                    </v-icon>
                    {{ Data.Status === "0" ? "审核中" : "已审核" }}
                  </v-chip>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="mb-2">
                  <v-card-subtitle>操作</v-card-subtitle>
                  <v-card-text>
                    <v-btn
                        @click="OpenEditDialog(I)"
                        color="primary" class="mr-2">
                      <v-icon>mdi-pencil</v-icon>
                      <span class="ml-2">修改</span>
                    </v-btn>
                    <v-btn
                        @click="OpenDeleteDialog(I)"
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
                        <v-img :src="Data.Logo"/>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>名称</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Name }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-link</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>回调地址</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.RedirectUrl }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" v-clipboard:copy="Data.RedirectUrl">
                              <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>复制回调地址</span>
                        </v-tooltip>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-identifier</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>ClientId</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.ClientId }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" v-clipboard:copy="Data.ClientId">
                              <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>复制ClientId</span>
                        </v-tooltip>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-barcode</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>ClientSecret</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.ClientSecret }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" v-clipboard:copy="Data.ClientSecret">
                              <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>复制ClientSecret</span>
                        </v-tooltip>
                      </v-list-item-action>
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
          v-model="EditDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>修改OauthClient</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="OauthClientEditData.Name"
                outlined hide-details
                label="名称"
                prepend-inner-icon="mdi-tag"
            ></v-text-field>
            <v-text-field
                v-model="OauthClientEditData.Logo"
                outlined hide-details
                label="图标" class="mt-2"
                prepend-inner-icon="mdi-image"
            ></v-text-field>
            <v-text-field
                v-model="OauthClientEditData.RedirectUrl"
                outlined hide-details
                label="回调地址" class="mt-2"
                prepend-inner-icon="mdi-link"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="EditDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="EditOauthClient"
                :disabled="Disabled"
                :loading="Disabled"
                color="success">
              <v-icon>mdi-check</v-icon>
              <span class="ml-2">完成</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="DeleteDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>删除OauthClient</v-card-title>
          <v-card-text>
            删除 {{ OauthClientDeleteData.Name }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="DeleteDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="DeleteOauthClient"
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
  name: "List",

  data: () => ({
    Page: 1,
    PageTotal: 1,
    Search: null,
    Disabled: false,
    EditDialog: false,
    DeleteDialog: false,
    OauthClientEditData: {
      ClientId: null,
      RedirectUrl: null,
      Name: null,
      Logo: null
    },
    OauthClientDeleteData: {
      ClientId: null,
      Name: null
    },
    Data: null,
    NoPermission: false,
    Timer: null
  }),

  created() {
    /* 获取订单列表 */
    this.GetOauthClientList()
    this.Timer = setInterval(this.GetOauthClientList, 1000)
  },

  destroyed() {
    window.clearInterval(this.Timer)
  },

  methods: {
    /* 获取订单列表 */
    GetOauthClientList() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Oauth/List", {Page: this.Page, Search: this.Search})
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
    /* 打开修改OauthClient对话框 */
    OpenEditDialog(Id) {
      this.OauthClientEditData.ClientId = this.Data[Id].ClientId
      this.OauthClientEditData.Name = this.Data[Id].Name
      this.OauthClientEditData.Logo = this.Data[Id].Logo
      this.OauthClientEditData.RedirectUrl = this.Data[Id].RedirectUrl
      this.EditDialog = true
    },
    /* 修改OauthClient */
    EditOauthClient() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Oauth/Edit", this.OauthClientEditData)
          .then(Response => {
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1402) {
              this.EditDialog = false
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
            if (Response.data.Code === 1203 || Response.data.Code === 1204 || Response.data.Code === 1205 || Response.data.Code === 1206) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
          })
    },
    /* 打开删除OauthClient对话框 */
    OpenDeleteDialog(Id) {
      this.OauthClientDeleteData.ClientId = this.Data[Id].ClientId
      this.OauthClientDeleteData.Name = this.Data[Id].Name
      this.DeleteDialog = true
    },
    /* 删除OauthClient */
    DeleteOauthClient() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Oauth/Delete", this.OauthClientDeleteData)
          .then(Response => {
            if (Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1404) {
              this.DeleteDialog = false
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
            if (Response.data.Code === 1206) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
          })
    }
  }
}
</script>