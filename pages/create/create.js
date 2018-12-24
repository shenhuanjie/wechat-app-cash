const app = getApp();
// pages/create/create.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeSelected: 0,
        accountList: [],
        multiArray: [
            ['无脊柱动物', '脊柱动物'],
            ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']
        ],
        multiIndex: [0, 0],
        typeList: [{
            title: "支出",
        }, {
            title: "收入",
        }, {
            title: "转账",
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var db_account = wx.getStorageSync("db_account");
        var accountArray = []
        for (var i = 0; i < db_account.length; i++) {
            accountArray.push(db_account[i].name);
        }
        console.log(accountArray);
        this.setData({
            accountList: db_account,
            accountArray: accountArray
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
    switchTab: function(even) {
        this.setData({
            typeSelected: even.currentTarget.dataset.index
        });
        this.initMultiPicker();
    },
    bindpicker_account: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var index = parseInt(e.detail.value);
        this.setData({
            account_index: index,
            record: {
                account: this.data.accountList[index]
            },
        })
    },
    bindpicker_account_income: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var index = parseInt(e.detail.value);
        var record = this.data.record ? this.data.record : [];
        record.account_income = this.data.accountList[index];
        this.setData({
            account_income_index: index,
            record: record,
        })
    },
    bindpicker_account_expend: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var index = parseInt(e.detail.value);
        var record = this.data.record ? this.data.record : [];
        record.account_expend = this.data.accountList[index];
        this.setData({
            account_expend_index: index,
            record: record,
        })
    },
    initMultiPicker: function() {
        // 当前选择的类型
        var recordType = this.data.typeSelected;

    },
    bindMultiPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
                        break;
                    case 1:
                        data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
                        break;
                }
                data.multiIndex[1] = 0;
                data.multiIndex[2] = 0;
                break;
            case 1:
                switch (data.multiIndex[0]) {
                    case 0:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                                break;
                            case 1:
                                data.multiArray[2] = ['蛔虫'];
                                break;
                            case 2:
                                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                                break;
                            case 3:
                                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                                break;
                            case 4:
                                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                                break;
                        }
                        break;
                    case 1:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['鲫鱼', '带鱼'];
                                break;
                            case 1:
                                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                                break;
                            case 2:
                                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                                break;
                        }
                        break;
                }
                data.multiIndex[2] = 0;
                console.log(data.multiIndex);
                break;
        }
        this.setData(data);
    }
})