(function() {
    var width = 200;
    var height = 200;
    var padding = 5;
    var data = (function() {
        var res = {
            children: []
        };
        for (var i = 0; i < 10; i++) {
            res.children.push({
                value: parseInt(Math.random() * 1000)
            });


        }
        res.children[3].children = [];
        for (var i = 0; i < 3; i++) {
            res.children[3].children.push({
                value: parseInt(Math.random() * 100)
            });


        }
        return res;
    })();
    var pack = d3.layout.pack()
        .size([width, height]) // 宽，高
        .padding(padding) // 间距
        // .sort(function(a, b) { // 大的在中间，小的在四周
        //     return b.value - a.value;
        // });
    var nodes = pack.nodes(data); // allData 在 data.js 中定义
    // nodes = nodes.filter(function(it) { return it.parent; });// 最外层的

    // 绘制
    var svg = d3.select("body").append("svg")
        .attr("width", width + 10)
        .attr("height", height + 10);


    var color = d3.scale.category20();

    d3.select("svg")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr({
            cx: function(d) {
                return d.x + 3;// 因为父级别的 3px的描边
            },
            cy: function(d) {
                return d.y + 3;
            },
            r: function(d) {
                return d.r;
            },
            fill: function(d) {
                return color(Math.random());
            },
            stroke: "#444", // 描边
            'stroke-width': function (d) {
                return (d.parent ? 1 : 3) + 'px';
            }
        });

})()
