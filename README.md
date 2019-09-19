# mini-table-fixed

#### 功能介绍
微信小程序实现表格固定首列效果

- [x] 普通表格效果
- [x] 固定首列

#### 使用
```
// Gitee
git clone git@gitee.com:jiangjingmin/mini-table.git

// Github
git clone git@github.com:jiangjingmin/mini-table.git
```

#### 走的弯路
1. 刚开始想用绝对定位fixed，一一固定每个固定单元格，动态设置其宽高，但由于还有展开隐藏，且 `boundingClientRect` 返回的数据不及时，顶部会出现闪现的问题，首次交互还会出现错位等问题（但点击多次之后就不会出现了，暂没找到解决办法），fail
2. 改用相对定位，解决了小范围内顶部位置不会错位，但单元格的 `padding: 30rpx 10rpx;` 设置时， 是采用 `boundingClientRect`获取到的高度 `height - 10*2*750/windowWidth` 得到的，但750/windowWidth会出现小数，得到的结果总会与实际数值有所偏差，fail
3. 最终解决办法就是将 `padding: 30rpx 10rpx;`  改为 `padding: 15px 5px;`，避免 `rpx` 计算引起的数值偏差，suceess。

