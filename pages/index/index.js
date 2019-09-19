// pages/index/index.js
import data from './data'
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    arrow1: false,
    arrow2: false,
    arrow3: false,
    fixedArray: [],
    fixedArray1: [],
    fixedData: ["楼盘名", "写字楼等级", "开发商", "物业公司", "得房率(%）", "空调系统", "车位数(个）", "车位费(元/月）", "电梯数量", "电梯品牌"],
    fixedData1: ["楼盘名", "餐饮(个)", "酒店(个)", "银行(个)", "购物(个)", "咖啡馆(个)", "写字楼(个)"],
    compareDateBuilding: [] // 楼盘对比数组
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    this.setData({
      compareDateBuilding: data.compareDateBuilding
    })
    setTimeout(() => {
      this.setColPositon()
    }, 300);
  },
  //事件处理函数
  _bindArrowTap: function (e) {
    // console.log(e);
    let dataset = e.currentTarget.dataset;
    this.setData({
      [dataset.arrow]: !this.data[dataset.arrow]
    })
    /* this.setColPositon(); */
  },
  /** 
   * 设置固定元素位置
   */
  setColPositon: function () {
    let that = this;
    wx.createSelectorQuery().selectAll('.fixbox .col-fixed').boundingClientRect(function (res) {
      // console.log("res: ", res);
      let fixedArray = [];
      res.forEach((item, index) => {
        fixedArray.push({
          width: item.width - 10,
          height: item.height - 30
        });
      })
      that.setData({
        fixedArray
      })
    }).exec()
    wx.createSelectorQuery().selectAll('.fixbox1 .col-fixed').boundingClientRect(function (res) {
      // console.log("res: ", res);
      let fixedArray1 = [];
      res.forEach((item, index) => {
        fixedArray1.push({
          width: item.width - 10,
          height: item.height - 30
        });
      })
      that.setData({
        fixedArray1
      })
    }).exec()
  },
})
