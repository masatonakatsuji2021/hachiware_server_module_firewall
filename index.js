/**
 * ====================================================================
 * Hachiware_Server_module_firewall
 * 
 * Firewall module for web server package "hachiware_server".
 * 
 * Author : Nakatsuji Masato 
 * ====================================================================
 */

module.exports = function(conf){
    
    /**
     * fookRequest
     * @param {*} resolve 
     * @param {*} req 
     * @param {*} res 
     */
    this.fookRequest = function(resolve, req , res){

		if(!conf.firewalls){
			return resolve();
		}
	
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	
		var juge = true;
	
		if(conf.firewalls.mode == "accpet"){
			var juge = false;
	
			if(conf.firewalls.address){
				var address = conf.firewalls.address;
	
				if(typeof address == "string"){
					address = [address];
				}
	
				for(var n = 0 ; n < address.length ; n++){
					var tip = address[n];
					if(ip == tip){
						juge = true;
						break;
					}
				}
			}
		}
		else if(conf.firewalls.mode == "block"){
			var juge = true;
	
			if(conf.firewalls.address){
				var address = conf.firewalls.address;
	
				if(typeof address == "string"){
					address = [address];
				}
	
				for(var n = 0 ; n < address.length ; n++){
					var tip = address[n];
					if(ip == tip){
						juge = false;
						break;
					}
				}
			}
		}
	
		if(!juge){
			res.statusCode = 404;
			res.end();
			return;
		}
	
		resolve();
    };

};