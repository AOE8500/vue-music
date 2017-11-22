
var Main = {
	urlStr:function(param, key){
		var paramStr = "";
	    if (param instanceof String || param instanceof Number || param instanceof Boolean) {
	        paramStr += "&" + key + "=" + encodeURIComponent(param);
	    } else {
	        $.each(param, function(i) {
	            var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
	            paramStr += '&' + Main.urlStr(this, k);
	        });
	    }
	    return paramStr.substr(1);
	},
	getSttp:function(sttp){
		switch(sttp) {
			case "R":
				sttp = {
					name:"河道站",
					images:"1.png",
				}
				break;
			case "B":
				sttp = {
					name:"区域",
					images:"1.png",
				}
				break;
			case "S":
				sttp = {
					name:"水库",
					images:"1.png",
				}
				break;
			case "D":
				sttp = {
					name:"闸坝站",
					images:"1.png",
				}
				break;
			case "I":
				sttp = {
					name:"入库",
					images:"1.png",
				}
				break;
			case "O":
				sttp = {
					name:"出库",
					images:"1.png",
				}
				break;
			case "PP":
				sttp = {
					name:"雨量站",
					images:"3.png",
				}
				break;
			case "ZQ":
				sttp = {
					name:"水位站",
					images:"4.png",
				}
				break;
			case "ZZ":
				sttp = {
					name:"水文站",
					images:"5.png",
				}
				break;
			case "MM":
				sttp = {
					name:"气象站",
					images:"1.png",
				}
				break;
			case "SS":
				sttp = {
					name:"墒情站",
					images:"1.png",
				}
				break;
			case "DD":
				sttp = {
					name:"堰闸水文站",
					images:"5.png",
				}
				break;
			case "DP":
				sttp = {
					name:"泵站",
					images:"1.png",
				}
				break;
			case "RR":
				sttp = {
					name:"水库水文站",
					images:"6.png",
				}
				break;
			case "ZG":
				sttp = {
					name:"地下水站",
					images:"1.png",
				}
				break;
			case "ZB":
				sttp = {
					name:"分洪水位站",
					images:"1.png",
				}
				break;

		}
		return sttp;
	}
}

