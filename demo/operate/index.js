(function(){
	var body = d3.select('body');
	var fruits = d3.selectAll('.fruit');
	// 设置文本内容
	fruits.data(['苹果', '橘子', '荔枝']).text(function (each, index) {
		return index + ': ' + each;
	});
	// 设置样式
	fruits.data(['red', 'orange', 'green', 'yellow']).style('color', function (each, index) {
		return each;
	});

	// 内部插入元素
	body.append('div').attr('class', 'fruit').text('追加的水果');
	body.insert('div', '#first-fruit').attr('class', 'fruit').text('前置的水果');

	// 删除元素
	var newFruit2 = body.append('div').attr('class', 'fruit').text('2s会后被删除的水果');
	setTimeout(function (argument) {
		newFruit2.remove();
	}, 2000)

})();