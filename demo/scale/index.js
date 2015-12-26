(function() {
    // 线性比例尺
    var dataset = [1.2, 2.3, 0.9, 1.5, 3.3];
    var min = d3.min(dataset);
    var max = d3.max(dataset);

    var linear = d3.scale.linear()
        .domain([min, max]) // 定义域（x） 的范围
        .range([0, 300]); // 值域（y） 的范围, 最小的x对应0，最大的x对应300

    dataset.forEach(function(each) {
        console.log(linear(each))
    })

    var rectHeight = 25; //每个矩形所占的像素高度(包括空白)

    var svg = d3.select('svg');
    svg.selectAll("rect")
        .data(dataset)
        .enter() // 开始是没有rect元素的
        .append("rect")
        .attr("x", 20)
        .attr("y", function(d, i) {
            return i * rectHeight;
        })
        .attr("width", function(d) {
            return linear(d); //在这里用比例尺
        })
        .attr("height", rectHeight - 2) // 控制间距
        .attr("fill", "steelblue");

    // 序数比例尺 对于一些离散值
    var index = [0, 1, 2, 3, 4];
    var color = ["red", "blue", "green", "yellow", "black"];
    var ordinal = d3.scale.ordinal()
        .domain(index)
        .range(color);

    console.log(ordinal(0)); //返回 red
    console.log(ordinal(2)); //返回 green
    console.log(ordinal(4)); //返回 black

})();
