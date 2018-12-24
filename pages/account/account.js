// pages/account/account.js
const money = require('../../lib/js/money.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        accountType: [],
        accountList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
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
        this.getAccountList();
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
    getAccountList() {
        var key = "db_account";
        var accountList = [];
        var accounts = [];

        var typeMap = new Map();
        var typeList = this.data.accountType;
        for (var i = 0; i < typeList.length; i++) {
            var item = {
                id: i,
                name: typeList[i],
                accountList: [],
                balance: {
                    value: 0,
                    number: "￥0"
                }
            }
            typeMap.set(i, item);
        }
        var db_account = wx.getStorageSync(key);
        for (var i = 0; i < db_account.length; i++) {
            var account = db_account[i];
            var uuid = account.uuid;
            var type = account.type;

            var ts_account = wx.getStorageSync(key + "_" + uuid);
            var balance = ts_account.balance;

            var ts_type = typeMap.get(type);
            var momey = parseFloat(balance.value);
            ts_type.balance.value += momey;
            momey = ts_type.balance.value;
            ts_type.balance.number = momey.formatMoney();
            ts_type.accountList.push(account);
            account.balance = balance.number;
            typeMap.set(ts_type.id, ts_type);
        }

        for (var i = 0; i < typeList.length; i++) {
            var item = typeMap.get(i);
            if (item.accountList && item.accountList.length != 0) {
                accountList.push(item);
            }
        }

        this.setData({
            accountList: accountList
        })
    },
    toCreate: function() {
        wx.navigateTo({
            url: '../../pages/createAccount/createAccount',
        })
    }
})