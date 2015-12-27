(function() {
    var width = 800;
    var height = 800;
    var pack = d3.layout.pack()
        .size([width, height]) // 宽，高
        .radius(20); // 叶子节点，圆的大小
    var nodes = pack.nodes(allData); // allData 在 data.js 中定义
    console.log(nodes); // 在 allData 的基础上，多了 x,y,r,value,depth 的字段

    // 绘制
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0,0)");

    svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("fill", function(d) {
            return d.special ? 'orange' : "rgb(31, 119, 180)";
        })
        .attr("fill-opacity", "0.4")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r", function(d) {
            return d.r;
        })
        .on("mouseover", function(d, i) {
            d3.select(this)
                .attr("fill", "yellow");
        })
        .on("mouseout", function(d, i) {
            d3.select(this)
                .attr("fill", "rgb(31, 119, 180)");
        });


    // 文字
    var notRootData = nodes.filter(function(d) {
        return d.depth !== 0;
    });
    // 在 svg 中，后面的元素会覆盖签名的元素
    notRootData = notRootData.sort(function(a, b) {
        return a.depth > b.depth ? -1 : 1;
    });


    svg.selectAll("text")
        .data(notRootData)
        .enter()
        .append("text")
        .attr({
            'font-size': function(d) {
                return d.depth === 1 ? '12px' : '10px';
            },
            'fill': function(d) {
            	return d.depth === 1 ? 'red' : 'white';
            },
            'fill-opacity': '0.9',
            'x': function(d) {
                return d.x;
            },
            'y': function(d) {
                return d.y;
            },
            "text-anchor": "middle",// 文字水平对齐 可选值 start,middle,end
            "dy": 3
        })
        .text(function(d) {
            return d.name;
        });
})();
