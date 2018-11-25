
( function( root, func ) {
	// 在window对象上添加lazyload方法
	root.lazyLoad = func( root );
} )( window, function( root ) {
	let lazyLoad = {};
	let delay;//停止滑动多久进行加载
	let offsetTop, offsetBottom, offsetLeft, offsetRight;//距离视口上下左右多少距离进行加载图片
	let context;//在什么范围选择元素
	let poll;//轮询
	// 判读元素是否隐藏
	let isHidden = function( el ) {
		if( el.parentOffset !== null ) {
			return false;
		}
	}
	//判断元素是否在需要加载
	let inView = function( el ) {
		let viewWidth = root.innerWidth;//浏览器的显示宽度
		let viewHeight = root.innerHeight;//高度
		let box = el.getBoundingClientRect();//获取元素的位置
		return ( -box.right < offsetLeft ) && ( offsetRight + viewWidth > box.left ) && ( -box.bottom < offsetTop ) && ( box.top < offsetBottom + viewHeight );
	}
	//卸载
	let detach = function( len ) {
		if( len === 0 ) {
			root.removeEventListener( 'scroll', render );
		}
	}
	//节流函数
	let throttle = function() {
		clearTimeout( poll );
		poll = setTimeout( function(){
		 	render();
		 }, delay )
	}
	//渲染函数
	let render = function() {
		console.log( "hello world" );
		let nodes = context.querySelectorAll( '[ data-url ], [ background-url ]' );
		let len = nodes.length;
		let node, bgurl, src;
		for( let i = 0; i < len; i++ ) {
			node = nodes[ i ];
			if( !isHidden( node ) && inView( node ) ) {
				bgurl = node.getAttribute( 'background-url' );
				src = node.getAttribute( 'data-url' );
				if( bgurl !== null ) {
					node.style.backgroundImage = "url("+ bgurl +")";
					node.removeAttribute( 'background-url' );
				} else {
					node.src = src;
					node.removeAttribute( 'data-url' );
				}
			}
		}
		detach( len );
	}

	//初始化
	lazyLoad.init = function( opts ) {
		let options = opts || {};
		delay = options.delay || 250;
		offsetTop = options.offsetTop || 0;
		offsetRight = options.offsetRight || 0;
		offsetBottom = options.offsetBottom || 0;
		offsetLeft = options.offsetLeft || 0;
		context = options.context || document;
		render();//渲染一次
		root.addEventListener( 'scroll', throttle );
	}

	return lazyLoad;
} )