
export const mapHelper = {
    initMap(vu){ //传入vue与海图交互
        if(debugMode)console.log(vu)  //
        winfoMap = new Winfo.WebDNC("map", {
            level: 6,
            layer: 8,
            layername:"TianDiTu_basic",
            center: new Winfo.LngLat(117.31, 31.08),
            //layername:'TianDiTu_basic',
            zooms: [1, 20],
            //url: "http://t2.tianditu.com/DataServer?T=img_w",
            //url: "http://tdt.mwr.gov.cn:81/img_c/wmts?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=1.0.0",
            paramX: 'x',
            paramY: 'y',
            paramZ: 'zl'
        }); 
        surfaceLayer = Winfo.DNCLayer.Surface({ index: 1000 });
        winfoMap.addLayer(surfaceLayer);  //经纬度坐标控件
        mapHelper.addNavigationTool();   //平移缩放控件
        mapHelper.addAISLayer();  //AIS数据

        //水文站数据
        var sttp = ["ZZ","ZQ","SS","PP","RR"];
        mapHelper.openHydrological("RR",function(){
            mapHelper.openHydrological("PP",function(){
            
            });
        });
        
        $(window).resize(function(){
            mapHelper.initMap()
        });
    },
    setMap(type){
        if(winfoMap){
            winfoMap.getMapObject().Map.basemapslicedlayer.empty();
            Winfo.SetServiceURL(winfodataservicepath,winfodncservicepath);
            winfoMap = new  Winfo.WebDNC("map", { layer: 8, layername:type, center: winfoMap.getCenter(), level: winfoMap.getZoom(), zooms: [1, 18] });             
        }
    },
    zoomIn() {
        //放大一级
        winfoMap.zoomIn();
    },
    zoomOut() {
        //缩小一级
        winfoMap.zoomOut();
    },
    //设置海图大小
    setSize(wid,hig){
        var size = new Winfo.Size(wid,hig)
            winfoMap.setSize(size);
    },
    addNavigationTool() {
        //创建平移缩放控件
        navigation = new Winfo.Navigation();
        winfoMap.addControl(navigation); //添加控件
    },
    removeNavigationTool() {
        winfoMap.removeControl(navigation); //删除控件
    },
    addAISLayer() {
        //创建AIS图层
        if (!al) {
            al = new Winfo.DNCLayer.dynamic({ index: 401, ds: "AIS", url: mapHelper.dataURL, dataprocess: mapHelper.dataProcess, mouseover: mapHelper.mouseover, interval: 30 });
        }
        winfoMap.addLayer(al);
    },
    removeAISLayer() {
        winfoMap.removeLayer(al);
    },
    dataURL(ds) {
        var DATACONTENT = 0;
        if (Winfo.DNCObject.getLevel() > 9) {
            DATACONTENT = 1;
        }
        if (ds == "AIS") {
            if (al) {
                var center = winfoMap.getCenter();
                var h = winfoMap.getSize().getHeight();
                var url = winfodataservicepath + "DataService?VERSION=4.0&REQUEST=GetAISList&TRACKDATA=" + al.GetCheckList() + "&LEVEL=" + winfoMap.getLevel() + "&DATACONTENT=" + DATACONTENT + "&ReturnCoordinate=Screen&BBOX=" + lib.GetBBOX() + "&HEIGHT=" + h + "&LNG=" + center.lng.toFixed(9) + "&LAT=" + center.lat.toFixed(9) + "&JSONCALLBACK=?";
                return url;
            }
        }
        if (ds == "VTS") {
            if (al) {
                var center = winfoMap.getCenter();
                var h = winfoMap.getSize().getHeight();
                var url = winfodataservicepath + "DataService?VERSION=4.0&REQUEST=GetVTSList&TRACKDATA=" + vtsLayer.GetCheckList() + "&LEVEL=" + winfoMap.getLevel() + "&DATACONTENT=" + DATACONTENT + "&ReturnCoordinate=Screen&BBOX=" + lib.GetBBOX() + "&HEIGHT=" + h + "&LNG=" + center.lng.toFixed(9) + "&LAT=" + center.lat.toFixed(9) + "&JSONCALLBACK=?";
                return url;
            }
        }
    },
    dataProcess(LAYER_DATA) {
        if (!LAYER_DATA) return [];
        var DATACONTENT = LAYER_DATA.PARAM.DATACONTENT;
        var ds = LAYER_DATA.PARAM.datasource;
        var ret = [];
        var list = LAYER_DATA.DATAS;
        var size = "";
        for (var i = 0; i < list.length; i++) {
            var data = list[i];
            switch (DATACONTENT) {
                case 0:
                    var obj = {};
                    obj.geometry = { "type": "ScreenPoint", "coordinates": [data.X, data.Y] };
                    if (ds == "AIS") {
                        obj.strokeStyle = "#ff0000";
                        obj.fillStyle = "#ffff00";
                    } else if (ds == "VTS") {
                        obj.strokeStyle = "#000";
                        obj.fillStyle = "#339933";
                    }
                    obj.radius = 2;
                    ret.push(obj);
                    break;
                case 1:
                    if (data.SOG > 0) {
                        var obj = {};
                        obj.geometry = { "type": "ScreenLine", "coordinates": [{ x: data.X, y: data.Y }, { x: data.Vx, y: data.Vy }] };
                        obj.strokeWidth = 0.5;
                        obj.globalAlpha = 0.8;
                        obj.dashed = false;
                        obj.strokeStyle = "#000000";
                        ret.push(obj);
                    }
                    if (ds == "AIS" && al.IfChecked(data.MMSI) || ds == "VTS" && vl.IfChecked(data.TID)) {
                        var obj = {};
                        obj.geometry = { "type": "ScreenLine", "coordinates": [{ x: data.X - 15, y: data.Y - 15 }, { x: data.X - 15, y: data.Y + 15 }, { x: data.X + 15, y: data.Y + 15 }, { x: data.X + 15, y: data.Y - 15 }, { x: data.X - 15, y: data.Y - 15 }] };
                        obj.strokeWidth = 1;
                        obj.strokeStyle = "#ff0099";
                        ret.push(obj);
                        if (data.TRACKDATA.length > 1) {
                            var obj = {};
                            var coordinates = [];
                            for (var n = 0; n < data.TRACKDATA.length; n++) {
                                coordinates.push({ x: data.TRACKDATA[n].Tx, y: data.TRACKDATA[n].Ty });
                            };
                            obj.geometry = { "type": "ScreenLine", "coordinates": coordinates };
                            obj.strokeWidth = 1;
                            obj.globalAlpha = 0.2;
                            obj.dashed = false;
                            obj.strokeStyle = "red";
                            ret.push(obj);
                            for (var n = 0; n < data.TRACKDATA.length; n++) {
                                var obj = {};
                                obj.geometry = { "type": "ScreenPoint", "coordinates": [data.TRACKDATA[n].Tx, data.TRACKDATA[n].Ty] };
                                obj.strokeStyle = "#00f0ff";
                                obj.fillStyle = "#0000ff";
                                obj.radius = 2.5;
                                obj.data = data.TRACKDATA[n];
                                obj.data.MMSI = data.MMSI;
                                obj.data.NameEN = data.NameEN;
                                ret.push(obj);
                            };
                        };
                    };
                    var obj = {};
                    size = 19;
                    obj.geometry = { "type": "ScreenPoint", "coordinates": [data.X, data.Y] };
                    obj.rotate = data.COG;
                    if (ds == "AIS") obj.icon = mapHelper.GetIconByVesselType(data.VesselType);
                    if (ds == "VTS") {
                        obj.strokeStyle = "#339933";
                        obj.radius = 7;
                    }
                    obj.width = size;
                    obj.height = size;
                    obj.data = data;
                    if (data.SBI && data.SBI.RSDATA && data.SBI.RSDATA.NameCN) {
                        if (data.NameEN != data.SBI.RSDATA.NameEN) {
                            obj.data.NameEN = data.NameEN + "(" + data.SBI.RSDATA.NameEN + ")";
                        }
                    }
                    ret.push(obj);
                    if (ds == "VTS") {
                        var obj = {};
                        obj.geometry = { "type": "ScreenPoint", "coordinates": [data.X, data.Y] };
                        obj.strokeStyle = "#339933";
                        obj.radius = 3;
                        ret.push(obj);
                    }
                    break;
            }
        }
        return ret;
    },
    GetIconByVesselType(VT) {
        var ret = "qt.png"
        switch (VT) {
            case "高速船":
                ret = "gs.png";
                break;
            case "客船":
                ret = "k.png";
                break;
            case "货船":
                ret = "h.png";
                break;
            case "油船":
                ret = "wxp.png";
                break;
            case "执法船", "引航船", "搜救船":
                ret = "gw.png";
                break;
        }
        return "../../../static/image/Resources/Ships/" + ret;
    },
    mouseover(obj, offset) {
        var ret = [];
        offset.x += 20;
        offset.y += 20;
        var H = 105;
        var W = 255;
        var face = { type: "face", strokeWidth: 1, strokeStyle: '#CCC', fillStyle: "#FFF", globalAlpha: 0.7, path: [{ x: offset.x, y: offset.y }, { x: offset.x + W, y: offset.y }, { x: offset.x + W, y: offset.y + H }, { x: offset.x, y: offset.y + H }] };
        ret.push(face);
        var h = 16;
        var w = 15;
        var line;
        if (obj.datasource.MMSI) {
            line = { type: "text", text: "MMSI：" + obj.datasource.MMSI, strokeWidth: 0.5, strokeStyle: '#CCC', globalAlpha: 0.8, fillStyle: "#000", path: [{ x: offset.x + w, y: offset.y + h }], fontSize: 12 };
        }
        if (obj.datasource.TID) {
            line = { type: "text", text: "VTS TrackID：" + obj.datasource.TID, strokeWidth: 0.5, strokeStyle: '#CCC', globalAlpha: 0.8, fillStyle: "#000", path: [{ x: offset.x + w, y: offset.y + h }], fontSize: 12 };
        }
        ret.push(line);
        line = { type: "text", text: "船名：" + obj.datasource.NameEN, strokeWidth: 0.5, strokeStyle: '#CCC', globalAlpha: 0.8, fillStyle: "#000", path: [{ x: offset.x + w, y: offset.y + 2 * h }], fontSize: 12 };
        ret.push(line);
        var coordinate = "经度：" + obj.datasource.Lon.toFixed(7);
        coordinate += "    纬度：" + obj.datasource.Lat.toFixed(7);
        line = { type: "text", text: coordinate, strokeWidth: 0.5, strokeStyle: '#CCC', globalAlpha: 0.8, fillStyle: "#000", path: [{ x: offset.x + w, y: offset.y + 3 * h }], fontSize: 12 };
        ret.push(line);
        var state = "航向：" + obj.datasource.COG.toFixed(0) + "             航速：" + obj.datasource.SOG;
        line = { type: "text", text: state, strokeWidth: 0.5, strokeStyle: '#CCC', globalAlpha: 0.8, fillStyle: "#000", path: [{ x: offset.x + w, y: offset.y + 4 * h }], fontSize: 12 };
        ret.push(line);
        line = { type: "text", text: "航行状态：" + obj.datasource.NavState, strokeWidth: 0.5, strokeStyle: '#CCC', globalAlpha: 0.8, fillStyle: "#000", path: [{ x: offset.x + w, y: offset.y + 5 * h }], fontSize: 12 };
        ret.push(line);
        line = { type: "text", text: "时间：" + obj.datasource.TimeStamp, strokeWidth: 0.5, strokeStyle: '#CCC', globalAlpha: 0.8, fillStyle: "#000", path: [{ x: offset.x + w, y: offset.y + 6 * h }], fontSize: 12 };
        ret.push(line);
        return ret;
    },
    mouseoverStation(obj, offset){
        var ret = [];
        offset.x += 20;
        offset.y += 20;
        var H = 105;
        var W = 255;
        var face = { 
            type: "face", 
            strokeWidth: 1, 
            strokeStyle: '#CCC', 
            fillStyle: "#FFF", 
            globalAlpha: 0.7, 
            zIndex:1111,
            path: [{ x: offset.x, y: offset.y }, { x: offset.x + W, y: offset.y }, { x: offset.x + W, y: offset.y + H }, { x: offset.x, y: offset.y + H }] 
        };
        ret.push(face);
        var h = 16;
        var w = 15;
        var line;
        // ret.push(line);
        line = { 
            type: "text", 
            text: "名称：" + obj.datasource.stnm, 
            strokeWidth: 0.5, 
            strokeStyle: '#CCC', 
            globalAlpha: 0.8, 
            fillStyle: "#000", 
            path: [{ x: offset.x + w, y: offset.y +  h }], 
            fontSize: 12 
        };
        ret.push(line);
        line = { 
            type: "text", 
            text: "站码：" + obj.datasource.stcd, 
            strokeWidth: 0.5, 
            strokeStyle: '#CCC', 
            globalAlpha: 0.8, 
            fillStyle: "#000", 
            path: [{ x: offset.x + w, y: offset.y + 3 * h }], 
            fontSize: 12 
        };
        ret.push(line);
        line = { 
            type: "text", 
            text: "类型：" + Main.getSttp(obj.datasource.sttp).name, 
            strokeWidth: 0.5, 
            strokeStyle: '#CCC', 
            globalAlpha: 0.8, 
            fillStyle: "#000", 
            path: [{ x: offset.x + w, y: offset.y + 5 * h }], 
            fontSize: 12 
        };
        ret.push(line);
        return ret;
    },
    //打开水文站
    openHydrological(type,callbak) {
        var datas = stationsData.data;
        for(var i=0;i<datas.length;i++){
            if(datas[i].sttp == type){
                shuiwen_data.push(datas[i]);
            }
        }
        // shuiwen_data = stationsData.data; //总数据，部分类型

        hydrologicalLayer = new Winfo.DNCLayer.dynamic({ index: 602, ds:"qixiangzhan",dataprocess:mapHelper.hydrologicalProcess, mouseover: mapHelper.mouseoverStation});
        
        winfoMap.addLayer(hydrologicalLayer);
        callbak();
    }, 
    hydrologicalProcess(){
        var ret = [];
        for(var i=0;i<shuiwen_data.length;i++){
            var p = { 
                icon : "static/image/haitu/"+shuiwen_data[i].image,
                height : shuiwen_data[i].height*1.5,
                width : shuiwen_data[i].width*1.5,
                geometry: {type:"Point",coordinates: [Number(shuiwen_data[i].baselgtd),Number(shuiwen_data[i].baselttd)]}, 
                path: [Number(shuiwen_data[i].baselgtd),Number(shuiwen_data[i].baselttd)],
                rotate:shuiwen_data[i].angle?shuiwen_data[i].angle:"0",
                data : shuiwen_data[i]
            };
            ret.push(p);
        }
        return ret;
    }
}


  
//向外暴露
export default {
    mapHelper(vu) {   //权限管理
        return mapHelper;
    }
}