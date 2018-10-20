
materialAdmin

.controller('lovCtrl',function( $state, $scope, ngTableParams, tableService,$filter
		, $sce,FrameworkService){
 
	$scope.UserData = JSON.parse(localStorage.getItem("UserData"))[0];		

	$scope.lov= {
		"LOVType" :"",	
		"val":"",
		"isActive":true,
		"DoctorID" : ""
	}
	$scope.lovList = [];	
	$scope.PageMode = "list";

	$scope.btnAddNew = function(){ 
		$scope.PageMode = "new"; 
	}

	$scope.btnCancel = function(){
		$scope.PageMode = "list";

	}
	
	getList();
	
	$scope.btnCreate = function(){ 
		
		$scope.lov.HospitalID = $scope.UserData.HospitalID;
		$scope.lov.op = "INSERT"; 
		
		FrameworkService.getGenericPostCall('lov.php', $scope.lov
				, function(response){
					console.log(response);
					if(parseInt(response) === 1){
						getList();
						$scope.PageMode = "list";
					}
					else{
						alert("Falied to change ! ! ! ");
					}					
					
				}
		        ,function(error){
		        	console.log(error); 
		});	
		
	}
	
	$scope.btnUpdate = function(){ 
		
		$scope.lov.HospitalID = $scope.UserData.HospitalID;
		$scope.lov.op = "UPDATE"; 
		
		FrameworkService.getGenericPostCall('lov.php', $scope.lov
				, function(response){
					console.log(response);
					if(response === "1"){
						getList();
						$scope.PageMode = "list";
					}
					else{
						alert("Falied to change ! ! ! ");
					}					
					
				}
		        ,function(error){
		        	console.log(error);
		        	 
		});	
		
	}
	

	$scope.DoctorList = [];
	 FrameworkService.getGenericGetCall('LOV_GetDoctorList.php?HospitalID=' 
	    		+ $scope.UserData.HospitalID
				, function(response){
			console.log(response);
			var data = response.data;
			$scope.DoctorList = data;  
		}
		,function(error){
			console.log(error);
	});
	 
	 
	 function getList(){
	 
		 FrameworkService.getGenericGetCall('lov.php?HospitalID=' 
		    		+ $scope.UserData.HospitalID + "&DoctorID=" + $scope.UserData.UserID
		    		
					, function(response){
				console.log(response);
				var data = response.data;
				$scope.lovList = data;  
			}
			,function(error){
				console.log(error);
		});
	 }



})

