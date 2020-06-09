requirejs.config({
    paths: {
        "core": "https://www.amcharts.com/lib/4/core",
		"charts": "https://www.amcharts.com/lib/4/charts",
		"forceDirected": "https://www.amcharts.com/lib/4/plugins/forceDirected",
		"animated": "https://www.amcharts.com/lib/4/themes/animated"
    },
	shim:{
	"charts":{
	"deps":["core"]
	},
	"forceDirected":{
	"deps":["charts"]
	},
	"animated":{
	"deps":["forceDirected"]
	}
	}
});

define( [ "qlik",'jquery','text!./Force-Tree.css',"./def","./ini","core","charts","forceDirected","animated"
],
function ( qlik,$,css,def,ini) {
 $("<style>").html(css).appendTo("head");
	return {
	 definition: def,
	 initialProperties:ini,
		paint: function ($element, layout) {
		$element.empty();
		f=[];


		if(layout.qHyperCube.qDataPages[0].qMatrix[0].length==3){

		t1=layout.qHyperCube.qDataPages[0].qMatrix;
		unique=[];
		
		for (var i = 0; i < t1.length; i++) {
   if(unique.includes(t1[i][0].qText)==false){unique.push(t1[i][0].qText)}
}

m=[];
for (var i = 0; i < unique.length; i++) {temp=new Array();temp['name']=unique[i];temp['n']=layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;temp['n2']=layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;temp2=[];
    for (var x = 0; x < t1 .length; x++) {
    if(unique[i]==t1[x][0].qText){temp2.push({ 'name': t1[x][1].qText, 'value':t1[x][2].qNum ,'n':layout.qHyperCube.qDimensionInfo[1].qFallbackTitle ,'n2':layout.qHyperCube.qMeasureInfo[0].qFallbackTitle})}
};temp['children']=temp2;m.push(temp);
}
f.push(
  {
    name: layout.cond,
	n:layout.cond2,
    children: m})
	



			
			 $element.append( `<div id="chartdiv"></div>` );
			 
			
             am4core.disposeAllCharts();
			 am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end



var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

chart.data = f;

networkSeries.dataFields.value = "value";
networkSeries.dataFields.measlabel = "n2";
networkSeries.dataFields.dimvalue = "name";
networkSeries.dataFields.dimlabel = "n";
networkSeries.dataFields.children = "children";
networkSeries.nodes.template.tooltipHTML = layout.tooltip;
networkSeries.nodes.template.fillOpacity = 1;
networkSeries.minRadius = 18;
networkSeries.nodes.template.label.text = "{dimvalue}"
networkSeries.fontSize = 13;

networkSeries.links.template.strokeWidth = 1;

var hoverState = networkSeries.links.template.states.create("hover");
hoverState.properties.strokeWidth = 3;
hoverState.properties.strokeOpacity = 1;

networkSeries.nodes.template.events.on("over", function(event) {
  event.target.dataItem.childLinks.each(function(link) {
    link.isHover = true;
  })
  if (event.target.dataItem.parentLink) {
    event.target.dataItem.parentLink.isHover = true;
  }

})

networkSeries.nodes.template.events.on("out", function(event) {
  event.target.dataItem.childLinks.each(function(link) {
    link.isHover = false;
  })
  if (event.target.dataItem.parentLink) {
    event.target.dataItem.parentLink.isHover = false;
  }
})
/*
networkSeries.nodes.template.events.on("hit", function(event) {
 console.log(event);
 
}, this)*/

}); // end am4core.ready()
console.log(f)
}else{
unique=[];
		for (var i = 0; i < layout.qHyperCube.qDataPages[0].qMatrix.length; i++) {
   if(unique.includes(layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText)==false){unique.push(layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText)}
}


unique2=[];
		for (var i = 0; i < layout.qHyperCube.qDataPages[0].qMatrix.length; i++) {
   if(unique2.includes(layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText)==false){unique2.push(layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText)}
}


f3=[];f2=[];for (var z = 0; z < unique.length; z++) {f=new Array();;m=[];t1=layout.qHyperCube.qDataPages[0].qMatrix;
for (var i = 0; i < unique2.length; i++) {temp=new Array();temp['name']=unique2[i];temp['n']=layout.qHyperCube.qDimensionInfo[1].qFallbackTitle;temp['n2']=layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;temp2=[];
    for (var x = 0; x < t1 .length; x++) {
    if(unique2[i]==t1[x][1].qText && t1[x][0].qText==unique[z]){temp2.push({ 'name': t1[x][2].qText, 'value':t1[x][3].qNum ,'n':layout.qHyperCube.qDimensionInfo[2].qFallbackTitle ,'n2':layout.qHyperCube.qMeasureInfo[0].qFallbackTitle})}
};temp['children']=temp2;m.push(temp);
}
f['name']=unique[z];
f['n']=layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;
f['n2']=layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
f['children']=m;

	
	f2.push(f);}
	f3.push(
  {
    name: layout.cond,
	n:layout.cond2,
    children: f2});
	
		
			 $element.append( `<div id="chartdiv"></div>` );
			 
			
             am4core.disposeAllCharts();
			 am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end



var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

chart.data = f3;

networkSeries.dataFields.value = "value";
networkSeries.dataFields.measlabel = "n2";
networkSeries.dataFields.dimvalue = "name";
networkSeries.dataFields.dimlabel = "n";
networkSeries.dataFields.children = "children";
networkSeries.nodes.template.tooltipHTML = layout.tooltip;
networkSeries.nodes.template.fillOpacity = 1;
networkSeries.minRadius = 18;
networkSeries.nodes.template.label.text = "{dimvalue}"
networkSeries.fontSize = 13;

networkSeries.links.template.strokeWidth = 1;

var hoverState = networkSeries.links.template.states.create("hover");
hoverState.properties.strokeWidth = 3;
hoverState.properties.strokeOpacity = 1;

networkSeries.nodes.template.events.on("over", function(event) {
  event.target.dataItem.childLinks.each(function(link) {
    link.isHover = true;
  })
  if (event.target.dataItem.parentLink) {
    event.target.dataItem.parentLink.isHover = true;
  }

})

networkSeries.nodes.template.events.on("out", function(event) {
  event.target.dataItem.childLinks.each(function(link) {
    link.isHover = false;
  })
  if (event.target.dataItem.parentLink) {
    event.target.dataItem.parentLink.isHover = false;
  }
})
/*
networkSeries.nodes.template.events.on("hit", function(event) {
 console.log(event);
 
}, this)*/

}); // end am4core.ready()
	


}

			 
			 
			 
			 
			return qlik.Promise.resolve();
		}
	};

} );

