<template>
<v-app>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item
      color="purple lighten-2"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="purple lighten-2">
          <v-icon
            dark
            size="42"
            class="mr-4"
          >
            mdi-magnify
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">1.プレチェック</h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="10">
              ・審査済み（３年以内）→得意先登録<br>
              ・審査済み（３年以前）or 未審査<br>
              　・企業マスタ未登録　→企業マスタ登録<br>
              　・企業マスタ登録済　→取引先申請
            </v-col>
            <v-col
              class="hidden-sm-and-down text-right"
              md="2"
            >
              <v-icon size="64">mdi-calendar-text</v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="amber lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="amber lighten-1 justify-end">
          <h2 class="display-1 mr-4 white--text font-weight-light">2.取引先申請</h2>
          <v-icon
            dark
            size="42"
          >mdi-home-outline</v-icon>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              ・会社謄本・企業データ取得<br>
              　→※企業マスタ更新は誰がやる問題。。
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="cyan lighten-1"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="cyan lighten-1">
          <v-icon
            class="mr-4"
            dark
            size="42"
          >
            mdi-email-outline
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">3.e-SHiNSEi</h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              承認 →与信枠申請<br>
              非承認 →取引先申請にもどる
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="red lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="red lighten-1 justify-end">
          <h2 class="display-1 mr-4 white--text font-weight-light">4.与信枠申請</h2>
          <v-icon
            dark
            size="42"
          >
            mdi-account-multiple-outline
          </v-icon>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col class="hidden-sm-and-down" md="2">
              <v-icon size="64">mdi-server-network</v-icon>
            </v-col>
            <v-col cols="12" md="10">
              ・紙の申請書を回してハンコついてもらう<br>
              ・電子化への課題<br>
              　・ワークフローによる承認（いわゆる電子承認）<br>
              　・帳票出力<br>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="green lighten-1"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="green lighten-1">
          <v-icon
            class="mr-4"
            dark
            size="42"
          >
            mdi-phone-in-talk
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">5.得意先登録</h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              ・手動でMAEYES/得意先マスタに登録<br>
              　→手動でMAEYESに登録 and 得意先マスタと自動同期（RPA or AW）
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</v-app>
</template>