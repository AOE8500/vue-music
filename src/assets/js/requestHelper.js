import api from '../../fetch/api'

export const ModelForeCastManga = {
	modelRefresh(vu) {  //刷新模型
		var param = {
			action: "GetModelList",
			page: 1,
			rows: 1000,
			sidx: "",
			sord: "asc",
			mdnm: "",
			mdclb: "",
			mdtp: ""
		}
		var paramsStr = Main.urlStr(param)
		api.get(winfoddbpath + 'ForecastService.ashx?', paramsStr)
			.then(response => {
				if(debugMode) console.log(response);
				// vu.dispatch
			})
			.catch((error) => {
				if(debugMode) console.log(error)
			})
	},
	//.........//
}

//向外暴露
export default {
	getModelForeCastManga() { //
		return ModelForeCastManga;
	},
	//..
}