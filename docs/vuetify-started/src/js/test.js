/**import module */
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import "material-design-icons/iconfont/material-icons.css";
import Test from "../components/Test.vue";

/**kintone-auth */
const kintoneJSSDK = require('@kintone/kintone-js-sdk');
const APIToken = 'UPeY7rCop3EqNgqu8MdaucnlTAIOOvHbWavSLAXs';
const kintoneAuth = new kintoneJSSDK.Auth();
kintoneAuth.setApiToken({apiToken: APIToken});

const domainName = 'h2zqr.cybozu.com';
const kintoneConnection = new kintoneJSSDK.Connection({domain:domainName, auth:kintoneAuth});
const kintoneRecord = new kintoneJSSDK.Record({connection: kintoneConnection});

Vue.config.productionTip = false;

kintone.events.on('app.record.index.show', function(e) {
    if(e.viewId !== 5549878) return e;

    const linkUrl = 'https://h2zqr.cybozu.com/k/1255/show#record=';
    const books=[]; 
    const params = {
        app: kintone.app.getId(),
        totalCount: true,
    };
    kintoneRecord.getAllRecordsByQuery(params).then(resp => {
        /**sort by category */
        resp.records.sort(function(a, b) {
            let comparison=0;
            (a.shelfInfo.value > b.shelfInfo.value) ? comparison=1 : comparison=-1;
            return comparison;
        });
        resp.records.forEach((record, index) => {
            let obj={};
            obj.index = record['レコード番号'].value;
            obj.isbn = record.isbn_13.value;
            obj.category = record.category.value;
            obj.name = record.bookName.value;
            obj.url = record.thumbnailLink.value;
            obj.link = `${linkUrl}${record['レコード番号'].value}`
            books.push(obj);
        });

        Vue.use(Vuetify);
        new Vue({
            vuetify: new Vuetify(),
            el: '#app',
            // render: h => h(Test),
            template: '<Test :books="books" :categorys="categorys" />',
            components: { Test },
            data:() => ({
                books: books,
                categorys: [
                    { index:'A', name:'論理思考' },
                    { index:'B', name:'マーケティング' },
                    { index:'C', name:'広告' },
                    { index:'D', name:'デザイン' },
                    { index:'E', name:'テクノロジー・プログラミング' },
                    { index:'F', name:'経営・戦略・会計・財務' },
                    { index:'G', name:'人材・マネジメント' },
                    { index:'H', name:'不動産関連' },
                    { index:'I', name:'営業' },
                    { index:'J', name:'ビジネス一般' },
                    { index:'K', name:'自己啓発・仕事術' },
                    { index:'L', name:'その他' },
                    { index:'M', name:'統計学・データ分析' },
                    { index:'N', name:'実用書・教科書' }
                ]
            }),        
        });
    });
    return e;
});