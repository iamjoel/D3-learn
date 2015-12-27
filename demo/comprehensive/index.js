(function() {
    var svg = d3.select('body').append('svg').attr({
        width: 500,
        height: 500
    });
    var nodes1 = initPic({
        width: 100,
        height: 100,
        className: 'pic1',
        data: {
            children: [{
                value: 20
            }, {
                value: 30,
                children: [{
                    value: 4
                }, {
                    value: 6
                }]
            }, {
                value: 5
            }, {
                value: 8,
                isSpecial: true
            }]
        }
    });

    var nodes2 = initPic({
        width: 100,
        height: 100,
        className: 'pic2',
        offset: {
            x: 120,
            y: 0,
        },
        data: {
            children: [{
                value: 20
            }, {
                value: 30,
                children: [{
                    value: 20,
                    children: [{
                        value: 5
                    }, {
                        value: 2
                    }, {
                        value: 1
                    }]
                }, {
                    value: 4
                }, {
                    value: 6
                }]
            }, {
                value: 5
            }, {
                value: 2,
                isSpecial: true
            }]
        }
    });

    var special1 = nodes1.filter(function(d) {
        return d.isSpecial;
    })[0];
    var star1Loc = {
    	x: special1.x,
    	y: special1.y,
    }

    var special2 = nodes2.filter(function(d) {
        return d.isSpecial;
    })[0];
    var star2Loc = {
    	x: special2.x,
    	y: special2.y,
    }

    svg.append('line').attr({
        'stroke': 'green',
        'stroke-width': 1,
        'x1': star1Loc.x,
        'y1': star1Loc.y,
        'x2': star2Loc.x,
        'y2': star2Loc.y
    });
    // 覆盖线的部分
    svg.append('circle').attr({
    	cx: special1.x,
    	cy: special1.y,
    	r: special1.r,
    	fill: '#f60',
    	stroke: '40709d'
    });
    svg.append('circle').attr({
    	cx: special2.x,
    	cy: special2.y,
    	r: special2.r,
    	fill: '#f60',
    	stroke: '40709d'
    });

    function initPic (options) {
    	var nodes = getLocNodes(options);
    	draw(nodes, options);
    	return nodes;
    }

    function getLocNodes (options) {
    	 var offset = options.offset || {
            x: 0,
            y: 0
        };
        var pack = d3.layout.pack()
            .size([options.width, options.height]) // 宽，高
            .padding(2) // 间距
            .sort(function(a, b) { // 大的在中间，小的在四周
                return b.value - a.value;
            });
        var nodes = pack.nodes(options.data);
        nodes.forEach(function (node) {
        	node.x = node.x + 2 + offset.x;
        	node.y = node.y + 2 + offset.y;
        });

        return nodes;
    }



    function draw(nodes, options) {
    	// debugger;
        var body = d3.select('body');
        var svg = body.select('svg');
        var group = svg.append('g');

        group.attr({
            'width': options.width + 5, // 描边
            'height': options.height + 5,
            'class': options.className,
        });
        group.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr({
                cx: function(d) {
                    return d.x;
                },
                cy: function(d) {
                    return d.y;
                },
                r: function(d) {
                    return d.r;
                },
                fill: function(d) {
                    var color = '#a9d18f';
                    if (!d.parent) { // 根节点
                        color = '#bdd7ef'
                    } else if (d.depth === 2) {
                        color = '#e3f1d9'
                    } else if (d.depth === 3) {
                        color = 'green'
                    } else if (d.isSpecial) {
                        color = '#f60'
                    }
                    return color;
                },
                stroke: function(d) {
                    var color = '#5986a2';
                    if (!d.parent) {
                        color = '#40709d';
                    }
                    return color;
                },
                'stroke-width': function(d) {
                    return d.parent ? 1 : 2;
                }
            });
    }


})()
