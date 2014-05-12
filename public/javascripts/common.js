function Utility(){
	this.appName = 'Test Application';	
}

Utility.prototype.moveToUsers = function(){
	location.href = location.protocol + '//' + location.host + '/users';	
}

var common = new Utility();