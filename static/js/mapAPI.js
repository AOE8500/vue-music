var offline_ship = null;
var freeData = null;
var inforWindow = null;
var swzddata = [];
var zfsbdata = [];
var fubiaoData = [];
var pointWidow = null; // ���㵯������
var zdyData = null; // �Զ����� ������
var zdyeditor = null; // �Զ����� �༭�ı�����
var htbhdata = null; // ��ͼ���༭����
// ��ͼ�������翪�ش������ݡ�����������ȣ�
var cangdanList = null;

var wholeJg = [];
var isExist = [];
var existArray = [];
var firstLiText = "";
var sectionPolygons = [];
var controlSectionPolygons = [];
// ͼ��--->�ҵ�Ͻ��
function drawSection(event) {

	SubmitFrom({
		data: encodeURI("Action=getAllSection"),
		url: "/gdmsaec/SectionAction",
		success: function (msg) {
			if (msg != "0") {
				// �õ�Ͻ��֮�󣬻���Ͻ������
				if (event.iskq == false) {
					for (var i = 0; i < msg.length; i++) {
						// ���������";"��β����ô��ɾ���ֺ�
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
// ͼ��------->������ܿ�
function drawControlSection(event) {
	SubmitFrom({
		data: encodeURI("Action=getallDataWithLike"),
		url: "/gdmsaec/QYGKAction",
		success: function (msg) {
			if (msg != "0") {
				msg = msg.data;
				// �õ�Ͻ��֮�󣬻���Ͻ������
				if (event.iskq == false) {
					for (var i = 0; i < msg.length; i++) {
						// ���������";"��β����ô��ɾ���ֺ�
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
							winfoMap.addOverlay(circle); // ��Ӷ���
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
							winfoMap.addOverlay(rectangle); // ��Ӷ���
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

// ͼ��----->��������
/*
 * function drawAdministrativeSection(){
 * alert("��mapOperation.js----->drawAdministrativeSection������ݲ���ͼ"); }
 */

function drawOverlay(event) {
	// ����ais����
	if (event.datatype != undefined && event.datatype.indexOf("ais") != -1) {
		if (aisLayer == null) {
			// ����AISͼ��
			// index������˳�� 100
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
			winfoMap.addLayer(aisLayer); // ���ͼ��
		} else {
			if (event.iskq != true) {
				winfoMap.removeLayer(aisLayer);
				aisLayer = null;
			}
		}
	}
	// ����vts����
	if (event.datatype != undefined && event.datatype.indexOf("vts") != -1) {
		if (vtsLayer == null) {
			// ����AISͼ��
			// index������˳�� 100
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
			vtsLayer.refresh(); // ��̬ͼ��ʱ��Ҫ
			winfoMap.addLayer(vtsLayer); // ���ͼ��
		} else {
			if (event.iskq != true) {
				winfoMap.removeLayer(vtsLayer);
				vtsLayer = null;
			}
		}
	}
	// ͨ��Ҫ��
	else if (event.datatype != undefined && event.datatype.indexOf("thys") != -1) {
		var typeid = event.typeid;
		sessionStorage.setItem("tongHangYaoSuId", typeid)
		sxThys()
	} else if (event.datatype != undefined && event.datatype.indexOf("wbrh") != -1) // ����ں�
	{
		if (event.iskq == true) {
			aisLayer.merge({
				Layer: vtsLayer,
				close: false
			}); // AISͼ���ں�VTSͼ��
		} else {
			aisLayer.merge({
				Layer: vtsLayer,
				close: true
			}); // �ر�AIS/VTS�ں�
		}
	} else if (event.datatype != undefined && event.datatype.indexOf("swxx") != -1) // ˮ����Ϣ
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
				// ��ӵ㸲����
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
	} else if (event.datatype != undefined && event.datatype.indexOf("zfsb") != -1) // ִ���豸
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
					// ��ӵ㸲����
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
	// ��������
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
					// ��ӵ㸲����
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
	// �෽λ
	else if (event.datatype != undefined && event.datatype.indexOf("cfw") != -1) {
		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
		}
		// ������������λ
		// ������ ������ AzimuthCircle����μ�AzimuthCircle ����
		// function��data�� ���������ʱ �ص����� data��������ɺ�� AzimuthCircle ����
		mouseTool.openAzimuthCircle({}, function (data) {});
	}
	// ���
	else if (event.datatype != undefined && event.datatype.indexOf("cj") != -1) {
		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
		}
		// �������������
		// ������ ������ Measure��Measure ����
		// function��data�� ���������ʱ �ص����� data��������ɺ�� Measure ����
		mouseTool.openMeasure({}, function (data) {});
	}
	// ��λ��
	else if (event.datatype != undefined && event.datatype.indexOf("dwd") != -1) {
		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
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

	// ���Ƶ�
	else if (event.datatype == "d") {
		var iframeId = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// �������ؼ�
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // ��ӿؼ�
			}
			mouseTool.drawPoint({
				title: "�ҵı�ע",
				draggable: true
			}, function (data) {
				zdyData = data;
				if (top.document.getElementById(iframeId) != undefined && top.document.getElementById(iframeId).contentWindow.pageBack != undefined) {
					top.document.getElementById(iframeId).contentWindow.pageBack({
						data: zdyData // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}

				// ע�Ḳ�����ƶ�ʱ�¼�
				data.dragging(function (event) {
					// �ж���ҳ���Ƿ���ڡ�
					if (top.document.getElementById(iframeId) != undefined && top.document.getElementById(iframeId).contentWindow.pageBack != undefined) {
						top.document.getElementById(iframeId).contentWindow.pageBack({
							data: event // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
						});
					}
				});
				// �����ƶ��󴥷�
				// data.dragend(function (event) {
				// inforWindow.setPosition(event.lnglat);
				// $("#log").html(event.lnglat.getLat() + "," + event.lnglat.getLng());
				// });

			});

	} // �����¹ʵ�
	else if (event.datatype == "sgd") {
		var iframeId = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// �������ؼ�
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // ��ӿؼ�
			}
			mouseTool.drawPoint({
				title: "�ҵı�ע",
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
						data: zdyData // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
				// �����ƶ�ʱ����
				data.dragging(function (event) {
					// �ж���ҳ���Ƿ���ڡ�
					if (top.document.getElementById(iframeId) != undefined && top.document.getElementById(iframeId).contentWindow.pageBack != undefined) {
						top.document.getElementById(iframeId).contentWindow.pageBack({
							data: event // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
						});
					}
				});
				// ע�Ḳ�����ƺ���¼�
				// data.dragend(function (event) {
				// inforWindow.setPosition(event.lnglat);
				// $("#log").html(event.lnglat.getLat() + "," + event.lnglat.getLng());
				// });

			});

	} else if (event.datatype == "x") {
		var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// �������ؼ�
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // ��ӿؼ�
			}
			// ��������������
			// function��data�� ���������ʱ �ص����� data��������ɺ�� Polyline ����
			mouseTool.drawPolyline({
				title: "��������"
			}, function (data) {
				zdyData = data;
				zdyeditor = Winfo.PolyEditor(data);
				winfoMap.addOverlay(zdyeditor);
				if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						data: data.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
				// �������� ����
				zdyeditor.addnode(function (event) {
					// �ж���ҳ���Ƿ���ڡ�
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
							data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
						});
					}
				});
				// �����ƶ� ����
				zdyeditor.adjust(function (event) {
					// �ж���ҳ���Ƿ���ڡ�
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
							data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
						});
					}
				});
			});
	} else if (event.datatype == "m") {
		var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// �������ؼ�
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // ��ӿؼ�
			}
			// ���������ƶ����
			// ������ ������ Polygon����μ�Polygon ����
			// function��data�� ���������ʱ �ص����� data��������ɺ�� Polyline ����
			mouseTool.drawPolygon({
				title: "��������"
			}, function (data) {
				zdyData = data;
				zdyeditor = Winfo.PolyEditor(data);
				winfoMap.addOverlay(zdyeditor);
				if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
					top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface({
						data: data.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
				// �������� ����
				zdyeditor.addnode(function (event) {
					// �ж���ҳ���Ƿ���ڡ�
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface({
							data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
						});
					}
				});
				// �����ƶ� ����
				zdyeditor.adjust(function (event) {
					// �ж���ҳ���Ƿ���ڡ�
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editface({
							data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
						});
					}
				});
			});
	} else if (event.datatype == "jx") {
		var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// �������ؼ�
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // ��ӿؼ�
			}
			// ���������ƶ����
			// ������ ������ Polygon����μ�Polygon ����
			// function��data�� ���������ʱ �ص����� data��������ɺ�� Polyline ����
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
						data: data.bound // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
				zdyeditor = Winfo.RectangleEditor(data);
				winfoMap.addOverlay(zdyeditor);
				// �����ƶ��󴥷�
				zdyeditor.dragend(function (event) {
					zdyData = event.bound;
				});
				zdyeditor.adjust(function (event) {
					// �ж���ҳ���Ƿ���ڡ�
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editjx != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editjx({
							data: event.bound // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
						});
					}
				});

			});
	} else if (event.datatype == "y") {

		var zidingyiwubiao_iframe = sessionStorage.getItem("BiaoHuiInfo")
			if (mouseTool == null) {
				// �������ؼ�
				mouseTool = new Winfo.MouseTool();
				winfoMap.addControl(mouseTool); // ��ӿؼ�
			}
			// �������ؼ����Բ���
			// ������ ������ Circle����μ�Circle ����
			// function��data�� ���������ʱ �ص����� data��������ɺ��Circle ����
			// ������ ������ Circle����μ�Circle ����
			// function��data�� ���������ʱ �ص����� data��������ɺ��Circle ����
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
						data: data.bound // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}

				// �����ƶ� ����
				zdyeditor.adjust(function (event) {
					// �ж���ҳ���Ƿ���ڡ�
					if (top.document.getElementById(zidingyiwubiao_iframe) != undefined && top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
						top.document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
							data: event.bound // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
						});
					}
				});
			});
	}
}

/** �ر��Զ����洰��* */
function zdywindow() {
	// ɾ������
	if (inforWindow != null) {
		winfoMap.removeOverlay(inforWindow);
	}
	if (zdyData != undefined && zdyData != null) { // ɾ�����
		winfoMap.removeOverlay(zdyData);
	}
	// ȡ���༭״̬
	winfoMap.removeOverlay(zdyeditor);
	relocationlist();

}

/** ***********************����ܿأ����������ӽ���--������(2014-10-29)******************************** */

var qygkwindow = null; /** *********����ܿص������洰�����******************** */
var qygkdata = null; /** *********����ܿغ�ͼ����******************** */
var polygonobj = [];

// ���Ѳ���ص�ˮ��
var cruiseMarker = null;
function drawCruiseArea(event) {
	if (cruiseMarker != null) {
		winfoMap.removeOverlay(cruiseMarker);
	}

	// ===============drawtype��ΪviewʱΪ��������뵯����Ϣ����================================//
	// ���õ��������ʼ����
	var mysize = new Winfo.Size(400, 315); // ���������С
	var myoffset = new Winfo.Pixel(50, 0); // ����ƫ����
	var mycontent = "<iframe id='inforWindo_iframe' width=400px' height='300' style='border:none' src='../hsgl/cruiseAreaObject.html?drawtype=" + event.datatype + "' ></iframe>";
	if (event.drawtype == "add") {
		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
		}
		if (qygkdata != null) {
			qygkdata.qyid = event.qyid;
			polygonobj.push(qygkdata); // ����ǰ��ʾ�������ӵ�����
		}

		if (event.datatype == "dian") // ��
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// �������ؼ��������
			// ������ ������ Marker����μ�Marker ����
			// function��data�� ���������ʱ �ص����� data��������ɺ��Marker ����
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
				title: "�ص�ˮ��",
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
				qygkwindow.open(data.lnglat); // ����Ϣ����
				qygkwindow.visualDisplay(); // ��ʾ�ڿ�������

				// �����ƶ��󴥷�
				data.dragend(function (dataevent) {
					if (document.getElementById('inforWindo_iframe') != null && document.getElementById('inforWindo_iframe').contentWindow != null) {
						document.getElementById('inforWindo_iframe').contentWindow.cruiseSetlatlng(dataevent.lnglat.lat, dataevent.lnglat.lng);
					}

				});

			});

		} else if (event.datatype == "m" || event.datatype == "polygon") // ������
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// ���������ƶ����
			// ������ ������ Polygon����μ�Polygon ����
			// function��data�� ���������ʱ �ص����� data��������ɺ�� Polyline ����
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
				qygkwindow.open(data.path[0]); // ����Ϣ����
				AddFreeList(data, true, qygkwindow); // �����༭ģʽ
				qygkwindow.visualDisplay(); // ��ʾ�ڿ�������
			});
		} else if (event.datatype == "jx" || event.datatype == "rectangle") // ����
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// �������ؼ�����������
			// ������ ������ Rectangle ����μ�Rectangle ����
			// function��data�� ���������ʱ �ص����� data��������ɺ�� Rectangle ����
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
				qygkwindow.open(data.lnglat); // ����Ϣ����
				AddFreeList(data, true, qygkwindow); // �����༭ģʽ
				qygkwindow.visualDisplay(); // ��ʾ�ڿ�������
			});
		} else if (event.datatype == "y" || event.datatype == "circle") // Բ����
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// �������ؼ����Բ���
			// ������ ������ Circle����μ�Circle ����
			// function��data�� ���������ʱ �ص����� data��������ɺ��Circle ����
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
				qygkwindow.open(data.lnglat); // ����Ϣ����
				AddFreeList(data, true, qygkwindow); // �����༭ģʽ
				qygkwindow.visualDisplay(); // ��ʾ�ڿ�������
			});
		}

	}

	// ===============drawtype��ΪviewʱΪ��������뵯����Ϣ����================================//
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

			if (event.datatype == "dian") { // ��
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
					winfoMap.addOverlay(marker); // ��Ӹ�����
					cruiseMarker = marker;
					// ע�Ḳ����ĵ���¼�
					marker.click(function (mevent) {
						closeqygkwindow();
						mycontent = "<iframe id='inforWindo_iframe' width=400px' height='300px;' style='border:none' src='../hsgl/cruiseAreaObject.html?drawtype=" + event.datatype + "&dianwz=" + mevent.lnglat.lat + "," + mevent.lnglat.lng + "' ></iframe>";
						qygkwindow = new Winfo.InfoWindow({
								size: mysize,
								offset: myoffset,
								content: mycontent
							});
						qygkwindow.closeed(function (cevent) {
							// ɾ��������
							if (marker != null) {
								winfoMap.removeOverlay(marker);
							}
							if (cruiseMarker != null) {
								winfoMap.removeOverlay(cruiseMarker);
							}
							top.cruiseEmphasisAreaList();
							qygkwindow = null;
						});
						qygkwindow.open(mevent.lnglat); // ����Ϣ����
						qygkwindow.visualDisplay(); // ��ʾ�ڿ�������
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
						 */// ɾ��������
						if (marker != null) {
							winfoMap.removeOverlay(marker);
						}
						top.cruiseEmphasisAreaList();
					});
					qygkwindow.open(lnglat); // ����Ϣ����
					qygkwindow.visualDisplay(); // ��ʾ�ڿ�������
				}

				qygkdata = new Object();
				qygkdata.title = event.title; // �ܿ�����
				qygkdata.qyid = event.qyid; // ����ID
				qygkdata.path = event.path; // ����
				qygkdata.datatype = "edit"; // ��ʾ����
				qygkdata.bz = event.bz; // ��ע

			} else if (event.datatype == "m" || event.datatype == "polygon") // �����
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
						// ��������ͼ������̫Сʱ�򽫲���ʾ��ť
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

					qygkdata.title = event.title; // �ܿ�����
					qygkdata.qyid = event.qyid; // ����ID
					qygkdata.sfqy = event.sfqy; // �Ƿ�����
					qygkdata.datatype = "edit"; // ��ʾ����
					qygkdata.gklx = event.gklx; // �ܿ�����
					qygkdata.bz = event.bz; // ��ע
					qygkdata.thysid = event.thysid; // ͨ��Ҫ��ID
					qygkdata.thystypeid = event.thystypeid; // ͨ��Ҫ������ID
					qygkdata.thysmc = event.thysmc; // ͨ��Ҫ������
					qygkwindow = new Winfo.InfoWindow({
							size: mysize,
							offset: myoffset,
							content: mycontent
						});
					qygkwindow.open(coorpath[0]); // ����Ϣ����
					qygkwindow.closeed(function (event) {
						if (qygkdata != null)
							winfoMap.removeOverlay(qygkdata);
						top.cruiseEmphasisAreaList();
					});
					AddFreeList(polygon, true, qygkwindow); // �����༭ģʽ
					qygkwindow.visualDisplay(); // ��ʾ�ڿ�������
				}

				winfoMap.addOverlay(polygon); // ��Ӹ�����
				polygon.qyid = event.qyid;
				polygonobj.push(polygon); // ��������ӵ������С���ʾ���ʱ���ֹ������ң���������ID����

				if (event.sfdw != "no") {
					winfoMap.panToBound(polygon.bound);
					// winfoMap.setZoom(9);
				}

			} else if (event.datatype == "jx" || event.datatype == "rectangle") // ����
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

						// ��������ͼ������̫Сʱ�򽫲���ʾ��ť
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

					qygkdata.title = event.title; // �ܿ�����
					qygkdata.qyid = event.qyid; // ����ID
					qygkdata.sfqy = event.sfqy; // �Ƿ�����
					qygkdata.datatype = "edit"; // ��ʾ����
					qygkdata.gklx = event.gklx; // �ܿ�����
					qygkdata.bz = event.bz; // ��ע
					qygkdata.thysid = event.thysid; // ͨ��Ҫ��ID
					qygkdata.thystypeid = event.thystypeid; // ͨ��Ҫ������ID
					qygkdata.thysmc = event.thysmc; // ͨ��Ҫ������
					qygkwindow = new Winfo.InfoWindow({
							size: mysize,
							offset: new Winfo.Pixel(100, -100),
							content: mycontent
						});
					qygkwindow.open(coorpath[0]); // ����Ϣ����
					qygkwindow.closeed(function (event) {
						if (qygkdata.type == "clcik" && qygkdata != null)
							winfoMap.removeOverlay(qygkdata);
						top.cruiseEmphasisAreaList();
					});
					AddFreeList(rectangle, true, qygkwindow); // �����༭ģʽ
					qygkwindow.visualDisplay(); // ��ʾ�ڿ�������
				}

				winfoMap.addOverlay(rectangle); // ��Ӹ�����
				rectangle.qyid = event.qyid;
				polygonobj.push(rectangle);

				if (event.sfdw != "no") {
					winfoMap.panToBound(rectangle.bound);
					// winfoMap.setZoom(9);
				}
			} else if (event.datatype == "y" || event.datatype == "circle") // Բ
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

					// ��������ͼ������̫Сʱ�򽫲���ʾ��ť
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

				winfoMap.addOverlay(circle); // ��Ӷ���

				circle.qyid = event.qyid;
				polygonobj.push(circle);
				if (event.sfdw != "no") {
					winfoMap.panToBound(circle.bound);
					// winfoMap.setZoom(9);
				}
			}
		} else if (event.drawtype == "check") {
			top.getIframe();
			var checksize = new Winfo.Size(430, 330); // ���������С
			var checkoffset = new Winfo.Pixel(50, 0); // ����ƫ����
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
			qygkdata.title = event.title; // �ܿ�����
			qygkdata.qyid = event.qyid; // ����ID
			qygkdata.path = event.path; // ����
			qygkdata.datatype = event.datatype; // ��ʾ����
			qygkdata.bz = event.bz; // ��ע
			qygkdata.layerIndex = event.layerIndex;

			if (event.datatype == "dian") { // ��
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
					winfoMap.addOverlay(marker); // ��Ӹ�����
					cruiseMarker = marker;
					// ע�Ḳ����ĵ���¼�

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
					 * qygkwindow.open(lnglat); // ����Ϣ����
					 * qygkwindow.visualDisplay();// ��ʾ�ڿ�������
					 */
				}

			} else if (event.datatype == "m" || event.datatype == "polygon") // �����
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
					// ��������ͼ������̫Сʱ�򽫲���ʾ��ť
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

				// ��ҳ��
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
				// checkoffset =new Winfo.Pixel(0, 100);//����ƫ����
				// qygkwindow = new Winfo.InfoWindow({size : checksize,offset :
				// checkoffset,content :checkcontent });
				// qygkwindow.open(coorpath[0]); // ����Ϣ����
				// qygkwindow.closeed(function(event){
				// if(qygkdata!=null){
				// top.cruiseListPage(qygkdata.layerIndex);
				// qygkdata.drawtype='close';
				// drawCruiseArea(qygkdata);
				// }
				// });


				winfoMap.addOverlay(polygon); // ��Ӹ�����
				polygon.qyid = event.qyid;
				polygonobj.push(polygon); // ��������ӵ������С���ʾ���ʱ���ֹ������ң���������ID����

				if (event.sfdw != "no") {
					winfoMap.panToBound(polygon.bound);
					// winfoMap.setZoom(9);
				}
			} else if (event.datatype == "rectangle") {
				// ����
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

					// ��������ͼ������̫Сʱ�򽫲���ʾ��ť
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
				 * // ��ҳ�� checkcontent="<iframe id='inforWindo_iframe'
				 * width=430px' height='310px;' style='border:none'
				 * src='../hsgl/checkCruiseArea.html?drawtype="+event.datatype+"&dianwz="+event.path+"&content="+event.bz+"&name="+event.title+"&id="+event.qyid+"&layerIndex="+event.layerIndex+"' ></iframe>";
				 * checkoffset =new Winfo.Pixel(0, 200);// ����ƫ���� qygkwindow =
				 * new Winfo.InfoWindow({size : checksize,offset :
				 * checkoffset,content :checkcontent });
				 * qygkwindow.open(coorpath[0]); // ����Ϣ����
				 * qygkwindow.closeed(function(event){ if(qygkdata!=null){
				 * top.cruiseListPage(qygkdata.layerIndex);
				 * qygkdata.drawtype='close'; drawCruiseArea(qygkdata); }
				 *
				 * });
				 */

				// ��ҳ��
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

				winfoMap.addOverlay(rectangle); // ��Ӹ�����
				rectangle.qyid = event.qyid;
				polygonobj.push(rectangle)

				winfoMap.panToBound(rectangle.bound);
				// winfoMap.setZoom(9);
			} else if (event.datatype == "circle") // Բ
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

					// ��������ͼ������̫Сʱ�򽫲���ʾ��ť
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
				 * // ��ҳ�� checkcontent="<iframe id='inforWindo_iframe'
				 * width=430px' height='310px;' style='border:none'
				 * src='../hsgl/checkCruiseArea.html?drawtype="+event.datatype+"&dianwz="+event.path+"&content="+event.bz+"&name="+event.title+"&id="+event.qyid+"&layerIndex="+event.layerIndex+"' ></iframe>";
				 * checkoffset =new Winfo.Pixel(0, 200);// ����ƫ���� qygkwindow =
				 * new Winfo.InfoWindow({size : checksize,offset :
				 * checkoffset,content :checkcontent });
				 * qygkwindow.open(coorpath[0]); // ����Ϣ����
				 * qygkwindow.closeed(function(event){ if(qygkdata!=null){
				 * top.cruiseListPage(qygkdata.layerIndex);
				 * qygkdata.drawtype='close'; drawCruiseArea(qygkdata); }
				 * });
				 */
				// ��ҳ��
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
				winfoMap.addOverlay(circle); // ��Ӷ���

				circle.qyid = event.qyid;
				polygonobj.push(circle);
				winfoMap.panToBound(circle.bound);
				// winfoMap.setZoom(9);
			}
		} else {
			var delteobject = null;
			for (i = 0; i < polygonobj.length; i++) {
				if (polygonobj[i].qyid == event.qyid) {
					winfoMap.removeOverlay(polygonobj[i]); // ɾ��������
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

// �Ƴ����
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

// ��ӹܿ���
function drawOverlayByQYGK(event) {

	toCloseQYGK();
	// ===============drawtype��ΪviewʱΪ��������뵯����Ϣ����================================//
	// ���õ��������ʼ����
	var mysize = new Winfo.Size(302, 265); // ���������С
	var myoffset = new Winfo.Pixel(50, 0); // ����ƫ����
	var mycontent = "<iframe id='inforWindo_iframe' width=285px' height='250' style='border:none' src='../WinfoENC/freeobject.html'></iframe>";
	if (event.drawtype == "add") {
		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
		}
		if (qygkdata != null) {
			qygkdata.qyid = event.qyid;
			polygonobj.push(qygkdata); // ����ǰ��ʾ�������ӵ�����
		}
		if (event.datatype == "m" || event.datatype == "polygon") // ������
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// ���������ƶ����
			// ������ ������ Polygon����μ�Polygon ����
			// function��data�� ���������ʱ �ص����� data��������ɺ�� Polyline ����
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
				// qygkwindow.open(data.path[0]); // ����Ϣ����
				// AddFreeList(data, true,qygkwindow); // �����༭ģʽ
				// qygkwindow.visualDisplay();// ��ʾ�ڿ�������
				gkqIndex = $.layer({
						type: 2,
						shade: [0],
						fix: false,
						maxmin: true,
						title: "�������",
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
		} else if (event.datatype == "jx" || event.datatype == "rectangle") // ����
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// �������ؼ�����������
			// ������ ������ Rectangle ����μ�Rectangle ����
			// function��data�� ���������ʱ �ص����� data��������ɺ�� Rectangle ����
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
				// qygkwindow.open(data.lnglat); // ����Ϣ����
				// AddFreeList(data, true,qygkwindow); // �����༭ģʽ
				// qygkwindow.visualDisplay();// ��ʾ�ڿ�������
				gkqIndex = $.layer({
						type: 2,
						shade: [0],
						fix: false,
						maxmin: true,
						title: "�������",
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
		} else if (event.datatype == "y" || event.datatype == "circle") // Բ����
		{
			if (qygkwindow != null) {
				closeqygkwindow();
			}
			// �������ؼ����Բ���
			// ������ ������ Circle����μ�Circle ����
			// function��data�� ���������ʱ �ص����� data��������ɺ��Circle ����
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
						title: "�������",
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
					}); // ��ʾ�ڿ�������
			});
		}

	}
	// ===============drawtype��ΪviewʱΪ��������뵯����Ϣ����================================//
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
					if (event.datatype == "polygon") // �����
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
						winfoMap.addOverlay(polygon); // ��Ӹ�����
						polygon.qyid = event.qyid;
						polygonobj.push(polygon); // ��������ӵ������С���ʾ���ʱ���ֹ������ң���������ID����

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
								// ��������ͼ������̫Сʱ�򽫲���ʾ��ť
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

							qygkdata.title = event.title; // �ܿ�����
							qygkdata.qyid = event.qyid; // ����ID
							qygkdata.sfqy = event.sfqy; // �Ƿ�����
							qygkdata.datatype = "edit"; // ��ʾ����
							qygkdata.gklx = event.gklx; // �ܿ�����
							qygkdata.bz = event.bz; // ��ע
							qygkdata.thysid = event.thysid; // ͨ��Ҫ��ID
							qygkdata.thystypeid = event.thystypeid; // ͨ��Ҫ������ID
							qygkdata.thysmc = event.thysmc; // ͨ��Ҫ������
                            qygkdata.statuteFullId = event.statuteFullId;
                            qygkdata.statuteArticle = event.statuteArticle;

							gkqIndex = $.layer({
									type: 2,
									shade: [0],
									fix: false,
									maxmin: true,
									title: "�������",
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
							 * ����Ϣ���� qygkwindow.closeed(function(event){ if(qygkdata!=null)
							 * winfoMap.removeOverlay(qygkdata); });
							 */
							AddFreeList(polygon, true, qygkwindow); // �����༭ģʽ
							// qygkwindow.visualDisplay();// ��ʾ�ڿ�������
						}

						

					} else if (event.datatype == "rectangle") // ����
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
						winfoMap.addOverlay(rectangle); // ��Ӹ�����
						rectangle.qyid = event.qyid;
						polygonobj.push(rectangle);
						if (event.sfdw != "no") {
							winfoMap.panToBound(rectangle.bound);
							// winfoMap.setZoom(9);
						}
						if (event.drawtype == "view") {
							rectangle.mousemove(function () {
								var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(coorpath[0].lng, coorpath[1].lat));

								// ��������ͼ������̫Сʱ�򽫲���ʾ��ť
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

							qygkdata.title = event.title; // �ܿ�����
							qygkdata.qyid = event.qyid; // ����ID
							qygkdata.sfqy = event.sfqy; // �Ƿ�����
							qygkdata.datatype = "edit"; // ��ʾ����
							qygkdata.gklx = event.gklx; // �ܿ�����
							qygkdata.bz = event.bz; // ��ע
							qygkdata.thysid = event.thysid; // ͨ��Ҫ��ID
							qygkdata.thystypeid = event.thystypeid; // ͨ��Ҫ������ID
							qygkdata.thysmc = event.thysmc; // ͨ��Ҫ������
                            qygkdata.statuteFullId = event.statuteFullId; //�������
                            qygkdata.statuteArticle = event.statuteArticle;

							gkqIndex = $.layer({
									type: 2,
									shade: [0],
									fix: false,
									maxmin: true,
									title: "�������",
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
							 * qygkwindow.open(coorpath[0]); // ����Ϣ����
							 * qygkwindow.closeed(function(event){
							 * if(qygkdata.type=="clcik"&&qygkdata!=null)
							 * winfoMap.removeOverlay(qygkdata); });
							 */
							AddFreeList(rectangle, true, qygkwindow); // �����༭ģʽ
							// qygkwindow.visualDisplay();// ��ʾ�ڿ�������
						}
						
					} else if (event.datatype == "circle") // Բ
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
						winfoMap.addOverlay(circle); // ��Ӷ���
						circle.qyid = event.qyid;
						polygonobj.push(circle);
						if (event.sfdw != "no") {
							winfoMap.panToBound(circle.bound);
							// winfoMap.setZoom(9);
						}
						if (event.drawtype == "view") {
							circle.mousemove(function () {
								var pmcoor = winfoMap.lnglatToPixel(new Winfo.LngLat(circle.lnglat.getLng(), circle.lnglat.getLat()));

								// ��������ͼ������̫Сʱ�򽫲���ʾ��ť
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

							qygkdata.title = event.title; // �ܿ�����
							qygkdata.qyid = event.qyid; // ����ID
							qygkdata.sfqy = event.sfqy; // �Ƿ�����
							qygkdata.datatype = "edit"; // ��ʾ����
							qygkdata.gklx = event.gklx; // �ܿ�����
							qygkdata.bz = event.bz; // ��ע
							qygkdata.thysid = event.thysid; // ͨ��Ҫ��ID
							qygkdata.thystypeid = event.thystypeid; // ͨ��Ҫ������ID
							qygkdata.thysmc = event.thysmc; // ͨ��Ҫ������
                            qygkdata.statuteFullId = event.statuteFullId; //�������
                            qygkdata.statuteArticle = event.statuteArticle;
							gkqIndex = $.layer({
									type: 2,
									shade: [0],
									fix: false,
									maxmin: true,
									title: "�������",
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
							 * qygkwindow.open(coorpath[0]); // ����Ϣ����
							 * qygkwindow.closeed(function(event){
							 * if(qygkdata.type=="clcik"&&qygkdata!=null)
							 * winfoMap.removeOverlay(qygkdata); });
							 */
							AddFreeList(circle, true, qygkwindow); // �����༭ģʽ
							// qygkwindow.visualDisplay();// ��ʾ�ڿ�������
						}
						
					}
		} else {
			var delteobject = null;
			for (i = 0; i < polygonobj.length; i++) {
				if (polygonobj[i].qyid == event.qyid) {
					winfoMap.removeOverlay(polygonobj[i]); // ɾ��������
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
// ��Ӱ�ȫԤ����
function drawOverlayByAQYJ(event) {
	if (mouseTool == null) {
		// �������ؼ�
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // ��ӿؼ�
	}

	if (event != null && event.datatype == "m") // �����
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
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ������򴬲�Ԥ��</i></h4>';
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
	} else if (event != null && event.datatype == "jx") // ����
	{
		mouseTool.drawRectangle({}, function (data) {
			var zbStr = data.lnglat.lng + ',' + data.lnglat.lat + ';' + data.lnglat.lng + ',' + data.rlnglat.lat + ';' + data.rlnglat.lng + ',' + data.lnglat.lat + ';' + data.rlnglat.lng + ',' + data.rlnglat.lat;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ������򴬲�Ԥ��</i></h4>';
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
	} else if (event != null && event.datatype == "y") // Բ
	{
		mouseTool.drawCircle({}, function (data) {
			// longitude����, latitudeγ��
			// ���ĵ� lnglat ���� lng γ�� lat
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
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ������򴬲�Ԥ��</i></h4>';
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
// ����Զ�Ԥ����
function drawOverlayByZDYJ(event) {
	yjzdyInfo = null;
	if (event.datatype == "face") {
		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
		}
		// ���������ƶ����
		// ������ ������ Polygon����μ�Polygon ����
		// function��data�� ���������ʱ �ص����� data��������ɺ�� Polyline ����
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
			inforWindow.open(data.path[0]); // ����Ϣ����
			inforWindow.visualDisplay(); // ��ʾ�ڿ���������
			inforWindow.closeed(function (eve) {
				if (data != null) {
					winfoMap.removeOverlay(data);
				}
				relocationlist(); // ˢ�º�ͼ����б�

			});

			��������������zdyeditor = Winfo.PolyEditor(data);
			winfoMap.addOverlay(zdyeditor); // ��Ӻ�ͼ������
			// �����ƶ� ����
			zdyeditor.adjust(function (event) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
			// �������� ����
			zdyeditor.addnode(function (event) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
		});

	} else if (event.datatype == "rectangle") {

		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
		}
		if (inforWindow != null) {
			inforWindow.close({
				iscloseed: false
			});
		}
		// ���������ƶ����
		// ������ ������ Polygon����μ�Polygon ����
		// function��data�� ���������ʱ �ص����� data��������ɺ�� Polyline ����
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
				relocationlist(); // ˢ�º�ͼ����б�
			});
			inforWindow.open(data.lnglat); // ����Ϣ����
			inforWindow.visualDisplay(); // ��ʾ�ڿ�������
			// AddFreeList(data, true,inforWindow); // �����༭ģʽ (object, bool,windowOject)
			zdyeditor = Winfo.RectangleEditor(data);
			winfoMap.addOverlay(zdyeditor); // ��Ӻ�ͼ������

			// �����ƶ��󴥷�
			zdyeditor.dragend(function (event) {
				zdyData = event.object;
				inforWindow.open(data.lnglat); // ����Ϣ����
				inforWindow.visualDisplay(); // ��ʾ�ڿ���������
			});
			zdyeditor.adjust(function (event) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: event.object // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
			// �����ƶ�ǰ����
			zdyeditor.dragstart(function (event) { // {iscolsed:false}�ж��Ƿ����inforWindow.closeed������falseΪ�����ã�ֻ����Ĭ�Ϸ���
				inforWindow.close();
			});
		});
	} else if (event.datatype == "circle") {
		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
		}
		if (inforWindow != null) {
			inforWindow.close({
				iscloseed: false
			});
		}
		// �������ؼ����Բ���
		// ������ ������ Circle����μ�Circle ����
		// function��data�� ���������ʱ �ص����� data��������ɺ��Circle ����
		// ������ ������ Circle����μ�Circle ����
		// function��data�� ���������ʱ �ص����� data��������ɺ��Circle ����
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
			inforWindow.open(data.lnglat); // ����Ϣ����
			inforWindow.visualDisplay(); // ��ʾ�ڿ���������
			// AddFreeList(data, true,inforWindow); // �����༭ģʽ
			// inforWindow.open(data.path[0]); // ����Ϣ����
			inforWindow.closeed(function (eve) {
				if (data != null) {
					winfoMap.removeOverlay(data);
				}
				relocationlist(); // ˢ�º�ͼ����б�

			});
			zdyeditor = Winfo.CircleEditor(data);
			winfoMap.addOverlay(zdyeditor); // ��Ӻ�ͼ������
			// �����ƶ� ����
			zdyeditor.adjust(function (event) {
				var coorpath = []; // Բ����������
				coorpath[0] = event.bound.getWestSouth();
				coorpath[1] = event.bound.getEastNorth();
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: coorpath // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
		});
	}
}

// ����ܿ�ҳ�浯����ʼ��ʱ���õ�����Ȳ���
function qygkParam() {
	return qygkdata;
}

/** ***���������༭ģʽ***** */
/** ***object�༭����*************** */
/** ***bool�Ƿ���*************** */
/** ***windowOject�����������*************** */
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

				// �����ƶ��󴥷�
				editor.dragend(function (data) {
					if(windowOject){
						windowOject.open(data.lnglat); // ����Ϣ����
						windowOject.visualDisplay(); // ��ʾ�ڿ���������
					}					
				});

				// �����ƶ�ǰ����
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

				// �����ƶ��󴥷�
				editor.dragend(function (data) {
					if(windowOject){
						windowOject.open(data.lnglat); // ����Ϣ����
						windowOject.visualDisplay(); // ��ʾ�ڿ���������
					}	
					if (document.getElementById('inforWindo_iframe') != null && document.getElementById('inforWindo_iframe').contentWindow != null) {
						document.getElementById('inforWindo_iframe').contentWindow.setpoint(event);
					}
				});

				// �����ƶ�ǰ����
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
	// ɾ������
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
	// ȡ���༭״̬
	winfoMap.removeOverlay(editor);

}

/** �ر�����ܿش���* */
function closeqygkwindow() {
	// ɾ������
	if (qygkwindow != null) {
		winfoMap.removeOverlay(qygkwindow);
	}
	if (qygkdata != undefined && qygkdata != null) {
		winfoMap.removeOverlay(qygkdata);
	}
	// ȡ���༭״̬
	winfoMap.removeOverlay(editor);

}

/** �ر�����ܿش���* */
function closezdsywindow() {
	// ɾ������
	if (zdsywindow != null) {
		winfoMap.removeOverlay(zdsywindow);
	}
	if (zdsydata != undefined && zdsydata != null) {
		winfoMap.removeOverlay(zdsydata);
	}
	// ȡ���༭״̬
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
		var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_hqthys" style="color: #669FC7;margin-top:-7px">&nbsp;��ȡͨ��Ҫ��</i></h4><input type="hidden" value="' + name + '" id="tparentName"/>';
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
		var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_hqthys" style="color: #669FC7;margin-top:-7px">&nbsp;��ȡͨ��Ҫ��</i></h4><input type="hidden" value="' + name + '" id="tparentName"/>';
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
		var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_updthys" style="color: #669FC7;margin-top:-7px">&nbsp;�޸�ͨ��Ҫ��</i></h4><input type="hidden" id="tparentName" value=' + name + '></h4>';
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
		var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_updthys" style="color: #669FC7;margin-top:-7px">&nbsp;�޸�ͨ��Ҫ��</i><input type="hidden" id="tparentName" value=' + name + '></h4>';
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

/** ***********************����ܿأ����������ӽ���--������(2014-10-29)******************************** */

// ��ͼ��λ
function encPosition(event) {
	if (event.data != undefined) {
		var d = event.data.split(',');
		var p = new Winfo.LngLat(parseFloat(d[1]), parseFloat(d[0]));
		winfoMap.panTo(p, true); // �����µ����ĵ�(�Ե�ǰ���Ϊ����)
	}
}

// ɾ����ͼ���
function removeOverlay(event) {
	if (event.data != undefined && event.data != null) {
		winfoMap.removeOverlay(event.data);
	}
}

// ��ȡͨ��Ҫ������
function getgeographicData() {
	var type = "" // ��ȡͨ��Ҫ������
		if (geographicLayer != null) {
			type = geographicLayer.getType();
			return type;
		}
}

// ��Ӹ�����
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
		winfoMap.addOverlay(marker); // ��Ӹ�����
		if (typeof(event.callback) == "function") {
			event.callback(marker);
		}
	} else if (event.datatype == "dwd") { // ��λ��
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
		winfoMap.addOverlay(marker); // ��Ӹ�����
		if (typeof(event.callback) == "function") {
			event.callback(marker);
		}

	}
}
// ��ȡ��ͼ������
function drawOverlayParam() {
	return freeData;
}
// ��ȡ�Զ��庣ͼ������
function drawzdyParam() {
	return zdyData;
}
function removeOverlay(id) {
	// ɾ������
	if (inforWindow != null) {
		winfoMap.removeOverlay(inforWindow);
	}
	// ȡ���༭״̬
	winfoMap.removeOverlay(editor);

	if (freeData != null) {
		freeData.qyid = id;
	}
}

// ɾ����ͼ���
function remove(data) {
	if (data != undefined && data != null) {
		winfoMap.removeOverlay(data);
	}
}

/*
 * ��ȡAIS���� param ��ѯ�������� page ��ǰ��ʾҳ�� records �ܼ�¼��
 */
function getShipData(param) {
	if (aisLayer == null) {
		aisLayer = Winfo.DNCLayer.AIS({
				index: 100,
				refreshed: getAISList
			});
		winfoMap.addLayer(aisLayer); // ���ͼ��
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
					layer.close(layerControl.zhongdiangenzong)//�ص��עҳ�������쳣��ʱ��ر��ص��עҳ��
					alertStr("�����쳣������ϵ����Ա��");
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
		// �����AIS����Ϊ�ձ�ʶ�������CM
		if (obj.NULLCM) {
			obj.NameCN = "";
		}
		// ���������Դ�Ƿ�ʵʱ����
		if (obj.SJLY == 2) {
			layer.close(layerControl.zhongdiangenzong)//�ص��עҳ�������쳣��ʱ��ر��ص��עҳ��
			layerControl.aisdsts = top.$.layer({
					shade: [0.5, '#000', true],
					type: 0,
					shadeClose: true,
					fix: true,
					border: [1, 0.3, '#000', true],
					area: ['400px', 'auto'],
					offset: ['150px', '50%'],
					dialog: {
						msg: '��ܰ��ʾ���ô�����AIS�ź��Ѷ�ʧ!����鿴����AIS�ź�λ������"�鿴"��ť!',
						btns: 2,
						type: 4,
						btn: ['�鿴', 'ȡ��'],
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
								var jdStr = jdArr[0] + "��" + jdArr[1] + "��" + jdArr[2] + "��";
								var wdStr = wdArr[0] + "��" + wdArr[1] + "��" + wdArr[2] + "��";
								if (offline_ship != null) {
									winfoMap.removeOverlay(offline_ship);
								}
								offline_ship = new Winfo.Marker({
										position: lnglat,
										draggable: false,
										title: "MMSI��" + obj.MMSI + "\r\nӢ�Ĵ��ģ�" + obj.NameCN + "\r\n���λ�ã�" + wdStr + "," + jdStr + "\r\n���ʱ�䣺" + obj.CJSJ,
										icon: new Winfo.Icon({
											size: new Winfo.Size(25, 25),
											image: "../../Image/ship_offline.png",
											offset: new Winfo.Pixel(-12, -12)
										})
									});
								winfoMap.addOverlay(offline_ship); // ��Ӹ�����
							}
						},
						no: function () {
							layer.close(layerControl.zhongdiangenzong)
						}
					}
				});
		}
		// ���������Դ�Ǳ��ؾ�̬����
		else if (obj.SJLY == 3) {
				layer.close(layerControl.zhongdiangenzong)//�ص��עҳ�������쳣��ʱ��ر��ص��עҳ��
			layerControl.aisdsts = top.$.layer({
					shade: [0.5, '#000', true],
					type: 0,
					shadeClose: true,
					fix: true,
					border: [1, 0.3, '#000', true],
					area: ['400px', 'auto'],
					offset: ['150px', '50%'],
					dialog: {
						msg: '��ܰ��ʾ���ô���������Ϊ��̬���ݣ��޷���λ!',
						btns: 2,
						type: 4,
						btn: ['ȷ��', 'ȡ��'],
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
		// ���������Դ��ʵʱ����
		else if (obj.SJLY == 1) {
			removeAndShow(aisLayer, obj);
			winfoMap.panTo(new Winfo.LngLat(obj.Lon, obj.Lat));
		}
	} else if (data.length == 0) {
		alertStr("δ��ѯ���ô������볢���޸Ĺؼ�������������");
	}
}

var vesselData=null
function removeAndShow(aisLayer, objj) {
	top.$("#div_sousuo").hide();
	// ��ѡ��Ĵ��������ص���ٴ���ʱ,ȡ������������ѡ��
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
		winfoMap.panTo(p, true); // �����µ����ĵ�(�Ե�ǰ���Ϊ����)
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
	// aisLayer.CheckObject(data[i].value[0]);//����ѡ�����
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

// ��ȡͨ��Ҫ������
var list = top.savethysxq;
function getTHYSdata(param) {
	if (list != null) {
		if (param.ID != null) { // ѡ�������б��
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
			// ��ѡ��Ĵ��������ص���ٴ���ʱ,ȡ������������ѡ��
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
			if (data[0].XSLX == "point") { // ��
				winfoMap.panTo(new Winfo.LngLat(data[0].POSITION.split(',')[1] * 1, data[0].POSITION.split(',')[0] * 1), true);
			} else if (data[0].XSLX == "line") { // ��
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
				winfoMap.addOverlay(polyline); // ��Ӹ�����
*/				winfoMap.panTo(new Winfo.LngLat(parseFloat(data[0].POSITION.split(',')[1]), parseFloat(data[0].POSITION.split(',')[0])), true);

			} else if (data[0].XSLX == "face") { // ��
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
				winfoMap.addOverlay(polygon); // ��Ӹ�����
*/				winfoMap.panTo(new Winfo.LngLat(parseFloat(data[0].POSITION.split(',')[1]), parseFloat(data[0].POSITION.split(',')[0])), true);
			}
			cbxx(vesselLayerObject, "winfo.vessel.THYS.layer");
		}
		else�� {
			alertStr("δ��ѯ����ͨ��Ҫ�أ��볢���޸Ĺؼ�������������");
		}
	}
}

/* ��ȡAIS���� */
function getAISList(filterparam) {
	var data = new Object();
	var strfilter = "";
	if (aisLayer != null) {
		/*
		 * filter����������"CM=ZHONG,CLX=����..."(CMΪģ����ѯ ����������Ϊ��ȷ��ѯ) ��ѡ����
		 * page:{}��ҳ����{index:��ǰҳ�룬pagesize��ҳ����ʾ����Ŀ} ��ѡ���� box��Winfo.Bounds ����
		 * ��ѯ��Χ�� ��ѡ���� Ĭ��Ϊ��ǰ��Ļ��ʾ��Χ aisLayer.getShipType();
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
		return data; // ���ش������ͺ͵���״̬
	}
}

// ��ȡ�������ͺʹ���״̬
function getLxAndZt() {
	var data = new Object();
	if (aisLayer != null) {
		/*
		 * filter����������"CM=ZHONG,CLX=����..."(CMΪģ����ѯ ����������Ϊ��ȷ��ѯ) ��ѡ����
		 * page:{}��ҳ����{index:��ǰҳ�룬pagesize��ҳ����ʾ����Ŀ} ��ѡ���� box��Winfo.Bounds ����
		 * ��ѯ��Χ�� ��ѡ���� Ĭ��Ϊ��ǰ��Ļ��ʾ��Χ aisLayer.getShipType();
		 * aisLayer.getNavigationStatus();
		 */
		data.cblx = aisLayer.getShipType();
		data.dhzt = aisLayer.getNavigationStatus();
	}
	return data; // ���ش������ͺ͵���״̬
}

/* ��ȡAIS���� */
function getAISListCBTJ(fatherIframeId, filterparam, iframeId, type) {
	var data = new Object();
	var strfilter = "";
	if (aisLayer != null) {
		/*
		 * filter����������"CM=ZHONG,CLX=����..."(CMΪģ����ѯ ����������Ϊ��ȷ��ѯ) ��ѡ����
		 * page:{}��ҳ����{index:��ǰҳ�룬pagesize��ҳ����ʾ����Ŀ} ��ѡ���� box��Winfo.Bounds ����
		 * ��ѯ��Χ�� ��ѡ���� Ĭ��Ϊ��ǰ��Ļ��ʾ��Χ aisLayer.getShipType();
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
		return data; // ���ش������ͺ͵���״̬
	}
}

/* ��ȡͳ��AIS�������� */
function getTjAISlx() {
	if (aisLayer != null) {
		/*
		 * box��Winfo.Bounds ���� ��ѯ��Χ�� ��ѡ���� Ĭ��Ϊ��ǰ��Ļ��ʾ��Χ type:1==��������;
		 * type:2==��������״̬
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
/* ��ȡͳ��AIS״̬���� */
function getTjAISzt() {
	if (aisLayer != null) {
		/*
		 * box��Winfo.Bounds ���� ��ѯ��Χ�� ��ѡ���� Ĭ��Ϊ��ǰ��Ļ��ʾ��Χ type:1==��������;
		 * type:2==��������״̬
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
	// �����㸲����
	// �㸲�������
	// title ������븲������ʾ��ʽ
	// position ��������ʾλ�� Winfo.LngLat ����
	// draggable �Ƿ�����ƶ�����꣨true/false��
	// icon:�����ʾ��ͼ�� Winfo.Icon ����
	// content �����ʾ������ Winfo.MarkerContent����
	// offset:���ƫ���� Winfo.Pixel ����
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
	winfoMap.addOverlay(marker); // ��Ӹ�����


	// ע�Ḳ������������¼�
	marker.mouseover(function (event) {
		if (swxxWindow == null) {
			// ������Ϣ��ʾ����
			// size�������С Winfo.Size ����
			// offset: ��������� Winfo.Pixel ����
			// content�� ��������
			swxxWindow = new Winfo.InfoWindow({
					size: new Winfo.Size(400, 200),
					offset: new Winfo.Pixel(0, -15),
					pointer: false,
					content: "" // ʹ��Ĭ����Ϣ�������ʽ����ʾ��Ϣ����
				});

		}
		swxxWindow.open(event.lnglat);
		getSWInfo(event.option.title);
		return false;
	});
	// ע�Ḳ��������Ƴ��¼�
	marker.mouseout(function (event) {
		swxxWindow.close();
		return false;
	});
	return marker;
}

// �鿴ˮ����Ϣ
function viewSWXX(swxx) {
	swxxWindow.setOptions({
		size: new Winfo.Size(200, 100),
		content: "վ������:" + swxx.MC + "\r\n" + "��λ:" + swxx.CW + "(����)\r\n" + "����:" + swxx.FS + "����/�룩\r\n" + "����:" + swxx.FX + "���ȣ�\r\n" + "�ܼ���:" + swxx.NJD + "�����\r\n" + "����ʱ��:" + swxx.SJ + "\r\n",
	});
}

var marker = null;
var zfsbWindow = null;
function addZFSBPointOverlay(zfsb) {
	var mc = zfsb.equser;
	var wz = zfsb.latlng;
	// �����㸲����
	// �㸲�������
	// title ������븲������ʾ��ʽ
	// position ��������ʾλ�� Winfo.LngLat ����
	// draggable �Ƿ�����ƶ�����꣨true/false��
	// icon:�����ʾ��ͼ�� Winfo.Icon ����
	// content �����ʾ������ Winfo.MarkerContent����
	// offset:���ƫ���� Winfo.Pixel ����
	var latlngArr = zfsb.latlng.split(","); // γ�Ⱦ���
	var lat = NumToDegree(latlngArr[0]);
	var lng = NumToDegree(latlngArr[1]);
	var latStr = lat[0] + "��" + lat[1] + "��" + lat[2] + "�� N ";
	var lngStr = lng[0] + "��" + lng[1] + "��" + lng[2] + "�� E ";
	var content = "��  ��: " + zfsb.equser + "\r\n" + "��  ��: " + lngStr + "\r\n" + "γ  ��: " + latStr + "\r\n" + "ʱ  ��: " + zfsb.sendtime;

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
	winfoMap.addOverlay(marker); // ��Ӹ�����
	winfoMap.panTo(new Winfo.LngLat(parseFloat(wz.split(',')[1]), parseFloat(wz.split(',')[0]))); // �����µ����ĵ�(�Ե�ǰ���Ϊ����)
	if (hxccode == 'HXC') {
		marker.dblclick(function (event) {
			// ����Ƶ
			// ����Ƶ
			openCCTVbymc(zfsb.equipmentnum);

		});
	}

	// ע�Ḳ������������¼�
	marker.mouseover(function (event) {
		/*
		 * if(zfsbWindow==null) { //������Ϣ��ʾ���� // size�������С Winfo.Size ���� //
		 * offset: ��������� Winfo.Pixel ���� //content�� �������� zfsbWindow = new
		 * Winfo.InfoWindow({ size: new Winfo.Size(400, 200), offset: new
		 * Winfo.Pixel(0, -15), pointer: false, content: "" //ʹ��Ĭ����Ϣ�������ʽ����ʾ��Ϣ����
		 * }); } zfsbWindow.open(event.lnglat); viewZfsb(zfsb);
		 */
		return false;
	});
	// ע�Ḳ��������Ƴ��¼�
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
 * //�鿴ִ����¼����Ϣ function viewZfsb(zfsb) { var
 * latlngArr=zfsb.latlng.split(",");//γ�Ⱦ��� var lat= NumToDegree(latlngArr[0]);
 * var lng=NumToDegree(latlngArr[1]); var latStr=lat[0]+"��"+lat[1]+"��"+lat[2]+"��
 * N "; var lngStr=lng[0]+"��"+lng[1]+"��"+lng[2]+"�� E "; zfsbWindow.setOptions({
 * size: new Winfo.Size(200, 100), content: "�� ��: " + zfsb.equser + "<br />" +
 * "�� ��: " +lngStr + "<br />" + "γ ��: " + latStr+ "<br />" + "ʱ ��: " +
 * zfsb.sendtime, }); }
 */

// ˢ�º�ͼ
function WinfoMaprefresh() {
	if (geographicLayer != null) {
		geographicLayer.refresh();
	}
}
/** ------start------- �Զ�������ʾ�������л� --------------* */
var freeObjectList = {};
var freeEditObjectList = {};
function parentxshtbh(event) {
	if (event.rem == "Y") { // �Ƴ���ʾ�ĵ�����
		if (freeObjectList[event.lookid] != undefined && freeObjectList[event.lookid] != null) {
			winfoMap.removeOverlay(freeObjectList[event.lookid]);
			freeObjectList[event.lookid] = null;
		}
		removeEdit(event.lookid); // �Ƴ���ʾ�༭ҳ��
	} else { // ��ʾ������
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
			winfoMap.addOverlay(object); // ��Ӹ�����
			freeObjectList[event.lookid] = object;
		}
	}
}
/** ------end------- �Զ�������ʾ�������л� -------------- * */

/** ------start------- �Զ�����༭ -------------- * */
var zdybjwindow = null; // �༭���ڶ���
// �Զ�����༭
function parentbjhtbh(event) {
	// �Ƴ���ʾ�ĵ�����
	if (freeObjectList[event.lookid] != undefined && freeObjectList[event.lookid] != null) {
		winfoMap.removeOverlay(freeObjectList[event.lookid]);
		freeObjectList[event.lookid] = null;
	}
	removeEdit(event.lookid); // �Ƴ���ʾ�༭ҳ��
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
		jwd = new Winfo.LngLat((jwd2.getLng() + jwd1.getLng()) / 2, jwd2.getLat()); // ��������
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

	// �Զ��������༭
	if (object != null) {
		winfoMap.addOverlay(object); // ��Ӹ�����
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
				moveOut: true, // �Ƿ���ѳ����Ӵ�����
				fix: false,
				title: '���',
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
				// �����ƶ�ʱ����
				object.dragging(function (event) {
					// �ж���ҳ���Ƿ���ڡ�
					if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.pageBack != undefined) {
						document.getElementById(zidingyiwubiao_iframe).contentWindow.pageBack({
							data: event // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
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
				moveOut: true, // �Ƿ���ѳ����Ӵ�����
				fix: false,
				title: '���',
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
				// �����ƶ��󴥷�
				object.dragging(function (event) {
					// �ж���ҳ���Ƿ���ڡ�

					if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.pageBack != undefined) {
						document.getElementById(zidingyiwubiao_iframe).contentWindow.pageBack({
							data: event // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
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
				moveOut: true, // �Ƿ���ѳ����Ӵ�����
				fix: false,
				title: '���',
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
			// �����ƶ� ����
			editorobj.adjust(function (event) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});

			// �������� ����
			editorobj.addnode(function (event) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
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
				moveOut: true, // �Ƿ���ѳ����Ӵ�����
				fix: false,
				title: '���',
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
				// �������� ����
				editorobj.addnode(function (event) {
					// �ж���ҳ���Ƿ���ڡ�
					if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
						document.getElementById(zidingyiwubiao_iframe).contentWindow.editface({
							data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
						});
					}
				});
			// �����ƶ� ����
			editorobj.adjust(function (event) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editface != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editface({
						data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
		} else if (event.looktype == "jx") {
			var mc; // �༭ʱ�����������
			var bz; // �༭ʱ������α�ע
			var left = $(document.body).width() - 630;
			$.layer({
				type: 2,
				shade: [0],
				closeBtn: [0, true],
				shade: true,
				border: [3, 0.1, '#000'],
				offset: ['0px', left + 'px'],
				area: ['300px', '425px'],
				moveOut: true, // �Ƿ���ѳ����Ӵ�����
				fix: false,
				title: '���',
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
			// �����ƶ��󴥷�
			// editorobj.dragend(function(data) {
			// var coorpath = []
			// coorpath[0]=data.bound.getWestSouth();
			// coorpath[1]=data.bound.getEastNorth();
			// htbhdata["path"]=coorpath;
			// zdyData=data;
			// });
			editorobj.adjust(function (data) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editjx != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editjx({
						data: data.bound // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
			// �����ƶ�ǰ����
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
				moveOut: true, // �Ƿ���ѳ����Ӵ�����
				fix: false,
				title: '���',
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
			// �����ƶ� ����
			editorobj.adjust(function (event) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						data: event.bound // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
			// �������� ����
			editorobj.dragend(function (event) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById(zidingyiwubiao_iframe) != undefined && document.getElementById(zidingyiwubiao_iframe).contentWindow.editline != undefined) {
					document.getElementById(zidingyiwubiao_iframe).contentWindow.editline({
						zdyData: event.bound // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
		}
		freeObjectList[event.lookid] = object;
		freeEditObjectList[event.lookid] = editorobj;
	}
	winfoMap.panTo(jwd);
}

// �Զ�Ԥ�����༭
var yjzdyData = null;
var yjzdyInfo = null;
function parentbjzdyjqy(event) {
	// �Ƴ���ʾ�ĵ�����
	if (freeObjectList[event.lookid] != undefined && freeObjectList[event.lookid] != null) {
		winfoMap.removeOverlay(freeObjectList[event.lookid]);
		freeObjectList[event.lookid] = null;
	}
	removeEdit(event.lookid); // �Ƴ���ʾ�༭ҳ��
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
		jwd = new Winfo.LngLat((jwd2.getLng() + jwd1.getLng()) / 2, jwd2.getLat()); // ��������
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

	// �Զ�Ԥ���༭
	if (object != null) {
		winfoMap.addOverlay(object); // ��Ӹ�����
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
			zdybjwindow.open(jwd); // ����Ϣ����
			zdybjwindow.visualDisplay(); // ��ʾ�ڿ���������
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
			// �Զ�����Ԥ���ƶ� ����
			editorobj.adjust(function (event) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
			// �Զ�����Ԥ������ ����
			editorobj.addnode(function (event) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidingyiwubiao_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: event.path // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
		} else if (event.looktype == "rectangle") {
			zdybjwindow = new Winfo.InfoWindow({
					size: new Winfo.Size(290, 290),
					offset: new Winfo.Pixel(0, -15),
					content: "<iframe id='zidongyujing_iframe' width='285px' height='270px' style='border:none' src='../hsgl/zdqyyj.html?shapeType=rectangle'></iframe>"
				});
			zdybjwindow.open(jwd); // ����Ϣ����
			zdybjwindow.visualDisplay(); // ��ʾ�ڿ���������
			event["lnglat"] = jwd;
			htbhdata = event;
			zdybjwindow.closeed(function (eve) {
				if (object != null) {
					winfoMap.removeOverlay(object);
				}
			});
			editorobj = Winfo.RectangleEditor(object);
			winfoMap.addOverlay(editorobj);

			// �Զ�Ԥ�����ƶ��󴥷�
			// editorobj.dragend(function(data) {
			// var coorpath = []
			// coorpath[0]=data.bound.getWestSouth();
			// coorpath[1]=data.bound.getEastNorth();
			// yjzdyData=data;
			// zdybjwindow.open(data.lnglat); // ����Ϣ����
			// zdybjwindow.visualDisplay();// ��ʾ�ڿ���������
			// });
			editorobj.adjust(function (data) {
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: data // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
			// �Զ�Ԥ�����ƶ�ǰ����
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
			zdybjwindow.open(jwd); // ����Ϣ����
			zdybjwindow.visualDisplay(); // ��ʾ�ڿ���������
			event["lnglat"] = jwd;
			htbhdata = event;

			zdybjwindow.closeed(function (eve) {
				if (object != null) {
					winfoMap.removeOverlay(object);
				}
			});
			// ������Բ����ƶ�ʱ����
			// editorobj.dragend(function (data) {
			// if (document.getElementById('zidongyujing_iframe') != undefined&&
			// document.getElementById('zidongyujing_iframe').contentWindow.editShape !=
			// undefined){
			// document.getElementById('zidongyujing_iframe').contentWindow.editShape( {
			// data : data//������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
			// });
			// }
			// });
			// ������ƶ�Բʱ����
			// editorobj.dragging(function (event) {
			// });
			// �����׼���ƶ�Բʱ����
			editorobj.dragstart(function (event) {
				zdybjwindow.close();
			});
			// ������ԭ�İ뾶�����ı�ʱ����
			editorobj.adjust(function (data) {
				// var coorpath = [];//Բ����������
				// coorpath[0]=data.bound.getWestSouth();
				// coorpath[1]=data.bound.getEastNorth();
				// yjzdyData=event;
				// �ж���ҳ���Ƿ���ڡ�
				if (document.getElementById('zidongyujing_iframe') != undefined && document.getElementById('zidongyujing_iframe').contentWindow.editShape != undefined) {
					document.getElementById('zidongyujing_iframe').contentWindow.editShape({
						data: data // ������ҳ�����긳ֵ��������������ֵ������ҳ�淽��
					});
				}
			});
		}
		freeObjectList[event.lookid] = object;
		// freeEditObjectList[event.lookid]=editorobj;
	}
	winfoMap.panTo(jwd);
}
// ��ȡ�Զ���Ԥ������
function getYjzb() {
	return yjzdyData;
}
// ��ȡ�Զ���Ԥ����������
function getYjInfo() {
	return yjzdyInfo;
}

// �Ƴ��༭״̬
function removeEdit(id) {
	// �Ƴ���ʾ�ĵ�����༭
	if (freeEditObjectList[id] != undefined && freeEditObjectList[id] != null) {
		winfoMap.removeOverlay(freeEditObjectList[id]);
		freeEditObjectList[id] = null;
	}
}
// �Ƴ��༭�ı��༭��
function removebjbh(id) {
	// �Ƴ���ʾ�ĵ�������
	// if(freeObjectList[id]!=undefined&&freeObjectList[id]!=null) {
	// winfoMap.removeOverlay(freeObjectList[id]);
	// freeObjectList[id]=null;
	// }
	// �Ƴ�������༭��
	if (zdybjwindow != null) {
		winfoMap.removeOverlay(zdybjwindow);
	}

}

// �༭���洫ֵ
function gethtbhdata() {
	return htbhdata;
}
function sethtbhdata() {
	htbhdata = null;
}
/** ------end------- �Զ�����༭ -------------- * */
// ˢ���Զ������б�
function relocationlist() {

	if (top.document.getElementById('zidingyiwubiao_zdywb') != undefined && top.document.getElementById('zidingyiwubiao_zdywb').contentWindow.reload != undefined) {
		top.document.getElementById('zidingyiwubiao_zdywb').contentWindow.reload();
	}

}

/** ------start------- ����ͳ���Զ������� -------------- * */

function drawOverlayByZDYCBTJ(event) {
	if (mouseTool == null) {
		// �������ؼ�
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // ��ӿؼ�
	}

	if (event != null && event.tjlx == "m") // �����
	{
		mouseTool.drawPolygon({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			$("#chuanboshaixuan").attr("src", "QuYuGuanKong/chuanboshaixuan.html");
			creatwindow("chart", "", data);
		});
	} else if (event != null && event.tjlx == "jx") // ����
	{
		mouseTool.drawRectangle({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			$("#chuanboshaixuan").attr("src", "QuYuGuanKong/chuanboshaixuan.html");
			creatwindow("chart", "", data);
		});
	} else if (event != null && event.tjlx == "y") // Բ
	{
		mouseTool.drawCircle({}, function (data) {
			cbsxband = data.bound;
			cbsxband.path = data.path;
			$("#chuanboshaixuan").attr("src", "QuYuGuanKong/chuanboshaixuan.html");
			creatwindow("chart", "", data);
		});
	}
}

/** *****************���¹���--����ͳ�Ʒ���20151026********************* */
/** ------start------- ����ͳ���Զ������� -------------- * */

function drawOverlayByZDYCBTJFX(event) {
	if (mouseTool == null) {
		// �������ؼ�
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // ��ӿؼ�
	}

	if (event != null && event.tjlx == "m") // �����
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
	} else if (event != null && event.tjlx == "jx") // ����
	{
		mouseTool.drawRectangle({}, function (data) {
			var zbStr = data.lnglat.lng + ',' + data.lnglat.lat + ';' + data.lnglat.lng + ',' + data.rlnglat.lat + ';' + data.rlnglat.lng + ',' + data.lnglat.lat + ';' + data.rlnglat.lng + ',' + data.rlnglat.lat;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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
	} else if (event != null && event.tjlx == "y") // Բ
	{
		mouseTool.drawCircle({}, function (data) {
			// longitude����, latitudeγ��
			// ���ĵ� lnglat ���� lng γ�� lat
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
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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

/** ------end------- ����ͳ���Զ������� -------------- * */

/** ------start------- ��������ͳ���Զ������� -------------- * */

function drawOverlayByZDYCBAJTJFX(event) {
	if (mouseTool == null) {
		// �������ؼ�
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // ��ӿؼ�
	}

	if (event != null && event.tjlx == "m") // �����
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
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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
	} else if (event != null && event.tjlx == "jx") // ����
	{
		mouseTool.drawRectangle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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
	} else if (event != null && event.tjlx == "y") // Բ
	{
		mouseTool.drawCircle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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
/** ------end------- ��������ͳ���Զ������� -------------- * */

/** ------start------- ����֤��ƥ���� -------------- * */

function drawOverlayByZDYCJTJFX(event) {
	if (mouseTool == null) {
		// �������ؼ�
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // ��ӿؼ�
	}

	if (event != null && event.tjlx == "m") // �����
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
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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
	} else if (event != null && event.tjlx == "jx") // ����
	{
		mouseTool.drawRectangle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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
	} else if (event != null && event.tjlx == "y") // Բ
	{
		mouseTool.drawCircle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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
/** ------end------- ����֤��ƥ���� -------------- * */

/** ------start------- �ص���� -------------- * */

function drawOverlayByZDYZDGZ(event) {
	if (mouseTool == null) {
		// �������ؼ�
		mouseTool = new Winfo.MouseTool();
		winfoMap.addControl(mouseTool); // ��ӿؼ�
	}

	if (event != null && event.tjlx == "m") // �����
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
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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
	} else if (event != null && event.tjlx == "jx") // ����
	{
		mouseTool.drawRectangle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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
	} else if (event != null && event.tjlx == "y") // Բ
	{
		mouseTool.drawCircle({}, function (data) {
			var zbOne = data.lnglat.lng + ',' + data.lnglat.lat;
			var zbTwo = data.rlnglat.lng + ',' + data.rlnglat.lat;
			var zbStr = zbOne + ";" + zbTwo;
			var strtitle = '<h4 class="smaller"><i class="icon-bar-chart" id="txt_qymc" style="color: #669FC7;margin-top:-7px">&nbsp;�Զ�������ͳ��</i></h4>';
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
/** ------end------- �ص���� -------------- * */

/** --------------------�Զ���Ͻ������--------------------* */
var temp = [];
function drawOverlayByXiaQu(event) {
	// ���ʺ�̨���õ��Լ���Ͻ��
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
// �õ��������������
function getMaxInArray(arg1) {
	var temp = arg1[0];
	for (var i = 1; i < arg1.length; i++) {
		if (parseFloat(arg1[i]) > temp) {
			temp = parseFloat(arg1[i]);
		}
	}
	return temp;
}

// �õ�����������С��
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
	// ��������������"zb"+���꣨û�л�������ģ�������"dm"+�����������ʽ���л�������ģ�����ֱ�ӵ��Ͻ����ʱ��ͻ�����������
	// �������dm+�����������ʽ��������jgdm������ȡdmzb����Ļ������룻������Ĳ���Ͻ���������л��������������λ��ʱ�򣬾ͻ�����������
	var jgdm = "";
	// �������zb+�������ʽ������������ôzb������ȡdmzb���������
	var zb = "";
	// ���x�����꼯�ϣ�Ҳ���Ǿ��ȵļ���
	var xArray = [];
	// ���y�����꼯�ϣ�Ҳ����γ�ȵļ���
	var yArray = [];
	// ���һ���������
	var points = [];
	// ����ض���ļ���
	var path = [];
	// ������ǵ���ľ���Ͻ��ִ���������
	if (dmzb.substring(0, 2) == 'dm') {
		jgdm = dmzb.substring(2, dmzb.length);
		// flag=1��ʾ��½������admin��ʽ��½������
		if (wholeJg[2].flag == "1") {
			for (var i = 0; i < wholeJg[0].length; i++) {
				// ���if�������㣬��֤���Ǻ��¾ֵ��������
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
				// else�ж�Ϊ�˱�ʾ���ǴӺ��¾ֹ����ģ��Ǿ��ǴӺ��¾���Ͻ��λ���´�������
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
		// flag=2��ʾ�ǵ�½��Ϊ���¾ֵ�λ
		if (wholeJg[2].flag == "2") {
			// ���if�������㣬��֤���Ǻ��¾ֵ��������
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
			// else�ж�Ϊ�˱�ʾ���ǴӺ��¾ֹ����ģ��Ǿ��ǴӺ��¾���Ͻ��λ���´�������
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
		// ��ʾ��½���ǴӺ��´���½������
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
	// ����ǵ���ľ���Ͻ����ִ���������,���һ���Ͻ��
	else if (dmzb.substring(0, 2) == 'zb') {
		zb = dmzb.substring(2, dmzb.length);
		var areacoors = zb.split(';');
		var lngLats = [];
		for (var j = 0; j < areacoors.length; j++) {
			lngLats[j] = new Winfo.LngLat(parseFloat(areacoors[j].split(',')[0]), parseFloat(areacoors[j].split(',')[1]));
		}
		// ���������ȡϽ�����ĵ㡣
		var activeArea = null; // ��ǰѡ�������
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

/** ------start------- ��ӱ����� -------------- * */
/** ------------������ 2014-12-29 -------------- * */
var BGXWindowInfo = null; // ���ӱ����ƻ�����Ϣ������
var BGXData = null; // ��ǰ�����ĵ��ӱ��������ݶ���
var DZBGZdata = []; // ���ӱ��������ݼ���(���������ߣ�������)
var dzbgzpolyEditor = null;
var dzbgzpolyEditorline = null;
function drawOverlayBYBGX(event) {
	// ֻ��ʾ���
	if (event.drawtype != "add") // ֻ��ʾ�����ӱ�����
	{
		if (event.drawtype == "closeedit") // �رձ༭״̬
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
				DZBGZdata.push(BGXData); // ����ǰ��ʾ�������ӵ�����
			}
		} else if (event.show == true) // ��ʾ����
		{
			var path = [];
			var coors = event.path.split(';');
			for (var i = 0; i < coors.length; i++) {
				var obj = new Winfo.LngLat(parseFloat(coors[i].split(',')[1]), parseFloat(coors[i].split(',')[0]));
				path.push(obj);
			}
			if (event.datatype == "line") // ������
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
				winfoMap.addOverlay(polyline); // ��Ӹ�����
				winfoMap.panTo(path[0], false); // �����µ����ĵ�(�Ե�ǰ���Ϊ����)
				polyline.dataID = event.bgxid; // ������ID������������ʾ��������ߵı�ʾ���ӱ������б��д��ݹ���
				polyline.bgxmc = event.bgxmc; // ����
				polyline.bz = event.bz; // ��ע
				BGXData = polyline;
				DZBGZdata.push(polyline);
			} else if (event.datatype == "face") // ���ӱ���֮ͳ������
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
				winfoMap.addOverlay(polygon); // ��Ӹ�����
				winfoMap.panToBound(polygon.bound);
				polygon.dataID = event.bgxid; // ������ID������������ʾ��������ߵı�ʾ���ӱ������б��д��ݹ���
				polygon.bgxmc = event.bgxmc; // ����
				polygon.bz = event.bz; // ��ע
				BGXData = polygon;
				DZBGZdata.push(polygon);
			}

			// ��Ϊ�༭ʱ�򵯳��༭��
			if (event.drawtype == "edit") {
				var type = "";
				// �༭�����
				if (event.datatype == "line") {
					dzbgzpolyEditor = Winfo.PolyEditor(BGXData);
					winfoMap.addOverlay(dzbgzpolyEditor);
					dzbgzpolyEditor.adjust(function (event) {
						BGXData.path = event.path;
					});
					type = "bgx";
				}
				// �༭��������
				else if (event.datatype == "face") {
					dzbgzpolyEditorline = Winfo.PolyEditor(BGXData);
					winfoMap.addOverlay(dzbgzpolyEditorline);
					dzbgzpolyEditorline.adjust(function (event) {
						BGXData.path = event.path;
					});
					type = "tjqsz";
				}
				BGXWindowInfo = new Winfo.InfoWindow({
						size: new Winfo.Size(302, 175), // ���������С
						offset: new Winfo.Pixel(50, 0),
						content: "<iframe id='BGXWindowInfo_iframe' width=285px' height='160' style='border:none' src='../WinfoENC/QuYuGuanKong/baogaoxianEdit.html?bjlx=" + type + "'></iframe>"
					});

				BGXWindowInfo.closeed(function (event) {
					if (BGXData != null && event.type == "click")
						winfoMap.removeOverlay(BGXData);
				});
				BGXWindowInfo.open(path[0]); // ����Ϣ����
			}
		}

		// ɾ�����ӱ����Ʋ���
		else {
			delDZBGZdatabyid(event.bgxid);
		}
	}

	// ���ӱ���������
	else {
		closebgxwindow(); // ��Ӳ���ʱ,�ȹر�ǰһ�ε���Ӳ���,ȷ��ÿ����Ӳ���Ϊ��������
		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
		}

		if (event.showtype == "bgx") // ������
		{
			mouseTool.drawPolyline({}, function (data) {
				BGXData = data;
				BGXWindowInfo = new Winfo.InfoWindow({
						size: new Winfo.Size(302, 175), // ���������С
						offset: new Winfo.Pixel(50, 0),
						content: "<iframe id='BGXWindowInfo_iframe' width=285px' height='160' style='border:none' src='../WinfoENC/QuYuGuanKong/baogaoxianEdit.html?bjlx=bgx'></iframe>"
					});
				BGXWindowInfo.closeed(function (event) {
					if (data != null && event.type == "click")
						winfoMap.removeOverlay(data);
				});
				BGXWindowInfo.open(data.path[0]); // ����Ϣ����
				BGXWindowInfo.visualDisplay(); // ��ʾ�ڿ�������

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
						size: new Winfo.Size(302, 175), // ���������С
						offset: new Winfo.Pixel(50, 0),
						content: "<iframe id='BGXWindowInfo_iframe' width=285px' height='160' style='border:none' src='../WinfoENC/QuYuGuanKong/baogaoxianEdit.html?bjlx=tjqsz'></iframe>"
					});
				BGXWindowInfo.closeed(function (event) {
					if (data != null && event.type == "click")
						winfoMap.removeOverlay(data);
				});
				BGXWindowInfo.open(data.path[0]); // ����Ϣ����
				BGXWindowInfo.visualDisplay(); // ��ʾ�ڿ�������

				dzbgzpolyEditorline = Winfo.PolyEditor(BGXData);
				winfoMap.addOverlay(dzbgzpolyEditorline);
				dzbgzpolyEditorline.adjust(function (event) {
					BGXData.path = event.path;
				});
			});
		}
	}
}

// ����IDɾ����ͼ�еĵ��ӱ��������
function delDZBGZdatabyid(id) {
	// ѭ�����ӱ��������ݼ���,���ٵ�ǰ��������ʱ,ͬ��ɾ��DZBGZdata�����д洢�ĸö���Ԫ��
	for (var i = 0; i < DZBGZdata.length; i++) {
		// �жϵ�ǰ��������ı����ߣ�����ID�������е��Ƿ����
		if (DZBGZdata[i].dataID == id) {
			winfoMap.removeOverlay(DZBGZdata[i]); // ɾ����ͼ������
			DZBGZdata.splice(i, 1); // ��ɾ��������������������
		}
	}
}

/** �رձ����ߴ���* */
function closebgxwindow() {
	// ɾ������
	if (BGXWindowInfo != null) {
		winfoMap.removeOverlay(BGXWindowInfo);
	}
	if (BGXData != undefined && BGXData != null) {
		winfoMap.removeOverlay(BGXData);
		BGXData = null;
		BGXWindowInfo = null;
	}
}
/** ------end------- ����ͳ���Զ������� -------------- * */

var Tracklayer = null;
/** �����켣�ط�--������--2015-6-19* */
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
			alertStr("û�д����켣���ݣ�");

		}
		hidediv();
	});

}

/** end--------------�����켣�ط�------* */

/** ��ȡ�����ڵĴ��� */
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
 * *********************************���Ӽ���� start
 * 20151112-����*****************************************************
 */
var JCXWindowInfo = null; // ���Ӽ���߻�����Ϣ������
var JCXData = null; // ��ǰ�����ĵ��ӵ��Ӽ�������ݶ���
var JCQData = null; // ��ǰ�����ĵ��ӵ��Ӽ�������ݶ���
var DZJCXdata = []; // ���Ӽ�������ݼ���(���������ߣ�������)
var DZJCQdata = [];
var dzjcxpolyEditor = null;
var dzjcxpolyEditorline = null;
function drawOverlayDZJCX(event) {
	// ֻ��ʾ���
	if (event.drawtype != "add") // ֻ��ʾ�����ӱ�����
	{
		if (event.drawtype == "closeedit") // �رձ༭״̬
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
				DZJCXdata.push(JCXData); // ����ǰ��ʾ�������ӵ�����
			}
			if (JCQData != null) {
				JCQData.dataID = event.dataID;
				DZJCQdata.push(JCQData); // ����ǰ��ʾ�������ӵ�����
			}
		} else if (event.show == true) // ��ʾ����
		{
			var path = [];
			var coors = event.path.split(';');
			for (var i = 0; i < coors.length; i++) {
				var obj = new Winfo.LngLat(parseFloat(coors[i].split(',')[1]), parseFloat(coors[i].split(',')[0]));
				path.push(obj);
			}
			if (event.datatype == "line") // ������
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
				winfoMap.addOverlay(polyline); // ��Ӹ�����
				winfoMap.panTo(path[0], false); // �����µ����ĵ�(�Ե�ǰ���Ϊ����)
				polyline.dataID = event.jcxid; // ������ID������������ʾ��������ߵı�ʾ���ӱ������б��д��ݹ���
				polyline.jcxmc = event.title; // ����
				// polyline.bz=event.bz;//��ע
				JCXData = polyline;
				DZJCXdata.push(polyline);
			} else if (event.datatype == "face") // ���ӱ���֮ͳ������
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
				winfoMap.addOverlay(polygon); // ��Ӹ�����
				winfoMap.panToBound(polygon.bound);
				polygon.dataID = event.jcqid; // ������ID������������ʾ��������ߵı�ʾ���ӱ������б��д��ݹ���
				polygon.jcqmc = event.title; // ����
				// polygon.bz=event.bz;//��ע
				JCQData = polygon;
				DZJCQdata.push(polygon);
			}

			// ��Ϊ�༭ʱ�򵯳��༭��
			if (event.drawtype == "edit") {
				var type = "";
				// �༭�����
				if (event.datatype == "line") {
					dzjcxpolyEditor = Winfo.PolyEditor(JCXData);
					winfoMap.addOverlay(dzjcxpolyEditor);
					dzjcxpolyEditor.adjust(function (event) {
						JCXData.path = event.path;
					});
					type = "jcx";
				}
				// �༭��������
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
						title: "���Ӽ����",
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
						title: "���Ӽ����",
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
				// JCXWindowInfo.open(path[0]); // ����Ϣ����
				// JCXWindowInfo.visualDisplay();// ��ʾ�ڿ�������
			}
		}

		// ɾ�����Ӽ���߲���
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

	// ���Ӽ��������20151113����
	else {
		closebgxwindow(); // ��Ӳ���ʱ,�ȹر�ǰһ�ε���Ӳ���,ȷ��ÿ����Ӳ���Ϊ��������
		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
		}

		if (event.showtype == "jcx") // ���Ӽ����
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
					title: "���Ӽ����",
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
				JCXWindowInfo.open(data.path[0]); // ����Ϣ����
				JCXWindowInfo.visualDisplay(); // ��ʾ�ڿ�������

				dzjcxpolyEditor = Winfo.PolyEditor(JCXData);
				winfoMap.addOverlay(dzjcxpolyEditor);
				dzjcxpolyEditor.adjust(function (event) {
					JCXData.path = event.path;
				});
			});
		}
		/** ���� 20151113 ���������* */
		else if (event.showtype == "jcq") {
			mouseTool.drawPolygon({}, function (data) {
				JCQData = data;
				/*
				 * JCXWindowInfo = new Winfo.InfoWindow({ size : new
				 * Winfo.Size(302, 175),//���������С offset : new
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
					title: "���Ӽ����",
					iframe: {
						src: urlPath
					},
					area: ['500px', '395px'],
					close: function (index) {
						if (data != null)
							winfoMap.removeOverlay(data);
					}
				});

				JCXWindowInfo.open(data.path[0]); // ����Ϣ����
				JCXWindowInfo.visualDisplay(); // ��ʾ�ڿ�������
				dzjcxpolyEditorline = Winfo.PolyEditor(JCQData);
				winfoMap.addOverlay(dzjcxpolyEditorline);
				dzjcxpolyEditorline.adjust(function (event) {
					JCQData.path = event.path;
				});
			});
		}
	}
}

// ����IDɾ����ͼ�еĵ��ӱ��������
function delDZJCXdatabyid(id) {
	// ѭ�����ӱ��������ݼ���,���ٵ�ǰ��������ʱ,ͬ��ɾ��DZJCXdata�����д洢�ĸö���Ԫ��
	for (var i = 0; i < DZJCXdata.length; i++) {
		// �жϵ�ǰ��������ı����ߣ�����ID�������е��Ƿ����
		if (DZJCXdata[i].dataID == id) {
			winfoMap.removeOverlay(DZJCXdata[i]); // ɾ����ͼ������
			DZJCXdata.splice(i, 1); // ��ɾ��������������������
			i--;
		}
	}
}

// ����IDɾ����ͼ�еĵ��ӱ��������
function delDZJCQdatabyid(id) {
	// ѭ�����ӱ��������ݼ���,���ٵ�ǰ��������ʱ,ͬ��ɾ��DZJCXdata�����д洢�ĸö���Ԫ��
	for (var i = 0; i < DZJCQdata.length; i++) {
		// �жϵ�ǰ��������ı����ߣ�����ID�������е��Ƿ����
		if (DZJCQdata[i].dataID == id) {
			winfoMap.removeOverlay(DZJCQdata[i]); // ɾ����ͼ������
			DZJCQdata.splice(i, 1); // ��ɾ��������������������
			i--;
		}
	}
}

/** �رռ���ߴ���* */
function closebgxwindow() {
	// ɾ������
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
 * *********************************���Ӽ���� end
 * 20151112-����*****************************************************
 */

/** *******************�������ͼ�긲���� start******************** */
var marker = null;
var markerArr = [];
function drawOverlayByTQ(event) {
	if (event.drawtype == "Y") {
		if (marker == null) {
			marker = new Winfo.Marker({
					title: "�������ƣ�" + event.name + "\r\n���������" + event.weather + "\r\n����¶ȣ�" + event.zdqw + "��\r\n����¶ȣ�" + event.zgqw + "��",
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
		winfoMap.addOverlay(marker); // ��Ӹ�����
		markerArr.push(marker);
		marker = null;
	} else {
		for (var i = 0; i < markerArr.length; i++) {
			winfoMap.removeOverlay(markerArr[i]); // ɾ��������
		}
		markerArr = [];
	}
}

// ��ʾ��ѹͼ
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
		winfoMap.addLayer(VectorLayers2); // ���ͼ��
	} else {
		winfoMap.removeLayer(VectorLayers2); // ɾ��ͼ��
	}
}
// ��ʾ��ͼ
function getCloud(event) {
	var vectorLayer = new Winfo.DNCLayer.ImageVectorLayer({
			layername: "ImageVectorLayers"
		});

	if (event.drawtype == "Y") {
		winfoMap.addLayer(vectorLayer); // ���ͼ��

	} else {
		winfoMap.removeLayer(vectorLayer);
	}
}

// ��ʾ̨��
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

/** *******************�������ͼ�긲���� end*********************** */

function getPingMuZB() {
	var zb = "112.5,22.8;114,23.3";
	var zbobj = Winfo.DNCObject.getMapInfo();
	// zb=zbobj.Box.Left+","+zbobj.Box.Bottom+";"+zbobj.Box.Right+","+zbobj.Box.Top;
	zb = zbobj.Box.Left + "," + zbobj.Box.Bottom + ";" + zbobj.Box.Left + "," + zbobj.Box.Top + ";" + zbobj.Box.Right + "," + zbobj.Box.Bottom + ";" + zbobj.Box.Right + "," + zbobj.Box.Top
		return zb;
}

// ��ȡ��Ļ���ĵ�
function getPMcenter() {
	var zbobj = Winfo.DNCObject.getMapInfo();
	// zb=zbobj.Box.Left+","+zbobj.Box.Bottom+";"+zbobj.Box.Right+","+zbobj.Box.Top;
	zb = zbobj.CenterY + "," + zbobj.CenterX;
	return zb;
}

// ��ȡ��ͼ�㼶
function gethtLevel() {
	var cj = Winfo.DNCObject.getLevel();
	return cj;
}

/*
 * //��λ���û���ʷ���������ĵ� function setPmcenter(){ var zb =
 * top.userData.userdata.mapInfo.center; winfoMap.setCenter(new
 * Winfo.LngLat(zb.lng, zb.lat)); }
 */

// ��ȡ����ײ��bound
function getfpzbound(data) {
	lats = []; // γ��
	lngs = []; // ����

	for (var n = 0; n < data.length; n++) {
		lats[n] = data[n].lat;
		lngs[n] = data[n].lng;
	}
	var maxLat1 = Math.max.apply(null, lats); // γ�����ֵ
	var minLat1 = Math.min.apply(null, lats); // γ����Сֵ

	var maxLng1 = Math.max.apply(null, lngs); // �������ֵ
	var minLng1 = Math.min.apply(null, lngs); // ������Сֵ

	// ���ĵ�ľ�γ��
	var midlng = minLng1 + (maxLng1 - minLng1) / 2;
	var midlat = minLat1 + (maxLat1 - minLat1) / 2;

	// ��ȡ�뾶,��ȡ���ĵ������֮�����ľ���
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
	var rudius = Math.max.apply(null, distances); // �뾶Ϊ�������ֵ

	var bound = JSbound(midlng, midlat, rudius + 200)

		return bound;
}

/* ��ȡ������γ��֮��ľ��� start */
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
/* ��ȡ������γ��֮��ľ��� end */

// ����Բ��bound
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
 * *********************************��ͷ���� start
 * 20160219-������*****************************************************
 */
var MTData = null; // ��ǰ��������ͷ�������ݶ���
var MTGLdata = []; // ��ͷ�������ݼ���
var mtglpolyEditor = null;
function drawOverlayMTGL(event) {
	// ֻ��ʾ���
	if (event.drawtype != "add") {
		if (event.drawtype == "closeedit") // �رձ༭״̬
		{
			if (mtglpolyEditor != null) {
				winfoMap.removeOverlay(mtglpolyEditor);
				mtglpolyEditor = null
			}

			if (MTData != null) {
				MTData.dataID = event.dataID;
				MTGLdata.push(MTData); // ����ǰ��ʾ�������ӵ�����
			}
		} else if (event.show == true) // ��ʾ����
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
			winfoMap.addOverlay(polygon); // ��Ӹ�����
			winfoMap.panToBound(polygon.bound);
			polygon.dataID = event.id; // ������ID������������ʾ��������ߵı�ʾ���ӱ������б��д��ݹ���
			polygon.jcqmc = event.title; // ����
			// polygon.bz=event.bz;//��ע
			MTData = polygon;
			MTGLdata.push(polygon);

			// ��Ϊ�༭ʱ�򵯳��༭��
			if (event.drawtype == "edit") {
				// �༭�����
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
					title: "��ͷ����༭",
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
		// ɾ�����Ӽ���߲���
		else {
			if (event.id != null && event.id != "" && event.id != undefined) {
				delMTQYdatabyid(event.id);
			}
			if (MTData != null) {
				winfoMap.removeOverlay(MTData);
			}
		}
	}

	// ��ͷ��������
	else {
		winfoMap.setZoom(14);
		var d = event.mtzb.split(',');
		var p = new Winfo.LngLat(parseFloat(d[1]), parseFloat(d[0]));
		winfoMap.panTo(p, true); // �����µ����ĵ�(�Ե�ǰ���Ϊ����)
		closebgxwindow(); // ��Ӳ���ʱ,�ȹر�ǰһ�ε���Ӳ���,ȷ��ÿ����Ӳ���Ϊ��������
		if (mouseTool == null) {
			// �������ؼ�
			mouseTool = new Winfo.MouseTool();
			winfoMap.addControl(mouseTool); // ��ӿؼ�
		}

		mouseTool.drawPolygon({}, function (data) {
			MTData = data;
			$.layer({
				type: 2,
				fix: false,
				title: "��ͷ��������",
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
			 * JCXWindowInfo.open(data.path[0]); // ����Ϣ����
			 * JCXWindowInfo.visualDisplay();// ��ʾ�ڿ�������
			 */
			mtglpolyEditor = Winfo.PolyEditor(MTData);
			winfoMap.addOverlay(mtglpolyEditor);
			mtglpolyEditor.adjust(function (event) {
				MTData.path = event.path;
			});
		});
	}
}

// ����IDɾ����ͼ�е���ͷ����
function delMTQYdatabyid(id) {
	// winfoMap.removeOverlay(MTData);
	// ѭ�����ӱ��������ݼ���,���ٵ�ǰ��������ʱ,ͬ��ɾ��MTGLdata�����д洢�ĸö���Ԫ��
	for (var i = 0; i < MTGLdata.length; i++) {
		// �жϵ�ǰ��������ı����ߣ�����ID�������е��Ƿ����
		if (MTGLdata[i].dataID == id) {
			winfoMap.removeOverlay(MTGLdata[i]) // ɾ����ͼ������
			MTGLdata.splice(i, 1); // ��ɾ��������������������
			i--;
		}
	}
}
/**
 * *********************************��ͷ���� end
 * 20160219-������*****************************************************
 */

/**
 * *********************************ͨ��Ҫ�غ�ͼ���༭ start
 * **********************************
 */
var zs_thyswindow = null; // �༭���ڶ���
var zs_thysbhdata = null;
// �Զ�����༭
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
	// �Զ��������༭
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
		zs_thyswindow.open(jwd); // ����Ϣ����
		zs_thyswindow.visualDisplay(); // ��ʾ�ڿ���������
		zs_thysbhdata = event;
	}
	setMapObject(event.zb, event.jkid);
	winfoMap.panTo(jwd);
}

// ��Ӻ�ͼ������
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
	winfoMap.addOverlay(marker); // ��Ӹ�����
	// ע�Ḳ�����ƶ�ʱ�¼�
	marker.dragend(function (event) {
		if (document.getElementById('inforWindo_iframe') != null && document.getElementById('inforWindo_iframe').contentWindow != null) {
			document.getElementById('inforWindo_iframe').contentWindow.setpoint(event.lnglat);
		}
	});
	winfoMap.panTo(lnglat); // �����µ����ĵ�(�Ե�ǰ���Ϊ����)
	// setpoint(lnglat); //������ʾֵ����߱༭��
}

// �ر���ɽͨ��Ҫ�ش���
function closezs_thyswindow() {
	winfoMap.removeOverlay(marker); // ɾ��������
	// ɾ������
	if (zs_thyswindow != null) {
		winfoMap.removeOverlay(zs_thyswindow);
	}
	if (zs_thysbhdata != undefined && zs_thysbhdata != null) {
		winfoMap.removeOverlay(zs_thysbhdata);
	}
	// ȡ���༭״̬
	winfoMap.removeOverlay(editor);
}
/**
 * *********************************ͨ��Ҫ�غ�ͼ���༭ end
 * **********************************
 */

/**
 * ���ط��������10000���ڵ�ͨ��Ҫ��
 *
 * @param longitude
 *            ���ĵ㾭��
 * @param latitude
 *            ���ĵ�γ��
 */
var updatethysCounter = 0;
function loadthysForLawRegion(name, counter) {
	if (qygkdata != null && qygkdata.bound != null) {
		/*
		 * ���¼���ͨ��Ҫ�أ��û�������ͨ��Ҫ����Ҫ���¼���һ�����е�ͨ��Ҫ�أ�������ȡ�������µ�ͨ��Ҫ��
		 * ��֮�����ڴ˴����¼�������Ϊÿ������ͨ��Ҫ�صĵط����࣬���ÿ��ҳ�涼�ڼ���֮�����¼���һ����Ҫ����̫���ҳ��
		 * ���Դ˴�����������ͨ��Ҫ�ء�
		 */
		if (counter != updatethysCounter) {
			updatethysCounter = counter;
			getThysXq(false);
		}

		var regionCenter = qygkdata.bound.getCenter();
		longitude = regionCenter.lng;
		latitude = regionCenter.lat;

		var raidusMile = 10000; // ��Χ
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
