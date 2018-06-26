jQuery.fn.ForceNumericOnly =
 function()
 {
     return this.each(function()
     {
         $(this).keydown(function(e)
         {
             var key = e.charCode || e.keyCode || 0;
             return (
                 key == 8 || 
                 key == 9 ||
                 key == 13 ||
                 key == 46 ||
                 key == 110 ||
                 key == 190 ||
                 (key >= 35 && key <= 40) ||
                 (key >= 48 && key <= 57) ||
             	 (key >= 112 && key <= 123) ||
                 (key >= 96 && key <= 105));
         });
     });
 };
 String.prototype.getPrecision = function() {
	    var s = this + "",
	        d = s.indexOf('.') + 1;

	    return !d ? 0 : s.length - d;
	};
 jQuery.fn.ForceNumericOnlyMaxLength =
	 function(precision)
	 {
	     return this.each(function()
	     {
	         $(this).keydown(function(e)
	         {
	             var key = e.charCode || e.keyCode || 0;
	             if(key != 8 && key != 13
	            		 	&& $(this).val() != '' && $(this).val().getPrecision() == (precision)){
	            	 $(this).val($(this).val().substr(0,$(this).val().length - 1));
	             }
	             return (
	                 key == 8 || 
	                 key == 9 ||
	                 key == 13 ||
	                 key == 46 ||
	                 key == 110 ||
	                 key == 190 ||
	                 (key >= 35 && key <= 40) ||
	                 (key >= 48 && key <= 57) ||
	             	 (key >= 112 && key <= 123) ||
	                 (key >= 96 && key <= 105));
	         });
	     });
	 };

jQuery.fn.ForceInteger =
 function()
 {
     return this.each(function()
     {
         $(this).keydown(function(e)
         {
             var key = e.charCode || e.keyCode || 0;
             return (
                 key == 8 || 
                 key == 9 ||
                 key == 13 ||
                 key == 46 ||
                 (key >= 35 && key <= 40) ||
                 (key >= 48 && key <= 57) ||
             	 (key >= 112 && key <= 123) ||
                 (key >= 96 && key <= 105));
         });
     });
 };
var Cache = function() {
	return {
		chart:function(chartData){
			this.chartData = JSON.parse(chartData);
		},
		status:function(statusData){
			this.statusData = JSON.parse(statusData);
		},
		sell:function(sellData){
			this.sellData = JSON.parse(sellData);
		},
		buy:function(buyData){
			this.buyData = JSON.parse(buyData);
		},
		tradding:function(traddingData){
			this.traddingData = JSON.parse(traddingData);
		}
	}
}();
var Config = function () {
	return {
        init: function(url_balace, url_market, order_s_pending, order_b_pending, market_status, 
        		market_data, tradding, key, scret , platform, queue_url,tradding_fee ,socket_url,socket_listen_exchange,price_floor,price_celling) {
        	this.url_balance = url_balace;
        	this.url_market = url_balace;
        	this.order_s_pending = order_s_pending;
        	this.order_b_pending = order_b_pending;
        	this.market_status = market_status;
        	this.market_data = market_data;
        	this.tradding = tradding;
        	this.key = key;
        	this.scret = scret;
        	this.platform = platform;
        	this.queue_url = queue_url;
        	this.tradding_fee = tradding_fee;
        	this.socket_url = socket_url;
        	this.socket_listen_exchange = socket_listen_exchange;
        	this.price_floor = price_floor;
        	this.price_celling = price_celling;
        },
        user: function(user_id) {
			this.user_id = user_id;
		}
    };
} ();
var AjaxCustom = function () {
	var basicAjax = function (url,callback,repeat) {
		repeat = "" || repeat;
		$.ajax({
            type: "GET",
            url: url,
            cache: false,
            success: function(data) {
            	 callback(data);
            },
            error: function(data) {
                if(repeat == "repeat"){
                	basicAjax(url , callback ,"no-repeat");
                }
            },
        });
	};
	return {
        simulation: function(url , callback){
            var prom = new Promise(function(resolve, reject){
                var db = {
                    balance: {"btcUsdExchangeRate":"11241.01000000000000000000","ethUsdExchangeRate":"844.13240494000000000000","eztUsdExchangeRate":"1.60000000000000000000","ethEztExchangeRate":527.58,"btcEztExchangeRate":7025.63,"eztEthExchangeRate":0.00189543,"eztBtcExchangeRate":0.00014233,"minEzt":50,"maxEzt":50000,"userId":210158,"ethBalance":"0","btcBalance":"0","eztBalance":"0","tradingFee":"0.0025"}
                }
                var key = url.substring(url.lastIndexOf('/')+1);
                setTimeout(function(){
                    resolve(db[key]);
                }, 200 + Math.floor(Math.random()*200));
            }).then(function(data){
                // onFulfilled
                callback(data);
            }, function(){
                // onRejected
                console.log('Rejected');
            });
        },
        basic: function(url , callback) {
        	basicAjax(url , callback ,"repeat");
        }
    };
} ();

var Format = function() {
	return {
		ezt: function(value) {
        	return new BigNumber(String(value)).shift(-8).round(8);
        },
		btc: function(value) {
        	return new BigNumber(String(value)).shift(-8).round(8);
        },
        eth: function(value) {
        	return new BigNumber(String(value)).shift(-18).round(8);
        },
        plus: function(value , value2 , decimal) {
        	return new BigNumber(String((new BigNumber(String(value)).plus(new BigNumber(String(value2)))))).round(decimal);
        },
        sub: function(value , value2 , decimal) {
        	return new BigNumber(String((new BigNumber(String(value)) - (new BigNumber(String(value2)))))).round(decimal);
        },
        mul: function(value , exchange , decimal) {
        	return new BigNumber(String((new BigNumber(String(value)) * new BigNumber(String(exchange))))).round(decimal);
        },
        divi: function(value , exchange ,decimal) {
        	return new BigNumber(String((new BigNumber(String(value)) / new BigNumber(String(exchange))))).round(decimal);
        },
        round8:function(value) {
        	return new BigNumber(String(value)).round(8);
        },
        datetime_short:function(longdate){
			var d = new Date((new Number(longdate)));
			var h = d.getUTCHours();
			var m = d.getUTCMinutes();
			var s = d.getUTCSeconds();
			if(h < 10){
				h = "0"+h;
			}
			if(m < 10){
				m = "0"+m;
			}if(s < 10){
				s = "0"+s;
			}
			return h + ":" + m + ":" + s;
		},
		datetime_long:function(longdate){
			var d = new Date((new Number(longdate)));
			var h = d.getUTCHours();
			var m = d.getUTCMinutes();
			var s = d.getUTCSeconds();
			if(h < 10){
				h = "0"+h;
			}
			if(m < 10){
				m = "0"+m;
			}if(s < 10){
				s = "0"+s;
			}
			return d.toISOString().slice(0, 10) +" "+ h + ":" + m + ":" + s;
		},
		lbl_size:function(value) {
			var val_arr = value.split('\.');
			var val_end = val_arr[1].split('');
			var index = 0;
			for (var int = val_end.length; int >= 0; int--) {
				if(val_end[int] != '.' &&  val_end[int] > 0 ){
					index = int;
					break;
				}
			}
			if(index == 0){
				return '<span class="pre_number">'+new BigNumber(val_arr[0]).toFormat()+'.</span>' +'<span class="middle_number">'+val_arr[1].substring(0 ,1)+'</span><span class="end_number">'+val_arr[1].substring(1,val_arr[1].length )+'</span>';
			}else if(index == val_end.length-1){
				return '<span class="pre_number">'+new BigNumber(val_arr[0]).toFormat()+'.</span>' +'<span class="middle_number">'+val_arr[1]+'</span>';
			}else {
				return '<span class="pre_number">'+new BigNumber(val_arr[0]).toFormat()+'.</span>' +'<span class="middle_number">'+val_arr[1].substring(0 ,index+1)+ '</span><span class="end_number">'+val_arr[1].substring(index+1,val_arr[1].length )+'</span>';
			}
		},
		lbl_my_size:function(value) {
			if(value == 0){
				return "-";
			}
			var val_arr = value.split('\.');
			var val_end = val_arr[1].split('');
			var index = 0;
			for (var int = val_end.length; int >= 0; int--) {
				if(val_end[int] != '.' &&  val_end[int] > 0 ){
					index = int;
					break;
				}
			}
			if(index == 0){
				return '<span class="pre_number">'+new BigNumber(val_arr[0]).toFormat()+'.</span>' +'<span class="middle_number">'+val_arr[1].substring(0 ,1)+'</span><span class="end_number">'+val_arr[1].substring(1,val_arr[1].length )+'</span>';
			}else if(index == val_end.length-1){
				return '<span class="pre_number">'+new BigNumber(val_arr[0]).toFormat()+'.</span>' +'<span class="middle_number">'+val_arr[1]+'</span>';
			}else {
				return '<span class="pre_number">'+new BigNumber(val_arr[0]).toFormat()+'.</span>' +'<span class="middle_number">'+val_arr[1].substring(0 ,index+1)+ '</span><span class="end_number">'+val_arr[1].substring(index+1,val_arr[1].length )+'</span>';
			}
		},
		lbl_order:function(value , preColor) {
			var val_arr = value.split('\.');
			return '<span class="'+preColor+'">'+new BigNumber(val_arr[0]).toFormat()+'</span>' +'.'+val_arr[1];
		},
		
    };
}();

var Loaded = function () {
	return {
		init:function(){
			this.b_order = false;
			this.s_order = false;
			this.price_chart = false;
			this.balance = false;
			this.t_history = false;
			this.my_order = false;
			this.my_order_history = false;
			Effect.loading("#sellOrderBook"); 
			Effect.loading("#traddingOrder");
			//Effect.loading("#chartOrder");
			Effect.loading("#buyOrderBook");
			//Effect.loading("#marketStatusQueue");
			$.fn.dataTable.ext.errMode = 'throw';
			BigNumber.config({ EXPONENTIAL_AT: 100 });
			$("input[type=text], textarea").on({ 'touchstart' : function() {
			    zoomDisable();
			}});
			$("input[type=text], textarea").on({ 'touchend' : function() {
			    setTimeout(zoomEnable, 500);
			}});
			function zoomDisable(){
			  $('head meta[name=viewport]').remove();
			  $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />');
			}
			function zoomEnable(){
			  $('head meta[name=viewport]').remove();
			  $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1" />');
			} 
		}
		
	}
}();

// 帐目相关
var Balance = function() {
	return {
        init: function(balance_json) {
        	this.ezt_balance = balance_json.eztBalance;
        	this.btc_balance = balance_json.btcBalance;
        	this.eth_balance = balance_json.ethBalance;
        	this.ezt_exchange_rate = balance_json.eztUsdExchangeRate;
        	this.btc_exchange_rate = balance_json.btcUsdExchangeRate;
        	this.eth_exchange_rate = balance_json.ethUsdExchangeRate;
        	this.ezt_balance_lbl = Format.ezt(this.ezt_balance);
        	this.btc_balance_lbl = Format.btc(this.btc_balance);
        	this.eth_balance_lbl = Format.eth(this.eth_balance);
        }
    };
}();

var OrderBook = function() {
	return {
        setMyOrder: function(my_order) {
        	this.my_order = my_order;
        },
        setMyOrderHistory: function(myorder_history) {
        	this.myorder_history = myorder_history;
        },
        setBuyOrder: function(buy_order) {
        	this.buy_order = buy_order;
        },
        setSellOrder: function(sell_order) {
        	this.sell_order = sell_order;
        },
    };
}();

var ExchangeService = function() {
    return {
        init: function() {},
        updateBalance:function() {
        	AjaxCustom.simulation(Config['url_balance'] , function(data) {
        		Balance.init(data);
        		Binding.eztBalance();
        		Binding.btcBalance();
			});
        }
    };
}();

var Binding = function () {
	var chart = null;
	var charDataOld = null;
	var renderChartInfor = function(dataItem,date) {
		var h = parseInt(date.substring(date.length - 8,date.length - 6));
		var m =  parseInt(date.substring(date.length - 5,date.length - 3)) + 5;
		if(m > 60){
			m -=60;
			h+=1;
		}
		if(h < 10){
			h = "0"+h;
		}
		if(m < 10){
			m = "0"+m;
		}
		var closeDate = h+":"+m;
		$('.chartDetails #s_time').text(date.substring(date.length - 8,date.length - 3));
		$('.chartDetails #e_time').text(closeDate);
		$('.chartDetails #open').text(dataItem.open);
		$('.chartDetails #high').text(dataItem.high);
		$('.chartDetails #low').text(dataItem.low);
		$('.chartDetails #close').text(dataItem.close);;
	}
	var drawChart = function(data) {
		renderChartInfor(data[data.length - 1] , data[data.length - 1].date);
		if(chart == null){
			chart = AmCharts.makeChart( "marketChart", {
				"type": "serial",
				"backgroundColor": "#292b3a",
				"hideCredits":true,
				"categoryField": "date",
				"autoMarginOffset": 5,
				'color':'#7c819e',
				"dataDateFormat": "YYYY-MM-DD JJ:NN:SS",
				"fontFamily": "open sans",
				"fontSize": 12,
				"theme": "black",
				"columnWidth": 4.3,
				"zoomOutText": "",
				"categoryAxis": {
					"parseDates": true,
					"minPeriod": "mm",
					"boldPeriodBeginning": false,
					"centerLabelOnFullPeriod": false,
				},
				"chartCursor": {
					"enabled": true,
					"zoomable": false,
					"valueLineBalloonEnabled": false,
					"valueLineEnabled": false,
					/*"limitToGraph": "g1",*/
					"categoryBalloonEnabled": true,
					"cursorColor": "#fff",
					"fullWidth": false,
				},
				"chartScrollbar": {
					"enabled": false,
					"graph": "g1",
					"graphType": "line",
					"maximum": 3,
					"scrollbarHeight": 30
				},
				"trendLines": [],
				"graphs": [
					{
						"balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>Time:<b>[[date]]</b><br>",
						"closeField": "close",
						"fillAlphas": 0.9,
						"fillColors": "#34bfa3",
						"highField": "high",
						"id": "g1",
						"lineColor": "#34bfa3",
						"lowField": "low",
						"negativeFillColors": "#f4516c",
						"negativeLineColor": "#f4516c",
						"openField": "open",
						"title": "Price:",
						"type": "candlestick",
						"valueField": "close",
						/*"proCandlesticks": true,*/
						"balloonFunction": function(graphDataItem, graph) {
							renderChartInfor(graphDataItem.values , graphDataItem.dataContext.date);
						}
					}
				],
				"guides": [
					{
						"id": "Guide-1"
					},
					{
						"id": "Guide-2"
					}
				],
				"valueAxes": [
					{
						"id": "ValueAxis-1",
						"position": "right",
						"minPeriod": "mm",
					}
				],
				"allLabels": [],
				"balloon": {},
				"titles": [],
			  "dataProvider": data
			} );
			//chart.addListener( "rendered", zoomChart );
			//zoomChart();
			//function zoomChart() {
				//chart.zoomToIndexes( chart.dataProvider.length - 50, chart.dataProvider.length - 1 );
			//}
		}else {
			chart.dataProvider = data;
			chart.validateData();
		}
		charDataOld = data;
	}
	
	var fillMySize = function(selector , price , amount , price_color , pre_color) {
		setTimeout(() => {
			var isUpdate = false;
			var dataOld;
			if(selector.indexOf("Buy") > -1){
				dataOld = dataOrderBuyOld;
			}else{
				dataOld = dataOrderSellOld;
			}
			for (var int = 0; int < dataOld.length; int++) {
				if(Number(dataOld[int][1]) == Number(price)){
					if($(selector+ " tbody tr#"+price.replace(/\./g, '-')).length > 0){
						var currentRow = $(selector + " tbody tr#"+price.replace(/\./g, '-').replace(/,/g, '') +" td");				
						//$(currentRow).eq(0).html(Format.lbl_size(Format.plus($(currentRow).eq(0).text().replace(/,/g, '') ,amount , 8).toFixed(8)));
						//$(currentRow).eq(1).html(Format.lbl_order(price ,pre_color));
						var size = 0;
						if($(currentRow).eq(2).text().indexOf('-') == -1){
							size = $(currentRow).eq(2).text().replace(/,/g, '');
						}
						$(currentRow).eq(2).html(Format.lbl_size(Format.plus(size ,amount , 8).toFixed(5)));
						Effect.changeColor($(currentRow).eq(0) ,"#34bfa3");
						dataOld[int] = [Format.plus(size ,amount , 8).toFixed(8) , price , dataOld[int][2]];
						var isUpdate = true;
					}
				}
			} 
			/*if(!isUpdate){
				var isBottom = true;
				$.each($(selector+ " tbody tr"),function(int){
					var priceColumn = $(this).attr('id').replace(/-/g, '.');
					if(Number(price) > Number(priceColumn)){
						var row = $('<tr>')
						.attr("id" ,price.replace(/\./g, '-').replace(/,/g, ''))
						//.addClass('not-remove')
						.append($('<td>').html(Format.lbl_size(amount)))
						.append($('<td>').addClass(price_color).html(Format.lbl_order(price ,pre_color)))
						.append($('<td>').html(Format.lbl_size(new BigNumber(amount).toFixed(5))));
						$(row).insertBefore($(this));
						dataOld.splice(int, 0,[Format.plus(dataOld[int][0] ,amount , 8).toFixed(8) , price , dataOld[int][2]]);
						isBottom = false;
						return false;
					}
				});
				if(isBottom){
					if(dataOld.length == 0){
						$(selector+" tbody tr.dataTables_empty").remove();
					}
					var row = $('<tr>')
					.attr("id" ,price.replace(/\./g, '-').replace(/,/g, ''))
					.addClass('not-remove')
					.append($('<td>').html(Format.lbl_size(amount)))
					.append($('<td>').addClass(price_color).html(Format.lbl_order(price ,pre_color)))
					.append($('<td>').html(Format.lbl_size(new BigNumber(amount).toFixed(5))));
					$(selector+ " tbody").append($(row));
					dataOld.push([amount , price , 0]);
				}
			}*/
			//$.getJSON("../exchange/all_myorder-eth", function(myorder) {allMyOrder = myorder});
		}, 0);
	}
	
	var completeRenderTable = function(selector) {
		if($(selector +' tbody tr').length == 0){
			$(selector +' tbody').append($('<tr>')
					.addClass('dataTables_empty')
					.append($('<td>').addClass('text-center').css('color','#c9ccdc').attr('colspan' ,'3').text('No data available in table')));
		}
	}
	var dataOrderBuyOld = null;
	var drawOrderBuy = function (data) {
		setTimeout(() => {
			if(dataOrderBuyOld == null){
				if(data.length > 0){
					$('#totalBOrder').text("("+new BigNumber(data[0][2]).toFormat()+")");
					$("#orderBuy tbody tr.dataTables_empty").remove();
				}
				for (var int = 0; int < data.length; int++) {
					$("#orderBuy").find('tbody').append($('<tr>')
							.attr("id" ,data[int][1].replace(/\./g, '-').replace(/,/g, ''))
							.append($('<td>').html(Format.lbl_size(data[int][0])))
							.append($('<td>').attr('data-container' , 'body').attr('data-toggle','tooltip').attr('data-placement','right').addClass("buy-color").html(Format.lbl_order(data[int][1] ,"pre_buy_number")))
							.append($('<td>').text(" - "))
							);
				}
				dataOrderBuyOld = data;
			}else{
				if(data.length > 0){
					$('#totalBOrder').text("("+new BigNumber(data[0][2]).toFormat()+")");
					$("#orderBuy tbody tr.dataTables_empty").remove();
				}
				var array_update =[];
				var array_delete =[];
				var array_new =[];
				var newData = data.slice(0);
				for (var int = 0; int < dataOrderBuyOld.length; int++) {
					var isUpdate = false;
					for (var j = 0; j < data.length; j++) {
						if(Number(dataOrderBuyOld[int][1]) == Number(data[j][1])){
							if(Number(dataOrderBuyOld[int][0]) != Number(data[j][0])){
								array_update.push(data[j]);
							}
							isUpdate = true;
							data.splice(j,1);
							break;
						}
					}
					if(!isUpdate){
						array_delete.push(dataOrderBuyOld[int]);
					}
				}
				for (var int = 0; int < array_delete.length; int++) {
					$row = $("#orderBuy tbody tr#"+array_delete[int][1].replace(/\./g, '-').replace(/,/g, ''));
					if($row.hasClass("not-remove")){
						$row.removeClass("not-remove");
					}else{
						$row.remove();	
					}
				}
				for (var int = 0; int < array_update.length; int++) {
					var id = array_update[int][1].replace(/\./g, '-').replace(/,/g, '');
					if($("#orderBuy tbody tr#"+id).length > 0){
						var currentRow = $("#orderBuy tbody tr#"+array_update[int][1].replace(/\./g, '-').replace(/,/g, '') +" td");				
						$(currentRow).eq(0).html(Format.lbl_size(array_update[int][0]));
						$(currentRow).eq(1).html(Format.lbl_order(array_update[int][1] ,"pre_buy_number"));
						Effect.changeColor($(currentRow).eq(0) ,"#34bfa3");
					}
				} 
				data.reverse();
				for (var int = 0; int < data.length; int++) {
					var id = data[int][1].replace(/\./g, '-').replace(/,/g, '');
					var isBottom = true;
					$.each($("#orderBuy tbody tr"),function(index){
						var price = $(this).attr('id').replace(/-/g, '.');
						if(Number(data[int][1]) > Number(price)){
							var row = $('<tr>')
							.attr("id" ,data[int][1].replace(/\./g, '-').replace(/,/g, ''))
							.append($('<td>').html(Format.lbl_size(data[int][0])))
							.append($('<td>').attr('data-container' , 'body').attr('data-toggle','tooltip').attr('data-placement','right').addClass("buy-color").html(Format.lbl_order(data[int][1] ,"pre_buy_number")))
							.append($('<td>').text(" - "));
							$(row).insertBefore($(this));
							isBottom = false;
							return false;
						}
					});
					if(isBottom){
						var row = $('<tr>')
						.attr("id" ,data[int][1].replace(/\./g, '-').replace(/,/g, ''))
						.append($('<td>').html(Format.lbl_size(data[int][0])))
						.append($('<td>').attr('data-container' , 'body').attr('data-toggle','tooltip').attr('data-placement','right').addClass("buy-color").html(Format.lbl_order(data[int][1] ,"pre_buy_number")))
						.append($('<td>').text(" - "));
						$("#orderBuy tbody").append($(row));
					}
				}
				dataOrderBuyOld = newData.slice(0);
			}
			completeRenderTable('#orderBuy');
			$('#orderBuy tr td[data-toggle="tooltip"]').tooltip({
				 title: function() {
					 return "$"+  Format.mul($(this).text().replace(/,/g, '') , Balance['btc_exchange_rate'],2);
				 }
			}); 
			OrderBook.setBuyOrder(dataOrderBuyOld);
		}, 0);
	};
	
	var dataOrderSellOld = null;
	var drawOrderSell = function (data) {
		setTimeout(() => {
			if(dataOrderSellOld == null){
				if(data.length > 0){
					$('#totalSOrder').text("("+new BigNumber(data[0][2]).toFormat()+")");
					$("#orderSell tbody tr.dataTables_empty").remove();
				}
				for (var int = 0; int < data.length; int++) {
					$("#orderSell").find('tbody').append($('<tr>')
							.attr("id" , data[int][1].replace(/\./g, '-').replace(/,/g, ''))
							.append($('<td>').html(Format.lbl_size(String(data[int][0]))))
							.append($('<td>').attr('data-container' , 'body').attr('data-toggle','tooltip').attr('data-placement','right').addClass("sell-color").html(Format.lbl_order(data[int][1] ,"pre_sell_number")))
							.append($('<td>').text(" - "))
							);
				}
				dataOrderSellOld = data;
			}else{
				if(data.length > 0){
					$('#totalSOrder').text("("+new BigNumber(data[0][2]).toFormat()+")");
					$("#orderSell tbody tr.dataTables_empty").remove();
				}
				var array_update =[];
				var array_delete =[];
				var array_new =[];
				var newData = data.slice(0);
				for (var int = 0; int < dataOrderSellOld.length; int++) {
					var isUpdate = false;
					for (var j = 0; j < data.length; j++) {
						if(Number(dataOrderSellOld[int][1]) == Number(data[j][1])){
							if(Number(dataOrderSellOld[int][0]) != Number(data[j][0])){
								array_update.push(data[j]);
							}
							isUpdate = true;
							data.splice(j,1);
							break;
						}
					}
					if(!isUpdate){
						array_delete.push(dataOrderSellOld[int]);
					}
				}
				for (var int = 0; int < array_delete.length; int++) {
					$row = $("#orderSell tbody tr#"+array_delete[int][1].replace(/\./g, '-').replace(/,/g, ''));
					if($row.hasClass("not-remove")){
						$row.removeClass("not-remove");
					}else{
						$row.remove();	
					}
				}
				for (var int = 0; int < array_update.length; int++) {
					var id = array_update[int][1].replace(/\./g, '-').replace(/,/g, '');
					if($("#orderSell tbody tr#"+id).length > 0){
						var currentRow = $("#orderSell tbody tr#"+array_update[int][1].replace(/\./g, '-').replace(/,/g, '') +" td");				
						$(currentRow).eq(0).html(Format.lbl_size(String(array_update[int][0])));
						$(currentRow).eq(1).html(Format.lbl_order(array_update[int][1] ,"pre_sell_number"));
						Effect.changeColor($(currentRow).eq(0) ,"#f4516c");
					}
				} 
				data.reverse();
				for (var int = 0; int < data.length; int++) {
					var id = data[int][1].replace(/\./g, '-').replace(/,/g, '');
					var isBottom = true;
					$.each($("#orderSell tbody tr"),function(index){
						var price = $(this).attr('id').replace(/-/g, '.');
						if(Number(data[int][1]) > Number(price)){
							var row = $('<tr>')
							.attr("id" , data[int][1].replace(/\./g, '-').replace(/,/g, ''))
							.append($('<td>').html(Format.lbl_size(String(data[int][0]))))
							.append($('<td>').attr('data-container' , 'body').attr('data-toggle','tooltip').attr('data-placement','right').addClass("sell-color").html(Format.lbl_order(data[int][1] ,"pre_sell_number")))
							.append($('<td>').text(" - "));
							$(currentRow).hide();
							$(row).insertBefore($(this));
							$(currentRow).fadeIn();
							isBottom = false;
							return false;
						}
					});
					if(isBottom){
						var row = $('<tr>')
						.attr("id" , data[int][1].replace(/\./g, '-').replace(/,/g, ''))
						.append($('<td>').html(Format.lbl_size(String(data[int][0]))))
						.append($('<td>').attr('data-container' , 'body').attr('data-toggle','tooltip').attr('data-placement','right').addClass("sell-color").html(Format.lbl_order(data[int][1] ,"pre_sell_number")))
						.append($('<td>').text(" - "));
						$(currentRow).hide();
						$("#orderSell tbody").append($(row));
						$(currentRow).fadeIn();
					}
				}
				dataOrderSellOld = newData.slice(0);
			}
			completeRenderTable('#orderSell');
			$('#orderSell tr td[data-toggle="tooltip"]').tooltip({
				 title: function() {
					 return "$"+  Format.mul($(this).text().replace(/,/g, '') , Balance['btc_exchange_rate'],2);
				 }
			});
			OrderBook.setSellOrder(dataOrderSellOld);
		}, 0);
	};
	
	var dataTraddingOld = null;
	drawTradding = function (data) {
		setTimeout(() => {
			var isUpdateMyOrder = false;
			if(dataTraddingOld == null){
				if(data.length > 0){
					$("#traddingTable tbody tr.dataTables_empty").remove();
				}
				for (var int = 0; int < data.length; int++) {
					if(data[int][4] == Config['user_id']  || data[int][5] == Config['user_id']){
						isUpdateMyOrder = true;
					}
					$("#traddingTable").find('tbody').append($('<tr>')
							.append($('<td>').html(Format.lbl_size(data[int][0])))
							.append($('<td>').attr('data-container' , 'body').attr('data-toggle','tooltip').attr('data-placement','right').addClass("color-"+data[int][3]).html(Format.lbl_order(data[int][1] ,"pre_number_"+data[int][3])))
							.append($('<td>').text(Format.datetime_short(data[int][2])))
							);
				}
			}else{
				if(data.length > 0){
					$("#traddingTable tbody tr.dataTables_empty").remove();
				}
				if(data.length > 0 && data[0][2] > dataTraddingOld[0][2]){
					var start = 0;
					for (var int = 0; int < data.length; int++) {
						if(data[int][4] == Config['user_id']  || data[int][5] == Config['user_id']){
							isUpdateMyOrder = true;
						}
						if(data[int][2] == dataTraddingOld[0][2]){
							start = int;
							break;
						}
					}
					for (var int = 0; int < data.length; int++) {
						if(int < start){
							$("#traddingTable tbody").prepend($('<tr>')
									.attr("id" , data[int][1])
									.append($('<td>').html(Format.lbl_size(data[int][0])))
									.append($('<td>').attr('data-container' , 'body').attr('data-toggle','tooltip').attr('data-placement','right').addClass("color-"+data[int][3]).html(Format.lbl_order(data[int][1] ,"pre_number_"+data[int][3])))
									.append($('<td>').text(Format.datetime_short(data[int][2])))
									);
							$(currentRow).hide();
							var currentRow = $("#traddingTable tbody tr#"+data[int][2]);
							$(currentRow).fadeIn();
							if($("#traddingTable tbody tr").length > 50){
								$("#traddingTable tbody tr:last-child").remove();
							}
						}
					} 
				}
			}
			dataTraddingOld = data.slice(0);
			completeRenderTable('#traddingTable');
			$('#traddingTable tr td[data-toggle="tooltip"]').tooltip({
				 title: function() {
					 return "$"+  Format.mul($(this).text().replace(/,/g, '') , Balance['btc_exchange_rate'],2);
				 }
			});
			if(isUpdateMyOrder){
				fillMyBuyOrderSize();
			}
		}, 0);
	}
	
	var myOrderTable = null;
	var updateMyOrder = function () {
		if(myOrderTable == null){
			myOrderTable = $('#myOrderTable').DataTable({
				pageLength: 20,
				drawCallback: function (settings) {
					OrderBook.setMyOrder(settings['aoData']);
					if (settings['aoData'].length == 0) {
						$("#myOrderTable_paginate").css("display", "none");
						$("#myOrderTable thead tr th:last").css('min-width' ,'0');
					} else {
						$("#myOrderTable_paginate").css("display", "block");
						$("#myOrderTable thead tr th:last").css('min-width' ,'130px');
					}
					$('#myOrderTable tr div[data-toggle="tooltip"]').tooltip({
						 title: function() {
							 return "$"+  Format.mul($(this).text().replace(/,/g, '') , Balance['btc_exchange_rate'],2);
						 }
					}); 
				},
				language: {
				    processing: "<div class=\"m-loader m-loader--brand\" style=\"width: 30px;display: block;\"></div>",
				},
				info: false,
				lengthChange: false,
				searching: false,
				ordering: false,
				processing: true,
				serverSide: true,
				ajax: "../exchange/myorder",
				
				columns: [{
					render: function (data, type, row, meta) {
						return "<div>"+Format.lbl_size(Format.ezt(row['order_quantity']).toFixed(8))+"</div>";
					}
				}, {
					data: 'total_filled_quantity',
					render: function (data, type, row, meta) {
						return "<div>"+Format.lbl_size(Format.ezt(row['total_filled_quantity']).toFixed(8))+"</div>";
					}
				}, {
					data: 'order_price',
					render: function (data, type, row, meta) {
						return "<div data-container='#myorderContent' data-toggle='tooltip' data-placement='right' class='color-"+row['receive_issue']+"'>"+Format.lbl_order(Format.btc(row['order_price']).toFixed(8) ,'pre_number_'+row['receive_issue'] )+"</div>";
					}
				}, {
					data: 'fee_amount',
					render: function (data, type, row, meta) {
						return "<div data-container='#myorderContent' data-toggle='tooltip' data-placement='right' >"+Format.lbl_size(Format.btc(row['fee_amount']).toFixed(8))+"</div>";
					}
				}, {
					data: 'insert_datetime',
					className:'low-color'
				}, {
					data:'order_status',
					className:'low-color',
					render: function (data, type, row, meta) {
						var html = "<span style='color:#c9ccdc;font-weight:600'>"+row['order_status'].toLowerCase()+"</span>";
						if(data == 'PENDING'){
							html ='<div class="cancel"><span style="color:#c9ccdc;font-weight:600">open</span>' + ' (<a class="pre_number_2" onClick="ActionOrder.cancel(this)" href="javascript:void(0)">cancel</a>)</div><div class="cancel-active" style="display:none"><button onclick="ActionOrder.cancel_submit(this,'+row['order_id']+')" class="btn btn-danger cancel-btn">Confirm</button></div>';
						}else if(data == 'PARTIAL FILLING'){
							html ='<div class="cancel"><span style="color:#c9ccdc;font-weight:600">'+row['order_status'].toLowerCase()+'' + '</span> (<a class="sell-color" onClick="ActionOrder.cancel(this)" href="javascript:void(0)">cancel</a>)</div><div class="cancel-active" style="display:none"><button onclick="ActionOrder.cancel_submit(this,'+row['order_id']+')" class="btn btn-danger cancel-btn">Confirm</button></div>';
						}
						return html;
					}
				}],
			});
			OrderBook.setMyOrder(myOrderTable);
		}else{
			reloadMyOrder();
		}
	}
	var reloadMyOrder = function() {
        return true; // 屏蔽自动更新('#myOrderTable')
		myOrderTable.draw();
	}
	
	var myOrderHistoryTable = null;
	var updateMyOrderHistory = function () {
		if(myOrderHistoryTable == null){
			myOrderHistoryTable = $('#myOrderHistoryTable').DataTable({
				pageLength: 20,
				drawCallback: function (settings) {
					if (settings['aoData'].length == 0) {
						$("#myOrderHistoryTable_paginate").css("display", "none");
					} else {
						$("#myOrderHistoryTable_paginate").css("display", "block");
					}
					$('#myOrderHistoryTable tr div[data-toggle="tooltip"]').tooltip({
						 title: function() {
							 return "$"+  Format.mul($(this).text().replace(/,/g, '') , Balance['btc_exchange_rate'],2);
						 }
					}); 
				},
				language: {
				    processing: "<div class=\"m-loader m-loader--brand\" style=\"width: 30px;display: block;\"></div>",
				},
				info: false,
				lengthChange: false,
				searching: false,
				ordering: false,
				processing: true,
				serverSide: true,
				ajax: "../exchange/myorderhistory",
				columns: [{
					render: function (data, type, row, meta) {
						return "<div>"+Format.lbl_size(Format.ezt(row['filled_quantity']).toFixed(8))+"</div>";
					}
				}, {
					data: 'order_price',
					render: function (data, type, row, meta) {
						return "<div data-container='#myhistoryContent' data-toggle='tooltip' data-placement='right' class='color-"+row['receive_issue']+"'>"+Format.lbl_order(Format.btc(row['filled_price']).toFixed(8) ,'pre_number_'+row['receive_issue'] )+"</div>";
					}
				}, {
					data: 'fee_amount',
					render: function (data, type, row, meta) {
						return "<div data-container='#myhistoryContent' data-toggle='tooltip' data-placement='right' >"+Format.lbl_size(Format.btc(row['fee_amount']).toFixed(8))+"</div>";
					}
				}, {
					data: 'order_amount',
					render: function (data, type, row, meta) {
						return "<div data-container='#myhistoryContent' data-toggle='tooltip' data-placement='right' >"+Format.lbl_size(Format.btc(row['filled_amount']).toFixed(8))+"</div>";
					}
				}, {
					data: 'insert_datetime',
					className:'low-color'
				}],
			});
		}else{
			reloadMyOrderHistory();
		}
	}
	var reloadMyOrderHistory = function() {
		myOrderHistoryTable.draw();
	}
	
	var orderTable = null;
	var updateOrder = function () {
		if(orderTable == null){
			orderTable = $('#orderTable').DataTable({
				pageLength: 20,
				drawCallback: function (settings) {
					if (settings['aoData'].length == 0) {
						$("#orderTable_paginate").css("display", "none");
					} else {
						$("#orderTable_paginate").css("display", "block");
					}
					$('#orderTable tr div[data-toggle="tooltip"]').tooltip({
						 title: function() {
							 return "$"+  Format.mul($(this).text().replace(/,/g, '') , Balance['btc_exchange_rate'],2);
						 }
					}); 
				},
				language: {
				    processing: "<div class=\"m-loader m-loader--brand\" style=\"width: 30px;display: block;\"></div>",
				},
				info: false,
				lengthChange: false,
				searching: false,
				ordering: false,
				processing: true,
				serverSide: true,
				ajax: "../exchange/order",
				columns: [{
					render: function (data, type, row, meta) {
						return "<div>"+Format.lbl_size(Format.ezt(row['order_quantity']).toFixed(8))+"</div>";
					}
				}, {
					data: 'total_filled_quantity',
					render: function (data, type, row, meta) {
						return "<div>"+Format.lbl_size(Format.ezt(row['total_filled_quantity']).toFixed(8))+"</div>";
					}
				}, {
					data: 'order_price',
					render: function (data, type, row, meta) {
						return "<div data-container='#orderContent' data-toggle='tooltip' data-placement='right' class='color-"+row['receive_issue']+"'>"+Format.lbl_order(Format.btc(row['order_price']).toFixed(8) ,'pre_number_'+row['receive_issue'] )+"</div>";
					}
				}, {
					data: 'fee_amount',
					render: function (data, type, row, meta) {
						return "<div data-container='#orderContent' data-toggle='tooltip' data-placement='right' >"+Format.lbl_size(Format.btc(row['fee_amount']).toFixed(8))+"</div>";
					}
				}, {
					data: 'insert_datetime',
					className:'low-color'
				}],
			});
		}else{
			reloadOrder();
		}
	}
	
	var reloadOrder = function() {
		orderTable.draw();
	}
	
	var marketOrderHistoryTable = null;
	var updateMarketOrderHistory = function () {
		if(marketOrderHistoryTable == null){
			marketOrderHistoryTable = $('#markethistoryTable').DataTable({
				pageLength: 20,
				drawCallback: function (settings) {
					if (settings['aoData'].length == 0) {
						$("#markethistoryTable_paginate").css("display", "none");
					} else {
						$("#markethistoryTable_paginate").css("display", "block");
					}
					$('#markethistoryTable tr div[data-toggle="tooltip"]').tooltip({
						 title: function() {
							 return "$"+  Format.mul($(this).text().replace(/,/g, '') , Balance['btc_exchange_rate'],2);
						 }
					}); 
				},
				language: {
				    processing: "<div class=\"m-loader m-loader--brand\" style=\"width: 30px;display: block;\"></div>",
				},
				info: false,
				lengthChange: false,
				searching: false,
				ordering: false,
				processing: true,
				serverSide: true,
				ajax: "../exchange/marketorderhistory",
				columns: [{
					render: function (data, type, row, meta) {
						return "<div>"+Format.lbl_size(Format.ezt(row['filled_quantity']).toFixed(8))+"</div>";
					}
				}, {
					data: 'order_price',
					render: function (data, type, row, meta) {
						return "<div data-container='#historyContent' data-toggle='tooltip' data-placement='right' class='color-"+row['receive_issue']+"'>"+Format.lbl_order(Format.ezt(row['filled_price']).toFixed(8) ,'pre_number_'+row['receive_issue'] )+"</div>";
					}
				}, {
					data: 'fee_amount',
					render: function (data, type, row, meta) {
						return "<div data-container='#historyContent' data-toggle='tooltip' data-placement='right' >"+Format.lbl_size(Format.btc(row['fee_amount']).toFixed(8))+"</div>";
					}
				}, {
					data: 'order_amount',
					render: function (data, type, row, meta) {
						return "<div data-container='#historyContent' data-toggle='tooltip' data-placement='right' >"+Format.lbl_size(Format.btc(row['filled_amount']).toFixed(8))+"</div>";
					}
				}, {
					data: 'insert_datetime',
					className:'low-color'
				}],
			});
		}else{
			reloadMarketOrderHistory();
		}
	}
	var reloadMarketOrderHistory = function() {
		marketOrderHistoryTable.draw();
	}
	
	var allMyOrder=null;
	var fillMyBuyOrderSize = function () {
		var myorder = 
		$.getJSON("../exchange/all_myorder", function(myorder) {
			allMyOrder = myorder;
			var buy_order = [];
			var sell_order = [];
			for (var int = 0; int < myorder.length; int++) {
				var data = myorder[int];
				var id = String(Format.btc(data.order_price).toFixed(6)).replace(/\./g, '-').replace(/,/g, '');
				var size = data.remain_quantity.replace(/,/g, "");
				if(data.order_name == 'BUY'){
					if(!buy_order.hasOwnProperty(id)){
						buy_order[id] = size;
					}else {
						buy_order[id] = (new BigNumber(buy_order[id])).plus(new BigNumber(size));
					}
				}else{
					if(!sell_order.hasOwnProperty(id)){
						sell_order[id] = size;
					}else {
						sell_order[id] = (new BigNumber(sell_order[id])).plus(new BigNumber(size));
					}
				}
			}
			$.each($("#orderBuy tbody tr"),function(int){
				$(this).find('td:eq(2)').text('-');
			});
			for (var k in buy_order){
				var selectorId = "#orderBuy tr#"+k.replace(/\./g, '-').replace(/,/g, '') +" td";
				$(selectorId).eq(2).html(Format.lbl_my_size(Format.ezt(buy_order[k]).toFixed(5)));
			}
			$.each($("#orderSell tbody tr"),function(int){
				$(this).find('td:eq(2)').text('-');
			});
			for (var k in sell_order){
				var selectorId = "#orderSell tr#"+k.replace(/\./g, '-').replace(/,/g, '') +" td";
				$(selectorId).eq(2).html(Format.lbl_my_size((Format.ezt(sell_order[k]).toFixed(5))));
			}
		});
	}
	
	var load_market = function(data) {
		var i = setInterval(() => {
			if(Balance['btc_exchange_rate'] != null){
				$('#last_trade_btc').removeClass('color-'+(Number(data[0]) < Number(data[1]))* 1).addClass('color-'+(Number(data[0]) >= Number(data[1]))* 1).html(data[0]+' ($'+Format.mul(data[0] , Balance['btc_exchange_rate'] , 2 ).toFormat()+')' + '<i class="fa '+'color-'+((Number(data[0]) >= Number(data[1]))* 1)+'">');
				$('#last_trade_eth').removeClass('color-'+(Number(data[2]) < Number(data[3]))* 1).addClass('color-'+(Number(data[2]) >= Number(data[3]))* 1).html(data[2]+' ($'+Format.mul(data[2] , Balance['eth_exchange_rate'] , 2 ).toFormat()+')' + '<i class="fa '+'color-'+((Number(data[2]) >= Number(data[3]))* 1)+'">');
				$('#24_volume').removeClass('color-'+(Number(data[4]) < Number(data[5]))* 1).addClass('color-'+(Number(data[4]) >= Number(data[5]))* 1).html("$"+new BigNumber(data[4]).toFormat()  + '<i class="fa '+'color-'+((Number(data[4]) >= Number(data[5]))* 1)+'">');
				$('#ezt_price').removeClass('color-'+(Number(data[6]) < Number(data[7]))* 1).addClass('color-'+(Number(data[6]) >= Number(data[7]))* 1).html('$'+ new BigNumber(data[6]).toFormat()+ '<i class="fa '+'color-'+((Number(data[6]) >= Number(data[7]))* 1)+'">');
				var present =(Number(data[6]) - Number(data[7]))/Number(data[7]) * 100;
				var ezt_price;
				if(present >= 0){
					present = parseInt(present)+"%";
					ezt_price = '+ $'+Format.sub(data[6],data[7],2).toFormat()+' ('+present+')';
				}else{
					present  = parseInt(Math.abs(present))+"%";
					ezt_price = '- $'+new BigNumber(Math.abs(Format.sub(data[6],data[7],2))).toFormat()+' ('+present+')';
				}
				$('#24_ezt').removeClass('color-'+(Number(data[6]) < Number(data[7]))* 1).addClass('color-'+(Number(data[6]) >= Number(data[7]))* 1).html(ezt_price + '<i class="fa '+'color-'+((Number(data[6]) >= Number(data[7]))* 1)+'">');
				clearInterval(i);

			}
		}, 1000);
	}
	
	
	
	return{
		eztBalance: function() {
			$(".balance_btc_output").text(Balance['btc_balance_lbl']);
		},
		btcBalance: function() {
			$(".balance_ezt_output").text(Balance['ezt_balance_lbl'].toFormat());
		},
		chart: function (data) {
			var data_chart = new Array();
			for (var int = 0; int < data.length; int++) {
				data_chart.push({
				    "date":Format.datetime_long(data[int][0]),
				    "close": data[int][1],
				    "open": data[int][2],
				    "low": data[int][3],
				    "high": data[int][4]
				  });
			}
			drawChart(data_chart);
			Loaded.price_chart = true;
		},
		orderBuy: function(orderBuyData) {
			drawOrderBuy(orderBuyData);
		},
		orderSell: function(orderSellData) {
			drawOrderSell(orderSellData);
		},
		tradding: function(traddingData) {
			drawTradding(traddingData);
			Loaded.t_order = true;
		},
		myorder:function(){
			updateMyOrder();
			Loaded.my_order = true;
		},
		reloadMyOrder:function(){
			reloadMyOrder();
			Loaded.my_order = true;
		},
		reloadMyOrderHistory:function(){
			reloadMyOrderHistory();
			Loaded.my_order_history = true;
		},
		myorderhistory:function(){
			updateMyOrderHistory();
			Loaded.my_order_history = true;
		},
		order:function(){
			updateOrder();
		},
		reloadOrder:function(){
			reloadOrder();
		},
		reloadMarketOrderHistory:function(){
			reloadMarketOrderHistory();
		},
		marketorderhistory:function(){
			updateMarketOrderHistory();
		},
		fillMyBuyOrderSize:function(){
			fillMyBuyOrderSize();
		},
		market:function(data){
			load_market(data);
		},
		fillMySize:function(selector , price , amount , price_color , pre_color){
			fillMySize(selector , price , amount , price_color , pre_color);
		} 
	}
}();

var ActionBuyBtc = function () {
	var calculate = function () {
		var total = Format.round8($("#formBuy #amount").val() * $("#formBuy #bid_price").val());
		var fee = Format.mul(Config['tradding_fee'] , total,8);
		$("#formBuy #bid_total").val(Format.plus(total , fee , 8));
		$("#formBuy #bid_total_fee").text(fee.toFormat());
		$("#formBuy #bid_total_fee_usd").text(Format.mul(fee ,Balance['btc_exchange_rate'] , 2 ).toFormat());
		$("#formBuy #bid_total_lbl").text(Format.plus(total , fee , 8).toFormat());
		$("#formBuy #bid_total_usd_lbl").text(Format.mul(Format.plus(total , fee , 8) ,Balance['btc_exchange_rate'] , 2 ).toFormat());
		
	};
	var calculateAmount = function() {
		var amount = Format.divi($("#formBuy #bid_total").val() || 0, $("#formBuy #bid_price").val() || 0 , 0);
		$("#formBuy #amount").val(amount);
	};
	var fillAll = function() {
		$("#formBuy #bid_total").val(Balance['btc_balance_lbl']);
		calculateAmount();
	};
	return {
		 init:function() {
			$("#formBuy #amount").ForceNumericOnly();
			$("#formBuy #bid_total , #formBuy #bid_price, #formBuy #bid_usd").ForceNumericOnly();
			$("#formBuy #btc_fill_all").click(function() {
				fillAll();
			});
			$("#formBuy #amount").on('input',function() {
				calculate();
			});
			$("#formBuy #bid_price").on('input',function() {
				$("#formBuy #bid_usd").removeAttr('disabled').val("$"+(Format.mul($("#formBuy #bid_price").val() || 0 , Balance['btc_exchange_rate'] || 0 , 2).toFormat())).attr('disabled', 'disabled');
				calculate();
			});
			$("#formBuy #bid_usd").on('input',function() {
				var btc_amount = Format.divi($(this).val() || 0, Balance['btc_exchange_rate'] || 0 , 8);
				$("#formBuy #bid_price").val(btc_amount || 0);
				calculate();
			});
			$("#formBuy #bid_total").on('input',function() {
				calculateAmount();
			});
			
			$("#formBuy").on('submit',function(event) {
				event.preventDefault();	
				var $form = $("#formBuy");
				var isValid = true;
				var price = $($form).find("#bid_price").val();
				var amount = $($form).find("#amount").val();
				//Binding.fillMySize("#orderBuy" , new BigNumber(price).toFixed(5)  , new BigNumber(amount).toFixed(8) , "buy-color" , "pre_buy_number");
				var msg = "";
				var numberRegex = /^\d*\.{0,1}\d*$/;
				if(amount == ''){
					msg += 'The amount field is required.  <br/>';
					isValid = false;
				}else if(!numberRegex.test(amount) || new BigNumber(amount) < 0.00000001 ){
					msg += 'The amount not valid.  <br/>';
					isValid = false;
				}
				if(price == ''){
					msg += 'The price field is required.  <br/>';
					isValid = false;
				}else if(!numberRegex.test(price) /*|| new BigNumber(price) < 0.00000001*/){
					msg += 'The price not valid.  <br/>';
					isValid = false;
				}else if(price.getPrecision() > 6){
					msg += 'You can only input 6 decimal numbers.  <br/>';
					isValid = false;
				}
				var minUsd = 10;
				if(isValid &&( (amount * price) * Balance['btc_exchange_rate'] ) <  minUsd){
					msg += 'Total amount must be greater than or equal to $10  <br/>';
					isValid = false;
				}
				var usd_price = price * Balance['btc_exchange_rate'];
				var usd_1_ezt = Number(Balance['ezt_exchange_rate']);
				var _50ps = (usd_1_ezt * Number(Config['price_celling'])) / 100;
				var _20ps = (usd_1_ezt * Number(Config['price_floor'])) / 100;
				if(usd_price > (usd_1_ezt + _50ps)){
					msg += 'Your price must be lower than or equal to price ceiling <br/>';
					// isValid = false;
		    	}
				if(usd_price < (usd_1_ezt - _20ps)){
					msg += 'Your price must be higher than or equal to price floor<br/>';
					// isValid = false;
				}
				
		        if(isValid){  
		        var $form = $( this ),
				    url = $form.attr('action');
		            var posting = $.post(url, $(this).serialize());
		            $($form).find(".m-loader").show();
		            $($form).find(':button[type=submit]').prop('disabled', true);
		            posting.done(function( data,status ) {
		                $($form).find(".m-loader").hide();
		                $($form).find(':button[type=submit]').prop('disabled', false);
		                if(status == 'success'){
		                    //$($form).find(':button[type=reset]').click();
                            swal({
                                text: 'Success!',
                                type: "success",
                            }).then(function (value) {
                                location.reload();
                            });
		                    // ExchangeService.updateBalance(); // 更新钱包帐目
		                    // $('#modal_success').modal();
		                    // Loaded.my_order = false;
		                    // Binding.reloadMyOrder(); // 更新('#myOrderTable')
		                    // setTimeout(() => {
		                    // 	 Worker.fillMysize();
							// }, 5000);
			                $("#formBuy #bid_total_fee").text(0);
			        		$("#formBuy #bid_total_fee_usd").text(0);
			        		$("#formBuy #bid_total_lbl").text(0);
			        		$("#formBuy #bid_total_usd_lbl").text(0);
			        		//Binding.fillMySize("#orderBuy" , new BigNumber(price).toFixed(5)  , new BigNumber(amount).toFixed(8) , "buy-color" , "pre_buy_number");
			        		$($form)[0].reset();
		                }
		            }).fail(function(xhr, status, error) {
		                $($form).find(".m-loader").hide();
		                $($form).find(':button[type=submit]').prop('disabled', false);
		                if(xhr.status == 400){
		                   var html = "";
	                	   try {
	                		   res = JSON.parse(xhr.responseText);
			                	for (var i in res) {
			                		html += res[i] +" </br>";
								}
	                	    } catch (e) {
	                	    	html= xhr.responseText;
	                	    }
		                	$('#modal_errors .m-alert__text').html(html);    
		                }else{
		                	$('#modal_errors .m-alert__text').text('Error! Please reload & try again.');
		                }
		                $('#modal_errors').modal();
		            }); 
		        }else{
		        	 $('#modal_errors').modal();
		             $('#modal_errors .m-alert__text').html(msg);
		        } 
			});
		 },
		 calculate:function(){
			 calculate();
		 }
	 }
}();
var ActionOrder = function () {
	return {	
		init: function() {
			$("#orderTab .m-tabs__link").click(function() {
				var href = 	$(this).attr('href');
				if(href == '#m_tab_myorder_tab'){
					// Binding.myorder();
				}else if(href == '#m_tab_myorderhistory_tab'){
					// Binding.myorderhistory();
				}else if(href == '#m_tab_orderhistory_tab'){
					// Binding.marketorderhistory();
				}else if(href == '#m_tab_order_tab'){
					// Binding.order();
				}
				$(this).tab('show');
			});
			$("#orderBuy").delegate('tbody tr','click' , function() {
				var val =$(this).find('td:eq(1)').text();
				var valAmount =$(this).find('td:eq(0)').text().replace(/,/g, '');
				if(val != ''){
					$('#formSell #amount').val(valAmount);
					$('#formSell #ask_price').select();
					$('#formSell #ask_price').val(val);
					var btc_usd = Format.mul(val || 0, Balance['btc_exchange_rate'] || 0,2);
					$("#formSell #ask_usd").removeAttr('disabled').val("$"+(btc_usd.toFormat() || 0)).attr('disabled', 'disabled');
					ActionSellBtc.calculate();
				}
			});
			
			$("#orderSell").delegate('tbody tr','click' , function() {
				var val =$(this).find('td:eq(1)').text();
				var valAmount =$(this).find('td:eq(0)').text().replace(/,/g, '');
				if(val != ''){
					$('#formBuy #amount').val(valAmount);
					$('#formBuy #bid_price').select();
					$('#formBuy #bid_price').val(val);
					$("#formBuy #bid_usd").removeAttr('disabled').val("$"+(Format.mul($("#formBuy #bid_price").val() || 0 , Balance['btc_exchange_rate'] || 0 , 2).toFormat())).attr('disabled', 'disabled');
					ActionBuyBtc.calculate();
				}
			});
		},
		cancel: function(seft) {
			var row = $(seft).parents('tr');
			$(row).mouseleave(function() {
				  if($(row).hasClass("cancel-row")){
					  $(row).removeClass("cancel-row");
					  if($(row).find('m-loader').length == 0){
						  $(row).find("div.cancel").show();
						  $(row).find("div.cancel-active").hide();
					  }
				  }
			});
			$(row).find("div.cancel").hide();
			$(row).find("div.cancel-active").show();
			$(row).addClass('cancel-row');
		},
		cancel_submit: function(seft,id){
			var td =$(seft).parents('td');
			$(td).css('position' , 'relative');
			$(td).append('<div class="m-loader m-loader--brand" style="width: 30px;display: block;"></div>');
			$(td).find("div.cancel").hide();
			$(td).find("div.cancel-active").hide();
			$.post("../exchange/cancel", {  "_token": token, "id": id }).done(function(data) {
				if(data == 'success'){
					$(td).html('cancelling');
					$(td).find(".m-loader").remove();
					setTimeout(() => {
						Binding.fillMyBuyOrderSize();
					}, 5000);
				}
			}).fail(function(xhr, status, error) {
				$(td).find(".m-loader").hide();
                if(xhr.status == 400){
                   var html = "";
            	   try {
            		   res = $.parseJSON(xhr.responseText);
	                	for (var i in res) {
	                		html += res[i] +" </br>";
						}
            	    } catch (e) {
            	    	html= xhr.responseText;
            	    }
                	$('#modal_errors .m-alert__text').html(html);    
                }else{
                	$('#modal_errors .m-alert__text').text('Error! Please reload & try again.');
                }
                $('#modal_errors').modal();
                Binding.reloadMyOrder();
            });
		}
	}
}();
var ActionSellBtc = function () {
	var calculate = function () {
		var total = Format.mul($("#formSell #amount").val() , $("#formSell #ask_price").val(),8);
		var fee =Format.mul(Config['tradding_fee'] , total,8);
		$("#formSell #ask_total").val(Format.round8(Format.sub(total,fee,8)));
		$("#formSell #ask_total_fee").text(fee.toFormat());
		$("#formSell #ask_total_fee_usd").text(Format.mul(fee ,Balance['btc_exchange_rate'] , 2 ).toFormat());
		$("#formSell #ask_total_lbl").text(Format.sub(total,fee,8).toFormat());
		$("#formSell #ask_total_usd_lbl").text(Format.mul(Format.sub(total,fee,8) ,Balance['btc_exchange_rate'] , 2 ).toFormat());
	};
	var calculateAmount = function () {
		var amount = Format.divi($("#formSell #ask_total").val() , $("#formSell#ask_price").val() , 0) ;
		$("#formSell #amount").val(amount);
	};
	var fillAll = function() {
		$("#formSell #amount").val(Balance['ezt_balance_lbl']);
		calculate();
	};
	return {
		 init:function() {
			$("#formSell #amount").ForceNumericOnly();
			$("#formSell #ask_total , #formSell #ask_price, #formSell #ask_usd").ForceNumericOnly();
			$("#formSell #btc_fill_all").click(function() {
				fillAll();
			});
			$("#formSell #amount").on('input',function() {
				calculate();
			});
			$("#formSell #ask_price").on('input',function() {
				var btc_usd = Format.mul($(this).val() || 0, Balance['btc_exchange_rate'] || 0,2);
				$("#formSell #ask_usd").removeAttr('disabled').val("$"+(btc_usd.toFormat() || 0)).attr('disabled', 'disabled');
				calculate();
			});
			$("#formSell #ask_usd").on('input',function() {
				var btc_amount = Format.divi($(this).val() || 0, Balance['btc_exchange_rate'] || 0 , 8);
				$("#formSell #ask_price").val(btc_amount || 0);
				calculate();
			});
			$("#formSell #ask_total").on('input',function() {
				calculateAmount();
			});
			$("#formSell").on('submit',function(event) {
				event.preventDefault();	
				var $form = $("#formSell");
				var isValid = true;
				var price = $($form).find("#ask_price").val();
				var amount = $($form).find("#amount").val();
				var msg = "";
				var numberRegex = /^\d*\.{0,1}\d*$/;
				if(amount == ''){
					msg += 'The amount field is required.  <br/>';
					isValid = false;
				}else if(!numberRegex.test(amount)|| new BigNumber(amount) < 0.00000001  ){
					msg += 'The amount not valid.  <br/>';
					isValid = false;
				}
				if(price == ''){
					msg += 'The price field is required.  <br/>';
					isValid = false;
				}else if(!numberRegex.test(price) /*|| new BigNumber(price) < 0.00000001 */){
					msg += 'The price not valid.  <br/>';
					isValid = false;
				}else if(price.getPrecision() > 6){
					msg += 'You can only input 6 decimal numbers.  <br/>';
					isValid = false;
				}
				var minUsd = 10;
				if(isValid &&( (amount * price) * Balance['btc_exchange_rate'] ) <  minUsd){
					msg += 'Total amount must be greater than or equal to $10  <br/>';
					isValid = false;
				}
				var usd_price =price * Balance['btc_exchange_rate'];
				var usd_1_ezt = Number(Balance['ezt_exchange_rate']);
				var _50ps = (usd_1_ezt * Number(Config['price_celling'])) / 100;
				var _20ps = (usd_1_ezt * Number(Config['price_floor'])) / 100;
				if(usd_price > (usd_1_ezt + _50ps)){
					msg += 'Your price must be lower than or equal to price ceiling <br/>';
					// isValid = false;
		    	}
				if(usd_price < (usd_1_ezt - _20ps)){
					msg += 'Your price must be higher than or equal to price floor<br/>';
					// isValid = false;
				}
				
		        if(isValid){  
		            var $form = $( this ),
				    url = $form.attr('action');
		            var posting = $.post(url, $(this).serialize());
		            $($form).find(".m-loader").show();
		            $($form).find(':button[type=submit]').prop('disabled', true);
		            posting.done(function( data,status ) {
		                $($form).find(".m-loader").hide();
		                $($form).find(':button[type=submit]').prop('disabled', false);
		                if(status == 'success'){
                            swal({
                                text: 'Success!',
                                type: "success",
                            }).then(function (value) {
                                location.reload();
                            });
		                    $($form).find(':button[type=reset]').click();
		                    // ExchangeService.updateBalance();
		                    // $('#modal_success').modal();
			                // $("#formSell #ask_total_fee").text(0);
			        		// $("#formSell #ask_total_fee_usd").text(0);
			        		// $("#formSell #ask_total_lbl").text(0);
			        		// $("#formSell #ask_total_usd_lbl").text(0);
                            // Loaded.my_order = false;
                            // Binding.reloadMyOrder();
                            //     setTimeout(() => {
                            //     Worker.fillMysize();
                            // }, 5000);
                            //Binding.reloadMyOrder();
                            //Binding.fillMySize("#orderSell" , new BigNumber(price).toFixed(5)  , new BigNumber(amount).toFixed(8) , "sell-color" , "pre_sell_number");
                            $($form)[0].reset();
		                }
		            }).fail(function(xhr, status, error) {
		            	$($form).find(".m-loader").hide();
		                $($form).find(':button[type=submit]').prop('disabled', false);
		                if(xhr.status == 400){
		                   var html = "";
	                	   try {
	                		   res = $.parseJSON(xhr.responseText);
			                	for (var i in res) {
			                		html += res[i] +" </br>";
								}
	                	    } catch (e) {
	                	    	html= xhr.responseText;
	                	    }
		                	$('#modal_errors .m-alert__text').html(html);    
		                }else{
		                	$('#modal_errors .m-alert__text').text('Error! Please reload & try again.');
		                }
		                $('#modal_errors').modal();
		            }); 
		        }else{
		        	 $('#modal_errors').modal();
		             $('#modal_errors .m-alert__text').html(msg);
		        } 
			});
		 },
        calculate:function(){
        	calculate();
        }
	 }
}();

var Effect = function() {
	return {
		loading: function (seft) {
			$(seft).find(".m-loader").show();
		},
		loaded: function (seft) {
			$(seft).find(".m-loader").hide();
		},
		changeColor: function(seft , effect_color) {
	         $(seft).find('span').eq(0).animate({
	            color: effect_color
	          }, 500 );
	         $(seft).find('span').eq(1).animate({
		            color: effect_color
		          }, 500 );
	         $(seft).find('span').eq(2).animate({
		            color: effect_color
		          }, 500 );
	         setTimeout(() => {
	        	 $(seft).find('span').eq(0).animate({
	 	            color: '#a6a9bc'
	 	          }, 500 );
	 	         $(seft).find('span').eq(1).animate({
	 		            color: '#c9ccdc'
	 		          }, 500 );
	 	         $(seft).find('span').eq(2).animate({
	 		            color: '#6e728a'
	 		          }, 500 );
				}, 500);
		}
	}
}();

var Worker = function () {
	var short_time = 2000;
	var normal_time = 5000;
	var long_time = 10000;
	var balanceWorker = function() {
		setInterval(() => {
			ExchangeService.updateBalance();
		}, normal_time);
	};
	var sellOrderWorker = function() {
		Effect.loading("#sellOrderBook"); 
		setInterval(() => {
			SQSService.updateOrderSell();
		}, normal_time);
	};
	var buyOrderWorker = function() {
		setInterval(() => {
			SQSService.updateOrderBuy();
		}, short_time);
	};
	var traddingOrderWorker = function() {
		setInterval(() => {
			SQSService.updateTraddingOrder();
		}, short_time);
	};
	var chartWorker = function() {
		var interval = setInterval(() => {
			SQSService.updateChartData();
		}, short_time);
	};
	var statusWorker = function() {
		var interval = setInterval(() => {
			SQSService.updateMarketInfo();
		}, short_time);
	};
	var fillMysizeWorker = function() {
		var interval = setInterval(() => {
			if(Loaded.b_order == true && Loaded.s_order == true ){
				Binding.fillMyBuyOrderSize();
				clearInterval(interval);
			}
		}, short_time);
	};
	return {
		run: function() {
			balanceWorker();
			fillMysizeWorker();
		},
		runSQS: function() {
			sellOrderWorker();
			buyOrderWorker();
			traddingOrderWorker();
			chartWorker();
			statusWorker();
		},
		fillMysize: function() {
			fillMysizeWorker();
		}
	};
}();

var SocketService = function() {
	var socket;
    return {
        init: function() {
        	this.socket = io(Config['socket_url']);
        },
        listen:function(chanel) {
        	this.socket.on(chanel, function(msg){
        		Effect.loaded("#chartOrder");
        		Effect.loaded("#marketStatusQueue");
        		if(msg != ''){
        			socketData = JSON.parse(msg);
        			data = socketData.data;
        			if(socketData.key == Config['order_s_pending']){
        				Binding.orderSell(data);
        				Loaded.s_order = true;
        				Effect.loaded("#sellOrderBook");
        			}else if(socketData.key == Config['order_b_pending']){
        				Binding.orderBuy(data);
        				Loaded.b_order = true;
		        		Effect.loaded("#buyOrderBook");
        			}else if(socketData.key == Config['market_status']){
        				if(data.length > 0){
        					Binding.market(data);
        				}
        			}else if(socketData.key == Config['market_data']){
        				if(data.length > 0){
        					Binding.chart(data);
        				}
        			}else if(socketData.key == Config['tradding']){
        				Binding.tradding(data);
		        		Effect.loaded("#traddingOrder");
        			}
        		}
        	});
        }
    };
}();

var SQSService = function () {
	var sqs;
	return {
        init:function() {
        	 sqs = new AWS.SQS({
        		    apiVersion: 'latest',
        		    accessKeyId: Config['key'],
        		    secretAccessKey: Config['scret'],
        		    region:'us-east-1',
        		    httpOptions: {
        		        xhrAsync: true
        		    }});
        }, 
        updateOrderSell:function(callback) {
			var queueReceiveParameter = {
     	 	        MaxNumberOfMessages: 10,
     	 	        MessageAttributeNames: ['All'],
     	 	        QueueUrl: Config['queue_url'] + Config['order_s_pending']
     	 	};
			sqs.receiveMessage(queueReceiveParameter, function(err, data) {
				if (err) {
		             console.log(err, err.stack);
		         } else {
		        	 Loaded.s_order = true;
        			 Effect.loaded("#sellOrderBook");
		        	 if(data['Messages'].length > 0){
		        		 var orderSellData = JSON.parse(data['Messages'][0].Body);
		        		 Binding.orderSell(orderSellData);
		        	 }
		         }
			 });
        },
        updateOrderBuy:function(callback) {
			var queueReceiveParameter = {
     	 	        MaxNumberOfMessages: 10,
     	 	        MessageAttributeNames: ['All'],
     	 	        QueueUrl:Config['queue_url'] + Config['order_b_pending']
     	 	};
			sqs.receiveMessage(queueReceiveParameter, function(err, data) {
				if (err) {
		             console.log(err, err.stack);
		         } else {
		        	 if(data['Messages'].length > 0){
		        		 Effect.loaded("#buyOrderBook");
		        		 var orderBuyData = JSON.parse(data['Messages'][0].Body);
		        		 Binding.orderBuy(orderBuyData);
		        	 }
		         }
			 });
        },
        updateMarketInfo:function(callback) {
			var queueReceiveParameter = {
     	 	        MaxNumberOfMessages: 10,
     	 	        MessageAttributeNames: ['All'],
     	 	        QueueUrl:Config['queue_url'] + Config['market_status']
     	 	};
			sqs.receiveMessage(queueReceiveParameter, function(err, data) {
				if (err) {
		             console.log(err, err.stack);
		         } else {
		        	 if(data['Messages'].length > 0){
		        		 Effect.loaded("#m_header_nav");
		        		 var marketData = JSON.parse(data['Messages'][0].Body);
		        		 Binding.market(marketData);
		        	 }
		         }
			 });
        },
        updateTraddingOrder:function(callback) {
			var queueReceiveParameter = {
     	 	        MaxNumberOfMessages: 10,
     	 	        MessageAttributeNames: ['All'],
     	 	        QueueUrl: Config['queue_url'] + Config['tradding']
     	 	};
			sqs.receiveMessage(queueReceiveParameter, function(err, data) {
				if (err) {
		             console.log(err, err.stack);
		         } else {
		        	 if(data['Messages'].length > 0){
		        		 Effect.loaded("#traddingOrder");
		        		 var orderTraddingData = JSON.parse(data['Messages'][0].Body);
		        		 Binding.tradding(orderTraddingData);
		        	 }
		        	 
		         }
			 });
        },
        updateChartData:function(callback){
        	var queueReceiveParameter = {
     	 	        MaxNumberOfMessages: 10,
     	 	        MessageAttributeNames: ['All'],
     	 	        QueueUrl:Config['queue_url'] +Config['market_data']
     	 	};
			sqs.receiveMessage(queueReceiveParameter, function(err, data) {
				if (err) {
		             console.log(err, err.stack);
		         } else {
		        	 if(data['Messages'].length > 0){
		        		 Effect.loaded("#chartOrder");
		        		 var chartData = JSON.parse(data['Messages'][0].Body);
		        		 Binding.chart(chartData);
		        	 }
		         }
			 });
        }
    };
} ();

var Layout = function(){
	var resize = function() {
		if($(window).width() < 576){
			$('.m-tabs-line a.m-tabs__link').css('font-size' , '12px');
			$('.m-tabs-line .m-tabs__item').css('margin-right' , '5px');
			$('.mCSB_inside .mCSB_container').css('margin-right' , '0px');
			$('#dropdownLogout').css('left' , 'auto').css('right' , '0px');
			$('#dropdownLogout .m-dropdown__arrow').css('display','none');
			$('#dropdownMenu').css('width' , '130px');
			$('#logoMenu').css('width' , '165px');
			$('#logoMenu .m-stack__item').css('padding' , '0px 0px 0px 2px');
			$('#logoMenu #logoLink').css('padding-left' , '5px').css('padding-right' , '5px');
			if($("#marketHistoryOrder a").hasClass('active')){
				$('#myOpenOrder a').tab('show');
			}
			$('#marketOrder a').text('MARKET ORDERS');
			$("#marketHistoryOrder").css('display','none');
		}else if($(window).width() >= 576){
			$('#marketOrder a').text('MARKET OPEN ORDERS');
			$("#marketHistoryOrder").css('display','block');
			$('.m-tabs-line a.m-tabs__link').css('font-size' , '14px');
			$('.mCSB_inside .mCSB_container').removeAttr("style");
			$('#dropdownLogout').removeAttr('style');
			$('#dropdownMenu').css('width' , '250px');
			$('#logoMenu').css('width' , '200px');
			$('#logoMenu .m-stack__item').css('padding' , '0px 0px 0px 10px');
			$('#logoMenu #logoLink').css('padding-left' , '16.5px').css('padding-right' , '16.5px');
			$('#dropdownLogout .m-dropdown__arrow').removeAttr('style');
		}
	};
	return {
		init: function(){
			resize();
			$(window).resize(function() {
				resize();
			});
		}
	}
}();
	
$(document).ready(function () {
	Layout.init();
	Loaded.init();
	ActionOrder.init();
	// Binding.myorder();
	// Binding.eztBalance();
	// Binding.btcBalance();
	ActionBuyBtc.init();
	ActionSellBtc.init();
	// Worker.run(); // 更新钱包帐目相关，循环请求刷新数据
	if(Cache['chartData'] != null){
		setTimeout(() => {
			Binding.chart(Cache['chartData'].data);
		}, 0);
		
	}
	if(Cache['statusData'] != null){
		setTimeout(() => {
			Binding.market(Cache['statusData'].data);  // 初始化logo右边的数据("header#marketStatusQueue table")
		}, 0);
	}
	if(Cache['sellData'] != null){
		setTimeout(() => {
			Effect.loaded("#sellOrderBook"); 
			Binding.orderSell(Cache['sellData'].data); // 初始化左上的数据("#sellOrderBook")
		}, 0);
	}
	if(Cache['buyData'] != null){
		setTimeout(() => {
			Effect.loaded("#buyOrderBook");
			Binding.orderBuy(Cache['buyData'].data); // 初始化左下的数据("#buyOrderBook")
		}, 0);
	}
	if(Cache['traddingData'] != null){
		setTimeout(() => {
			Effect.loaded("#traddingOrder");
			Binding.tradding(Cache['traddingData'].data); // 初始化右边的数据("#traddingOrder")
		}, 0);
	}
    // 以下部分为使用Socket方式从服务器更新数据
	// if(Config['platform'].indexOf('REDIS') == -1){
	// 	Effect.loading("#chartOrder");
	// 	Effect.loading("#marketStatusQueue");
	// 	SQSService.init();
	// 	Worker.runSQS();
	// }else{
	// 	SocketService.init();
	// 	SocketService.listen(Config['socket_listen_exchange']);
	// }
});
