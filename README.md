

##usage

```html
<body>
	<img src="静态图片路径" data-url="需要从服务器获取的图片的路径" alt="">
	<div background-url="需要从服务器获取的图片的路径"></div>
</body>
<!-- 引入lazyload.js插件 -->
<script src="lazyload.js"></script>
<!-- 进行初始化 -->
<script>
	lazyLoad.init( {
		delay: 250,//默认为250毫秒
		offsetTop: 0,//距离浏览器顶部多远进行加载图片，默认为0px
		offsetRight: 0,//距离浏览器右边多远进行加载图片，默认为0px
		offsetBottom: 0,//距离浏览器下边多远进行加载图片，默认为0px
		offsetLeft: 0,//距离浏览器左边多远进行加载图片，默认为0px
		context: document,需要进行懒加载的内容，默认为整个文档
	} )
</script>
```