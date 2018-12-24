const app = getApp();
const money = require('../../lib/js/money.js');
const util = require('../../utils/util.js');
const formatMoney = money.formatMoney();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        account: {},
        currency: [],
        accountType: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            currency: app.globalData.currency,
            accountType: app.globalData.accountType
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    saveAction: function(e) {
        var checked = false;
        var account = this.data.account;
        if (!account.accountType) {
            wx.showToast({
                title: '请选择账户类型',
                icon: 'none'
            })
        } else if (!account.currency) {
            wx.showToast({
                title: '请选择货币类型',
                icon: 'none'
            })
        } else if (!account.name) {
            wx.showToast({
                title: '请输入账户名称',
                icon: 'none'
            });
        } else if (!account.balance) {
            wx.showToast({
                title: '请输入账户余额',
                icon: 'none'
            });
        } else {
            checked = true;
        }
        if (!checked) {
            return 0;
        }

        console.log(account);
        var ts_account = {};
        var db_account = [];
        var uuid = util.formatTime(new Date()).replace(new RegExp('/', 'gm'), '').replace(new RegExp(':', 'gm'), '').replace(new RegExp(' ', 'gm'), '');
        var key = "db_account";
        var key_uuid = key + "_" + uuid;

        if (wx.getStorageSync("db_account") != '') {
            db_account = wx.getStorageSync("db_account");
        }
        console.log(db_account);
        console.log(uuid);

        ts_account = {
            uuid: uuid,
            name: account.name,
            type: parseInt(account.accountType.id),
            currency: parseInt(account.currency.id),
        }
        db_account.push(ts_account);

        wx.setStorageSync(key, db_account);
        wx.setStorageSync(key_uuid, account);
        wx.navigateBack();
    },
    bindinput_name: function(e) {
        console.log('input发送选择改变，携带值为', e.detail.value);
        var account = this.data.account;
        account.name = e.detail.value
        this.setData({
            account: account
        })
    },
    bindinput_balance: function(e) {
        console.log('input发送选择改变，携带值为', e.detail.value);
        var moneyValue = e.detail.value.replace(new RegExp('￥', 'gm'), '').replace(new RegExp(',', 'gm'), '');
        console.log(moneyValue);
        var moneyFloat = parseFloat(moneyValue);

        console.log('input发送选择改变，携带值为', moneyFloat.formatMoney());
        var account = this.data.account;
        account.balance = {
            value: moneyFloat,
            number: moneyFloat.formatMoney()
        }
        this.setData({
            account: account
        })
    },
    bindpicker_accountType: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        var index = parseInt(e.detail.value);
        var account = this.data.account;
        account.accountType = {
            id: index,
            name: this.data.accountType[index]

        }
        this.setData({
            accountType_index: index,
            account: account
        })
    },
    bindpicker_currency: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var index = parseInt(e.detail.value);
        var account = this.data.account;
        account.currency = {
            id: index,
            name: this.data.currency[index]
        }
        this.setData({
            currency_index: index,
            account: account,
        })
    },
})