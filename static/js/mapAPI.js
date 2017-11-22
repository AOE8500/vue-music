var offline_ship = null;
var freeData = null;
var inforWindow = null;
var swzddata = [];
var zfsbdata = [];
var fubiaoData = [];
var pointWidow = null; // 标绘点弹出窗体
var zdyData = null; // 自定义标绘 标绘对象
var zdyeditor = null; // 自定义标绘 编辑的标绘对象
var htbhdata = null; // 海图标绘编辑数据
// 海图操作（如开关船舶数据、鼠标标绘点线面等）
var cangdanList = null;

var wholeJg = [];
var isExist = [];
var existArray = [];
var firstLiText = "";
var sectionPolygons = [];
var controlSectionPolygons = [];
// 图层--->我的辖区
function drawSection(event) {

	SubmitFrom({
		data: encodeURI("Action=getAllSection"),
		url: "/gdmsaec/SectionAction",
		success: function (msg) {
			if (msg != "0") {
				// 得到辖区之后，画出辖区内容
				if (event.iskq == false) {
					for (var i = 0; i < msg.length; i++) {
						// 如果坐标以";"结尾，那么就删掉分号
						if (msg[i].zb.substr(-1) == ";") {
							msg[i].zb = msg[i].zb.substr(0, zb.length - 1);
						}
						zbArray = msg[i].zb.split(";");
						var lngLats = [];
						for (var j = 0; j < zbArray.length; j++) {
							lngLats[j] = new Winfo.LngLat(parseFloat(zbArray[j].split(',')[0]), parseFloat(zbArray[j].split(',')[1]));
						}
						var polygon = new Winfo.Polygon({
								content: new Winfo.MarkerContent({
									content: "<div style='color:white; font-size:12px;'>" + msg[i].name + " </div>",
									offset: new Winfo.Pixel(0, 0),
									cover: false
								}),
								strokeColor: "#6A5ACD",
								strokeOpacity: 1,
								strokeWeight: 2,
								strokeStyle: "dashed",
								strokeDasharray: "1 5 0",
								fillColor: "#6A5ACD",
								fillOpacity: 0.2,
								path: lngLats
							});
						sectionPolygons.push(polygon);
						winfoMap.addOverlay(polygon);
					}
				}
				if (event.iskq == true) {
					for (var i = 0; i < sectionPolygons.length; i++) {
						winfoMap.removeOverlay(sectionPolygons[i]);
					}
					sectionPolygons.splice(0, sectionPolygons.length)
				}
			}
		}
	});
}
// 图层------->画区域管控
function drawControlSection(event) {
	SubmitFrom({
		data: encodeURI("Action=getallDataWithLike"),
		url: "/gdmsaec/QYGKAction",
		success: function (msg) {
			if (msg != "0") {
				msg = msg.data;
				// 得到辖区之后，画出辖区内容
				if (event.iskq == false) {
					for (var i = 0; i < msg.length; i++) {
						// 如果坐标以";"结尾，那么就删掉分号
						if (msg[i].gkqzb.substr(-1) == ";") {
							msg[i].gkqzb = msg[i].gkqzb.substr(0, zb.length - 1);
						}
						zbArray = msg[i].gkqzb.split(";");
						var lngLats = [];
						if (msg[i].xslx == 'polygon') {
							for (var j = 0; j < zbArray.length; j++) {
								lngLats[j] = new Winfo.LngLat(parseFloat(zbArray[j].split(',')[1]), parseFloat(zbArray[j].split(',')[0]));
							}
							var polygon = new Winfo.Polygon({
									content: new Winfo.MarkerContent({
										content: "<div style='color:white; font-size:12px;'>" + msg[i].gkqmc + " </div>",
										offset: new Winfo.Pixel(0, 0),
										cover: false
									}),
									strokeColor: "green",
									strokeOpacity: 1,
									strokeWeight: 2,
									strokeStyle: "dashed",
									strokeDasharray: "1 5 0",
									fillColor: "green",
									fillOpacity: 0.2,
									path: lngLats
								});
							winfoMap.addOverlay(polygon);
							controlSectionPolygons.push(polygon);
						}
						if (msg[i].xslx == 'circle') {
							for (var j = 0; j < zbArray.length; j++) {
								lngLats[j] = new Winfo.LngLat(parseFloat(zbArray[j].split(',')[1]), parseFloat(zbArray[j].split(',')[0]));
							}
							var bound = new Winfo.Bounds(lngLats[0], lngLats[1]);
							var size = bound.getSize();
							circle = new Winfo.Circle({
									strokeColor: "#000000",
									strokeOpacity: 1,
									strokeOpacity: 0.2,
									strokeWeight: 2,
									strokeStyle: "dashed",
									strokeDasharray: "1 5 0",
									fillColor: "green",
									fillOpacity: 0.5,
									bound: bound,
									content: new Winfo.MarkerContent({
										content: "<div style='color:white; font-size:12px;'>" + msg[i].gkqmc + " </div>",
										offset: new Winfo.Pixel(0, 0),
										cover: false
									})
								});
							winfoMap.addOverlay(circle); // 添加对象
							controlSectionPolygons.push(circle);
						}
						if (msg[i].xslx == 'rectangle') {
							for (var j = 0; j < zbArray.length; j++) {
								lngLats[j] = new Winfo.LngLat(parseFloat(zbArray[j].split(',')[1]), parseFloat(zbArray[j].split(',')[0]));
							}
							var bound = new Winfo.Bounds(lngLats[0], lngLats[1]);
							var size = bound.getSize();
							// rectangle = new Winfo.Rectangle({ bound: bound, content:
							// new Winfo.MarkerContent({ content: "<div
							// style='color:#ffffff; font-size:12px;'>"+msg[i].gkqmc+"
							// </div>", fillColor: "#63B5C6",offset: new Winfo.Pixel(0,
							// 0), cover: false }) });
							rectangle = new Winfo.Rectangle({
									content: new Winfo.MarkerContent({
										content: "<div style='color:white; font-size:12px;'>" + msg[i].gkqmc + " </div>",
										offset: new Winfo.Pixel(0, 0),
										cover: false
									}),
									strokeColor: "green",
									strokeOpacity: 1,
									strokeWeight: 2,
									strokeStyle: "dashed",
									strokeDasharray: "1 5 0",
									fillColor: "green",
									fillOpacity: 0.2,
									bound: bound
								});
							winfoMap.addOverlay(rectangle); // 添加对象
							controlSectionPolygons.push(rectangle);
						}

					}
				}
				if (event.iskq == true) {
					for (var i = 0; i < controlSectionPolygons.length; i++) {
						winfoMap.removeOverlay(controlSectionPolygons[i]);
					}
					controlSectionPolygons.splice(0, controlSectionPolygons.length)
				}
			}
		}
	});
}

// 图层----->行政区域
/*
 * function drawAdministrativeSection(){
 * alert("在mapOperation.js----->drawAdministrativeSection添加数据并画图"); }
 */

function drawOverlay(event) {
	// 开启ais数据
	if (event.datatype != undefined && event.datatype.indexOf("ais") != -1) {
		if (aisLayer == null) {
			// 创建AIS图层
			// index：叠加顺序 100
			/*
			 * aisLayer = Winfo.DNCLayer.AIS( { index : 100 });
			 */
			aisLayer = new Winfo.DNCLayer.dynamic({
					index: 401,
					ds: "AIS",
					url: dataURL,
					dataprocess: dataProcess,
					mouseover: mouseover,
					interval: 30
				});
			winfoMap.addLayer(aisLayer); // 添加图层
		} else {
			if (event.iskq != true) {
				winfoMap.removeLayer(aisLayer);
				aisLayer = null;
			}
		}
	}
	// 开启vts数据
	if (event.datatype != undefined && event.datatype.indexOf("vts") != -1) {
		if (vtsLayer == null) {
			// 创建AIS图层
			// index：叠加顺序 100
			/*
			 * vtsLayer = Winfo.DNCLayer.VTS( { index : 100 });
			 */
			vtsLayer = new Winfo.DNCLayer.dynamic({
					index: 301,
					ds: "VTS",
					url: dataURL,
					dataprocess: dataProcess,
					mouseover: mouseover
				});
			vtsLayer.refresh(); // 静态图层时需要
			winfoMap.addLayer(vtsLayer); // 添加图层
		} else {
			if (event.iskq != true) {
				winfoMap.removeLayer(vtsLayer);
				vtsLayer = null;
			}
		}
	}
	// 通航要素
	else if (event.datatype != undefined && event.datatype.indexOf("thys") != -1) {
		var typeid = event.typeid;
		sessionStorage.setItem("tongHangYaoSuId", typeid)
		sxThys()
	} else if (event.datatype != undefined && event.datatype.indexOf("wbrh") != -1) // 物标融合
	{
		if (event.iskq == true) {
			aisLayer.merge({
				Layer: vtsLayer,
				close: false
			}); // AIS图层融合VTS图层
		} else {
			aisLayer.merge({
				Layer: vtsLayer,
				close: true
			}); // 关闭AIS/VTS融合
		}
	} else if (event.datatype != undefined && event.datatype.indexOf("swxx") != -1) // 水文信息
	{
		var swsj = event.swsj;
		if (event.iskq == true) {
			if (swzddata.length > 0) {
				for (i = 0; i < swzddata.length; i++) {
					winfoMap.removeOverlay(swzddata[i]);
				}
				swzddata = [];
			}
			for (i = 0; i < swsj.length; i++) {
				// 添加点覆盖物
				swzddata[swzddata.length] = addPointOverlay(swsj[i].MC, swsj[i].WZ);
			}
		} else {
			if (swzddata.length > 0) {
				for (i = 0; i < swzddata.length; i++) {
					winfoMap.removeOverlay(swzddata[i]);
				}
				swzddata = [];
			}
		}
	} else if (event.datatype != undefined && event.datatype.indexOf("zfsb") != -1) // 执法设备
	{
		var zfsb = event.zfsb;
		if (zfsb != undefined && zfsb != "" && zfsb != null) {
			if (event.iskq == true) {
				if (zfsbdata.length > 0) {
					for (i = 0; i < zfsbdata.length; i++) {
						winfoMap.removeOverlay(zfsbdata[i]);
					}
					zfsbdata = [];
				}
				for (i = 0; i < zfsb.length; i++) {
					// 添加点覆盖物
					zfsbdata[zfsbdata.length] = addZFSBPointOverlay(zfsb[i]);
				}
			} else {
				if (zfsbdata.length > 0) {
					for (i = 0; i < zfsbdata.length; i++) {
						winfoMap.removeOverlay(zfsbdata[i]);
					}
					zfsbdata = [];
				}
			}

		} else {
			if (zfsbdata.length > 0) {
				for (i = 0; i < zfsbdata.length; i++) {
					winfoMap.removeOverlay(zfsbdata[i]);
				}
				zfsbdata = [];
			}
		}
	}
	// 浮标数据
	if (event.datatype != undefined && event.datatype.indexOf("fb") != -1) {
		var fubiaoshuju = event.fubiaoshuju;
		if (fubiaoshuju != undefined && fubiaoshuju != "" && fubiaoshuju != null) {
			if (event.iskq == true) {
				if (fubiaoData.length > 0) {
					for (i = 0; i < fubiaoData.length; i++) {
						winfoMap.removeOverlay(fubiaoData[i]);
					}
					fubiaoData = [];
				}
				for (i = 0; i < fubiaoshuju.length; i++) {
					// 添加点覆盖物
					fubiaoData[fubiaoData.length] = openFubiaoPositionOverlay(fubiaoshuju[i]);
				}
			} else {
				if (fubiaoData.length > 0) {
					for (i = 0; i < fubiaoData.length; i++) {
						winfoMap.removeOverlay(fubiaoData[i]);
						winfoMap.removeOverlay(marker)
					}
					fubiaoData = [];
				}
			}
		} else {
			if (fubiaoData.length > 0) {
				for (i = 0; i < fubiaoData.length; i++) {
					winfoMap.removeOverlay(fubiaoData[i]);
				}
				fubiaoData = [];
			}
		}
	}
	// 侧方位
	else if (event.datatype != undefined && event.datatype.indexOf("cfw") != -1) {
		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}
		// 开启鼠标测量方位
		// 标绘参数 类似于 AzimuthCircle，请参见AzimuthCircle 参数
		// function（data） 当绘制完成时 回调函书 data：绘制完成后的 AzimuthCircle 对象
		mouseTool.openAzimuthCircle({}, function (data) {});
	}
	// 测距
	else if (event.datatype != undefined && event.datatype.indexOf("cj") != -1) {
		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}
		// 开启鼠测量距离
		// 标绘参数 类似于 Measure，Measure 参数
		// function（data） 当绘制完成时 回调函书 data：绘制完成后的 Measure 对象
		mouseTool.openMeasure({}, function (data) {});
	}
	// 定位点
	else if (event.datatype != undefined && event.datatype.indexOf("dwd") != -1) {
		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}
		var style = {};
		if (typeof(event.style) == "Object"
			 || typeof(event.style) == "object") {
			style = {
				draggable: event.draggable == undefined ? true
				 : event.draggable,
				icon: new Winfo.Icon({
					size: new Winfo.Size(event.style.size[0],
						event.style.size[1]),
					image: event.style.image,
					offset: new Winfo.Pixel(event.style.offset[0],
						event.style.offset[1])
				})
			};
		}
		mouseTool.drawPoint(style, function (data) {
			freeData = data;
			event.callback(data);
		});
	}

	// 绘制点
	else if (event.datatype == "d") {
		var iframeId = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// 创建鼠标控件
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // 添加控件
			}
			mouseTool.drawPoint({
				title: "我的标注",
				draggable: true
			}, function (data) {
				zdyData = data;
				if (top.document.getElementById(iframeId) != undefined && top.document.getElementById(iframeId).contentWindow.pageBack != undefined) {
					top.document.getElementById(iframeId).contentWindow.pageBack({
						data: zdyData // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}

				// 注册覆盖物移动时事件
				data.dragging(function (event) {
					// 判断子页面是否存在。
					if (top.document.getElementById(iframeId) != undefined && top.document.getElementById(iframeId).contentWindow.pageBack != undefined) {
						top.document.getElementById(iframeId).contentWindow.pageBack({
							data: event // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});
				// 标绘点移动后触发
				// data.dragend(function (event) {
				// inforWindow.setPosition(event.lnglat);
				// $("#log").html(event.lnglat.getLat() + "," + event.lnglat.getLng());
				// });

			});

	} // 绘制事故点
	else if (event.datatype == "sgd") {
		var iframeId = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// 创建鼠标控件
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // 添加控件
			}
			mouseTool.drawPoint({
				title: "我的标注",
				draggable: true,
				icon: new Winfo.Icon({
					size: new Winfo.Size(24, 24),
					image: "../../Image/XQXX/messge_hs.gif",
					offset: new Winfo.Pixel(-12, -24)
				})
			}, function (data) {
				zdyData = data;
				if (top.document.getElementById(iframeId) != undefined && top.document.getElementById(iframeId).contentWindow.pageBack != undefined) {
					top.document.getElementById(iframeId).contentWindow.pageBack({
						data: zdyData // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
				// 标绘点移动时触发
				data.dragging(function (event) {
					// 判断子页面是否存在。
					if (top.document.getElementById(iframeId) != undefined && top.document.getElementById(iframeId).contentWindow.pageBack != undefined) {
						top.document.getElementById(iframeId).contentWindow.pageBack({
							data: event // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});
				// 注册覆盖物移后的事件
				// data.dragend(function (event) {
				// inforWindow.setPosition(event.lnglat);
				// $("#log").html(event.lnglat.getLat() + "," + event.lnglat.getLng());
				// });

			});

	} else if (event.datatype == "x") {
		var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// 创建鼠标控件
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // 添加控件
			}
			// 开启鼠标绘制折线
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的 Polyline 对象
			mouseTool.drawPolyline({
				title: "线物标控制"
			}, function (data) {
				zdyData = data;
				zdyeditor = Winfo.PolyEditor(data);
				winfoMap.addOverlay(zdyeditor);
				if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						data: data.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
				// 标绘点新增 触发
				zdyeditor.addnode(function (event) {
					// 判断子页面是否存在。
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
							data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});
				// 标绘点移动 触发
				zdyeditor.adjust(function (event) {
					// 判断子页面是否存在。
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
							data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});
			});
	} else if (event.datatype == "m") {
		var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// 创建鼠标控件
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // 添加控件
			}
			// 开启鼠标绘制多边形
			// 标绘参数 类似于 Polygon，请参见Polygon 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的 Polyline 对象
			mouseTool.drawPolygon({
				title: "面物标控制"
			}, function (data) {
				zdyData = data;
				zdyeditor = Winfo.PolyEditor(data);
				winfoMap.addOverlay(zdyeditor);
				if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
					top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface({
						data: data.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
				// 标绘点新增 触发
				zdyeditor.addnode(function (event) {
					// 判断子页面是否存在。
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface({
							data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});
				// 标绘点移动 触发
				zdyeditor.adjust(function (event) {
					// 判断子页面是否存在。
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface({
							data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});
			});
	} else if (event.datatype == "jx") {
		var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// 创建鼠标控件
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // 添加控件
			}
			// 开启鼠标绘制多边形
			// 标绘参数 类似于 Polygon，请参见Polygon 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的 Polyline 对象
			mouseTool.drawRectangle({
				strokeColor: "#000000",
				strokeOpacity: 1,
				strokeWeight: 2,
				strokeStyle: "dashed",
				strokeDasharray: "1 5 0",
				fillColor: "#ffffff",
				fillOpacity: 0.5
			}, function (data) {
				zdyData = data;
				if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editjx != undefined) {
					top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editjx({
						data: data.bound // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
				zdyeditor = Winfo.RectangleEditor(data);
				winfoMap.addOverlay(zdyeditor);
				// 标绘点移动后触发
				zdyeditor.dragend(function (event) {
					zdyData = event.bound;
				});
				zdyeditor.adjust(function (event) {
					// 判断子页面是否存在。
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editjx != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editjx({
							data: event.bound // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});

			});
	} else if (event.datatype == "y") {

		var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// 创建鼠标控件
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // 添加控件
			}
			// 开启鼠标控件标绘圆物标
			// 标绘参数 类似于 Circle，请参见Circle 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的Circle 对象
			// 标绘参数 类似于 Circle，请参见Circle 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的Circle 对象
			mouseTool.drawCircle({
				strokeColor: "#000000",
				strokeOpacity: 1,
				strokeWeight: 2,
				strokeStyle: "dashed",
				strokeDasharray: "1 5 0",
				fillColor: "#ffffff",
				fillOpacity: 0.5
			}, function (data) {
				zdyData = data;
				zdyeditor = Winfo.CircleEditor(data);
				winfoMap.addOverlay(zdyeditor);
				if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						data: data.bound // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}

				// 标绘点移动 触发
				zdyeditor.adjust(function (event) {
					// 判断子页面是否存在。
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
							data: event.bound // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});
			});
	}
}

/** 关闭自定义标绘窗体* */
function zdywindow() {
	// 删除标绘框
	if (inforWindow != null) {
		winfoMap.removeOverlay(inforWindow);
	}
	if (zdyData != undefined && zdyData != null) { // 删除标绘
		winfoMap.removeOverlay(zdyData);
	}
	// 取消编辑状态
	winfoMap.removeOverlay(zdyeditor);
	relocationlist();

}

/** ***********************区域管控，点线面的添加结束--潘威龙(2014-10-29)******************************** */

var qygkwindow = null; /** *********区域管控弹出保存窗体对象******************** */
var qygkdata = null; /** *********区域管控海图对象******************** */
var polygonobj = [];

// 添加巡航重点水域
var cruiseMarker = null;
function drawCruiseArea(event) {
	if (cruiseMarker != null) {
		winfoMap.removeOverlay(cruiseMarker);
	}

	// ===============drawtype不为view时为添加区域须弹出信息窗体================================//
	// 设置弹出窗体初始参数
	var mysize = new Winfo.Size(400, 315); // 弹出窗体大小
	var myoffset = new Winfo.Pixel(50, 0); // 窗体偏移量
	var mycontent = "<iframe id='inforWindo_iframe' width=400px' height='300' style='border:none' src='../hsgl/cruiseAreaObject.html?drawtype=" + event.datatype + "' ></iframe>";
	if (event.drawtype == "add") {
		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}
		if (qygkdata != null) {
			qygkdata.qyid = event.qyid;
			polygonobj.push(qygkdata); // 将当前显示的物标添加到数组
		}

		if (event.datatype == "dian") // 点
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// 开启鼠标控件标绘点物标
			// 标绘参数 类似于 Marker，请参见Marker 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的Marker 对象
			var style = {};
			var e = arguments.callee.caller.arguments[0] || window.event;
			if (typeof(e.style) == "Object"
				 || typeof(e.style) == "object") {
				style = {
					draggable: event.draggable == undefined ? true
					 : event.draggable,
					icon: new Winfo.Icon({
						size: new Winfo.Size(event.style.size[0],
							event.style.size[1]),
						image: event.style.image,
						offset: new Winfo.Pixel(event.style.offset[0],
							event.style.offset[1])
					})
				};
			}

			mouseTool.drawPoint({
				title: "重点水域",
			}, function (data) {
				cruiseMarker = data;
				qygkdata = data;
				mycontent = "<iframe id='inforWindo_iframe' width=400px' height='300px;' style='border:none' src='../hsgl/cruiseAreaObject.html?drawtype=" + event.datatype + "&dianwz=" + data.lnglat.lat + "," + data.lnglat.lng + "' ></iframe>";
				qygkwindow = new Winfo.InfoWindow({
						size: mysize,
						offset: myoffset,
						content: mycontent
					});
				qygkwindow.closeed(function (event) {
					if (qygkdata != null) {
						winfoMap.removeOverlay(qygkdata);
					}
					top.cruiseEmphasisAreaList();
					qygkwindow = null;
				});
				qygkwindow.open(data.lnglat); // 打开信息窗体
				qygkwindow.visualDisplay(); // 显示在可视区域

				// 标绘点移动后触发
				data.dragend(function (dataevent) {
					if (document.getElementById('inforWindo_iframe') != null && document.getElementById('inforWindo_iframe').contentWindow != null) {
						document.getElementById('inforWindo_iframe').contentWindow.cruiseSetlatlng(dataevent.lnglat.lat, dataevent.lnglat.lng);
					}

				});

			});

		} else if (event.datatype == "m" || event.datatype == "polygon") // 面类型
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// 开启鼠标绘制多边形
			// 标绘参数 类似于 Polygon，请参见Polygon 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的 Polyline 对象
			mouseTool.drawPolygon({
				strokeColor: "#000000",
				strokeOpacity: 1,
				strokeWeight: 2,
				strokeStyle: "dashed",
				strokeDasharray: "1 5 0",
				fillColor: "#ffffff",
				fillOpacity: 0.5
			}, function (data) {
				qygkdata = data;
				qygkwindow = new Winfo.InfoWindow({
						size: mysize,
						offset: myoffset,
						content: mycontent
					});
				qygkwindow.closeed(function (event) {
					if (qygkdata != null)
						winfoMap.removeOverlay(qygkdata);

					top.cruiseEmphasisAreaList();
				});
				qygkwindow.open(data.path[0]); // 打开信息窗体
				AddFreeList(data, true, qygkwindow); // 开启编辑模式
				qygkwindow.visualDisplay(); // 显示在可视区域
			});
		} else if (event.datatype == "jx" || event.datatype == "rectangle") // 矩形
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// 开启鼠标控件标绘矩形物标标
			// 标绘参数 类似于 Rectangle ，请参见Rectangle 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的 Rectangle 对象
			mouseTool.drawRectangle({
				strokeColor: "#000000",
				strokeOpacity: 1,
				strokeWeight: 2,
				strokeStyle: "dashed",
				strokeDasharray: "1 5 0",
				fillColor: "#ffffff",
				fillOpacity: 0.5
			}, function (data) {
				qygkdata = data;
				qygkwindow = new Winfo.InfoWindow({
						size: mysize,
						offset: myoffset,
						content: mycontent
					});
				qygkwindow.closeed(function (event) {
					if (qygkdata != null && event.type == "click")
						winfoMap.removeOverlay(qygkdata);
					top.cruiseEmphasisAreaList();
				});
				qygkwindow.open(data.lnglat); // 打开信息窗体
				AddFreeList(data, true, qygkwindow); // 开启编辑模式
				qygkwindow.visualDisplay(); // 显示在可视区域
			});
		} else if (event.datatype == "y" || event.datatype == "circle") // 圆类型
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// 开启鼠标控件标绘圆物标
			// 标绘参数 类似于 Circle，请参见Circle 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的Circle 对象
			mouseTool.drawCircle({
				strokeColor: "#000000",
				strokeOpacity: 1,
				strokeWeight: 2,
				strokeStyle: "dashed",
				strokeDasharray: "1 5 0",
				fillColor: "#ffffff",
				fillOpacity: 0.5
			}, function (data) {
				qygkdata = data;
				qygkwindow = new Winfo.InfoWindow({
						size: mysize,
						offset: myoffset,
						content: mycontent
					});
				qygkwindow.closeed(function (event) {
					if (qygkdata != null && event.type == "click")
						winfoMap.removeOverlay(qygkdata);
					top.cruiseEmphasisAreaList();
				});
				qygkwindow.open(data.lnglat); // 打开信息窗体
				AddFreeList(data, true, qygkwindow); // 开启编辑模式
				qygkwindow.visualDisplay(); // 显示在可视区域
			});
		}

	}

	// ===============drawtype不为view时为添加区域须弹出信息窗体================================//
	else {
		if (event.show || event.drawtype == "edit") {
			var coorpath = [];
			var coors = [];
			if (event.path != undefined)
				coors = event.path.split(';');
			for (i = 0; i < coors.length; i++) {
				var coorobj = new Winfo.LngLat(parseFloat(coors[i].split(',')[1]), parseFloat(coors[i].split(',')[0]));
				coorpath.push(coorobj);
			}

			if (event.datatype == "dian") { // 点
				if (event.path != null && event.path != '') {
					var lnglatArr = event.path.split(',');

					var lnglat = new Winfo.LngLat(parseFloat(lnglatArr[1]), parseFloat(lnglatArr[0]));
					var marker = new Winfo.Marker({
							position: lnglat,
							draggable: true,
							icon: new Winfo.Icon({
								size: new Winfo.Size(24, 24),
								offset: new Winfo.Pixel(-12, -12)
							})
						});
					winfoMap.addOverlay(marker); // 添加覆盖物
					cruiseMarker = marker;
					// 注册覆盖物的点击事件
					marker.click(function (mevent) {
						closeqygkwindow();
						mycontent = "<iframe id='inforWindo_iframe' width=400px' height='300px;' style='border:none' src='../hsgl/cruiseAreaObject.html?drawtype=" + event.datatype + "&dianwz=" + mevent.lnglat.lat + "," + mevent.lnglat.lng + "' ></iframe>";
						qygkwindow = new Winfo.InfoWindow({
								size: mysize,
								offset: myoffset,
								content: mycontent
							});
						qygkwindow.closeed(function (cevent) {
							// 删除覆盖物
							if (marker != null) {
								winfoMap.removeOverlay(marker);
							}
							if (cruiseMarker != null) {
								winfoMap.removeOverlay(cruiseMarker);
							}
							top.cruiseEmphasisAreaList();
							qygkwindow = null;
						});
						qygkwindow.open(mevent.lnglat); // 打开信息窗体
						qygkwindow.visualDisplay(); // 显示在可视区域
						if (document.getElementById('inforWindo_iframe') != null && document.getElementById('inforWindo_iframe').contentWindow != null) {
							document.getElementById('inforWindo_iframe').contentWindow.cruiseSetlatlng(mevent.lnglat.lat, mevent.lnglat.lng);
						}
					});

					winfoMap.panTo(lnglat);
					mycontent = "<iframe id='inforWindo_iframe' width=400px' height='300px;' style='border:none' src='../hsgl/cruiseAreaObject.html?drawtype=" + event.datatype + "&dianwz=" + event.path + "' ></iframe>";
					qygkwindow = new Winfo.InfoWindow({
							size: mysize,
							offset: myoffset,
							content: mycontent
						});
					qygkwindow.closeed(function (event) {
						/*
						 * if(cruisePointdata!=null){
						 * winfoMap.removeOverlay(cruisePointdata); }
						 */// 删除覆盖物
						if (marker != null) {
							winfoMap.removeOverlay(marker);
						}
						top.cruiseEmphasisAreaList();
					});
					qygkwindow.open(lnglat); // 打开信息窗体
					qygkwindow.visualDisplay(); // 显示在可视区域
				}

				qygkdata = new Object();
				qygkdata.title = event.title; // 管控名称
				qygkdata.qyid = event.qyid; // 区域ID
				qygkdata.path = event.path; // 坐标
				qygkdata.datatype = "edit"; // 显示类型
				qygkdata.bz = event.bz; // 备注

			} else if (event.datatype == "m" || event.datatype == "polygon") // 多边形
			{
				var mycolor = "#d54c7e";
				if (event.color != null) {
					mycolor = event.color;
				}
				var polygon = new Winfo.Polygon({
						content: new Winfo.MarkerContent({
							content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
							offset: new Winfo.Pixel(0, 0),
							cover: false
						}),
						strokeColor: mycolor,
						strokeOpacity: 1,
						strokeWeight: 2,
						strokeStyle: "dashed",
						strokeDasharray: "1 5 0",
						fillColor: mycolor,
						fillOpacity: 0.2,
						path: coorpath
					});
				polygon.bound.qyid = event.qyid;
				btnbound.push(polygon.bound);
				if (event.drawtype == "view") {
					polygon.mousemove(function () {
						var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(coorpath[0].lng, coorpath[0].lat));
						// 当区域在图中缩放太小时候将不显示按钮
						if (winfoMap.getLevel() > 8) {
							event.myobj.css({
								left: "" + pmcoor.x + "px",
								top: "" + pmcoor.y + "px",
								width: 200 + "px"
							}).show();
						}
					});

					polygon.mousedown(function () {
						event.myobj.hide();
					}).mouseout(function () {
						event.myobj.hide();
					});
				} else {
					qygkdata = polygon;
					qygkdata.coors = coorpath;

					qygkdata.title = event.title; // 管控名称
					qygkdata.qyid = event.qyid; // 区域ID
					qygkdata.sfqy = event.sfqy; // 是否启用
					qygkdata.datatype = "edit"; // 显示类型
					qygkdata.gklx = event.gklx; // 管控类型
					qygkdata.bz = event.bz; // 备注
					qygkdata.thysid = event.thysid; // 通航要素ID
					qygkdata.thystypeid = event.thystypeid; // 通航要素类型ID
					qygkdata.thysmc = event.thysmc; // 通航要素名称
					qygkwindow = new Winfo.InfoWindow({
							size: mysize,
							offset: myoffset,
							content: mycontent
						});
					qygkwindow.open(coorpath[0]); // 打开信息窗体
					qygkwindow.closeed(function (event) {
						if (qygkdata != null)
							winfoMap.removeOverlay(qygkdata);
						top.cruiseEmphasisAreaList();
					});
					AddFreeList(polygon, true, qygkwindow); // 开启编辑模式
					qygkwindow.visualDisplay(); // 显示在可视区域
				}

				winfoMap.addOverlay(polygon); // 添加覆盖物
				polygon.qyid = event.qyid;
				polygonobj.push(polygon); // 将对象添加到数组中。显示多个时候防止对象混乱；根据区域ID区分

				if (event.sfdw != "no") {
					winfoMap.panToBound(polygon.bound);
					// winfoMap.setZoom(9);
				}

			} else if (event.datatype == "jx" || event.datatype == "rectangle") // 矩形
			{
				var mycolor = "#d54c7e";
				if (event.color != null) {
					mycolor = event.color;
				}
				var bound = new Winfo.Bounds(coorpath[0], coorpath[1]);
				bound.qyid = event.qyid;
				btnbound.push(bound);
				var rectangle = new Winfo.Rectangle({
						content: new Winfo.MarkerContent({
							content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
							offset: new Winfo.Pixel(0, 0),
							cover: false
						}),
						strokeColor: mycolor,
						strokeOpacity: 1,
						strokeWeight: 2,
						strokeStyle: "dashed",
						strokeDasharray: "1 5 0",
						fillColor: mycolor,
						fillOpacity: 0.2,
						bound: bound
					});
				if (event.drawtype == "view") {
					rectangle.mousemove(function () {
						var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(coorpath[0].lng, coorpath[1].lat));

						// 当区域在图中缩放太小时候将不显示按钮
						if (winfoMap.getLevel() > 8) {
							event.myobj.css({
								left: "" + pmcoor.x + "px",
								top: "" + pmcoor.y + "px",
								width: 200 + "px"
							}).show();
						}
					});
					rectangle.mousedown(function () {
						event.myobj.hide();
					}).mouseout(function () {
						event.myobj.hide();
					});
				} else {
					qygkdata = rectangle;
					qygkdata.coors = coorpath;

					qygkdata.title = event.title; // 管控名称
					qygkdata.qyid = event.qyid; // 区域ID
					qygkdata.sfqy = event.sfqy; // 是否启用
					qygkdata.datatype = "edit"; // 显示类型
					qygkdata.gklx = event.gklx; // 管控类型
					qygkdata.bz = event.bz; // 备注
					qygkdata.thysid = event.thysid; // 通航要素ID
					qygkdata.thystypeid = event.thystypeid; // 通航要素类型ID
					qygkdata.thysmc = event.thysmc; // 通航要素名称
					qygkwindow = new Winfo.InfoWindow({
							size: mysize,
							offset: new Winfo.Pixel(100, -100),
							content: mycontent
						});
					qygkwindow.open(coorpath[0]); // 打开信息窗体
					qygkwindow.closeed(function (event) {
						if (qygkdata.type == "clcik" && qygkdata != null)
							winfoMap.removeOverlay(qygkdata);
						top.cruiseEmphasisAreaList();
					});
					AddFreeList(rectangle, true, qygkwindow); // 开启编辑模式
					qygkwindow.visualDisplay(); // 显示在可视区域
				}

				winfoMap.addOverlay(rectangle); // 添加覆盖物
				rectangle.qyid = event.qyid;
				polygonobj.push(rectangle);

				if (event.sfdw != "no") {
					winfoMap.panToBound(rectangle.bound);
					// winfoMap.setZoom(9);
				}
			} else if (event.datatype == "y" || event.datatype == "circle") // 圆
			{
				var mycolor = "#d54c7e";
				if (event.color != null) {
					mycolor = event.color;
				}
				var bound = new Winfo.Bounds(coorpath[0], coorpath[1]);
				bound.qyid = event.qyid;
				btnbound.push(bound);
				var circle = new Winfo.Circle({
						content: new Winfo.MarkerContent({
							content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
							offset: new Winfo.Pixel(0, 0),
							cover: false
						}),
						strokeColor: mycolor,
						static: false,
						strokeOpacity: 1,
						strokeWeight: 2,
						strokeStyle: "dashed",
						strokeDasharray: "1 5 0",
						fillColor: mycolor,
						fillOpacity: 0.2,
						bound: bound
					});
				circle.mousemove(function () {
					var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(circle.lnglat.getLng(), circle.lnglat.getLat()));

					// 当区域在图中缩放太小时候将不显示按钮
					if (winfoMap.getLevel() > 8) {
						event.myobj.css({
							left: "" + pmcoor.x + "px",
							top: "" + pmcoor.y + "px",
							width: 200 + "px"
						}).show();
					}
				});

				circle.mousedown(function () {
					event.myobj.hide();
				}).mouseout(function () {
					event.myobj.hide();
				});

				winfoMap.addOverlay(circle); // 添加对象

				circle.qyid = event.qyid;
				polygonobj.push(circle);
				if (event.sfdw != "no") {
					winfoMap.panToBound(circle.bound);
					// winfoMap.setZoom(9);
				}
			}
		} else if (event.drawtype == "check") {
			top.getIframe();
			var checksize = new Winfo.Size(430, 330); // 弹出窗体大小
			var checkoffset = new Winfo.Pixel(50, 0); // 窗体偏移量
			var checkcontent = "";
			var coorpath = [];
			var coors = [];
			if (event.path != undefined)
				coors = event.path.split(';');
			for (i = 0; i < coors.length; i++) {
				var coorobj = new Winfo.LngLat(parseFloat(coors[i].split(',')[1]), parseFloat(coors[i].split(',')[0]));
				coorpath.push(coorobj);
			}
			qygkdata = new Object();
			qygkdata.title = event.title; // 管控名称
			qygkdata.qyid = event.qyid; // 区域ID
			qygkdata.path = event.path; // 坐标
			qygkdata.datatype = event.datatype; // 显示类型
			qygkdata.bz = event.bz; // 备注
			qygkdata.layerIndex = event.layerIndex;

			if (event.datatype == "dian") { // 点
				if (event.path != null && event.path != '') {
					var lnglatArr = event.path.split(',');

					var lnglat = new Winfo.LngLat(parseFloat(lnglatArr[1]), parseFloat(lnglatArr[0]));
					var marker = new Winfo.Marker({
							position: lnglat,
							draggable: true,
							icon: new Winfo.Icon({
								size: new Winfo.Size(24, 24),
								offset: new Winfo.Pixel(-12, -12)
							})
						});
					winfoMap.addOverlay(marker); // 添加覆盖物
					cruiseMarker = marker;
					// 注册覆盖物的点击事件

					winfoMap.panTo(lnglat);
					var index = $.layer({
							type: 2,
							shade: [0],
							fix: false,
							maxmin: true,
							title: event.title,
							border: [0],
							area: ['380px', '320px'],
							iframe: {
								src: "../../View/hsgl/checkCruiseArea.html?drawtype=" + event.datatype + "&dianwz=" + event.path + "&content=" + event.bz + "&name=" + event.title + "&id=" + event.qyid + "&layerIndex=" + event.layerIndex
							},
							close: function (index) {
								if (qygkdata != null) {
									top.cruiseListPage(qygkdata.layerIndex);
									qygkdata.drawtype = 'close';
									drawCruiseArea(qygkdata);
								}
							}
						});

					/*
					 * qygkwindow.open(lnglat); // 打开信息窗体
					 * qygkwindow.visualDisplay();// 显示在可视区域
					 */
				}

			} else if (event.datatype == "m" || event.datatype == "polygon") // 多边形
			{
				var mycolor = "#d54c7e";
				if (event.color != null) {
					mycolor = event.color;
				}
				var polygon = new Winfo.Polygon({
						content: new Winfo.MarkerContent({
							content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
							offset: new Winfo.Pixel(0, 0),
							cover: false
						}),
						strokeColor: mycolor,
						strokeOpacity: 1,
						strokeWeight: 2,
						strokeStyle: "dashed",
						strokeDasharray: "1 5 0",
						fillColor: mycolor,
						fillOpacity: 0.2,
						path: coorpath
					});
				polygon.bound.qyid = event.qyid;
				btnbound.push(polygon.bound);
				// "view"
				polygon.mousemove(function () {
					var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(coorpath[0].lng, coorpath[0].lat));
					// 当区域在图中缩放太小时候将不显示按钮
					if (winfoMap.getLevel() > 8) {
						// event.myobj.css( {
						// left : "" +pmcoor.x + "px",
						// top : "" +pmcoor.y + "px",
						// width : 200 + "px"
						// }).show();
					}
				});

				polygon.mousedown(function () {
					// event.myobj.hide();
				}).mouseout(function () {
					// event.myobj.hide();
				});

				// 打开页面
				var index = $.layer({
						type: 2,
						shade: [0],
						fix: false,
						maxmin: true,
						title: event.title,
						border: [0],
						area: ['380px', '320px'],
						iframe: {
							src: "../../View/hsgl/checkCruiseArea.html?drawtype=" + event.datatype + "&dianwz=" + event.path + "&content=" + event.bz + "&name=" + event.title + "&id=" + event.qyid + "&layerIndex=" + event.layerIndex
						},
						close: function (index) {
							if (qygkdata != null) {
								top.cruiseListPage(qygkdata.layerIndex);
								qygkdata.drawtype = 'close';
								drawCruiseArea(qygkdata);
							}
						}
					});
				// checkcontent="<iframe id='inforWindo_iframe' width=430px' height='310px;'
				// style='border:none'
				// src='../hsgl/checkCruiseArea.html?drawtype="+event.datatype+"&dianwz="+event.path+"&content="+event.bz+"&name="+event.title+"&id="+event.qyid+"&layerIndex="+event.layerIndex+"'
				// ></iframe>";
				// checkoffset =new Winfo.Pixel(0, 100);//窗体偏移量
				// qygkwindow = new Winfo.InfoWindow({size : checksize,offset :
				// checkoffset,content :checkcontent });
				// qygkwindow.open(coorpath[0]); // 打开信息窗体
				// qygkwindow.closeed(function(event){
				// if(qygkdata!=null){
				// top.cruiseListPage(qygkdata.layerIndex);
				// qygkdata.drawtype='close';
				// drawCruiseArea(qygkdata);
				// }
				// });


				winfoMap.addOverlay(polygon); // 添加覆盖物
				polygon.qyid = event.qyid;
				polygonobj.push(polygon); // 将对象添加到数组中。显示多个时候防止对象混乱；根据区域ID区分

				if (event.sfdw != "no") {
					winfoMap.panToBound(polygon.bound);
					// winfoMap.setZoom(9);
				}
			} else if (event.datatype == "rectangle") {
				// 矩形
				var mycolor = "#d54c7e";
				if (event.color != null) {
					mycolor = event.color;
				}
				var bound = new Winfo.Bounds(coorpath[0], coorpath[1]);
				bound.qyid = event.qyid;
				btnbound.push(bound);
				var rectangle = new Winfo.Rectangle({
						content: new Winfo.MarkerContent({
							content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
							offset: new Winfo.Pixel(0, 0),
							cover: false
						}),
						strokeColor: mycolor,
						strokeOpacity: 1,
						strokeWeight: 2,
						strokeStyle: "dashed",
						strokeDasharray: "1 5 0",
						fillColor: mycolor,
						fillOpacity: 0.2,
						bound: bound
					});
				// view
				rectangle.mousemove(function () {
					var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(coorpath[0].lng, coorpath[1].lat));

					// 当区域在图中缩放太小时候将不显示按钮
					if (winfoMap.getLevel() > 8) {
						event.myobj.css({
							left: "" + pmcoor.x + "px",
							top: "" + pmcoor.y + "px",
							width: 200 + "px"
						}).show();
					}
				});
				rectangle.mousedown(function () {
					event.myobj.hide();
				}).mouseout(function () {
					event.myobj.hide();
				});

				/*
				 * // 打开页面 checkcontent="<iframe id='inforWindo_iframe'
				 * width=430px' height='310px;' style='border:none'
				 * src='../hsgl/checkCruiseArea.html?drawtype="+event.datatype+"&dianwz="+event.path+"&content="+event.bz+"&name="+event.title+"&id="+event.qyid+"&layerIndex="+event.layerIndex+"' ></iframe>";
				 * checkoffset =new Winfo.Pixel(0, 200);// 窗体偏移量 qygkwindow =
				 * new Winfo.InfoWindow({size : checksize,offset :
				 * checkoffset,content :checkcontent });
				 * qygkwindow.open(coorpath[0]); // 打开信息窗体
				 * qygkwindow.closeed(function(event){ if(qygkdata!=null){
				 * top.cruiseListPage(qygkdata.layerIndex);
				 * qygkdata.drawtype='close'; drawCruiseArea(qygkdata); }
				 *
				 * });
				 */

				// 打开页面
				var index = $.layer({
						type: 2,
						shade: [0],
						fix: false,
						maxmin: true,
						title: event.title,
						border: [0],
						area: ['380px', '320px'],
						iframe: {
							src: "../../View/hsgl/checkCruiseArea.html?drawtype=" + event.datatype + "&dianwz=" + event.path + "&content=" + event.bz + "&name=" + event.title + "&id=" + event.qyid + "&layerIndex=" + event.layerIndex
						},
						close: function (index) {
							if (qygkdata != null) {
								top.cruiseListPage(qygkdata.layerIndex);
								qygkdata.drawtype = 'close';
								drawCruiseArea(qygkdata);
							}
						}
					});

				winfoMap.addOverlay(rectangle); // 添加覆盖物
				rectangle.qyid = event.qyid;
				polygonobj.push(rectangle)

				winfoMap.panToBound(rectangle.bound);
				// winfoMap.setZoom(9);
			} else if (event.datatype == "circle") // 圆
			{

				var mycolor = "#d54c7e";
				if (event.color != null) {
					mycolor = event.color;
				}
				var bound = new Winfo.Bounds(coorpath[0], coorpath[1]);
				bound.qyid = event.qyid;
				btnbound.push(bound);
				var circle = new Winfo.Circle({
						content: new Winfo.MarkerContent({
							content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
							offset: new Winfo.Pixel(0, 0),
							cover: false
						}),
						strokeColor: mycolor,
						static: false,
						strokeOpacity: 1,
						strokeWeight: 2,
						strokeStyle: "dashed",
						strokeDasharray: "1 5 0",
						fillColor: mycolor,
						fillOpacity: 0.2,
						bound: bound
					});
				circle.mousemove(function () {
					var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(circle.lnglat.getLng(), circle.lnglat.getLat()));

					// 当区域在图中缩放太小时候将不显示按钮
					if (winfoMap.getLevel() > 8) {
						event.myobj.css({
							left: "" + pmcoor.x + "px",
							top: "" + pmcoor.y + "px",
							width: 200 + "px"
						}).show();
					}
				});

				circle.mousedown(function () {
					event.myobj.hide();
				}).mouseout(function () {
					event.myobj.hide();
				});

				/*
				 * // 打开页面 checkcontent="<iframe id='inforWindo_iframe'
				 * width=430px' height='310px;' style='border:none'
				 * src='../hsgl/checkCruiseArea.html?drawtype="+event.datatype+"&dianwz="+event.path+"&content="+event.bz+"&name="+event.title+"&id="+event.qyid+"&layerIndex="+event.layerIndex+"' ></iframe>";
				 * checkoffset =new Winfo.Pixel(0, 200);// 窗体偏移量 qygkwindow =
				 * new Winfo.InfoWindow({size : checksize,offset :
				 * checkoffset,content :checkcontent });
				 * qygkwindow.open(coorpath[0]); // 打开信息窗体
				 * qygkwindow.closeed(function(event){ if(qygkdata!=null){
				 * top.cruiseListPage(qygkdata.layerIndex);
				 * qygkdata.drawtype='close'; drawCruiseArea(qygkdata); }
				 * });
				 */
				// 打开页面
				var index = $.layer({
						type: 2,
						shade: [0],
						fix: false,
						maxmin: true,
						title: event.title,
						border: [0],
						area: ['380px', '320px'],
						iframe: {
							src: "../../View/hsgl/checkCruiseArea.html?drawtype=" + event.datatype + "&dianwz=" + event.path + "&content=" + event.bz + "&name=" + event.title + "&id=" + event.qyid + "&layerIndex=" + event.layerIndex
						},
						close: function (index) {
							if (qygkdata != null) {
								top.cruiseListPage(qygkdata.layerIndex);
								qygkdata.drawtype = 'close';
								drawCruiseArea(qygkdata);
							}
						}
					});
				winfoMap.addOverlay(circle); // 添加对象

				circle.qyid = event.qyid;
				polygonobj.push(circle);
				winfoMap.panToBound(circle.bound);
				// winfoMap.setZoom(9);
			}
		} else {
			var delteobject = null;
			for (i = 0; i < polygonobj.length; i++) {
				if (polygonobj[i].qyid == event.qyid) {
					winfoMap.removeOverlay(polygonobj[i]); // 删除覆盖物
					delteobject = polygonobj[i];
				}
			}
			var newpolygonobj = [];
			for (i = 0; i < polygonobj.length; i++) {
				if (polygonobj[i] != delteobject) {
					newpolygonobj[newpolygonobj.length] = polygonobj[i];
				}
			}
			polygonobj = newpolygonobj;
		}
	}

}

// 移除物标
function removeCruisemark() {
	if (cruiseMarker != null) {
		winfoMap.removeOverlay(cruiseMarker);
	}
}

var gkqIndex = null;

function toCloseQYGK() {
	if (gkqIndex != null) {
		layer.close(gkqIndex);
		// $('#xubox_layer' + gkqIndex).find('.xubox_close').click();
	}
}

// 添加管控区
function drawOverlayByQYGK(event) {

	toCloseQYGK();
	// ===============drawtype不为view时为添加区域须弹出信息窗体================================//
	// 设置弹出窗体初始参数
	var mysize = new Winfo.Size(302, 265); // 弹出窗体大小
	var myoffset = new Winfo.Pixel(50, 0); // 窗体偏移量
	var mycontent = "<iframe id='inforWindo_iframe' width=285px' height='250' style='border:none' src='../WinfoENC/freeobject.html'></iframe>";
	if (event.drawtype == "add") {
		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}
		if (qygkdata != null) {
			qygkdata.qyid = event.qyid;
			polygonobj.push(qygkdata); // 将当前显示的物标添加到数组
		}
		if (event.datatype == "m" || event.datatype == "polygon") // 面类型
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// 开启鼠标绘制多边形
			// 标绘参数 类似于 Polygon，请参见Polygon 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的 Polyline 对象
			mouseTool.drawPolygon({
				strokeColor: "#000000",
				strokeOpacity: 1,
				strokeWeight: 2,
				strokeStyle: "dashed",
				strokeDasharray: "1 5 0",
				fillColor: "#ffffff",
				fillOpacity: 0.5
			}, function (data) {
				qygkdata = data;
				// qygkwindow = new Winfo.InfoWindow({size : mysize,offset : myoffset,content
				// :mycontent });
				// qygkwindow.closeed(function(event){
				// if(qygkdata!=null)
				// winfoMap.removeOverlay(qygkdata);
				// });
				// qygkwindow.open(data.path[0]); // 打开信息窗体
				// AddFreeList(data, true,qygkwindow); // 开启编辑模式
				// qygkwindow.visualDisplay();// 显示在可视区域
				gkqIndex = $.layer({
						type: 2,
						shade: [0],
						fix: false,
						maxmin: true,
						title: "区域管理",
						border: [3, 0.1, '#000'],
						iframe: {
							src: "../WinfoENC/freeobject.html"
						},
						area: ['350px', '400px'],
						// area: ['350px' , '265px'],
						close: function (index) {
							gkqIndex = null;
							if (qygkdata != null)
								winfoMap.removeOverlay(qygkdata);
							$(parent.document).find('#sidebar-shortcuts-large').css('display', '');
						}
					});

			});
		} else if (event.datatype == "jx" || event.datatype == "rectangle") // 矩形
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// 开启鼠标控件标绘矩形物标标
			// 标绘参数 类似于 Rectangle ，请参见Rectangle 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的 Rectangle 对象
			mouseTool.drawRectangle({
				strokeColor: "#000000",
				strokeOpacity: 1,
				strokeWeight: 2,
				strokeStyle: "dashed",
				strokeDasharray: "1 5 0",
				fillColor: "#ffffff",
				fillOpacity: 0.5
			}, function (data) {
				qygkdata = data;
//				console.log(data);
				// qygkwindow = new Winfo.InfoWindow({size : mysize,offset : myoffset,content
				// :mycontent });
				// qygkwindow.closeed(function(event){
				// if(qygkdata!=null&&event.type=="click")
				// winfoMap.removeOverlay(qygkdata);
				// });
				// qygkwindow.open(data.lnglat); // 打开信息窗体
				// AddFreeList(data, true,qygkwindow); // 开启编辑模式
				// qygkwindow.visualDisplay();// 显示在可视区域
				gkqIndex = $.layer({
						type: 2,
						shade: [0],
						fix: false,
						maxmin: true,
						title: "区域管理",
						border: [3, 0.1, '#000'],
						iframe: {
							src: "../WinfoENC/freeobject.html"
						},
						area: ['350px', '400px'],
						// area: ['350px' , '265px'],
						close: function (index) {
							gkqIndex = null;
							if (qygkdata != null)
								winfoMap.removeOverlay(qygkdata);

							$(parent.document).find('#sidebar-shortcuts-large').css('display', '');
						}
					});
			});
		} else if (event.datatype == "y" || event.datatype == "circle") // 圆类型
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// 开启鼠标控件标绘圆物标
			// 标绘参数 类似于 Circle，请参见Circle 参数
			// function（data） 当绘制完成时 回调函书 data：绘制完成后的Circle 对象
			mouseTool.drawCircle({
				strokeColor: "#000000",
				strokeOpacity: 1,
				strokeWeight: 2,
				strokeStyle: "dashed",
				strokeDasharray: "1 5 0",
				fillColor: "#ffffff",
				fillOpacity: 0.5
			}, function (data) {
				qygkdata = data;
//				console.log(data);
				gkqIndex = $.layer({
						type: 2,
						shade: [0],
						fix: false,
						maxmin: true,
						title: "区域管理",
						border: [3, 0.1, '#000'],
						iframe: {
							src: "../WinfoENC/freeobject.html"
						},
						area: ['350px', '400px'],
						// area: ['350px' , '265px'],
						close: function (index) {
							gkqIndex = null;
							if (qygkdata != null)
								winfoMap.removeOverlay(qygkdata);
							$(parent.document).find('#sidebar-shortcuts-large').css('display', '');
						}
					}); // 显示在可视区域
			});
		}

	}
	// ===============drawtype不为view时为添加区域须弹出信息窗体================================//
	else {
		if (event.show || event.drawtype == "edit" || event.showfpz) {
			var coorpath = [];
			var coors = [];
			if (event.path != undefined)
				coors = event.path.split(';')
					for (i = 0; i < coors.length; i++) {
						var coorobj = new Winfo.LngLat(parseFloat(coors[i].split(',')[1]), parseFloat(coors[i].split(',')[0]));
						coorpath.push(coorobj);
					}
					if (event.datatype == "polygon") // 多边形
					{
						var mycolor = "#d54c7e";
						if (event.color != null) {
							mycolor = event.color;
						}
						var polygon = new Winfo.Polygon({
								content: new Winfo.MarkerContent({
									content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
									offset: new Winfo.Pixel(0, 0),
									cover: false
								}),
								strokeColor: mycolor,
								strokeOpacity: 1,
								strokeWeight: 2,
								strokeStyle: "dashed",
								strokeDasharray: "1 5 0",
								fillColor: mycolor,
								fillOpacity: 0.2,
								path: coorpath
							});
						polygon.bound.qyid = event.qyid;
						btnbound.push(polygon.bound);
						winfoMap.addOverlay(polygon); // 添加覆盖物
						polygon.qyid = event.qyid;
						polygonobj.push(polygon); // 将对象添加到数组中。显示多个时候防止对象混乱；根据区域ID区分

						if (event.sfdw != "no") {
							winfoMap.panToBound(polygon.bound);
							// winfoMap.setZoom(9);
						}
						if (event.drawtype == "view") {
							polygon.mousemove(function () {
								var zblng = 0;
								var zblat = 0;
								for (var i = 0; i < coorpath.length; i++) {
									if (zblat < coorpath[i].lat) {
										zblng = coorpath[i].lng;
										zblat = coorpath[i].lat;
									}
								}
								var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(zblng, zblat));
								// 当区域在图中缩放太小时候将不显示按钮
								if (winfoMap.getLevel() > 8) {
									event.myobj.css({
										left: "" + pmcoor.x + "px",
										top: "" + pmcoor.y + "px",
										width: 200 + "px"
									}).show();
								}
							});

							polygon.mousedown(function () {
								event.myobj.hide();
							}).mouseout(function () {
								event.myobj.hide();
							});
						} else {
							qygkdata = polygon;
							qygkdata.coors = coorpath;

							qygkdata.title = event.title; // 管控名称
							qygkdata.qyid = event.qyid; // 区域ID
							qygkdata.sfqy = event.sfqy; // 是否启用
							qygkdata.datatype = "edit"; // 显示类型
							qygkdata.gklx = event.gklx; // 管控类型
							qygkdata.bz = event.bz; // 备注
							qygkdata.thysid = event.thysid; // 通航要素ID
							qygkdata.thystypeid = event.thystypeid; // 通航要素类型ID
							qygkdata.thysmc = event.thysmc; // 通航要素名称
                            qygkdata.statuteFullId = event.statuteFullId;
                            qygkdata.statuteArticle = event.statuteArticle;

							gkqIndex = $.layer({
									type: 2,
									shade: [0],
									fix: false,
									maxmin: true,
									title: "区域管理",
									border: [3, 0.1, '#000'],
									iframe: {
										src: "../WinfoENC/freeobject.html"
									},
									area: ['350px', '400px'],
									// area: ['350px' , '265px'],
									close: function (index) {
										gkqIndex = null;
										if (qygkdata != null)
											winfoMap.removeOverlay(qygkdata);
										$(parent.document).find('#sidebar-shortcuts-large').css('display', '');
									}
								});
							/*
							 * qygkwindow = new Winfo.InfoWindow({size : mysize,offset :
							 * myoffset,content :mycontent }); qygkwindow.open(coorpath[0]); //
							 * 打开信息窗体 qygkwindow.closeed(function(event){ if(qygkdata!=null)
							 * winfoMap.removeOverlay(qygkdata); });
							 */
							AddFreeList(polygon, true, qygkwindow); // 开启编辑模式
							// qygkwindow.visualDisplay();// 显示在可视区域
						}

						

					} else if (event.datatype == "rectangle") // 矩形
					{
						var mycolor = "#d54c7e";
						if (event.color != null) {
							mycolor = event.color;
						}
						var bound = new Winfo.Bounds(coorpath[0], coorpath[1]);
						bound.qyid = event.qyid;
						btnbound.push(bound);
						var rectangle = new Winfo.Rectangle({
								content: new Winfo.MarkerContent({
									content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
									offset: new Winfo.Pixel(0, 0),
									cover: false
								}),
								strokeColor: mycolor,
								strokeOpacity: 1,
								strokeWeight: 2,
								strokeStyle: "dashed",
								strokeDasharray: "1 5 0",
								fillColor: mycolor,
								fillOpacity: 0.2,
								bound: bound
							});
						winfoMap.addOverlay(rectangle); // 添加覆盖物
						rectangle.qyid = event.qyid;
						polygonobj.push(rectangle);
						if (event.sfdw != "no") {
							winfoMap.panToBound(rectangle.bound);
							// winfoMap.setZoom(9);
						}
						if (event.drawtype == "view") {
							rectangle.mousemove(function () {
								var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(coorpath[0].lng, coorpath[1].lat));

								// 当区域在图中缩放太小时候将不显示按钮
								if (winfoMap.getLevel() > 8) {
									event.myobj.css({
										left: "" + pmcoor.x + "px",
										top: "" + pmcoor.y + "px",
										width: 200 + "px"
									}).show();
								}
							});
							rectangle.mousedown(function () {
								event.myobj.hide();
							}).mouseout(function () {
								event.myobj.hide();
							});
							
						} else {
							qygkdata = rectangle;
							qygkdata.coors = coorpath;

							qygkdata.title = event.title; // 管控名称
							qygkdata.qyid = event.qyid; // 区域ID
							qygkdata.sfqy = event.sfqy; // 是否启用
							qygkdata.datatype = "edit"; // 显示类型
							qygkdata.gklx = event.gklx; // 管控类型
							qygkdata.bz = event.bz; // 备注
							qygkdata.thysid = event.thysid; // 通航要素ID
							qygkdata.thystypeid = event.thystypeid; // 通航要素类型ID
							qygkdata.thysmc = event.thysmc; // 通航要素名称
                            qygkdata.statuteFullId = event.statuteFullId; //法条编号
                            qygkdata.statuteArticle = event.statuteArticle;

							gkqIndex = $.layer({
									type: 2,
									shade: [0],
									fix: false,
									maxmin: true,
									title: "区域管理",
									border: [3, 0.1, '#000'],
									iframe: {
										src: "../WinfoENC/freeobject.html"
									},
									area: ['350px', '400px'],
									// area: ['350px' , '265px'],
									close: function (index) {
										gkqIndex = null;
										if (qygkdata != null)
											winfoMap.removeOverlay(qygkdata);
										$(parent.document).find('#sidebar-shortcuts-large').css('display', '');
									}
								});
							/*
							 * qygkwindow = new Winfo.InfoWindow({size : mysize,offset :
							 * new Winfo.Pixel(100, -100),content :mycontent });
							 * qygkwindow.open(coorpath[0]); // 打开信息窗体
							 * qygkwindow.closeed(function(event){
							 * if(qygkdata.type=="clcik"&&qygkdata!=null)
							 * winfoMap.removeOverlay(qygkdata); });
							 */
							AddFreeList(rectangle, true, qygkwindow); // 开启编辑模式
							// qygkwindow.visualDisplay();// 显示在可视区域
						}
						
					} else if (event.datatype == "circle") // 圆
					{
						var mycolor = "#d54c7e";
						if (event.color != null) {
							mycolor = event.color;
						}
						var bound = null;
						if (event.showfpz) {
							bound = getfpzbound(coorpath);
						} else {
							bound = new Winfo.Bounds(coorpath[0], coorpath[1]);
						}
						bound.qyid = event.qyid;
						btnbound.push(bound);
						var circle = new Winfo.Circle({
								content: new Winfo.MarkerContent({
									content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
									offset: new Winfo.Pixel(0, 0),
									cover: false
								}),
								strokeColor: mycolor,
								static: false,
								strokeOpacity: 1,
								strokeWeight: 2,
								strokeStyle: "dashed",
								strokeDasharray: "1 5 0",
								fillColor: mycolor,
								fillOpacity: 0.2,
								bound: bound
							});
						winfoMap.addOverlay(circle); // 添加对象
						circle.qyid = event.qyid;
						polygonobj.push(circle);
						if (event.sfdw != "no") {
							winfoMap.panToBound(circle.bound);
							// winfoMap.setZoom(9);
						}
						if (event.drawtype == "view") {
							circle.mousemove(function () {
								var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(circle.lnglat.getLng(), circle.lnglat.getLat()));

								// 当区域在图中缩放太小时候将不显示按钮
								if (winfoMap.getLevel() > 8) {
									event.myobj.css({
										left: "" + pmcoor.x + "px",
										top: "" + pmcoor.y + "px",
										width: 200 + "px"
									}).show();
								}
							});

							circle.mousedown(function () {
								event.myobj.hide();
							}).mouseout(function () {
								event.myobj.hide();
							});
						} else {
							qygkdata = circle;
							qygkdata.coors = coorpath;

							qygkdata.title = event.title; // 管控名称
							qygkdata.qyid = event.qyid; // 区域ID
							qygkdata.sfqy = event.sfqy; // 是否启用
							qygkdata.datatype = "edit"; // 显示类型
							qygkdata.gklx = event.gklx; // 管控类型
							qygkdata.bz = event.bz; // 备注
							qygkdata.thysid = event.thysid; // 通航要素ID
							qygkdata.thystypeid = event.thystypeid; // 通航要素类型ID
							qygkdata.thysmc = event.thysmc; // 通航要素名称
                            qygkdata.statuteFullId = event.statuteFullId; //法条编号
                            qygkdata.statuteArticle = event.statuteArticle;
							gkqIndex = $.layer({
									type: 2,
									shade: [0],
									fix: false,
									maxmin: true,
									title: "区域管理",
									border: [3, 0.1, '#000'],
									iframe: {
										src: "../WinfoENC/freeobject.html"
									},
									area: ['350px', '400px'],
									// area: ['350px' , '265px'],
									close: function (index) {
										gkqIndex = null;
										if (qygkdata != null)
											winfoMap.removeOverlay(qygkdata);
										$(parent.document).find('#sidebar-shortcuts-large').css('display', '');
									}
								});
							/*
							 * qygkwindow = new Winfo.InfoWindow({size : mysize,offset :
							 * new Winfo.Pixel(100, -100),content :mycontent });
							 * qygkwindow.open(coorpath[0]); // 打开信息窗体
							 * qygkwindow.closeed(function(event){
							 * if(qygkdata.type=="clcik"&&qygkdata!=null)
							 * winfoMap.removeOverlay(qygkdata); });
							 */
							AddFreeList(circle, true, qygkwindow); // 开启编辑模式
							// qygkwindow.visualDisplay();// 显示在可视区域
						}
						
					}
		} else {
			var delteobject = null;
			for (i = 0; i < polygonobj.length; i++) {
				if (polygonobj[i].qyid == event.qyid) {
					winfoMap.removeOverlay(polygonobj[i]); // 删除覆盖物
					delteobject = polygonobj[i];
				}
			}
			var newpolygonobj = [];
			for (i = 0; i < polygonobj.length; i++) {
				if (polygonobj[i] != delteobject) {
					newpolygonobj[newpolygonobj.length] = polygonobj[i];
				}
			}
			polygonobj = newpolygonobj;
		}
	}
}
// 添加安全预警区
function drawOverlayByAQYJ(event) {
	if (mouseTool == null) {
		// 创建鼠标控件
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // 添加控件
	}

	if (event != null && event.datatype == "m") // 多边形
	{
		mouseTool.drawPolygon({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			var zbObj = data.path;
			var zbOne = "";
			var zbStr = "";
			for (var zbi = 0; zbi < zbObj.length; zbi++) {
				var lat = zbObj[zbi].lat;
				var lng = zbObj[zbi].lng;
				zbOne = lng + "," + lat;
				zbStr += zbOne + ";";
			}
			zbStr = zbStr.substring(0, zbStr.length - 1);
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域船舶预警</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				maxmin: true,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/yujingQuyuAdd.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '480px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	} else if (event != null && event.datatype == "jx") // 矩形
	{
		mouseTool.drawRectangle({}, function (data) {
			var zbStr = data.lnglat.lng + ',' + data.lnglat.lat + ';' + data.lnglat.lng + ',' + data.rlnglat.lat + ';' + data.rlnglat.lng + ',' + data.lnglat.lat + ';' + data.rlnglat.lng + ',' + data.rlnglat.lat;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域船舶预警</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				maxmin: true,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/yujingQuyuAdd.html?type=zidingyi&zdyzb=other" + zbStr
				},
				area: ['630px', '480px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	} else if (event != null && event.datatype == "y") // 圆
	{
		mouseTool.drawCircle({}, function (data) {
			// longitude经度, latitude纬度
			// 中心点 lnglat 经度 lng 纬度 lat
			var longitude = data.lnglat.lng;
			var latitude = data.lnglat.lat;
			var rlong = data.rlnglat.lng;
			var rlat = data.rlnglat.lat;
			var raidusMile = top.getGreatCircleDistance(latitude, longitude, rlat, rlong);
			var PI = 3.14159265;
			var EARTH_RADIUS = 6378137;
			var RAD = Math.PI / 180.0;
			var degree = (24901 * 1609) / 360.0;
			var dpmLat = 1 / degree;
			var radiusLat = dpmLat * raidusMile;
			var minLat = latitude - radiusLat;
			var maxLat = latitude + radiusLat;
			var mpdLng = degree * Math.cos(latitude * (PI / 180));
			var dpmLng = 1 / mpdLng;
			var radiusLng = dpmLng * raidusMile;
			var minLng = longitude - radiusLng;
			var maxLng = longitude + radiusLng;
			var zbStr = maxLng + ',' + maxLat + ';' + maxLng + ',' + minLat + ';' + minLng + ',' + minLat + ';' + minLng + ',' + maxLat;
			// var
			// zbStr=data.lnglat.lng+','+data.lnglat.lat+';'+data.lnglat.lng+','+data.rlnglat.lat+';'+data.rlnglat.lng+','+data.lnglat.lat+';'+data.rlnglat.lng+','+data.rlnglat.lat;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域船舶预警</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				maxmin: true,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/yujingQuyuAdd.html?type=zidingyi&zdyzb=other" + zbStr + "&lnglat=" + latitude + "," + longitude + "&bjjl=" + raidusMile
				},
				area: ['630px', '480px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	}
}
// 添加自动预警区
function drawOverlayByZDYJ(event) {
	yjzdyInfo = null;
	if (event.datatype == "face") {
		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}
		// 开启鼠标绘制多边形
		// 标绘参数 类似于 Polygon，请参见Polygon 参数
		// function（data） 当绘制完成时 回调函书 data：绘制完成后的 Polyline 对象
		mouseTool.drawPolygon({}, function (data) {
			if (inforWindow != null) {
				inforWindow.close({
					iscloseed: false
				});
			}
			zdyData = data;
			inforWindow = new Winfo.InfoWindow({
					size: new Winfo.Size(290, 290),
					offset: new Winfo.Pixel(0, 0),
					content: "<iframe id='zidongyujing_iframe' width='285px' height='270px' style='border:none' src='../hsgl/zdqyyj.html?shapeType=face'></iframe>"
				});
			inforWindow.open(data.path[0]); // 打开信息窗体
			inforWindow.visualDisplay(); // 显示在可视区域内
			inforWindow.closeed(function (eve) {
				if (data != null) {
					winfoMap.removeOverlay(data);
				}
				relocationlist(); // 刷新海图标绘列表

			});

			　　　　　　　zdyeditor = Winfo.PolyEditor(data);
			winfoMap.addOverlay(zdyeditor); // 添加海图覆盖物
			// 标绘点移动 触发
			zdyeditor.adjust(function (event) {
				// 判断子页面是否存在。
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
			// 标绘点新增 触发
			zdyeditor.addnode(function (event) {
				// 判断子页面是否存在。
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
		});

	} else if (event.datatype == "rectangle") {

		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}
		if (inforWindow != null) {
			inforWindow.close({
				iscloseed: false
			});
		}
		// 开启鼠标绘制多边形
		// 标绘参数 类似于 Polygon，请参见Polygon 参数
		// function（data） 当绘制完成时 回调函书 data：绘制完成后的 Polyline 对象
		mouseTool.drawRectangle({
			strokeColor: "#000000",
			strokeOpacity: 1,
			strokeWeight: 2,
			strokeStyle: "dashed",
			strokeDasharray: "1 5 0",
			fillColor: "#ffffff",
			fillOpacity: 0.5
		}, function (data) {
			zdyData = data;
			inforWindow = new Winfo.InfoWindow({
					size: new Winfo.Size(290, 290),
					offset: new Winfo.Pixel(50, 0),
					content: "<iframe id='zidongyujing_iframe' width='285px' height='270px' style='border:none' src='../hsgl/zdqyyj.html?shapeType=rectangle'></iframe>"
				});
			inforWindow.closeed(function (event) {
				if (zdyData != null && event.type == "click") {
					winfoMap.removeOverlay(zdyData);
				}
				winfoMap.removeOverlay(zdyeditor);
				relocationlist(); // 刷新海图标绘列表
			});
			inforWindow.open(data.lnglat); // 打开信息窗体
			inforWindow.visualDisplay(); // 显示在可视区域
			// AddFreeList(data, true,inforWindow); // 开启编辑模式 (object, bool,windowOject)
			zdyeditor = Winfo.RectangleEditor(data);
			winfoMap.addOverlay(zdyeditor); // 添加海图覆盖物

			// 标绘点移动后触发
			zdyeditor.dragend(function (event) {
				zdyData = event.object;
				inforWindow.open(data.lnglat); // 打开信息窗体
				inforWindow.visualDisplay(); // 显示在可视区域内
			});
			zdyeditor.adjust(function (event) {
				// 判断子页面是否存在。
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: event.object // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
			// 标绘点移动前触发
			zdyeditor.dragstart(function (event) { // {iscolsed:false}判断是否调用inforWindow.closeed方法，false为不调用，只调用默认方法
				inforWindow.close();
			});
		});
	} else if (event.datatype == "circle") {
		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}
		if (inforWindow != null) {
			inforWindow.close({
				iscloseed: false
			});
		}
		// 开启鼠标控件标绘圆物标
		// 标绘参数 类似于 Circle，请参见Circle 参数
		// function（data） 当绘制完成时 回调函书 data：绘制完成后的Circle 对象
		// 标绘参数 类似于 Circle，请参见Circle 参数
		// function（data） 当绘制完成时 回调函书 data：绘制完成后的Circle 对象
		mouseTool.drawCircle({
			strokeColor: "#000000",
			strokeOpacity: 1,
			strokeWeight: 2,
			strokeStyle: "dashed",
			strokeDasharray: "1 5 0",
			fillColor: "#ffffff",
			fillOpacity: 0.5
		}, function (data) {
			if (inforWindow != null) {
				inforWindow.close({
					iscloseed: false
				});
			}
			zdyData = data;
			inforWindow = new Winfo.InfoWindow({
					size: new Winfo.Size(290, 290),
					offset: new Winfo.Pixel(0, 0),
					content: "<iframe id='zidongyujing_iframe' width='285px' height='270px' style='border:none' src='../hsgl/zdqyyj.html?shapeType=circle'></iframe>"
				});
			inforWindow.open(data.lnglat); // 打开信息窗体
			inforWindow.visualDisplay(); // 显示在可视区域内
			// AddFreeList(data, true,inforWindow); // 开启编辑模式
			// inforWindow.open(data.path[0]); // 打开信息窗体
			inforWindow.closeed(function (eve) {
				if (data != null) {
					winfoMap.removeOverlay(data);
				}
				relocationlist(); // 刷新海图标绘列表

			});
			zdyeditor = Winfo.CircleEditor(data);
			winfoMap.addOverlay(zdyeditor); // 添加海图覆盖物
			// 标绘点移动 触发
			zdyeditor.adjust(function (event) {
				var coorpath = []; // 圆的两个坐标
				coorpath[0] = event.bound.getWestSouth();
				coorpath[1] = event.bound.getEastNorth();
				// 判断子页面是否存在。
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: coorpath // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
		});
	}
}

// 区域管控页面弹出初始化时所用的坐标等参数
function qygkParam() {
	return qygkdata;
}

/** ***开启标绘物编辑模式***** */
/** ***object编辑对象*************** */
/** ***bool是否开启*************** */
/** ***windowOject弹出窗体对象*************** */
var free_objects = [];
var editor;
function AddFreeList(object, bool, windowOject) {
	if (object != undefined) {
		if (bool == true) {
			if (object.type == "marker") {
				return;
			}
			if (object.type == "circle") {
				editor = Winfo.CircleEditor(object);
				winfoMap.addOverlay(editor);

				// 标绘点移动后触发
				editor.dragend(function (data) {
					if(windowOject){
						windowOject.open(data.lnglat); // 打开信息窗体
						windowOject.visualDisplay(); // 显示在可视区域内
					}					
				});

				// 标绘点移动前触发
				editor.dragstart(function (event) {
					if(windowOject){
						windowOject.close();
					}
				});

				return;
			}
			if (object.type == 'rectangle') {
				editor = Winfo.RectangleEditor(object);
				winfoMap.addOverlay(editor);

				// 标绘点移动后触发
				editor.dragend(function (data) {
					if(windowOject){
						windowOject.open(data.lnglat); // 打开信息窗体
						windowOject.visualDisplay(); // 显示在可视区域内
					}	
					if (document.getElementById('inforWindo_iframe') != null && document.getElementById('inforWindo_iframe').contentWindow != null) {
						document.getElementById('inforWindo_iframe').contentWindow.setpoint(event);
					}
				});

				// 标绘点移动前触发
				editor.dragstart(function (event) {
					if(windowOject){
						windowOject.close();
					}
				});
				return;
			}
			if (object.type == 'polygon' || object.type == 'polyline') {
				editor = Winfo.PolyEditor(object);
				editor.adjust(function (event) {
					if (document.getElementById('inforWindo_iframe') != null && document.getElementById('inforWindo_iframe').contentWindow != null) {
						document.getElementById('inforWindo_iframe').contentWindow.setpoint(event);
					}
				});
				winfoMap.addOverlay(editor);
				return;
			}
		} else {
			winfoMap.removeOverlay(editor);
		}
	}
}

function closeCheckCruiseWindow(type) {
	// 删除标绘框
	if (qygkwindow != null) {
		winfoMap.removeOverlay(qygkwindow);
		qygkwindow = null;
	}
	if (zdsywindow != null) {
		winfoMap.removeOverlay(zdsywindow);
		zdsywindow = null;
	}

	if (type == 'dian') {
		removeCruisemark();
	} else {
		if (qygkdata != undefined && qygkdata != null) {
			// winfoMap.removeOverlay(qygkdata);
			qygkdata.drawtype = 'close';
			drawCruiseArea(qygkdata);
		}
		if (zdsydata != undefined && zdsydata != null) {
			// winfoMap.removeOverlay(zdsydata);
			zdsydata.drawtype = 'close';
			drawCruiseArea(zdsydata);
		}
	}
	// 取消编辑状态
	winfoMap.removeOverlay(editor);

}

/** 关闭区域管控窗体* */
function closeqygkwindow() {
	// 删除标绘框
	if (qygkwindow != null) {
		winfoMap.removeOverlay(qygkwindow);
	}
	if (qygkdata != undefined && qygkdata != null) {
		winfoMap.removeOverlay(qygkdata);
	}
	// 取消编辑状态
	winfoMap.removeOverlay(editor);

}

/** 关闭区域管控窗体* */
function closezdsywindow() {
	// 删除标绘框
	if (zdsywindow != null) {
		winfoMap.removeOverlay(zdsywindow);
	}
	if (zdsydata != undefined && zdsydata != null) {
		winfoMap.removeOverlay(zdsydata);
	}
	// 取消编辑状态
	winfoMap.removeOverlay(editor);

}
var paramObj = new Object();
function afteredit(param) {
	paramObj = param;
	closeqygkwindow();
	closezdsywindow();
	top.showqygk(param);
	// top.showzdsy(param);
	$("#chuanboshaixuan").attr("src", "QuYuGuanKong/guankongtiaojian.html?ID=" + param.qyid + "&gklx=" + param.gklx);
	creatwindow("filter", param.title);
	toCloseQYGK();
}
var hqthys = null;
function toqygkthys(name) {
//	debugger;
	if (hqthys == null) {
		var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_hqthys" style="color: #669FC7;margin-top:-7px">&nbsp;获取通航要素</i></h4><input type="hidden" value="' + name + '" id="tparentName"/>';
		hqthys = $.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "QuYuGuanKong/qygkthys.html?ver=0"
				},
				area: ['600px', '350px'],
				close: function (index) {
					hqthys = null;
				}
			});
	}
}

function latoqygkthys(name) {
	if (hqthys == null) {
		var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_hqthys" style="color: #669FC7;margin-top:-7px">&nbsp;获取通航要素</i></h4><input type="hidden" value="' + name + '" id="tparentName"/>';
		hqthys = $.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "QuYuGuanKong/qygkthys.html?ver=1"
				},
				area: ['600px', '350px'],
				close: function (index) {
					console.log(23);
					hqthys = null;
				}
			});
	}
}

var updthys = null;
function updateqygkthys(id, name) {
	if (updthys == null) {
		var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_updthys" style="color: #669FC7;margin-top:-7px">&nbsp;修改通航要素</i></h4><input type="hidden" id="tparentName" value=' + name + '></h4>';
		updthys = $.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "QuYuGuanKong/qygkthys.html?id=" + id
				},
				area: ['600px', '350px'],
				close: function (index) {
					updthys = null;
				}
			});
	} else {
        layer.close(updthys);
    }
}

function updatelaqygkthys(id, name) {
	if (updthys == null) {
		var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_updthys" style="color: #669FC7;margin-top:-7px">&nbsp;修改通航要素</i><input type="hidden" id="tparentName" value=' + name + '></h4>';
		updthys = $.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "QuYuGuanKong/qygkthys.html?id=" + id + "&ver=1"
				},
				area: ['600px', '350px'],
				close: function (index) {
					console.log(22);
					updthys = null;
				}
			});
	} else {
        layer.close(updthys);
    }
}

function closeLayerByHtml(index) {
	layer.close(index);
};

function setqygkthys(thysValue) {
	// document.getElementById("inforWindo_iframe").contentWindow.getthysValue(thysValue);
	document.getElementById($('#tparentName').val()).contentWindow.getthysValue(thysValue);
}

function setlaqygkthys(thysValue) {
	document.getElementById($('#tparentName').val()).contentWindow.getlathysValue(thysValue);
}

/** ***********************区域管控，点线面的添加结束--潘威龙(2014-10-29)******************************** */

// 海图定位
function encPosition(event) {
	if (event.data != undefined) {
		var d = event.data.split(',');
		var p = new Winfo.LngLat(parseFloat(d[1]), parseFloat(d[0]));
		winfoMap.panTo(p, true); // 设置新的中心点(以当前物标为中心)
	}
}

// 删除海图物标
function removeOverlay(event) {
	if (event.data != undefined && event.data != null) {
		winfoMap.removeOverlay(event.data);
	}
}

// 获取通航要素数据
function getgeographicData() {
	var type = "" // 获取通航要素数据
		if (geographicLayer != null) {
			type = geographicLayer.getType();
			return type;
		}
}

// 添加覆盖物
function addOverlay(event) {
	if (event.datatype == "d") {
		var style = {};
		if (typeof(event.style) == "Object"
			 || typeof(event.style) == "object") {
			style = {
				draggable: event.draggable == undefined ? true
				 : event.draggable,
				icon: new Winfo.Icon({
					size: new Winfo.Size(event.style.size[0],
						event.style.size[1]),
					image: event.style.image,
					offset: new Winfo.Pixel(event.style.offset[0],
						event.style.offset[1])
				})
			};
		}
		style.position = new Winfo.LngLat(parseFloat(event.position[1]),
				parseFloat(event.position[0]));
		var marker = new Winfo.Marker(style);
		winfoMap.addOverlay(marker); // 添加覆盖物
		if (typeof(event.callback) == "function") {
			event.callback(marker);
		}
	} else if (event.datatype == "dwd") { // 定位点
		var style = {};
		if (typeof(event.style) == "Object"
			 || typeof(event.style) == "object") {
			style = {
				draggable: event.draggable == undefined ? true
				 : event.draggable,
				icon: new Winfo.Icon({
					size: new Winfo.Size(event.style.size[0],
						event.style.size[1]),
					image: event.style.image,
					offset: new Winfo.Pixel(event.style.offset[0],
						event.style.offset[1])
				})
			};
		}
		style.position = new Winfo.LngLat(parseFloat(event.position[1]),
				parseFloat(event.position[0]));
		var marker = new Winfo.Marker(style);
		winfoMap.addOverlay(marker); // 添加覆盖物
		if (typeof(event.callback) == "function") {
			event.callback(marker);
		}

	}
}
// 获取海图标绘参数
function drawOverlayParam() {
	return freeData;
}
// 获取自定义海图标绘参数
function drawzdyParam() {
	return zdyData;
}
function removeOverlay(id) {
	// 删除标绘框
	if (inforWindow != null) {
		winfoMap.removeOverlay(inforWindow);
	}
	// 取消编辑状态
	winfoMap.removeOverlay(editor);

	if (freeData != null) {
		freeData.qyid = id;
	}
}

// 删除海图物标
function remove(data) {
	if (data != undefined && data != null) {
		winfoMap.removeOverlay(data);
	}
}

/*
 * 获取AIS数据 param 查询条件参数 page 当前显示页面 records 总记录数
 */
function getShipData(param) {
	if (aisLayer == null) {
		aisLayer = Winfo.DNCLayer.AIS({
				index: 100,
				refreshed: getAISList
			});
		winfoMap.addLayer(aisLayer); // 添加图层
	}

	if (param.ID != null) {
		var data = [];
		var Newparam={}
		Newparam.Callsign=param.HH;
		Newparam.Dest=param.MDD;
		Newparam.Draught=param.ZDCS;
		Newparam.ETA=param.ETA;
		Newparam.IMO=param.IMO;
		Newparam.COG = param.HX;
		Newparam.Lat = param.WD;
		Newparam.Lon = param.JD;
		Newparam.MMSI = param.ID;
		Newparam.NameCN = param.ZWCM != undefined ? param.ZWCM : "";
		Newparam.NameEN = param.CM;
		Newparam.NavState = param.DHZT
		Newparam.SBI = {};
		Newparam.SOG = param.HS;
		Newparam.TRACKDATA = [];
		Newparam.TimeStamp = param.CJSJ;
		Newparam.VesselType = param.CLX;
		Newparam.Vx = param.TX;
		Newparam.Vy = param.TY;
		Newparam.X = param.X;
		Newparam.Y = param.Y;
		Newparam.NULLCM = param.NULLCM!= undefined ? param.NULLCM : "";
		Newparam.VesselLength=param.CC;
		Newparam.VesselBreadth=param.CK;
		Newparam.SJLY = param.SJLY;		
		data.push(Newparam);
		setAisLayerList(aisLayer, data);
	} else {
		$.ajax({
			type: 'GET',
			url: scfAddressUrl + "/rest/searchShip/" + param,
			dataType: 'text',
			processData: false,
			contentType: 'application/json',
			success: function (msg) {
				if (msg != "") {
					var result = eval('(' + msg + ')');
					var paramCB = [],
					param = {};
					if (result.DATAS.length == 1) {
						var datas = result.DATAS[0];
						param.Callsign=datas.HH;
						param.Dest=datas.MDD;
						param.Draught=datas.ZDCS;
						param.ETA=datas.ETA;
						param.IMO=datas.IMO;
						param.COG = datas.HX;
						param.Lat = datas.WD;
						param.Lon = datas.JD;
						param.MMSI = datas.ID;
						param.NameCN = datas.ZWCM != undefined ? datas.ZWCM : "";
						param.NameEN = datas.CM;
						param.NavState = datas.DHZT;
						param.SBI = {};
						param.SOG = datas.HS;
						param.TRACKDATA = [];
						param.TimeStamp = datas.CJSJ;
						param.VesselType = datas.CLX;
						param.Vx = datas.TX;
						param.Vy = datas.TY;
						param.X = datas.X;
						param.Y = datas.Y;
						param.NULLCM = datas.NULLCM != undefined ? datas.NULLCM : "";
						param.VesselLength=datas.CC;
						param.VesselBreadth=datas.CK;
						param.SJLY = datas.SJLY;
						paramCB.push(param)								
					}else if(result.DATAS.length > 1){
						paramCB=result.DATAS
					}
					setAisLayerList(aisLayer, paramCB);
				} else {
					layer.close(layerControl.zhongdiangenzong)//重点关注页面数据异常的时候关闭重点关注页面
					alertStr("数据异常！请联系管理员！");
				}
			},
			error: function (req, status, ex) {
				return false;
			}
		});
	}
}


function setAisLayerList(aisLayer, data) {
	if (data.length > 1) {
		top.$("#div_sousuo").show();
		vesselData = data;		
		top.showShipList(vesselData, "CB");
	} else if (data.length == 1) {
		var obj = data[0];
		// 如果有AIS船名为空标识，则清空CM
		if (obj.NULLCM) {
			obj.NameCN = "";
		}
		// 如果数据来源是非实时数据
		if (obj.SJLY == 2) {
			layer.close(layerControl.zhongdiangenzong)//重点关注页面数据异常的时候关闭重点关注页面
			layerControl.aisdsts = top.$.layer({
					shade: [0.5, '#000', true],
					type: 0,
					shadeClose: true,
					fix: true,
					border: [1, 0.3, '#000', true],
					area: ['400px', 'auto'],
					offset: ['150px', '50%'],
					dialog: {
						msg: '温馨提示：该船舶的AIS信号已丢失!如需查看最后的AIS信号位置请点击"查看"按钮!',
						btns: 2,
						type: 4,
						btn: ['查看', '取消'],
						yes: function () {
							top.layer.close(layerControl.aisdsts);
							removeAndShow(aisLayer, obj);
							var jd = obj.Lon;
							var wd = obj.Lat;
							if (jd != null && wd != null && jd != 0 && wd != 0) {
								var event = {};
								event.data = wd + "," + jd;
								event.operattype = "position";
								funControl(event);
								var lnglat = new Winfo.LngLat(parseFloat(jd),parseFloat(wd));
								var jdArr = NumToDegree(jd);
								var wdArr = NumToDegree(wd);
								var jdStr = jdArr[0] + "°" + jdArr[1] + "′" + jdArr[2] + "″";
								var wdStr = wdArr[0] + "°" + wdArr[1] + "′" + wdArr[2] + "″";
								if (offline_ship != null) {
									winfoMap.removeOverlay(offline_ship);
								}
								offline_ship = new Winfo.Marker({
										position: lnglat,
										draggable: false,
										title: "MMSI：" + obj.MMSI + "\r\n英文船文：" + obj.NameCN + "\r\n最后位置：" + wdStr + "," + jdStr + "\r\n最后时间：" + obj.CJSJ,
										icon: new Winfo.Icon({
											size: new Winfo.Size(25, 25),
											image: "../../Image/ship_offline.png",
											offset: new Winfo.Pixel(-12, -12)
										})
									});
								winfoMap.addOverlay(offline_ship); // 添加覆盖物
							}
						},
						no: function () {
							layer.close(layerControl.zhongdiangenzong)
						}
					}
				});
		}
		// 如果数据来源是本地精态数据
		else if (obj.SJLY == 3) {
				layer.close(layerControl.zhongdiangenzong)//重点关注页面数据异常的时候关闭重点关注页面
			layerControl.aisdsts = top.$.layer({
					shade: [0.5, '#000', true],
					type: 0,
					shadeClose: true,
					fix: true,
					border: [1, 0.3, '#000', true],
					area: ['400px', 'auto'],
					offset: ['150px', '50%'],
					dialog: {
						msg: '温馨提示：该船舶的数据为静态数据，无法定位!',
						btns: 2,
						type: 4,
						btn: ['确认', '取消'],
						yes: function () {							
							top.layer.close(layerControl.aisdsts);
							if (!(/^\+?[0-9][0-9]*$/.test(obj.MMSI)) || obj.MMSI.length != 9) {
								obj.MMSI = "";
							}
							obj.NameCN = "";
							removeAndShow(aisLayer, obj);
						},
						no: function () {
							top.layer.close(layerControl.aisdsts);
						}
					}
				});
		}
		// 如果数据来源是实时数据
		else if (obj.SJLY == 1) {
			removeAndShow(aisLayer, obj);
			winfoMap.panTo(new Winfo.LngLat(obj.Lon, obj.Lat));
		}
	} else if (data.length == 0) {
		alertStr("未查询到该船舶，请尝试修改关键词重新搜索！");
	}
}

var vesselData=null
function removeAndShow(aisLayer, objj) {
	top.$("#div_sousuo").hide();
	// 当选择的船舶不是重点跟踪船舶时,取消船舶物标高亮选中
	/*
	 * if (aisLayer != null && vesselData != null) aisLayer.uncheckObject({ info :
	 * vesselData }); if (vtsLayer != null && vesselData != null) {
	 * vtsLayer.uncheckObject({ info : vesselData }); }
	 */
	var checkaisList = aisLayer.GetCheckList();
	if (checkaisList != null && checkaisList != "") {
		var checkAisIds = checkaisList.split(",");
		for (var j = 0; j < checkAisIds.length; j++) {
			var cbobj = {};
			var datasource = {}
			datasource.MMSI = checkAisIds[j];
			cbobj.datasource = datasource;
			aisLayer.CheckObject(cbobj);
		}
	}
	if (aisLayer != null && vesselLayerObject != null
		 && vesselLayerObject.datasource != undefined) {
		/*
		 * var jd = vesselLayerObject.datasource.JD; var wd =
		 * vesselLayerObject.datasource.WD;
		 */
		var p = new Winfo.LngLat(vesselLayerObject.datasource.Lon, vesselLayerObject.datasource.Lat);
		winfoMap.panTo(p, true); // 设置新的中心点(以当前物标为中心)
		/*
		 * aisLayer.uncheckObject({ info : vesselLayerObject.datasource });
		 */
	}
	if (geographicLayer != null && vesselLayerObject != null) {
		geographicLayer.uncheckObject({
			object: vesselLayerObject
		});
	}
	vesselLayerObject = new Object();
	vesselLayerObject.datasource = objj;
	// aisLayer.CheckObject(data[i].value[0]);//高亮选中物标
	aisLayer.CheckObject(vesselLayerObject);
	vesselData = objj;	
	if (aisLayer.name == "winfo.vessel.AIS.layer") {
		cbxx(objj, aisLayer.name)
	} else {
		cbxx(objj, "")
	}
}

function funControl(event) {
	if (top.document.getElementById("main_iframe").contentWindow.pageCallBack != undefined
		 && typeof(top.document.getElementById("main_iframe").contentWindow.pageCallBack) == "function") {
		top.document.getElementById("main_iframe").contentWindow.pageCallBack(event);
	}
}

// 获取通航要素数据
var list = top.savethysxq;
function getTHYSdata(param) {
	if (list != null) {
		if (param.ID != null) { // 选择下拉列表后
			var data = [];
			for (var i = 0; i < list.length; i++) {
				if (list[i].YSMC == param.YSMC && list[i].ID == param.ID) {
					data.push(list[i]);
				}
			}
			setTHYSdata(data);
		} else {
			var data = [];
			for (var i = 0; i < list.length; i++) {
				if (list[i].YSMC.indexOf(param) >= 0) {
					data.push(list[i]);
				}
			}
			setTHYSdata(data);
		}
	}
}

function setTHYSdata(data) {
	if (data != null) {
		if (data.length > 1) {
			top.$("#div_sousuo").show();
			vesselData = data;
			top.showShipList(vesselData, "THYS");
		} else if (data.length == 1) {
			top.$("#div_sousuo").hide();
			// 当选择的船舶不是重点跟踪船舶时,取消船舶物标高亮选中
			// if(aisLayer!=null&&vesselData!=null)
			// aisLayer.uncheckObject({ info: vesselData });
			// if(vtsLayer!=null&&vesselData!=null)
			// {
			// vtsLayer.uncheckObject({ info: vesselData });
			// }
			// if(aisLayer!=null&&vesselLayerObject!=null)
			// {
			// aisLayer.uncheckObject({ info: vesselLayerObject.datasource });
			// }
			// if(geographicLayer!=null&&vesselLayerObject!=null)
			// {
			// geographicLayer.uncheckObject({ object: vesselLayerObject });
			// }
			// vesselLayerObject=new Object();
			// vesselLayerObject.datasource=data[0];
			// geographicLayer.checkObject({ info: data[0] });

			// if (data[0].BOX[0] == data[0].BOX[2] && data[0].BOX[1] ==
			// data[0].BOX[3]) {
			// winfoMap.setZoom(12);
			// winfoMap.panTo(new Winfo.LngLat(data[0].BOX[0], data[0].BOX[1]));

			// } else {
			// var bound = new Winfo.Bounds(new Winfo.LngLat(data[0].BOX[0],
			// data[0].BOX[1]), new Winfo.LngLat(data[0].BOX[2],
			// data[0].BOX[3]));
			// winfoMap.panToBound(bound);
			// }

			vesselLayerObject = new Object();
			vesselLayerObject.datasource = data[0];
			//winfoMap.setZoom(12);

			var path = [];
			var pos = data[0].POSITION.split(';');
			if (data[0].XSLX == "point") { // 点
				winfoMap.panTo(new Winfo.LngLat(data[0].POSITION.split(',')[1] * 1, data[0].POSITION.split(',')[0] * 1), true);
			} else if (data[0].XSLX == "line") { // 线
				for (var i = 0; i < pos.length; i++) {
					path[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
				}
				/*polyline = new Winfo.Polyline({
						strokeColor: "#ff0000",
						strokeOpacity: 1,
						strokeWeight: 3,
						strokeDasharray: "1 1",
						path: path
					});
				winfoMap.addOverlay(polyline); // 添加覆盖物
*/				winfoMap.panTo(new Winfo.LngLat(parseFloat(data[0].POSITION.split(',')[1]), parseFloat(data[0].POSITION.split(',')[0])), true);

			} else if (data[0].XSLX == "face") { // 面
				for (var i = 0; i < pos.length; i++) {
					path[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
				}
				/*polygon = new Winfo.Polygon({
						strokeColor: "#00ff00",
						strokeOpacity: 1,
						strokeWeight: 2,
						strokeStyle: "dashed",
						strokeDasharray: "1 5 0",
						fillColor: "#f0f000",
						fillOpacity: 0.5,
						path: path
					});
				winfoMap.addOverlay(polygon); // 添加覆盖物
*/				winfoMap.panTo(new Winfo.LngLat(parseFloat(data[0].POSITION.split(',')[1]), parseFloat(data[0].POSITION.split(',')[0])), true);
			}
			cbxx(vesselLayerObject, "winfo.vessel.THYS.layer");
		}
		else　 {
			alertStr("未查询到该通航要素，请尝试修改关键词重新搜索！");
		}
	}
}

/* 获取AIS数据 */
function getAISList(filterparam) {
	var data = new Object();
	var strfilter = "";
	if (aisLayer != null) {
		/*
		 * filter：过滤条件"CM=ZHONG,CLX=公务船..."(CM为模糊查询 其他条件均为精确查询) 可选条件
		 * page:{}分页对象{index:当前页码，pagesize：页面显示的条目} 可选条件 box：Winfo.Bounds 对象，
		 * 查询范围， 可选条件 默认为当前屏幕显示范围 aisLayer.getShipType();
		 * aisLayer.getNavigationStatus();
		 */
		data.cblx = aisLayer.getShipType();
		data.dhzt = aisLayer.getNavigationStatus();
		if (filterparam.cblx != "") {
			strfilter = filterparam.cblx;
		}
		if (filterparam.dhzt != "") {
			if (strfilter == "") {
				strfilter = filterparam.dhzt;
			} else {
				strfilter += "," + filterparam.dhzt;
			}

		}
		if (cbsxband != null && cbsxband != "") {
			aisLayer.getList({
				filter: strfilter,
				page: {
					index: filterparam.currentpage,
					pagesize: filterparam.pageNum
				},
				box: cbsxband,
				path: cbsxband.path
			}, function (reslut) {
				document.getElementById('chuanboshaixuan').contentWindow.binddata(reslut);
			});
		} else {
			aisLayer.getList({
				filter: strfilter,
				page: {
					index: filterparam.currentpage,
					pagesize: filterparam.pageNum
				},
				box: cbsxband
			}, function (reslut) {
				document.getElementById('chuanboshaixuan').contentWindow.binddata(reslut);
			});
		}
		return data; // 返回船舶类型和导航状态
	}
}

// 获取船舶类型和船舶状态
function getLxAndZt() {
	var data = new Object();
	if (aisLayer != null) {
		/*
		 * filter：过滤条件"CM=ZHONG,CLX=公务船..."(CM为模糊查询 其他条件均为精确查询) 可选条件
		 * page:{}分页对象{index:当前页码，pagesize：页面显示的条目} 可选条件 box：Winfo.Bounds 对象，
		 * 查询范围， 可选条件 默认为当前屏幕显示范围 aisLayer.getShipType();
		 * aisLayer.getNavigationStatus();
		 */
		data.cblx = aisLayer.getShipType();
		data.dhzt = aisLayer.getNavigationStatus();
	}
	return data; // 返回船舶类型和导航状态
}

/* 获取AIS数据 */
function getAISListCBTJ(fatherIframeId, filterparam, iframeId, type) {
	var data = new Object();
	var strfilter = "";
	if (aisLayer != null) {
		/*
		 * filter：过滤条件"CM=ZHONG,CLX=公务船..."(CM为模糊查询 其他条件均为精确查询) 可选条件
		 * page:{}分页对象{index:当前页码，pagesize：页面显示的条目} 可选条件 box：Winfo.Bounds 对象，
		 * 查询范围， 可选条件 默认为当前屏幕显示范围 aisLayer.getShipType();
		 * aisLayer.getNavigationStatus();
		 */
		data.cblx = aisLayer.getShipType();
		data.dhzt = aisLayer.getNavigationStatus();
		if (filterparam.cblx != "") {
			strfilter = filterparam.cblx;
		}
		if (filterparam.hs != "") {
			if (strfilter == "") {
				strfilter = filterparam.hs;
			} else {
				strfilter += "," + filterparam.hs;
			}

		}
		if (cbsxband != null && cbsxband != "") {
			aisLayer.getList({
				filter: strfilter,
				page: {
					index: filterparam.currentpage,
					pagesize: filterparam.pageNum
				},
				box: cbsxband,
				path: cbsxband.path
			}, function (reslut) {
				if (type == "zidingyi") {
					document.getElementById(fatherIframeId).contentWindow.document.getElementById(iframeId).contentWindow.getb_data(reslut);
				} else {
					top.document.getElementById(fatherIframeId).contentWindow.document.getElementById(iframeId).contentWindow.getb_data(reslut);

				}

			});
		} else {
			aisLayer.getList({
				filter: strfilter,
				page: {
					index: filterparam.currentpage,
					pagesize: filterparam.pageNum
				},
				box: cbsxband
			}, function (reslut) {
				if (type == "zidingyi") {
					document.getElementById(fatherIframeId).contentWindow.document.getElementById(iframeId).contentWindow.getb_data(reslut);
				} else {
					top.document.getElementById(fatherIframeId).contentWindow.document.getElementById(iframeId).contentWindow.getb_data(reslut);
				}
			});
		}
		return data; // 返回船舶类型和导航状态
	}
}

/* 获取统计AIS类型数据 */
function getTjAISlx() {
	if (aisLayer != null) {
		/*
		 * box：Winfo.Bounds 对象， 查询范围， 可选条件 默认为当前屏幕显示范围 type:1==船舶类型;
		 * type:2==船舶导航状态
		 */
		aisLayer.statistical({
			type: 1,
			box: cbsxband
		}, function (reslut) {
			if (reslut.DATAS != null) {
				document.getElementById('chuanboshaixuan').contentWindow.Init1(reslut.DATAS);
			}
		});
	}
}
/* 获取统计AIS状态数据 */
function getTjAISzt() {
	if (aisLayer != null) {
		/*
		 * box：Winfo.Bounds 对象， 查询范围， 可选条件 默认为当前屏幕显示范围 type:1==船舶类型;
		 * type:2==船舶导航状态
		 */
		aisLayer.statistical({
			type: 2,
			box: cbsxband
		}, function (reslut) {
			if (reslut.DATAS != null) {
				document.getElementById('chuanboshaixuan').contentWindow.Init2(reslut.DATAS);
			}
		});
	}
}

var marker = null;
var swxxWindow = null;
function addPointOverlay(mc, wz) {
	// 创建点覆盖物
	// 点覆盖物参数
	// title 鼠标移入覆盖物显示样式
	// position 覆盖物显示位置 Winfo.LngLat 对象
	// draggable 是否可以移动的物标（true/false）
	// icon:物标显示的图标 Winfo.Icon 对象
	// content 物标显示的内容 Winfo.MarkerContent对象
	// offset:物标偏移量 Winfo.Pixel 对象
	marker = new Winfo.Marker({
			title: mc,
			content: new Winfo.MarkerContent({
				content: "<div style='color:#ffffff; font-size:12px;'><b>" + mc + "</b></div>",
				offset: new Winfo.Pixel(0, 0),
				cover: false
			}),
			position: new Winfo.LngLat(parseFloat(wz.split(',')[1]), parseFloat(wz.split(',')[0])),
			draggable: false,
			icon: new Winfo.Icon({
				size: new Winfo.Size(24, 24),
				image: "../../Image/sw_marker.png",
				offset: new Winfo.Pixel(-12, -24)
			})
		});
	winfoMap.addOverlay(marker); // 添加覆盖物


	// 注册覆盖物鼠标移入事件
	marker.mouseover(function (event) {
		if (swxxWindow == null) {
			// 创建信息显示窗口
			// size：窗体大小 Winfo.Size 对象
			// offset: 船体便宜量 Winfo.Pixel 对象
			// content： 窗体内容
			swxxWindow = new Winfo.InfoWindow({
					size: new Winfo.Size(400, 200),
					offset: new Winfo.Pixel(0, -15),
					pointer: false,
					content: "" // 使用默认信息窗体框样式，显示信息内容
				});

		}
		swxxWindow.open(event.lnglat);
		getSWInfo(event.option.title);
		return false;
	});
	// 注册覆盖物鼠标移出事件
	marker.mouseout(function (event) {
		swxxWindow.close();
		return false;
	});
	return marker;
}

// 查看水文信息
function viewSWXX(swxx) {
	swxxWindow.setOptions({
		size: new Winfo.Size(200, 100),
		content: "站点名称:" + swxx.MC + "\r\n" + "潮位:" + swxx.CW + "(厘米)\r\n" + "风速:" + swxx.FS + "（米/秒）\r\n" + "风向:" + swxx.FX + "（度）\r\n" + "能见度:" + swxx.NJD + "（公里）\r\n" + "发布时间:" + swxx.SJ + "\r\n",
	});
}

var marker = null;
var zfsbWindow = null;
function addZFSBPointOverlay(zfsb) {
	var mc = zfsb.equser;
	var wz = zfsb.latlng;
	// 创建点覆盖物
	// 点覆盖物参数
	// title 鼠标移入覆盖物显示样式
	// position 覆盖物显示位置 Winfo.LngLat 对象
	// draggable 是否可以移动的物标（true/false）
	// icon:物标显示的图标 Winfo.Icon 对象
	// content 物标显示的内容 Winfo.MarkerContent对象
	// offset:物标偏移量 Winfo.Pixel 对象
	var latlngArr = zfsb.latlng.split(","); // 纬度经度
	var lat = NumToDegree(latlngArr[0]);
	var lng = NumToDegree(latlngArr[1]);
	var latStr = lat[0] + "°" + lat[1] + "′" + lat[2] + "″ N ";
	var lngStr = lng[0] + "°" + lng[1] + "′" + lng[2] + "″ E ";
	var content = "名  称: " + zfsb.equser + "\r\n" + "经  度: " + lngStr + "\r\n" + "纬  度: " + latStr + "\r\n" + "时  间: " + zfsb.sendtime;

	var hxccode = (zfsb.equipmentnum).substring(0, 3);
	var zfsbImg = "../../Image/zfsb.png";
	if (hxccode == 'HXC') {
		zfsbImg = "../../Image/HXC_CCTV.png";
	}

	marker = new Winfo.Marker({
			title: content,
			content: new Winfo.MarkerContent({
				content: "<div style='color:#ffffff; font-size:12px;'><b>" + mc + "</b></div>",
				offset: new Winfo.Pixel(0, 0),
				cover: false
			}),
			position: new Winfo.LngLat(parseFloat(wz.split(',')[1]), parseFloat(wz.split(',')[0])),
			draggable: false,
			icon: new Winfo.Icon({
				size: new Winfo.Size(24, 40),
				image: zfsbImg,
				offset: new Winfo.Pixel(-12, -24)
			})
		});
	winfoMap.addOverlay(marker); // 添加覆盖物
	winfoMap.panTo(new Winfo.LngLat(parseFloat(wz.split(',')[1]), parseFloat(wz.split(',')[0]))); // 设置新的中心点(以当前物标为中心)
	if (hxccode == 'HXC') {
		marker.dblclick(function (event) {
			// 打开视频
			// 打开视频
			openCCTVbymc(zfsb.equipmentnum);

		});
	}

	// 注册覆盖物鼠标移入事件
	marker.mouseover(function (event) {
		/*
		 * if(zfsbWindow==null) { //创建信息显示窗口 // size：窗体大小 Winfo.Size 对象 //
		 * offset: 船体便宜量 Winfo.Pixel 对象 //content： 窗体内容 zfsbWindow = new
		 * Winfo.InfoWindow({ size: new Winfo.Size(400, 200), offset: new
		 * Winfo.Pixel(0, -15), pointer: false, content: "" //使用默认信息窗体框样式，显示信息内容
		 * }); } zfsbWindow.open(event.lnglat); viewZfsb(zfsb);
		 */
		return false;
	});
	// 注册覆盖物鼠标移出事件
	marker.mouseout(function (event) {
		// zfsbWindow.close();
		return false;
	});
	return marker;
}

function openCCTVbymc(cctvmc) {
	SubmitFrom({
		data: encodeURI("Action=getcctvidbymc&LXID=21&MC=" + cctvmc),
		url: "/gdmsaec/ACTION",
		success: function (cctv) {
			if (cctv != null) {
				var cctvpage = $.layer({
						type: 2,
						shadeClose: true,
						title: mc,
						closeBtn: [0, true],
						shade: [0],
						border: [0],
						area: ['400px', '300px'],
						maxmin: true,
						fix: true,
						iframe: {
							src: 'cctvcenter.html?ID=' + cctv.id + "&iChannelID=1"
						}
					});
			}
		}
	});
}

/**
 * //查看执法记录仪信息 function viewZfsb(zfsb) { var
 * latlngArr=zfsb.latlng.split(",");//纬度经度 var lat= NumToDegree(latlngArr[0]);
 * var lng=NumToDegree(latlngArr[1]); var latStr=lat[0]+"°"+lat[1]+"′"+lat[2]+"″
 * N "; var lngStr=lng[0]+"°"+lng[1]+"′"+lng[2]+"″ E "; zfsbWindow.setOptions({
 * size: new Winfo.Size(200, 100), content: "名 称: " + zfsb.equser + "<br />" +
 * "经 度: " +lngStr + "<br />" + "纬 度: " + latStr+ "<br />" + "时 间: " +
 * zfsb.sendtime, }); }
 */

// 刷新海图
function WinfoMaprefresh() {
	if (geographicLayer != null) {
		geographicLayer.refresh();
	}
}
/** ------start------- 自定义标绘显示与隐藏切换 --------------* */
var freeObjectList = {};
var freeEditObjectList = {};
function parentxshtbh(event) {
	if (event.rem == "Y") { // 移除显示的点线面
		if (freeObjectList[event.lookid] != undefined && freeObjectList[event.lookid] != null) {
			winfoMap.removeOverlay(freeObjectList[event.lookid]);
			freeObjectList[event.lookid] = null;
		}
		removeEdit(event.lookid); // 移除显示编辑页面
	} else { // 显示点线面
		if (freeObjectList[event.lookid] != undefined && freeObjectList[event.lookid] != null) {
			winfoMap.removeOverlay(freeObjectList[event.lookid]);
			freeObjectList[event.lookid] = null;
		}
		var object = null;
		var zb = null;
		if (event.looktype == "point") {
			zb = new Winfo.LngLat(parseFloat(event.datezb.split(',')[1]), parseFloat(event.datezb.split(',')[0]));
			object = new Winfo.Marker({
					title: event.bhdate.wbmc,
					position: new Winfo.LngLat(parseFloat(event.datezb.split(',')[1]), parseFloat(event.datezb.split(',')[0])),
					draggable: false,
					icon: new Winfo.Icon({
						size: new Winfo.Size(24, 24),
						offset: new Winfo.Pixel(-12, -24)
					})
				});
		}
		if (event.looktype == "accidentPoint") {
			zb = new Winfo.LngLat(parseFloat(event.datezb.split(',')[1]), parseFloat(event.datezb.split(',')[0]));
			object = new Winfo.Marker({
					title: event.bhdate.wbmc,
					position: new Winfo.LngLat(parseFloat(event.datezb.split(',')[1]), parseFloat(event.datezb.split(',')[0])),
					draggable: false,
					icon: new Winfo.Icon({
						size: new Winfo.Size(24, 24),
						image: "../../Image/XQXX/messge_hs.gif",
						offset: new Winfo.Pixel(-12, -24)
					})
				});
		} else if (event.looktype == "line") {
			var pos = event.datezb.split(';');
			var pointline = [];
			for (var i = 0; i < pos.length; i++) {
				pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
			}
			zb = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
			object = new Winfo.Polyline({
					strokeColor: event.bhdate.strokeColor,
					strokeOpacity: 1,
					strokeWeight: event.bhdate.strokeWeight,
					strokeStyle: event.bhdate.strokeStyle,
					strokeDasharray: "1 1",
					path: pointline
				});
		} else if (event.looktype == "face") {
			var pos = event.datezb.split(';');
			var pointline = [];
			for (var i = 0; i < pos.length; i++) {
				pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
			}
			zb = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
			object = new Winfo.Polygon({
					strokeColor: event.bhdate.strokeColor,
					strokeOpacity: 1,
					strokeWeight: event.bhdate.strokeWeight,
					strokeStyle: event.bhdate.strokeStyle,
					strokeDasharray: "1 1",
					fillColor: event.bhdate.strokeColor,
					fillOpacity: 0.5,
					path: pointline
				});
		} else if (event.looktype == "jx") {
			var pos = event.datezb.split(';');
			var pointline = [];
			for (var i = 0; i < pos.length; i++) {
				pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
			}
			var bound = new Winfo.Bounds(pointline[0], pointline[1]);
			object = new Winfo.Rectangle({
					strokeColor: event.bhdate.strokeColor,
					strokeOpacity: 1,
					strokeWeight: event.bhdate.strokeWeight,
					strokeStyle: event.bhdate.strokeStyle,
					strokeDasharray: "1 5 0",
					fillColor: event.bhdate.strokeColor,
					fillOpacity: 0.5,
					bound: bound
				});
			zb = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
		} else if (event.looktype == "yx") {
			var pos = event.datezb.split(';');
			var pointline = [];
			for (var i = 0; i < pos.length; i++) {
				pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
			}
			var bound = new Winfo.Bounds(pointline[0], pointline[1]);
			object = new Winfo.Circle({
					strokeColor: event.bhdate.strokeColor,
					strokeOpacity: 1,
					strokeWeight: event.bhdate.strokeWeight,
					strokeStyle: event.bhdate.strokeStyle,
					strokeDasharray: "1 5 0",
					fillColor: event.bhdate.strokeColor,
					fillOpacity: 0.5,
					bound: bound
				});
			zb = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
		}
		if (event.dw == 1) {
			winfoMap.panTo(zb);
		}
		if (object != null) {
			winfoMap.addOverlay(object); // 添加覆盖物
			freeObjectList[event.lookid] = object;
		}
	}
}
/** ------end------- 自定义标绘显示与隐藏切换 -------------- * */

/** ------start------- 自定义标绘编辑 -------------- * */
var zdybjwindow = null; // 编辑窗口对象
// 自定义标绘编辑
function parentbjhtbh(event) {
	// 移除显示的点线面
	if (freeObjectList[event.lookid] != undefined && freeObjectList[event.lookid] != null) {
		winfoMap.removeOverlay(freeObjectList[event.lookid]);
		freeObjectList[event.lookid] = null;
	}
	removeEdit(event.lookid); // 移除显示编辑页面
	var object = null;
	var jwd = null;
	var editorobj;
	if (event.looktype == "point") {
		jwd = new Winfo.LngLat(parseFloat(event.datezb.split(',')[1]), parseFloat(event.datezb.split(',')[0]));
		object = new Winfo.Marker({
				title: event.bhdate.wbmc,
				position: jwd,
				draggable: true,
				icon: new Winfo.Icon({
					size: new Winfo.Size(24, 24),
					offset: new Winfo.Pixel(-12, -24)
				})
			});
	}
	if (event.looktype == "accidentPoint") {
		jwd = new Winfo.LngLat(parseFloat(event.datezb.split(',')[1]), parseFloat(event.datezb.split(',')[0]));
		object = new Winfo.Marker({
				title: event.bhdate.wbmc,
				position: jwd,
				draggable: true,
				icon: new Winfo.Icon({
					size: new Winfo.Size(24, 24),
					offset: new Winfo.Pixel(-12, -24)
				})
			});
	} else if (event.looktype == "line") {
		var pos = event.datezb.split(';');
		jwd = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
		var pointline = [];
		for (var i = 0; i < pos.length; i++) {
			pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
		}
		event["path"] = pointline;
		object = new Winfo.Polyline({
				strokeColor: event.bhdate.strokeColor,
				strokeOpacity: 1,
				strokeWeight: event.bhdate.strokeWeight,
				strokeStyle: event.bhdate.strokeStyle,
				strokeDasharray: "1 1",
				path: pointline
			});
	} else if (event.looktype == "face") {
		var pos = event.datezb.split(';');
		jwd = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
		var pointline = [];
		for (var i = 0; i < pos.length; i++) {
			pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
		}
		event["path"] = pointline;
		object = new Winfo.Polygon({
				strokeColor: event.bhdate.strokeColor,
				strokeOpacity: 1,
				strokeWeight: event.bhdate.strokeWeight,
				strokeStyle: event.bhdate.strokeStyle,
				strokeDasharray: "1 1",
				fillColor: "#ffffff",
				fillOpacity: 0.5,
				path: pointline
			});
	} else if (event.looktype == "jx") {
		var pos = event.datezb.split(';');
		var jwd1 = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
		var jwd2 = new Winfo.LngLat(parseFloat(pos[1].split(',')[1]), parseFloat(pos[1].split(',')[0]));
		jwd = new Winfo.LngLat((jwd2.getLng() + jwd1.getLng()) / 2, jwd2.getLat()); // 顶部居中
		var pointline = [];
		for (var i = 0; i < pos.length; i++) {
			pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
		}
		var bound = new Winfo.Bounds(pointline[0], pointline[1]);
		object = new Winfo.Rectangle({
				strokeColor: event.bhdate.strokeColor,
				strokeOpacity: 1,
				strokeWeight: event.bhdate.strokeWeight,
				strokeStyle: event.bhdate.strokeStyle,
				strokeDasharray: "1 5 0",
				fillColor: "#ffffff",
				fillOpacity: 0.5,
				bound: bound
			});
		event["path"] = pointline;
	} else if (event.looktype == "yx") {
		var pos = event.datezb.split(';');
		var pointline = [];
		for (var i = 0; i < pos.length; i++) {
			pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
		}
		jwd = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
		var bound = new Winfo.Bounds(pointline[0], pointline[1]);
		object = new Winfo.Circle({
				strokeColor: event.bhdate.strokeColor,
				strokeOpacity: 1,
				strokeWeight: event.bhdate.strokeWeight,
				strokeStyle: event.bhdate.strokeStyle,
				strokeDasharray: "1 5 0",
				fillColor: event.bhdate.strokeColor,
				fillOpacity: 0.5,
				bound: bound
			});
		// zb=new
		// Winfo.LngLat(parseFloat(pos[0].split(',')[1]),parseFloat(pos[0].split(',')[0]));
		event["path"] = pointline;
	}

	// 自定义物标标绘编辑
	if (object != null) {
		winfoMap.addOverlay(object); // 添加覆盖物
		if (event.looktype == "point") {
			var bz = event.bhdate.bz;
			var wbmc = event.bhdate.wbmc;
			var zb = event.bhdate.zb;
			var lookid = event.bhdate.id;
			var left = $(document.body).width() - 630;
			$.layer({
				type: 2,
				shade: [0],
				closeBtn: [0, true],
				shade: true,
				border: [3, 0.1, '#000'],
				offset: ['0px', left + 'px'],
				area: ['300px', '425px'],
				moveOut: true, // 是否可脱出可视窗口外
				fix: false,
				title: '标绘',
				iframe: {
					src: "../WinfoENC/customobj.html?wbmc=" + wbmc + "&bz=" + bz + "&zb=" + zb + "&id=" + lookid
				},
				success: function (layero) {
					sessionStorage.setItem("BiaoHuiInfo_point", $(layero)[0].children[0].children[0].id);
				},
				close: function (index) {
					top.$('#main_iframe')[0].contentWindow.zdywindow();
				}
			});
			var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo_point")
				// 标绘点移动时触发
				object.dragging(function (event) {
					// 判断子页面是否存在。
					if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.pageBack != undefined) {
						document.getElementById(zidingyiwubiao_iframe).contentWindow.pageBack({
							data: event // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});
			event["lnglat"] = jwd;
			// htbhdata=event;
		}
		if (event.looktype == "accidentPoint") {
			var bz = event.bhdate.bz;
			var wbmc = event.bhdate.wbmc;
			var zb = event.bhdate.zb;
			var lookid = event.bhdate.id;
			var left = $(document.body).width() - 630;
			$.layer({
				type: 2,
				shade: [0],
				closeBtn: [0, true],
				shade: true,
				border: [3, 0.1, '#000'],
				offset: ['0px', left + 'px'],
				area: ['300px', '425px'],
				moveOut: true, // 是否可脱出可视窗口外
				fix: false,
				title: '标绘',
				iframe: {
					src: "../WinfoENC/customobjsgd.html?wbmc=" + wbmc + "&bz=" + bz + "&zb=" + zb + "&id=" + lookid
				},
				success: function (layero) {
					sessionStorage.setItem("BiaoHuiInfo_accidentPoint", $(layero)[0].children[0].children[0].id);
				},
				close: function (index) {
					top.$('#main_iframe')[0].contentWindow.zdywindow();
				}
			});
			var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo_accidentPoint")
				// 标绘点移动后触发
				object.dragging(function (event) {
					// 判断子页面是否存在。

					if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.pageBack != undefined) {
						document.getElementById(zidingyiwubiao_iframe).contentWindow.pageBack({
							data: event // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});
			event["lnglat"] = jwd;
			// htbhdata=event;
		} else if (event.looktype == "line") {
			event["lnglat"] = jwd;
			htbhdata = event;
			var left = $(document.body).width() - 630;
			$.layer({
				type: 2,
				shade: [0],
				closeBtn: [0, true],
				shade: true,
				border: [3, 0.1, '#000'],
				offset: ['0px', left + 'px'],
				area: ['300px', '425px'],
				moveOut: true, // 是否可脱出可视窗口外
				fix: false,
				title: '标绘',
				iframe: {
					src: "../WinfoENC/customobjx.html"
				},
				success: function (layero) {
					sessionStorage.setItem("BiaoHuiInfo_line", $(layero)[0].children[0].children[0].id);
				},
				close: function (index) {
					top.$('#main_iframe')[0].contentWindow.zdywindow();
				}
			});
			var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo_line")
				editorobj = Winfo.PolyEditor(object);
			winfoMap.addOverlay(editorobj);
			// 标绘点移动 触发
			editorobj.adjust(function (event) {
				// 判断子页面是否存在。
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});

			// 标绘点新增 触发
			editorobj.addnode(function (event) {
				// 判断子页面是否存在。
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
		} else if (event.looktype == "face") {
			event["lnglat"] = jwd;
			htbhdata = event;
			var left = $(document.body).width() - 630;
			$.layer({
				type: 2,
				shade: [0],
				closeBtn: [0, true],
				shade: true,
				border: [3, 0.1, '#000'],
				offset: ['0px', left + 'px'],
				area: ['300px', '425px'],
				moveOut: true, // 是否可脱出可视窗口外
				fix: false,
				title: '标绘',
				iframe: {
					src: "../WinfoENC/customobjm.html"
				},
				success: function (layero) {
					sessionStorage.setItem("BiaoHuiInfo_face", $(layero)[0].children[0].children[0].id);
				},
				close: function (index) {
					top.$('#main_iframe')[0].contentWindow.zdywindow();
				}
			});
			editorobj = Winfo.PolyEditor(object);
			winfoMap.addOverlay(editorobj);
			var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo_face")
				// 标绘点新增 触发
				editorobj.addnode(function (event) {
					// 判断子页面是否存在。
					if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
						document.getElementById(zidingyiwubiao_iframe).contentWindow.editface({
							data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
						});
					}
				});
			// 标绘点移动 触发
			editorobj.adjust(function (event) {
				// 判断子页面是否存在。
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editface({
						data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
		} else if (event.looktype == "jx") {
			var mc; // 编辑时缓存矩形名称
			var bz; // 编辑时缓存矩形备注
			var left = $(document.body).width() - 630;
			$.layer({
				type: 2,
				shade: [0],
				closeBtn: [0, true],
				shade: true,
				border: [3, 0.1, '#000'],
				offset: ['0px', left + 'px'],
				area: ['300px', '425px'],
				moveOut: true, // 是否可脱出可视窗口外
				fix: false,
				title: '标绘',
				iframe: {
					src: "../WinfoENC/customobjjx.html"
				},
				success: function (layero) {
					sessionStorage.setItem("BiaoHuiInfo_jx", $(layero)[0].children[0].children[0].id);
				},
				close: function (index) {
					top.$('#main_iframe')[0].contentWindow.zdywindow();
				}
			});
			var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo_jx")
				event["lnglat"] = jwd;
			htbhdata = event;
			editorobj = Winfo.RectangleEditor(object);
			winfoMap.addOverlay(editorobj);
			// 标绘点移动后触发
			// editorobj.dragend(function(data) {
			// var coorpath = []
			// coorpath[0]=data.bound.getWestSouth();
			// coorpath[1]=data.bound.getEastNorth();
			// htbhdata["path"]=coorpath;
			// zdyData=data;
			// });
			editorobj.adjust(function (data) {
				// 判断子页面是否存在。
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editjx != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editjx({
						data: data.bound // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
			// 标绘点移动前触发
			editorobj.dragstart(function (event) {
				// zdybjwindow.close();
			});
		} else if (event.looktype == "yx") {
			var left = $(document.body).width() - 630;
			$.layer({
				type: 2,
				shade: [0],
				closeBtn: [0, true],
				shade: true,
				border: [3, 0.1, '#000'],
				offset: ['0px', left + 'px'],
				area: ['300px', '425px'],
				moveOut: true, // 是否可脱出可视窗口外
				fix: false,
				title: '标绘',
				iframe: {
					src: "../WinfoENC/customobjyx.html"
				},
				success: function (layero) {
					sessionStorage.setItem("BiaoHuiInfo_yx", $(layero)[0].children[0].children[0].id);
				},
				close: function (index) {
					top.$('#main_iframe')[0].contentWindow.zdywindow();
				}
			});
			event["lnglat"] = jwd;
			htbhdata = event;
			editorobj = Winfo.CircleEditor(object);
			winfoMap.addOverlay(editorobj);
			var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo_yx");
			// 标绘点移动 触发
			editorobj.adjust(function (event) {
				// 判断子页面是否存在。
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						data: event.bound // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
			// 标绘点新增 触发
			editorobj.dragend(function (event) {
				// 判断子页面是否存在。
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						zdyData: event.bound // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
		}
		freeObjectList[event.lookid] = object;
		freeEditObjectList[event.lookid] = editorobj;
	}
	winfoMap.panTo(jwd);
}

// 自动预警区编辑
var yjzdyData = null;
var yjzdyInfo = null;
function parentbjzdyjqy(event) {
	// 移除显示的点线面
	if (freeObjectList[event.lookid] != undefined && freeObjectList[event.lookid] != null) {
		winfoMap.removeOverlay(freeObjectList[event.lookid]);
		freeObjectList[event.lookid] = null;
	}
	removeEdit(event.lookid); // 移除显示编辑页面
	var object = null;
	var jwd = null;
	var editorobj;
	if (event.looktype == "face") {
		var pos = event.datezb.split(';');
		jwd = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
		var pointline = [];
		for (var i = 0; i < pos.length; i++) {
			pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
		}
		event["path"] = pointline;
		object = new Winfo.Polygon({
				strokeColor: event.bhdate.strokeColor,
				strokeOpacity: 1,
				strokeWeight: event.bhdate.strokeWeight,
				strokeStyle: event.bhdate.strokeStyle,
				strokeDasharray: "1 1",
				fillColor: "#ffffff",
				fillOpacity: 0.5,
				path: pointline
			});
	} else if (event.looktype == "rectangle") {
		var pos = event.datezb.split(';');
		var jwd1 = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
		var jwd2 = new Winfo.LngLat(parseFloat(pos[1].split(',')[1]), parseFloat(pos[1].split(',')[0]));
		jwd = new Winfo.LngLat((jwd2.getLng() + jwd1.getLng()) / 2, jwd2.getLat()); // 顶部居中
		var pointline = [];
		for (var i = 0; i < pos.length; i++) {
			pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
		}
		var bound = new Winfo.Bounds(pointline[0], pointline[1]);
		object = new Winfo.Rectangle({
				strokeColor: event.bhdate.strokeColor,
				strokeOpacity: 1,
				strokeWeight: event.bhdate.strokeWeight,
				strokeStyle: event.bhdate.strokeStyle,
				strokeDasharray: "1 5 0",
				fillColor: "#ffffff",
				fillOpacity: 0.5,
				bound: bound
			});
		event["path"] = pointline;
	} else if (event.looktype == "circle") {
		var pos = event.datezb.split(';');
		var pointline = [];
		for (var i = 0; i < pos.length; i++) {
			pointline[i] = (new Winfo.LngLat(parseFloat(pos[i].split(',')[1]), parseFloat(pos[i].split(',')[0])));
		}
		jwd = new Winfo.LngLat(parseFloat(pos[0].split(',')[1]), parseFloat(pos[0].split(',')[0]));
		var bound = new Winfo.Bounds(pointline[0], pointline[1]);
		object = new Winfo.Circle({
				strokeColor: event.bhdate.strokeColor,
				strokeOpacity: 1,
				strokeWeight: event.bhdate.strokeWeight,
				strokeStyle: event.bhdate.strokeStyle,
				strokeDasharray: "1 5 0",
				fillColor: event.bhdate.strokeColor,
				fillOpacity: 0.5,
				bound: bound
			});
		// zb=new
		// Winfo.LngLat(parseFloat(pos[0].split(',')[1]),parseFloat(pos[0].split(',')[0]));
		event["path"] = pointline;
	}

	// 自动预警编辑
	if (object != null) {
		winfoMap.addOverlay(object); // 添加覆盖物
		yjzdyData = event["path"];
		var tmpData = event["bhdate"];
		yjzdyInfo = {};
		yjzdyInfo.id = tmpData.id;
		yjzdyInfo.jcqmc = tmpData.jcqmc;
		yjzdyInfo.xslx = tmpData.xslx;
		yjzdyInfo.timetype = tmpData.timetype;
		yjzdyInfo.timevalue = tmpData.timevalue;
		yjzdyInfo.fsnr = tmpData.fsnr;

		if (event.looktype == "face") {
			zdybjwindow = new Winfo.InfoWindow({
					size: new Winfo.Size(290, 290),
					offset: new Winfo.Pixel(0, -15),
					content: "<iframe id='zidongyujing_iframe' width='285px' height='270px' style='border:none' src='../hsgl/zdqyyj.html?shapeType=face'></iframe>"
				});
			zdybjwindow.open(jwd); // 打开信息窗体
			zdybjwindow.visualDisplay(); // 显示在可视区域内
			event["lnglat"] = jwd;
			htbhdata = event;
			zdybjwindow.closeed(function (eve) {
				if (object != null) {
					winfoMap.removeOverlay(object);
				}
				// removeEdit(event.bhdate.id);
			});
			editorobj = Winfo.PolyEditor(object);
			winfoMap.addOverlay(editorobj);
			// 自动区域预警移动 触发
			editorobj.adjust(function (event) {
				// 判断子页面是否存在。
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
			// 自动区域预警新增 触发
			editorobj.addnode(function (event) {
				// 判断子页面是否存在。
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidingyiwubiao_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: event.path // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
		} else if (event.looktype == "rectangle") {
			zdybjwindow = new Winfo.InfoWindow({
					size: new Winfo.Size(290, 290),
					offset: new Winfo.Pixel(0, -15),
					content: "<iframe id='zidongyujing_iframe' width='285px' height='270px' style='border:none' src='../hsgl/zdqyyj.html?shapeType=rectangle'></iframe>"
				});
			zdybjwindow.open(jwd); // 打开信息窗体
			zdybjwindow.visualDisplay(); // 显示在可视区域内
			event["lnglat"] = jwd;
			htbhdata = event;
			zdybjwindow.closeed(function (eve) {
				if (object != null) {
					winfoMap.removeOverlay(object);
				}
			});
			editorobj = Winfo.RectangleEditor(object);
			winfoMap.addOverlay(editorobj);

			// 自动预警区移动后触发
			// editorobj.dragend(function(data) {
			// var coorpath = []
			// coorpath[0]=data.bound.getWestSouth();
			// coorpath[1]=data.bound.getEastNorth();
			// yjzdyData=data;
			// zdybjwindow.open(data.lnglat); // 打开信息窗体
			// zdybjwindow.visualDisplay();// 显示在可视区域内
			// });
			editorobj.adjust(function (data) {
				// 判断子页面是否存在。
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: data // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
			// 自动预警区移动前触发
			editorobj.dragstart(function (event) {
				zdybjwindow.close();
			});
		} else if (event.looktype == "circle") {
			zdybjwindow = new Winfo.InfoWindow({
					size: new Winfo.Size(290, 290),
					offset: new Winfo.Pixel(100, -100),
					content: "<iframe id='zidongyujing_iframe' width='285px' height='270px' style='border:none' src='../hsgl/zdqyyj.html?shapeType=circle'></iframe>"
				});
			editorobj = Winfo.CircleEditor(object);
			winfoMap.addOverlay(editorobj);
			zdybjwindow.open(jwd); // 打开信息窗体
			zdybjwindow.visualDisplay(); // 显示在可视区域内
			event["lnglat"] = jwd;
			htbhdata = event;

			zdybjwindow.closeed(function (eve) {
				if (object != null) {
					winfoMap.removeOverlay(object);
				}
			});
			// 当鼠标对圆完成移动时发生
			// editorobj.dragend(function (data) {
			// if (document.getElementById('zidongyujing_iframe') != undefined&&
			// document.getElementById('zidongyujing_iframe').contentWindow.editShape !=
			// undefined){
			// document.getElementById('zidongyujing_iframe').contentWindow.editShape( {
			// data : data//调用子页面坐标赋值方法，并将坐标值传入子页面方法
			// });
			// }
			// });
			// 当鼠标移动圆时发生
			// editorobj.dragging(function (event) {
			// });
			// 当鼠标准备移动圆时发生
			editorobj.dragstart(function (event) {
				zdybjwindow.close();
			});
			// 当鼠标对原的半径发生改变时发生
			editorobj.adjust(function (data) {
				// var coorpath = [];//圆的两个坐标
				// coorpath[0]=data.bound.getWestSouth();
				// coorpath[1]=data.bound.getEastNorth();
				// yjzdyData=event;
				// 判断子页面是否存在。
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: data // 调用子页面坐标赋值方法，并将坐标值传入子页面方法
					});
				}
			});
		}
		freeObjectList[event.lookid] = object;
		// freeEditObjectList[event.lookid]=editorobj;
	}
	winfoMap.panTo(jwd);
}
// 获取自定义预警坐标
function getYjzb() {
	return yjzdyData;
}
// 获取自定义预警其他数据
function getYjInfo() {
	return yjzdyInfo;
}

// 移除编辑状态
function removeEdit(id) {
	// 移除显示的点线面编辑
	if (freeEditObjectList[id] != undefined && freeEditObjectList[id] != null) {
		winfoMap.removeOverlay(freeEditObjectList[id]);
		freeEditObjectList[id] = null;
	}
}
// 移除编辑的标绘编辑框
function removebjbh(id) {
	// 移除显示的点线面标绘
	// if(freeObjectList[id]!=undefined&&freeObjectList[id]!=null) {
	// winfoMap.removeOverlay(freeObjectList[id]);
	// freeObjectList[id]=null;
	// }
	// 移除点线面编辑框
	if (zdybjwindow != null) {
		winfoMap.removeOverlay(zdybjwindow);
	}

}

// 编辑界面传值
function gethtbhdata() {
	return htbhdata;
}
function sethtbhdata() {
	htbhdata = null;
}
/** ------end------- 自定义标绘编辑 -------------- * */
// 刷新自定义标绘列表
function relocationlist() {

	if (top.document.getElementById('zidingyiwubiao_zdywb') != undefined && top.document.getElementById('zidingyiwubiao_zdywb').contentWindow.reload != undefined) {
		top.document.getElementById('zidingyiwubiao_zdywb').contentWindow.reload();
	}

}

/** ------start------- 船舶统计自定义区域 -------------- * */

function drawOverlayByZDYCBTJ(event) {
	if (mouseTool == null) {
		// 创建鼠标控件
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // 添加控件
	}

	if (event != null && event.tjlx == "m") // 多边形
	{
		mouseTool.drawPolygon({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			$("#chuanboshaixuan").attr("src", "QuYuGuanKong/chuanboshaixuan.html");
			creatwindow("chart", "", data);
		});
	} else if (event != null && event.tjlx == "jx") // 矩形
	{
		mouseTool.drawRectangle({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			$("#chuanboshaixuan").attr("src", "QuYuGuanKong/chuanboshaixuan.html");
			creatwindow("chart", "", data);
		});
	} else if (event != null && event.tjlx == "y") // 圆
	{
		mouseTool.drawCircle({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			$("#chuanboshaixuan").attr("src", "QuYuGuanKong/chuanboshaixuan.html");
			creatwindow("chart", "", data);
		});
	}
}

/** *****************海事管理--船舶统计分析20151026********************* */
/** ------start------- 船舶统计自定义区域 -------------- * */

function drawOverlayByZDYCBTJFX(event) {
	if (mouseTool == null) {
		// 创建鼠标控件
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // 添加控件
	}

	if (event != null && event.tjlx == "m") // 多边形
	{
		mouseTool.drawPolygon({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			var zbObj = data.path;
			var zbOne = "";
			var zbStr = "";
			for (var zbi = 0; zbi < zbObj.length; zbi++) {
				var lat = zbObj[zbi].lat;
				var lng = zbObj[zbi].lng;
				zbOne = lng + "," + lat;
				zbStr += zbOne + ";";
			}
			zbStr = zbStr.substring(0, zbStr.length - 1);
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp; </i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				maxmin: true,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/chuanbotongjifenxi.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '480px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	} else if (event != null && event.tjlx == "jx") // 矩形
	{
		mouseTool.drawRectangle({}, function (data) {
			var zbStr = data.lnglat.lng + ',' + data.lnglat.lat + ';' + data.lnglat.lng + ',' + data.rlnglat.lat + ';' + data.rlnglat.lng + ',' + data.lnglat.lat + ';' + data.rlnglat.lng + ',' + data.rlnglat.lat;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				maxmin: true,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/chuanbotongjifenxi.html?type=zidingyi&zdyzb=other" + zbStr
				},
				area: ['630px', '480px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	} else if (event != null && event.tjlx == "y") // 圆
	{
		mouseTool.drawCircle({}, function (data) {
			// longitude经度, latitude纬度
			// 中心点 lnglat 经度 lng 纬度 lat
			var longitude = data.lnglat.lng;
			var latitude = data.lnglat.lat;
			var rlong = data.rlnglat.lng;
			var rlat = data.rlnglat.lat;
			var raidusMile = top.getGreatCircleDistance(latitude, longitude, rlat, rlong);
			var PI = 3.14159265;
			var EARTH_RADIUS = 6378137;
			var RAD = Math.PI / 180.0;
			var degree = (24901 * 1609) / 360.0;
			var dpmLat = 1 / degree;
			var radiusLat = dpmLat * raidusMile;
			var minLat = latitude - radiusLat;
			var maxLat = latitude + radiusLat;
			var mpdLng = degree * Math.cos(latitude * (PI / 180));
			var dpmLng = 1 / mpdLng;
			var radiusLng = dpmLng * raidusMile;
			var minLng = longitude - radiusLng;
			var maxLng = longitude + radiusLng;
			var zbStr = maxLng + ',' + maxLat + ';' + maxLng + ',' + minLat + ';' + minLng + ',' + minLat + ';' + minLng + ',' + maxLat;
			// var
			// zbStr=data.lnglat.lng+','+data.lnglat.lat+';'+data.lnglat.lng+','+data.rlnglat.lat+';'+data.rlnglat.lng+','+data.lnglat.lat+';'+data.rlnglat.lng+','+data.rlnglat.lat;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				maxmin: true,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/chuanbotongjifenxi.html?type=zidingyi&zdyzb=other" + zbStr + "&lnglat=" + latitude + "," + longitude + "&bjjl=" + raidusMile
				},
				area: ['630px', '480px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	}
}

/** ------end------- 船舶统计自定义区域 -------------- * */

/** ------start------- 船舶安检统计自定义区域 -------------- * */

function drawOverlayByZDYCBAJTJFX(event) {
	if (mouseTool == null) {
		// 创建鼠标控件
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // 添加控件
	}

	if (event != null && event.tjlx == "m") // 多边形
	{
		mouseTool.drawPolygon({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			var zbObj = data.path;
			var zbOne = "";
			var zbStr = "";
			for (var zbi = 0; zbi < zbObj.length; zbi++) {
				var lat = zbObj[zbi].lat;
				var lng = zbObj[zbi].lng;
				zbOne = lat + "," + lng;
				zbStr += zbOne + ";";
			}
			zbStr = zbStr.substring(0, zbStr.length - 1);
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/chuanboanjiantongjifenxi.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '400px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	} else if (event != null && event.tjlx == "jx") // 矩形
	{
		mouseTool.drawRectangle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/chuanboanjiantongjifenxi.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '400px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	} else if (event != null && event.tjlx == "y") // 圆
	{
		mouseTool.drawCircle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/chuanboanjiantongjifenxi.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '400px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	}
}
/** ------end------- 船舶安检统计自定义区域 -------------- * */

/** ------start------- 检验证书匹配检查 -------------- * */

function drawOverlayByZDYCJTJFX(event) {
	if (mouseTool == null) {
		// 创建鼠标控件
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // 添加控件
	}

	if (event != null && event.tjlx == "m") // 多边形
	{
		mouseTool.drawPolygon({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			var zbObj = data.path;
			var zbOne = "";
			var zbStr = "";
			for (var zbi = 0; zbi < zbObj.length; zbi++) {
				var lat = zbObj[zbi].lat;
				var lng = zbObj[zbi].lng;
				zbOne = lat + "," + lng;
				zbStr += zbOne + ";";
			}
			zbStr = zbStr.substring(0, zbStr.length - 1);
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/chuanboanjiantongjifenxi.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '400px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	} else if (event != null && event.tjlx == "jx") // 矩形
	{
		mouseTool.drawRectangle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/chuanboanjiantongjifenxi.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '400px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	} else if (event != null && event.tjlx == "y") // 圆
	{
		mouseTool.drawCircle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/chuanboanjiantongjifenxi.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '400px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	}
}
/** ------end------- 检验证书匹配检查 -------------- * */

/** ------start------- 重点跟踪 -------------- * */

function drawOverlayByZDYZDGZ(event) {
	if (mouseTool == null) {
		// 创建鼠标控件
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // 添加控件
	}

	if (event != null && event.tjlx == "m") // 多边形
	{
		mouseTool.drawPolygon({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			var zbObj = data.path;
			var zbOne = "";
			var zbStr = "";
			for (var zbi = 0; zbi < zbObj.length; zbi++) {
				var lat = zbObj[zbi].lat;
				var lng = zbObj[zbi].lng;
				zbOne = lat + "," + lng;
				zbStr += zbOne + ";";
			}
			zbStr = zbStr.substring(0, zbStr.length - 1);
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/zhongdiangenzong.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '400px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	} else if (event != null && event.tjlx == "jx") // 矩形
	{
		mouseTool.drawRectangle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/zhongdiangenzong.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '400px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	} else if (event != null && event.tjlx == "y") // 圆
	{
		mouseTool.drawCircle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;自定义区域统计</i></h4>';
			$.layer({
				type: 2,
				shade: [0],
				fix: false,
				title: strtitle,
				iframe: {
					src: "../../View/hsgl/zhongdiangenzong.html?type=zidingyi&zdyzb=" + zbStr
				},
				area: ['630px', '400px'],
				close: function (index) {
					winfoMap.removeOverlay(data);
				}
			});
		});
	}
}
/** ------end------- 重点跟踪 -------------- * */

/** --------------------自定义辖区船舶--------------------* */
var temp = [];
function drawOverlayByXiaQu(event) {
	// 访问后台，得到自己的辖区
	getData1();
	getData(temp);
};

function getData1() {
	$.ajax({
		async: false,
		type: "POST",
		// data: encodeURI("Action=getAllSection"),
		data: encodeURI("Action=getAllJgByJgdm"),
		url: "/gdmsaec/SectionAction",
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		success: function (msg) {
			wholeJg = msg;
		}
	});
}

function getData(temp) {
	CountShip("dm090000", "");
	$("#chuanboshaixuan").attr("src", "QuYuGuanKong/chuanboshaixuan.html?xiaQuFlag=xiaQuFlag");
	creatwindow("chart", "", "");
}
// 得到数组里面最大数
function getMaxInArray(arg1) {
	var temp = arg1[0];
	for (var i = 1; i < arg1.length; i++) {
		if (parseFloat(arg1[i]) > temp) {
			temp = parseFloat(arg1[i]);
		}
	}
	return temp;
}

// 得到数组里面最小数
function getMinInArray(arg1) {
	var temp = arg1[0];
	for (var i = 1; i < arg1.length; i++) {
		if (parseFloat(arg1[i]) < temp) {
			temp = parseFloat(arg1[i]);
		}
	}
	return temp;
}

function CountShip(dmzb, firstLiTextFlag) {
	firstLiText = firstLiTextFlag;
	// 参数传过来的是"zb"+坐标（没有机构代码的）或者是"dm"+机构代码的形式（有机构代码的）；当直接点击辖区的时候就会出现这种情况
	// 如果是以dm+机构代码的形式传过来，jgdm用来截取dmzb里面的机构代码；当点击的不是辖区，而是有机构代码的行政单位的时候，就会出现这种情况
	var jgdm = "";
	// 如果是以zb+坐标的形式来传过来，那么zb用来截取dmzb里面的坐标
	var zb = "";
	// 存放x的坐标集合，也就是经度的集合
	var xArray = [];
	// 存放y的坐标集合，也就是纬度的集合
	var yArray = [];
	// 存放一个点的数组
	var points = [];
	// 存放特定点的集合
	var path = [];
	// 如果不是点击的具体辖区执行下面代码
	if (dmzb.substring(0, 2) == 'dm') {
		jgdm = dmzb.substring(2, dmzb.length);
		// flag=1表示登陆这是以admin形式登陆进来的
		if (wholeJg[2].flag == "1") {
			for (var i = 0; i < wholeJg[0].length; i++) {
				// 如果if条件满足，那证明是海事局点击过来的
				if (jgdm == wholeJg[0][i].JGDM) {
					var hscArray = wholeJg[0][i].hscList;
					for (var j = 0; j < hscArray.length; j++) {
						sectionArray = hscArray[j].sectionList;
						for (var k = 0; k < sectionArray.length; k++) {
							var zbTemp = sectionArray[k].zb;
							var zbArray = zbTemp.split(";");
							for (var n = 0; n < zbArray.length; n++) {
								xArray.push(zbArray[n].split(",")[0]);
								yArray.push(zbArray[n].split(",")[1]);
								var point = new Winfo.LngLat(parseFloat(zbArray[n].split(",")[0]), parseFloat(zbArray[n].split(",")[1]));
								path.push(point);
							}
							// path.push(zbArray);
						}
					}
				} else if (jgdm == '090000') {

					var hscArray = wholeJg[0][i].hscList;
					for (var j = 0; j < hscArray.length; j++) {
						sectionArray = hscArray[j].sectionList;
						for (var k = 0; k < sectionArray.length; k++) {
							var zbTemp = sectionArray[k].zb;
							var zbArray = zbTemp.split(";");
							for (var n = 0; n < zbArray.length; n++) {
								xArray.push(zbArray[n].split(",")[0]);
								yArray.push(zbArray[n].split(",")[1]);
								var point = new Winfo.LngLat(parseFloat(zbArray[n].split(",")[0]), parseFloat(zbArray[n].split(",")[1]));
								path.push(point);
							}
							// path.push(zbArray);
						}
					}
				}
				// else判断为了表示不是从海事局过来的，那就是从海事局下辖单位海事处过来的
				else {
					var hscArray = wholeJg[0][i].hscList;
					for (var j = 0; j < hscArray.length; j++) {
						if (jgdm == hscArray[j].JGDM) {
							sectionArray = hscArray[j].sectionList;
							for (var k = 0; k < sectionArray.length; k++) {
								var zbTemp = sectionArray[k].zb;
								var zbArray = zbTemp.split(";");
								for (var n = 0; n < zbArray.length; n++) {
									var point = new Winfo.LngLat(parseFloat(113.1), parseFloat(23.1))

										xArray.push(zbArray[n].split(",")[0]);
									yArray.push(zbArray[n].split(",")[1]);
									var point = new Winfo.LngLat(parseFloat(zbArray[n].split(",")[0]), parseFloat(zbArray[n].split(",")[1]));
									path.push(point);
								}
								// path.push(zbArray);
							}
						}
					}
				}
			}
		}
		// flag=2表示是登陆者为海事局单位
		if (wholeJg[2].flag == "2") {
			// 如果if条件满足，那证明是海事局点击过来的
			if (jgdm == wholeJg[3].jgdm) {
				var hscArray = wholeJg[0];
				for (var j = 0; j < hscArray.length; j++) {
					sectionArray = hscArray[j].sectionList;
					for (var k = 0; k < sectionArray.length; k++) {
						var zbTemp = sectionArray[k].zb;
						var zbArray = zbTemp.split(";");
						for (var n = 0; n < zbArray.length; n++) {
							xArray.push(zbArray[n].split(",")[0]);
							yArray.push(zbArray[n].split(",")[1]);
							var point = new Winfo.LngLat(parseFloat(zbArray[n].split(",")[0]), parseFloat(zbArray[n].split(",")[1]));
							path.push(point);
						}
						// path.push(zbArray);
					}
				}
			}
			// else判断为了表示不是从海事局过来的，那就是从海事局下辖单位海事处过来的
			else {
				for (var j = 0; j < wholeJg[0].length; j++) {
					if (jgdm == wholeJg[0][j].JGDM) {
						var sectionArray = wholeJg[0][j].sectionList;
						for (var k = 0; k < sectionArray.length; k++) {
							var zbTemp = sectionArray[k].zb;
							var zbArray = zbTemp.split(";");
							for (var n = 0; n < zbArray.length; n++) {
								xArray.push(zbArray[n].split(",")[0]);
								yArray.push(zbArray[n].split(",")[1]);
								var point = new Winfo.LngLat(parseFloat(zbArray[n].split(",")[0]), parseFloat(zbArray[n].split(",")[1]));
								path.push(point);
							}
							// path.push(zbArray);
						}
					}
				}
			}
		}
		// 表示登陆这是从海事处登陆进来的
		if (wholeJg[2].flag == "3") {
			for (var j = 0; j < wholeJg[0].length; j++) {
				var zbTemp = wholeJg[0][j].zb;
				var zbArray = zbTemp.split(";");
				for (var n = 0; n < zbArray.length; n++) {
					xArray.push(zbArray[n].split(",")[0]);
					yArray.push(zbArray[n].split(",")[1]);
					var point = new Winfo.LngLat(parseFloat(zbArray[n].split(",")[0]), parseFloat(zbArray[n].split(",")[1]));
					path.push(point);
				}
				// path.push(zbArray);
			}
		}

		cbsxband = new Winfo.Bounds(new Winfo.LngLat(getMinInArray(xArray), getMinInArray(yArray)), new Winfo.LngLat(getMaxInArray(xArray), getMaxInArray(yArray)));
		cbsxband.path = path;
	}
	// 如果是点击的具体辖区，执行下面代码,并且画出辖区
	else if (dmzb.substring(0, 2) == 'zb') {
		zb = dmzb.substring(2, dmzb.length);
		var areacoors = zb.split(';');
		var lngLats = [];
		for (var j = 0; j < areacoors.length; j++) {
			lngLats[j] = new Winfo.LngLat(parseFloat(areacoors[j].split(',')[0]), parseFloat(areacoors[j].split(',')[1]));
		}
		// 根据坐标获取辖区中心点。
		var activeArea = null; // 当前选择的区域
		activeArea = new Winfo.Polygon({
				path: lngLats
			});
		cbsxband = activeArea.bound;
		var isExist = false;
		for (var i = 0; i < existArray.length; i++) {
			if (existArray[i] == zb) {
				isExist = true;
			}
		}
		if (isExist == false) {
			winfoMap.addOverlay(activeArea);
			existArray.push("zb", zb);
		}
	}
	$("#chuanboshaixuan").attr("src", "QuYuGuanKong/chuanboshaixuan.html?xiaQuFlag=countShip");
	creatwindow("chart", "", activeArea);
	// existArray.splice(0,existArray.length);

}

/** ------start------- 添加报告线 -------------- * */
/** ------------潘威龙 2014-12-29 -------------- * */
var BGXWindowInfo = null; // 电子报告制基本信息弹出窗
var BGXData = null; // 当前操作的电子报告制数据对象
var DZBGZdata = []; // 电子报告制数据集合(包括报告线，和区域)
var dzbgzpolyEditor = null;
var dzbgzpolyEditorline = null;
function drawOverlayBYBGX(event) {
	// 只显示物标
	if (event.drawtype != "add") // 只显示出电子报告制
	{
		if (event.drawtype == "closeedit") // 关闭编辑状态
		{
			if (dzbgzpolyEditor != null) {
				winfoMap.removeOverlay(dzbgzpolyEditor);
				dzbgzpolyEditor = null
			} else if (dzbgzpolyEditorline != null) {
				winfoMap.removeOverlay(dzbgzpolyEditorline);
				dzbgzpolyEditorline = null
			}
			if (BGXData != null) {
				BGXData.dataID = event.dataID;
				DZBGZdata.push(BGXData); // 将当前显示的物标添加到数组
			}
		} else if (event.show == true) // 显示操作
		{
			var path = [];
			var coors = event.path.split(';');
			for (var i = 0; i < coors.length; i++) {
				var obj = new Winfo.LngLat(parseFloat(coors[i].split(',')[1]), parseFloat(coors[i].split(',')[0]));
				path.push(obj);
			}
			if (event.datatype == "line") // 报告线
			{
				var polyline = null;
				polyline = new Winfo.Polyline({
						title: event.bgxmc,
						strokeColor: "#ff7537",
						strokeOpacity: 1,
						strokeWeight: 2,
						strokeDasharray: "1 1",
						path: path
					});
				winfoMap.addOverlay(polyline); // 添加覆盖物
				winfoMap.panTo(path[0], false); // 设置新的中心点(以当前物标为中心)
				polyline.dataID = event.bgxid; // 报告线ID，用于区分显示多个报告线的标示，从报告线列表中传递过来
				polyline.bgxmc = event.bgxmc; // 名称
				polyline.bz = event.bz; // 备注
				BGXData = polyline;
				DZBGZdata.push(polyline);
			} else if (event.datatype == "face") // 电子报告之统计区域
			{
				var polygon = null;
				polygon = new Winfo.Polygon({
						content: new Winfo.MarkerContent({
							content: "<div style='color:white; font-size:12px;'>" + event.bgxmc + " </div>",
							offset: new Winfo.Pixel(0, 0),
							cover: false
						}),
						strokeColor: "#000000",
						strokeOpacity: 1,
						strokeWeight: 2,
						strokeStyle: "dashed",
						strokeDasharray: "1 5 0",
						fillColor: "red",
						fillOpacity: 0.5,
						path: path
					});
				winfoMap.addOverlay(polygon); // 添加覆盖物
				winfoMap.panToBound(polygon.bound);
				polygon.dataID = event.bgxid; // 报告线ID，用于区分显示多个报告线的标示，从报告线列表中传递过来
				polygon.bgxmc = event.bgxmc; // 名称
				polygon.bz = event.bz; // 备注
				BGXData = polygon;
				DZBGZdata.push(polygon);
			}

			// 当为编辑时候弹出编辑框
			if (event.drawtype == "edit") {
				var type = "";
				// 编辑线物标
				if (event.datatype == "line") {
					dzbgzpolyEditor = Winfo.PolyEditor(BGXData);
					winfoMap.addOverlay(dzbgzpolyEditor);
					dzbgzpolyEditor.adjust(function (event) {
						BGXData.path = event.path;
					});
					type = "bgx";
				}
				// 编辑多边形物标
				else if (event.datatype == "face") {
					dzbgzpolyEditorline = Winfo.PolyEditor(BGXData);
					winfoMap.addOverlay(dzbgzpolyEditorline);
					dzbgzpolyEditorline.adjust(function (event) {
						BGXData.path = event.path;
					});
					type = "tjqsz";
				}
				BGXWindowInfo = new Winfo.InfoWindow({
						size: new Winfo.Size(302, 175), // 弹出窗体大小
						offset: new Winfo.Pixel(50, 0),
						content: "<iframe id='BGXWindowInfo_iframe' width=285px' height='160' style='border:none' src='../WinfoENC/QuYuGuanKong/baogaoxianEdit.html?bjlx=" + type + "'></iframe>"
					});

				BGXWindowInfo.closeed(function (event) {
					if (BGXData != null && event.type == "click")
						winfoMap.removeOverlay(BGXData);
				});
				BGXWindowInfo.open(path[0]); // 打开信息窗体
			}
		}

		// 删除电子报告制操作
		else {
			delDZBGZdatabyid(event.bgxid);
		}
	}

	// 电子报告制新增
	else {
		closebgxwindow(); // 添加操作时,先关闭前一次的添加操作,确保每次添加操作为单例操作
		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}

		if (event.showtype == "bgx") // 报告线
		{
			mouseTool.drawPolyline({}, function (data) {
				BGXData = data;
				BGXWindowInfo = new Winfo.InfoWindow({
						size: new Winfo.Size(302, 175), // 弹出窗体大小
						offset: new Winfo.Pixel(50, 0),
						content: "<iframe id='BGXWindowInfo_iframe' width=285px' height='160' style='border:none' src='../WinfoENC/QuYuGuanKong/baogaoxianEdit.html?bjlx=bgx'></iframe>"
					});
				BGXWindowInfo.closeed(function (event) {
					if (data != null && event.type == "click")
						winfoMap.removeOverlay(data);
				});
				BGXWindowInfo.open(data.path[0]); // 打开信息窗体
				BGXWindowInfo.visualDisplay(); // 显示在可视区域

				dzbgzpolyEditor = Winfo.PolyEditor(BGXData);
				winfoMap.addOverlay(dzbgzpolyEditor);
				dzbgzpolyEditor.adjust(function (event) {
					BGXData.path = event.path;
				});
			});
		} else if (event.showtype == "tjqsz") {
			mouseTool.drawPolygon({}, function (data) {
				BGXData = data;
				BGXWindowInfo = new Winfo.InfoWindow({
						size: new Winfo.Size(302, 175), // 弹出窗体大小
						offset: new Winfo.Pixel(50, 0),
						content: "<iframe id='BGXWindowInfo_iframe' width=285px' height='160' style='border:none' src='../WinfoENC/QuYuGuanKong/baogaoxianEdit.html?bjlx=tjqsz'></iframe>"
					});
				BGXWindowInfo.closeed(function (event) {
					if (data != null && event.type == "click")
						winfoMap.removeOverlay(data);
				});
				BGXWindowInfo.open(data.path[0]); // 打开信息窗体
				BGXWindowInfo.visualDisplay(); // 显示在可视区域

				dzbgzpolyEditorline = Winfo.PolyEditor(BGXData);
				winfoMap.addOverlay(dzbgzpolyEditorline);
				dzbgzpolyEditorline.adjust(function (event) {
					BGXData.path = event.path;
				});
			});
		}
	}
}

// 根据ID删除海图中的电子报告制物标
function delDZBGZdatabyid(id) {
	// 循环电子报告制数据集合,销毁当前操作对象时,同步删除DZBGZdata数组中存储的该对象元素
	for (var i = 0; i < DZBGZdata.length; i++) {
		// 判断当前操作对象的报告线（区域）ID与数组中的是否相等
		if (DZBGZdata[i].dataID == id) {
			winfoMap.removeOverlay(DZBGZdata[i]); // 删除海图覆盖物
			DZBGZdata.splice(i, 1); // 将删除的物标对象从数组中清除
		}
	}
}

/** 关闭报告线窗体* */
function closebgxwindow() {
	// 删除标绘框
	if (BGXWindowInfo != null) {
		winfoMap.removeOverlay(BGXWindowInfo);
	}
	if (BGXData != undefined && BGXData != null) {
		winfoMap.removeOverlay(BGXData);
		BGXData = null;
		BGXWindowInfo = null;
	}
}
/** ------end------- 船舶统计自定义区域 -------------- * */

var Tracklayer = null;
/** 船舶轨迹回放--潘威龙--2015-6-19* */
function maptrackPlayBack(event) {

	if (Tracklayer == null) {
		Tracklayer = new Winfo.DNCLayer.VesselTrack({
				index: 1000
			});
		winfoMap.addLayer(Tracklayer);
	}
	// Tracklayer.GetVesselTrackList({ filter:
	// "MMSI="+event.vesselData.ID+",TABLENAME="+event.datatable+",STARTTIME="+event.stratdate+",ENDTIME="+event.enddate+""
	// });
	Tracklayer.GetVesselTrackList({
		filter: "MMSI=" + event.vesselData.MMSI + ",TABLENAME=" + event.datatable + ",STARTTIME=" + event.stratdate + ",ENDTIME=" + event.enddate + ""
	}, function (result) {
		var data = result.DATAS;
		if (data.length > 0) {
			if (aisLayer != null) {
				winfoMap.removeLayer(aisLayer);
				winfoMap.removeLayer(geographicLayer);
			}
			if (vtsLayer != null) {
				winfoMap.removeLayer(vtsLayer)
			}
			if (geographicLayer != null) {
				winfoMap.removeLayer(geographicLayer)
			}
			winfoMap.panTo(new Winfo.LngLat(result.DATAS[result.DATAS.length - 1].JD, result.DATAS[result.DATAS.length - 1].WD));

			layerIndexgj = $.layer({
					type: 1,
					shade: [0],
					area: ['auto', 'auto'],
					title: false,
					border: [0],
					closeBtn: false,
					page: {
						dom: '#btn_close'
					},
					end: function () {
						// datePickerClear();
					}
				});
		} else {
			alertStr("没有船舶轨迹数据！");

		}
		hidediv();
	});

}

/** end--------------船舶轨迹回放------* */

/** 获取区域内的船舶 */
var areaShipDatas = null;
function getAreaShip(filterparam) {
	var coorpath = [];
	var coors = filterparam.path.split(';')
		for (i = 0; i < coors.length; i++) {
			var lng = parseFloat(coors[i].split(',')[1]);
			var lat = parseFloat(coors[i].split(',')[0]);
			if (lat > lng) {
				var temp = lng;
				lng = lat;
				lat = temp;
			}
			var coorobj = new Winfo.LngLat(lng, lat);
			coorpath.push(coorobj);
		}
		var cbsxband = new Winfo.Polygon({
			content: new Winfo.MarkerContent({
				content: "",
				offset: new Winfo.Pixel(0, 0),
				cover: false
			}),
			strokeColor: "red",
			strokeOpacity: 1,
			strokeWeight: 2,
			strokeStyle: "dashed",
			strokeDasharray: "1 5 0",
			fillColor: "red",
			fillOpacity: 0.2,
			path: coorpath
		});
	var data = null;
	var strfilter = "";
	if (aisLayer == null) {
		aisLayer = Winfo.DNCLayer.AIS({
				index: 100,
				refreshed: getAISList
			});
	} else {
		data = new Object();
		data = filterparam;
		data.cblx = aisLayer.getShipType();
		data.dhzt = aisLayer.getNavigationStatus();
		if (filterparam.cblx != "") {
			strfilter = filterparam.cblx;
		}
		if (filterparam.dhzt != "") {
			if (strfilter == "") {
				strfilter = filterparam.dhzt;
			} else {
				strfilter += "," + filterparam.dhzt;
			}

		}
		if (cbsxband != null && cbsxband != "") {
			aisLayer.getList({
				filter: strfilter,
				page: {
					index: filterparam.currentpage,
					pagesize: filterparam.pageNum
				},
				box: cbsxband.bound,
				path: cbsxband.path
			}, function (reslut) {
				data.shipdatas = reslut.DATAS;
				areaShipDatas = data;

			});
		} else {
			aisLayer.getList({
				filter: strfilter,
				page: {
					index: filterparam.currentpage,
					pagesize: filterparam.pageNum
				},
				box: cbsxband.bound
			}, function (reslut) {
				data.shipdatas = reslut.DATAS;
				areaShipDatas = data;
			});
		}
	}

	return data;
}

function getAreaShipDatas() {

	return areaShipDatas;
}

/**
 * *********************************电子检测线 start
 * 20151112-王良*****************************************************
 */
var JCXWindowInfo = null; // 电子检测线基本信息弹出窗
var JCXData = null; // 当前操作的电子电子检测线数据对象
var JCQData = null; // 当前操作的电子电子检测线数据对象
var DZJCXdata = []; // 电子检测线数据集合(包括报告线，和区域)
var DZJCQdata = [];
var dzjcxpolyEditor = null;
var dzjcxpolyEditorline = null;
function drawOverlayDZJCX(event) {
	// 只显示物标
	if (event.drawtype != "add") // 只显示出电子报告制
	{
		if (event.drawtype == "closeedit") // 关闭编辑状态
		{
			if (dzjcxpolyEditor != null) {
				winfoMap.removeOverlay(dzjcxpolyEditor);
				dzjcxpolyEditor = null
			} else if (dzjcxpolyEditorline != null) {
				winfoMap.removeOverlay(dzjcxpolyEditorline);
				dzjcxpolyEditorline = null
			}
			if (JCXData != null) {
				JCXData.dataID = event.dataID;
				DZJCXdata.push(JCXData); // 将当前显示的物标添加到数组
			}
			if (JCQData != null) {
				JCQData.dataID = event.dataID;
				DZJCQdata.push(JCQData); // 将当前显示的物标添加到数组
			}
		} else if (event.show == true) // 显示操作
		{
			var path = [];
			var coors = event.path.split(';');
			for (var i = 0; i < coors.length; i++) {
				var obj = new Winfo.LngLat(parseFloat(coors[i].split(',')[1]), parseFloat(coors[i].split(',')[0]));
				path.push(obj);
			}
			if (event.datatype == "line") // 报告线
			{
				var polyline = null;
				polyline = new Winfo.Polyline({
						title: event.title,
						strokeColor: "#ff7537",
						strokeOpacity: 1,
						strokeWeight: 2,
						strokeDasharray: "1 1",
						path: path
					});
				winfoMap.addOverlay(polyline); // 添加覆盖物
				winfoMap.panTo(path[0], false); // 设置新的中心点(以当前物标为中心)
				polyline.dataID = event.jcxid; // 报告线ID，用于区分显示多个报告线的标示，从报告线列表中传递过来
				polyline.jcxmc = event.title; // 名称
				// polyline.bz=event.bz;//备注
				JCXData = polyline;
				DZJCXdata.push(polyline);
			} else if (event.datatype == "face") // 电子报告之统计区域
			{
				var polygon = null;
				polygon = new Winfo.Polygon({
						content: new Winfo.MarkerContent({
							content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
							offset: new Winfo.Pixel(0, 0),
							cover: false
						}),
						strokeColor: "#FF9966",
						strokeOpacity: 1,
						strokeWeight: 1,
						strokeStyle: "solid",
						strokeDasharray: "1 5 0",
						fillColor: "#FF9966",
						fillOpacity: 0.5,
						path: path
					});
				winfoMap.addOverlay(polygon); // 添加覆盖物
				winfoMap.panToBound(polygon.bound);
				polygon.dataID = event.jcqid; // 报告线ID，用于区分显示多个报告线的标示，从报告线列表中传递过来
				polygon.jcqmc = event.title; // 名称
				// polygon.bz=event.bz;//备注
				JCQData = polygon;
				DZJCQdata.push(polygon);
			}

			// 当为编辑时候弹出编辑框
			if (event.drawtype == "edit") {
				var type = "";
				// 编辑线物标
				if (event.datatype == "line") {
					dzjcxpolyEditor = Winfo.PolyEditor(JCXData);
					winfoMap.addOverlay(dzjcxpolyEditor);
					dzjcxpolyEditor.adjust(function (event) {
						JCXData.path = event.path;
					});
					type = "jcx";
				}
				// 编辑多边形物标
				else if (event.datatype == "face") {
					dzjcxpolyEditorline = Winfo.PolyEditor(JCQData);
					winfoMap.addOverlay(dzjcxpolyEditorline);
					dzjcxpolyEditorline.adjust(function (event) {
						JCQData.path = event.path;
					});
					type = "jcq";
				}
				if (type == "jcx") {
					var urlPath = "../WinfoENC/JianCeXian/dianzijiancexianEdit.html?dzjcx=jcx&jcxid=" + event.jcxid;
					if (event.jgmc == "zhongshan") {
						urlPath = "../../../msa/zhongshan/JianCeXian/dianzijiancexianEdit.html?dzjcx=jcx&jcxid=" + event.jcxid;
					}
					$.layer({
						type: 2,
						shade: [0],
						fix: false,
						title: "电子检测线",
						border: [3, 0.1, '#000'],
						iframe: {
							src: urlPath
						},
						area: ['500px', '345px'],
						close: function (index) {
							if (JCXData != null)
								winfoMap.removeOverlay(JCXData);
						}
					});
				} else if (type == "jcq") {
					var urlPath = "../WinfoENC/JianCeXian/dianzijiancequEdit.html?dzjcx=jcx&jcqid=" + event.jcqid;
					if (event.jgmc == "zhongshan") {
						urlPath = "../../../msa/zhongshan/JianCeXian/dianzijiancequEdit.html?dzjcx=jcx&jcqid=" + event.jcqid;
					}
					$.layer({
						type: 2,
						shade: [0],
						fix: false,
						title: "电子检测区",
						border: [3, 0.1, '#000'],
						iframe: {
							src: urlPath
						},
						area: ['500px', '395px'],
						close: function (index) {
							if (JCQData != null)
								winfoMap.removeOverlay(JCQData);
						}
					});
				}

				/*
				 * JCXWindowInfo.closeed(function(event){
				 * if(JCXData!=null&&event.type=="click")
				 * winfoMap.removeOverlay(JCXData); });
				 */
				// JCXWindowInfo.open(path[0]); // 打开信息窗体
				// JCXWindowInfo.visualDisplay();// 显示在可视区域
			}
		}

		// 删除电子检测线操作
		else {
			if (event.jcxid != null && event.jcxid != "" && event.jcxid != undefined) {
				delDZJCXdatabyid(event.jcxid);
			}
			if (event.jcqid != null && event.jcqid != "" && event.jcqid != undefined) {
				delDZJCQdatabyid(event.jcqid);
			}
			if (JCXData != null) {
				winfoMap.removeOverlay(JCXData);
			}
			if (JCQData != null) {
				winfoMap.removeOverlay(JCQData);
			}
		}
	}

	// 电子检测线新增20151113王良
	else {
		closebgxwindow(); // 添加操作时,先关闭前一次的添加操作,确保每次添加操作为单例操作
		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}

		if (event.showtype == "jcx") // 电子检测线
		{
			mouseTool.drawPolyline({}, function (data) {
				var urlPath = "../WinfoENC/JianCeXian/dianzijiancexianEdit.html?dzjcx=jcx";
				if (event.jgmc == "zhongshan") {
					urlPath = "../../../msa/zhongshan/JianCeXian/dianzijiancexianEdit.html?dzjcx=jcx";
				}
				JCXData = data;
				$.layer({
					type: 2,
					shade: [0],
					fix: false,
					title: "电子检测线",
					border: [3, 0.1, '#000'],
					iframe: {
						src: urlPath
					},
					area: ['500px', '345px'],
					close: function (index) {
						if (data != null)
							winfoMap.removeOverlay(data);
					}
				});
				/*
				 * JCXWindowInfo.closeed(function(event){
				 * if(data!=null&&event.type=="click")
				 * winfoMap.removeOverlay(data); });
				 */
				JCXWindowInfo.open(data.path[0]); // 打开信息窗体
				JCXWindowInfo.visualDisplay(); // 显示在可视区域

				dzjcxpolyEditor = Winfo.PolyEditor(JCXData);
				winfoMap.addOverlay(dzjcxpolyEditor);
				dzjcxpolyEditor.adjust(function (event) {
					JCXData.path = event.path;
				});
			});
		}
		/** 王良 20151113 检测区设置* */
		else if (event.showtype == "jcq") {
			mouseTool.drawPolygon({}, function (data) {
				JCQData = data;
				/*
				 * JCXWindowInfo = new Winfo.InfoWindow({ size : new
				 * Winfo.Size(302, 175),//弹出窗体大小 offset : new
				 * Winfo.Pixel(50, 0), content :"<iframe
				 * id='JCXWindowInfo_iframe' width=285px' height='160'
				 * style='border:none'
				 * src='../WinfoENC/JianCeXian/dianzijiancequEdit.html?dzjcx=jcqsz'></iframe>"
				 * }); JCXWindowInfo.closeed(function(event){
				 * if(data!=null&&event.type=="click")
				 * winfoMap.removeOverlay(data); });
				 */
				var urlPath = "../WinfoENC/JianCeXian/dianzijiancequEdit.html?dzjcx=jcq";
				if (event.jgmc == "zhongshan") {
					urlPath = "../../../msa/zhongshan/JianCeXian/dianzijiancequEdit.html?dzjcx=jcq";
				}
				$.layer({
					type: 2,
					shade: [0],
					fix: false,
					title: "电子检测区",
					iframe: {
						src: urlPath
					},
					area: ['500px', '395px'],
					close: function (index) {
						if (data != null)
							winfoMap.removeOverlay(data);
					}
				});

				JCXWindowInfo.open(data.path[0]); // 打开信息窗体
				JCXWindowInfo.visualDisplay(); // 显示在可视区域
				dzjcxpolyEditorline = Winfo.PolyEditor(JCQData);
				winfoMap.addOverlay(dzjcxpolyEditorline);
				dzjcxpolyEditorline.adjust(function (event) {
					JCQData.path = event.path;
				});
			});
		}
	}
}

// 根据ID删除海图中的电子报告制物标
function delDZJCXdatabyid(id) {
	// 循环电子报告制数据集合,销毁当前操作对象时,同步删除DZJCXdata数组中存储的该对象元素
	for (var i = 0; i < DZJCXdata.length; i++) {
		// 判断当前操作对象的报告线（区域）ID与数组中的是否相等
		if (DZJCXdata[i].dataID == id) {
			winfoMap.removeOverlay(DZJCXdata[i]); // 删除海图覆盖物
			DZJCXdata.splice(i, 1); // 将删除的物标对象从数组中清除
			i--;
		}
	}
}

// 根据ID删除海图中的电子报告制物标
function delDZJCQdatabyid(id) {
	// 循环电子报告制数据集合,销毁当前操作对象时,同步删除DZJCXdata数组中存储的该对象元素
	for (var i = 0; i < DZJCQdata.length; i++) {
		// 判断当前操作对象的报告线（区域）ID与数组中的是否相等
		if (DZJCQdata[i].dataID == id) {
			winfoMap.removeOverlay(DZJCQdata[i]); // 删除海图覆盖物
			DZJCQdata.splice(i, 1); // 将删除的物标对象从数组中清除
			i--;
		}
	}
}

/** 关闭检测线窗体* */
function closebgxwindow() {
	// 删除标绘框
	if (JCXWindowInfo != null) {
		winfoMap.removeOverlay(JCXWindowInfo);
	}
	if (JCXData != undefined && JCXData != null) {
		winfoMap.removeOverlay(JCXData);
		JCXData = null;
		JCXWindowInfo = null;
	}
}

/**
 * *********************************电子检测线 end
 * 20151112-王良*****************************************************
 */

/** *******************添加天气图标覆盖物 start******************** */
var marker = null;
var markerArr = [];
function drawOverlayByTQ(event) {
	if (event.drawtype == "Y") {
		if (marker == null) {
			marker = new Winfo.Marker({
					title: "城市名称：" + event.name + "\r\n天气情况：" + event.weather + "\r\n最低温度：" + event.zdqw + "°\r\n最高温度：" + event.zgqw + "°",
					position: new Winfo.LngLat(parseFloat(event.jd), parseFloat(event.wd)),
					draggable: false,
					content: new Winfo.MarkerContent({
						content: "<div style='color:#ffffff; font-size:12px;'><b>" + event.name + "</b></div>",
						draggable: false
					}),
					icon: new Winfo.Icon({
						size: new Winfo.Size(24, 24),
						image: "../../Image/Qixiang/" + event.tqtb,
						offset: new Winfo.Pixel(-12, -24)
					})
				});
		}
		winfoMap.addOverlay(marker); // 添加覆盖物
		markerArr.push(marker);
		marker = null;
	} else {
		for (var i = 0; i < markerArr.length; i++) {
			winfoMap.removeOverlay(markerArr[i]); // 删除覆盖物
		}
		markerArr = [];
	}
}

// 显示气压图
function getPressure(event) {
	var VectorLayers2 = new Winfo.DNCLayer.VectorLayers({
			layername: "ciaVectorLayers",
			url: "http://198.18.11.25:8010/wmts/GetTile?map=DNC",
			paramX: '&x',
			paramY: '&y',
			paramZ: '&z',
			layer: 6
		});
	if (event.drawtype == "Y") {
		winfoMap.addLayer(VectorLayers2); // 添加图层
	} else {
		winfoMap.removeLayer(VectorLayers2); // 删除图层
	}
}
// 显示云图
function getCloud(event) {
	var vectorLayer = new Winfo.DNCLayer.ImageVectorLayer({
			layername: "ImageVectorLayers"
		});

	if (event.drawtype == "Y") {
		winfoMap.addLayer(vectorLayer); // 添加图层

	} else {
		winfoMap.removeLayer(vectorLayer);
	}
}

// 显示台风
var hisTyphoonLayerList;
function addtaifeng(event) {
	if (event.drawtype == "Y") {
		hisTyphoonLayerList = new Winfo.hisTyphoonLayerList({
				position: 2,
				isdevelop: false,
				isclear: true
			});
		winfoMap.addControl(hisTyphoonLayerList);
	} else {
		new Winfo.HisTyphoonLayerContrail({
			index: 102,
			isv: true,
			nowdrawWindCircle: HisTyphoonContrailLayer.nowdrawWindCircle,
			nowdrawTyphoonSymbol: HisTyphoonContrailLayer.nowdrawTyphoonSymbol,
			nowdrawWindCircle1: HisTyphoonContrailLayer.nowdrawWindCircle1
		});
		if (HisTyphoonContrailLayer != null) {
			winfoMap.removeLayer(HisTyphoonContrailLayer);
			HisTyphoonContrailLayer == null;
		}
		if (hisTyphoonLayerList != null) {
			winfoMap.removeControl(hisTyphoonLayerList);
		}
	}
}

/** *******************添加天气图标覆盖物 end*********************** */

function getPingMuZB() {
	var zb = "112.5,22.8;114,23.3";
	var zbobj = Winfo.DNCObject.getMapInfo();
	// zb=zbobj.Box.Left+","+zbobj.Box.Bottom+";"+zbobj.Box.Right+","+zbobj.Box.Top;
	zb = zbobj.Box.Left + "," + zbobj.Box.Bottom + ";" + zbobj.Box.Left + "," + zbobj.Box.Top + ";" + zbobj.Box.Right + "," + zbobj.Box.Bottom + ";" + zbobj.Box.Right + "," + zbobj.Box.Top
		return zb;
}

// 获取屏幕中心点
function getPMcenter() {
	var zbobj = Winfo.DNCObject.getMapInfo();
	// zb=zbobj.Box.Left+","+zbobj.Box.Bottom+";"+zbobj.Box.Right+","+zbobj.Box.Top;
	zb = zbobj.CenterY + "," + zbobj.CenterX;
	return zb;
}

// 获取海图层级
function gethtLevel() {
	var cj = Winfo.DNCObject.getLevel();
	return cj;
}

/*
 * //定位到用户历史操作的中心点 function setPmcenter(){ var zb =
 * top.userData.userdata.mapInfo.center; winfoMap.setCenter(new
 * Winfo.LngLat(zb.lng, zb.lat)); }
 */

// 获取防碰撞的bound
function getfpzbound(data) {
	lats = []; // 纬度
	lngs = []; // 经度

	for (var n = 0; n < data.length; n++) {
		lats[n] = data[n].lat;
		lngs[n] = data[n].lng;
	}
	var maxLat1 = Math.max.apply(null, lats); // 纬度最大值
	var minLat1 = Math.min.apply(null, lats); // 纬度最小值

	var maxLng1 = Math.max.apply(null, lngs); // 经度最大值
	var minLng1 = Math.min.apply(null, lngs); // 经度最小值

	// 中心点的经纬度
	var midlng = minLng1 + (maxLng1 - minLng1) / 2;
	var midlat = minLat1 + (maxLat1 - minLat1) / 2;

	// 获取半径,即取中心点与各点之间最大的距离
	var distances = [];
	for (var m = 0; m < data.length; m++) {
		distances[m] = getDistance({
				lng: midlng,
				lat: midlat
			}, {
				lng: data[m].lng,
				lat: data[m].lat
			});
	}
	var rudius = Math.max.apply(null, distances); // 半径为距离最大值

	var bound = JSbound(midlng, midlat, rudius + 200)

		return bound;
}

/* 获取两个经纬度之间的距离 start */
function fD(a, b, c) {
	for (; a > c; )
		a -= c - b;
	for (; a < b; )
		a += c - b;
	return a;
};
function jD(a, b, c) {
	b != null && (a = Math.max(a, b));
	c != null && (a = Math.min(a, c));
	return a;
};
function yk(a) {
	return Math.PI * a / 180
};
function Ce(a, b, c, d) {
	var dO = 6370996.81;
	return dO * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a));
};
function getDistance(a, b) {
	if (!a || !b)
		return 0;
	a.lng = fD(a.lng, -180, 180);
	a.lat = jD(a.lat, -74, 74);
	b.lng = fD(b.lng, -180, 180);
	b.lat = jD(b.lat, -74, 74);
	return Ce(yk(a.lng), yk(b.lng), yk(a.lat), yk(b.lat));
};
/* 获取两个经纬度之间的距离 end */

// 计算圆形bound
function JSbound(longitude, latitude, raidusMile) {
	var PI = 3.14159265;
	var EARTH_RADIUS = 6378137;
	var RAD = Math.PI / 180.0;
	var degree = (24901 * 1609) / 360.0;
	var dpmLat = 1 / degree;
	var radiusLat = dpmLat * raidusMile;
	var minLat = latitude - radiusLat;
	var maxLat = latitude + radiusLat;
	var mpdLng = degree * Math.cos(latitude * (PI / 180));
	var dpmLng = 1 / mpdLng;
	var radiusLng = dpmLng * raidusMile;
	var minLng = longitude - radiusLng;
	var maxLng = longitude + radiusLng;
	var bound = new Winfo.Bounds(new Winfo.LngLat(minLng, minLat), new Winfo.LngLat(maxLng, maxLat));

	return bound;
}

/**
 * *********************************码头管理 start
 * 20160219-柴永洁*****************************************************
 */
var MTData = null; // 当前操作的码头区域数据对象
var MTGLdata = []; // 码头区域数据集合
var mtglpolyEditor = null;
function drawOverlayMTGL(event) {
	// 只显示物标
	if (event.drawtype != "add") {
		if (event.drawtype == "closeedit") // 关闭编辑状态
		{
			if (mtglpolyEditor != null) {
				winfoMap.removeOverlay(mtglpolyEditor);
				mtglpolyEditor = null
			}

			if (MTData != null) {
				MTData.dataID = event.dataID;
				MTGLdata.push(MTData); // 将当前显示的物标添加到数组
			}
		} else if (event.show == true) // 显示操作
		{
			var path = [];
			var coors = event.path.split(';');
			for (var i = 0; i < coors.length; i++) {
				var obj = new Winfo.LngLat(parseFloat(coors[i].split(',')[1]), parseFloat(coors[i].split(',')[0]));
				path.push(obj);
			}
			var polygon = null;
			polygon = new Winfo.Polygon({
					content: new Winfo.MarkerContent({
						content: "<div style='color:white; font-size:12px;'>" + event.title + " </div>",
						offset: new Winfo.Pixel(0, 0),
						cover: false
					}),
					strokeColor: "#FF9966",
					strokeOpacity: 1,
					strokeWeight: 1,
					strokeStyle: "solid",
					strokeDasharray: "1 5 0",
					fillColor: "#FF9966",
					fillOpacity: 0.5,
					path: path
				});
			winfoMap.addOverlay(polygon); // 添加覆盖物
			winfoMap.panToBound(polygon.bound);
			polygon.dataID = event.id; // 报告线ID，用于区分显示多个报告线的标示，从报告线列表中传递过来
			polygon.jcqmc = event.title; // 名称
			// polygon.bz=event.bz;//备注
			MTData = polygon;
			MTGLdata.push(polygon);

			// 当为编辑时候弹出编辑框
			if (event.drawtype == "edit") {
				// 编辑线物标
				mtglpolyEditor = Winfo.PolyEditor(MTData);
				winfoMap.addOverlay(mtglpolyEditor);
				mtglpolyEditor.adjust(function (event) {
					MTData.path = event.path;
				});

				$.layer({
					type: 2,
					fix: false,
					shade: [0],
					closeBtn: [0, true],
					shade: true,
					border: [3, 0.1, '#000'],
					offset: ['300px', '1100px'],
					title: "码头区域编辑",
					border: [3, 0.1, '#000'],
					iframe: {
						src: '../mtgl/matouquyuEdit.html?mtqyid=' + event.id + '&mtid=' + event.mtid + '&mtmc=' + event.title + '&layerid=' + event.layerid
					},
					area: ['500px', '345px'],
					close: function (index) {
						if (MTData != null)
							winfoMap.removeOverlay(MTData);
					}
				});

			}
			winfoMap.setZoom(14);
		}
		// 删除电子检测线操作
		else {
			if (event.id != null && event.id != "" && event.id != undefined) {
				delMTQYdatabyid(event.id);
			}
			if (MTData != null) {
				winfoMap.removeOverlay(MTData);
			}
		}
	}

	// 码头区域新增
	else {
		winfoMap.setZoom(14);
		var d = event.mtzb.split(',');
		var p = new Winfo.LngLat(parseFloat(d[1]), parseFloat(d[0]));
		winfoMap.panTo(p, true); // 设置新的中心点(以当前物标为中心)
		closebgxwindow(); // 添加操作时,先关闭前一次的添加操作,确保每次添加操作为单例操作
		if (mouseTool == null) {
			// 创建鼠标控件
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // 添加控件
		}

		mouseTool.drawPolygon({}, function (data) {
			MTData = data;
			$.layer({
				type: 2,
				fix: false,
				title: "码头区域新增",
				shade: [0],
				closeBtn: [0, true],
				shade: true,
				border: [3, 0.1, '#000'],
				offset: ['300px', '1100px'],
				iframe: {
					src: '../mtgl/matouquyuEdit.html?mtid=' + event.mtid + '&mtmc=' + event.mtmc + '&layerid=' + event.layerid
				},
				area: ['500px', '345px'],
				close: function (index) {
					if (data != null)
						winfoMap.removeOverlay(data);
				}
			});
			/*
			 * JCXWindowInfo.closeed(function(event){
			 * if(data!=null&&event.type=="click")
			 * winfoMap.removeOverlay(data); });
			 */
			/*
			 * JCXWindowInfo.open(data.path[0]); // 打开信息窗体
			 * JCXWindowInfo.visualDisplay();// 显示在可视区域
			 */
			mtglpolyEditor = Winfo.PolyEditor(MTData);
			winfoMap.addOverlay(mtglpolyEditor);
			mtglpolyEditor.adjust(function (event) {
				MTData.path = event.path;
			});
		});
	}
}

// 根据ID删除海图中的码头区域
function delMTQYdatabyid(id) {
	// winfoMap.removeOverlay(MTData);
	// 循环电子报告制数据集合,销毁当前操作对象时,同步删除MTGLdata数组中存储的该对象元素
	for (var i = 0; i < MTGLdata.length; i++) {
		// 判断当前操作对象的报告线（区域）ID与数组中的是否相等
		if (MTGLdata[i].dataID == id) {
			winfoMap.removeOverlay(MTGLdata[i]) // 删除海图覆盖物
			MTGLdata.splice(i, 1); // 将删除的物标对象从数组中清除
			i--;
		}
	}
}
/**
 * *********************************码头管理 end
 * 20160219-柴永洁*****************************************************
 */

/**
 * *********************************通航要素海图标绘编辑 start
 * **********************************
 */
var zs_thyswindow = null; // 编辑窗口对象
var zs_thysbhdata = null;
// 自定义标绘编辑
function openMouseToolPointOverlay(event) {
	var object = null;
	var jwd = null;
	var editorobj;
	if (event.drawtype == "point") {
		jwd = new Winfo.LngLat(parseFloat(event.zb.split(',')[1]), parseFloat(event.zb.split(',')[0]));
	}
	var jkid = event.jkid;
	var srcStr = "";
	if (jkid != null && jkid == "T01024") {
		srcStr = "../../../msa/zhongshan/THYS/WirelessBackEdit.html?id=" + event.id + "&LXID=" + event.lxid + "&JKID=" + jkid + "&zb=" + event.zb + "";
	} else if (jkid != null && jkid == "T01025") {
		srcStr = "../../../msa/zhongshan/THYS/ChannelWLANEdit.html?id=" + event.id + "&LXID=" + event.lxid + "&JKID=" + jkid + "&zb=" + event.zb + "";
	} else if (jkid != null && jkid == "T01026") {
		srcStr = "../../../msa/zhongshan/THYS/OilSpillMonitoringBuoyEdit.html?id=" + event.id + "&LXID=" + event.lxid + "&JKID=" + jkid + "&zb=" + event.zb + "";
	}
	// 自定义物标标绘编辑
	if (event.drawtype == "point") {
		zs_thyswindow = new Winfo.InfoWindow({
				size: new Winfo.Size(505, 300),
				offset: new Winfo.Pixel(0, -15),
				content: "<iframe id='inforWindo_iframe' width='500px' height='285px' style='border:none' src='" + srcStr + "'></iframe>"
			});
		zs_thyswindow.closeed(function (eve) {
			if (object != null) {
				winfoMap.removeOverlay(object);
			}
			winfoMap.removeOverlay(marker);
		});
		zs_thyswindow.open(jwd); // 打开信息窗体
		zs_thyswindow.visualDisplay(); // 显示在可视区域内
		zs_thysbhdata = event;
	}
	setMapObject(event.zb, event.jkid);
	winfoMap.panTo(jwd);
}

// 添加海图覆盖物
function setMapObject(zb, jkid) {
	var pos = zb.split(",");
	var iconStr = "";
	if (jkid != null && jkid == "T01024") {
		iconStr = "../../Image/THYS/zh_wuxianhuichuan.png";
	} else if (jkid != null && jkid == "T01025") {
		iconStr = "../../Image/THYS/zh_wlan.png";
	} else if (jkid != null && jkid == "T01026") {
		iconStr = "../../Image/THYS/zh_yiyoufubiao.png";
	}
	var lnglat = new Winfo.LngLat(parseFloat(pos[1]), pos[0]);
	marker = new Winfo.Marker({
			position: lnglat,
			draggable: true,
			icon: new Winfo.Icon({
				size: new Winfo.Size(24, 24),
				image: iconStr,
				offset: new Winfo.Pixel(-12, -24)
			})
		});
	winfoMap.addOverlay(marker); // 添加覆盖物
	// 注册覆盖物移动时事件
	marker.dragend(function (event) {
		if (document.getElementById('inforWindo_iframe') != null && document.getElementById('inforWindo_iframe').contentWindow != null) {
			document.getElementById('inforWindo_iframe').contentWindow.setpoint(event.lnglat);
		}
	});
	winfoMap.panTo(lnglat); // 设置新的中心点(以当前物标为中心)
	// setpoint(lnglat); //设置显示值（左边编辑框）
}

// 关闭中山通航要素窗体
function closezs_thyswindow() {
	winfoMap.removeOverlay(marker); // 删除覆盖物
	// 删除标绘框
	if (zs_thyswindow != null) {
		winfoMap.removeOverlay(zs_thyswindow);
	}
	if (zs_thysbhdata != undefined && zs_thysbhdata != null) {
		winfoMap.removeOverlay(zs_thysbhdata);
	}
	// 取消编辑状态
	winfoMap.removeOverlay(editor);
}
/**
 * *********************************通航要素海图标绘编辑 end
 * **********************************
 */

/**
 * 加载法定区域的10000米内的通航要素
 *
 * @param longitude
 *            中心点经度
 * @param latitude
 *            中心点纬度
 */
var updatethysCounter = 0;
function loadthysForLawRegion(name, counter) {
	if (qygkdata != null && qygkdata.bound != null) {
		/*
		 * 重新加载通航要素，用户增加了通航要素需要重新加载一次所有的通航要素，否则会获取不到最新的通航要素
		 * 而之所以在此处重新加载是因为每个增加通航要素的地方过多，如果每个页面都在加载之后重新加载一次需要配置太多的页面
		 * 所以此处会阻塞加载通航要素。
		 */
		if (counter != updatethysCounter) {
			updatethysCounter = counter;
			getThysXq(false);
		}

		var regionCenter = qygkdata.bound.getCenter();
		longitude = regionCenter.lng;
		latitude = regionCenter.lat;

		var raidusMile = 10000; // 范围
		var PI = 3.14159265;
		var EARTH_RADIUS = 6378137;
		var RAD = Math.PI / 180.0;
		var degree = (24901 * 1609) / 360.0;
		var dpmLat = 1 / degree;
		var radiusLat = dpmLat * raidusMile;
		var minLat = latitude - radiusLat;
		var maxLat = latitude + radiusLat;
		var mpdLng = degree * Math.cos(latitude * (PI / 180));
		var dpmLng = 1 / mpdLng;
		var radiusLng = dpmLng * raidusMile;
		var minLng = longitude - radiusLng;
		var maxLng = longitude + radiusLng;
		getfjthys(minLng, minLat, maxLng, maxLat, longitude, latitude);
	}
}
