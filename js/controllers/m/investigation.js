materialAdmin
 
.controller('investigationCtrl',function( $state, $scope, ngTableParams, tableService
		,$filter, $sce,FrameworkService){		

    $scope.UserData = JSON.parse(localStorage.getItem("UserData")) 
	$scope.investigationList = [];

	$scope.pageScope = "list";
	
	
	getAppointmentList($scope,FrameworkService);
	
//	/app.investigationDetails
	
	$scope.rowClick = function(obj,t){ 
		var asd = {				 
				 prevState : 'app.investigation',
				 regSource: 'Details',
				 HospitalID: obj.HospitalID,
				 DoctorID: obj.DoctorID,
				 MobileNumber: obj.MobileNumber,
				 Type:t,
				 TestID:obj.TestID,
				 AppointmentID:obj.AppointmentID,
				 date:obj.date
			}
	  var data = {
				 params : FrameworkService.getEncryptedString(asd)
		 }	
	  
		$state.go('app.investigationDetails',  data); 
	}
		
	function getAppointmentList($scope,FrameworkService){
	 	FrameworkService.getGenericGetCall('getAppointmentList.php?HospitalID=' 
	 			+ $scope.UserData[0].HospitalID 
	 			+ '&DoctorID=' + $scope.UserData[0].UserID
	 			+ '&pr=L002'
	 			, function(response){
	 	  			$scope.investigationList = response.data; 

	 	  			console.info($scope.investigationList);
	 	  			 
	 	  		 
	 	  			
	 			}
	 	        ,function(error){
	 	        	console.log(error);
	 	});
	 }
	
	
	$scope.newAssetParam = {
			TestType:"",
			TestName:"",
			TestParams:[],
			price:0,
			isActive:1
	}
	 
	$scope.ReadingList = [];
	$scope.AddReading = function (){ 
		if($('#reading').val().length <= 2) {
			alert("Please enter details (Atleast 2 character long.)");
			return;
		}
		
		var obj = {
				key:$('#reading').val(),
				value:0,
				isActive:true
		}
		
		$scope.newAssetParam.TestParams.push(obj);
		$('#reading').val('');
	}
	
	
	$scope.btnAddNew = function(){
		$scope.pageScope='new';
	}
	
	$scope.btnAddNew_call = function(){
		 
		
		$scope.newAssetParam.TestParams = JSON.stringify( $scope.newAssetParam.TestParams, function( key, value ) {
		    if( key === "$$hashKey" ) {
		        return undefined;
		    }

		    return value;
		});
		
		$scope.newAssetParam.TestParams = $scope.newAssetParam.TestParams.replace(/"/g, '\'');
		//$scope.newAssetParam.TestParams = JSON.stringify($scope.newAssetParam.TestParams);
		$scope.newAssetParam.HospitalID =  $scope.UserData[0].HospitalID;
		$scope.newAssetParam.DoctorID =  $scope.UserData[0].UserID;
		
		console.info($scope.newAssetParam);
		
	 	FrameworkService.getGenericPostCall('investigationMasterRegister.php', $scope.newAssetParam
				, function(response){
			 		$scope.newAssetParam = {
			 				TestType:"",
			 				TestName:"",
			 				TestParams:[],
			 				price:0,
			 				isActive:1
			 		}
					console.log(response);
				 					
					
				}
		        ,function(error){
		        	console.log(error);
		        	 
		});	
		
		
	}
	
	$scope.btnAddNew_cancel = function(){
		$scope.pageScope='list';
	}
	
	
		
})

.controller('investigationDetailsCtrl',function( $stateParams,$state, $scope, ngTableParams, tableService
		,$filter, $sce,FrameworkService){		

	if($stateParams && $stateParams.params){
		
		/*var data = LZString.decompressFromBase64($stateParams.params);
		 $scope.PageData = JSON.parse(data);
		 
		 console.info($scope.PageData); */
		 //debugger;
		  var data =  LZString.decompressFromBase64($stateParams.params);
			 $scope.PageData = {}; 
			 if(data){
			     localStorage.setItem("InvestigationDetails",data); 
			     $scope.PageData = JSON.parse(data);
			 }
			 else{
			     $scope.PageData = JSON.parse(localStorage.getItem("InvestigationDetails"));
			 }
		 
		 
		 console.info($scope.PageData);
		 
		 FrameworkService.getGenericGetCall('getPatientDetails.php?HospitalID=' 
				 +  $scope.PageData.HospitalID
				 +  "&DoctorID=" + $scope.PageData.DoctorID
				 +  "&MobileNumber=" + $scope.PageData.MobileNumber
					, function(response){
    					console.log(response); 
    					$scope.getParams = response.data[0];  
					}
			    ,function(error){
				console.log(error);
			}); 
		 
		 $scope.InvestigationDetails = {};
		 /*FrameworkService.getGenericGetCall('getPatientInvestigationDetails.php?HospitalID=' 
				 +  $scope.PageData.HospitalID
				 +  "&DoctorID=" + $scope.PageData.DoctorID
				 +  "&MobileNumber=" + $scope.PageData.MobileNumber
				 + "&Type=" + $scope.PageData.Type */
		 
		 
		 FrameworkService.getGenericGetCall('getPatientInvestigationDetails.php?TestID='
				 +$scope.PageData.TestID
				 + "&Type=" + $scope.PageData.Type
				 + "&HospitalID=" +$scope.PageData.HospitalID
				 +  "&DoctorID=" + $scope.PageData.DoctorID
				 +  "&MobileNumber=" + $scope.PageData.MobileNumber
				  
					, function(response){
					   
					  console.info(response);
					//
    					$scope.InvestigationDetails = response.data[0]; 
 
    					/*var jsn =  $scope.InvestigationDetails.readingDetails;
    					jsn = jsn.replace(/'/g, '\"');
    					jsn = jsn.replace('\"[', '[');
    					jsn = jsn.replace(']\"', ']');
    					
    					var frmt_json = JSON.parse(jsn);*/
    					
    					var frmt_json = parseJSON($scope.InvestigationDetails.readingDetails); 
    					$scope.InvestigationDetails.readingDetails = frmt_json;
    					console.log($scope.InvestigationDetails); 
					}
			    ,function(error){
				console.log(error);
			}); 
		 
		 function parseJSON(rawData){
			  	var _rawData = rawData;
			  	_rawData = _rawData.replace(/'/g, '\"');
			  	_rawData = _rawData.replace('\"[', '[');
			  	_rawData = _rawData.replace(']\"', ']');
			 return JSON.parse(_rawData);
		 }
		 
		 
	}
	
	
	$scope.btnSave = function(){
		
		
		$scope.InvestigationDetails.op= 'UPDATE';
		$scope.InvestigationDetails.isTestDone= 1;
		var reading =  $scope.InvestigationDetails.readingDetails;
		
		reading = JSON.stringify(reading, function( key, value ) {
		    if( key === "$$hashKey" ) {
		        return undefined;
		    }
		    return value;
		});
		
		
		$scope.InvestigationDetails.TestDetails =  reading.replace(/"/g, '\'');
		$scope.InvestigationDetails.AppointmentID = $scope.PageData.AppointmentID;
		
		console.info($scope.InvestigationDetails);
		console.info($scope.InvestigationDetails.readingDetails);
		
		FrameworkService.getGenericPostCall('InvestigationRegister.php', $scope.InvestigationDetails
				, function(response){
			 	 
					console.log(response);
					// Change patient status iff all tests are done...
					
					var AllowedToChangeStatus = response.includes("Pending");
					
					if(AllowedToChangeStatus){
						alert("One or more test pending for this patient...");
					}
					else{
						alert("Investigation Done... All test are done for this patient.");
						$state.go('app.investigation');
					}
				  
				}
		        ,function(error){
		        	console.log(error);
		        	 
		});	
		
	}
	
	
	$scope.btnBack = function(){
		

	//	console.info($scope.PageData); getPatientInvestigationDetails.php
		 if($scope.PageData && $scope.PageData.prevState){
			 //console.log($scope.PageData.prevState);
			 $state.go($scope.PageData.prevState);
		 }
		 else{
			 $state.go('app.investigation');
		 }
	 }
	 
})





function getLabTestList(){
	return [{
		"TestName": "HAMENOGRAM AND ESR",
		"readings": []
	}, {
		"TestName": "COAGULATION PROFILE",
		"readings": []
	}, {
		"TestName": "RENAL FUNCTION TEST",
		"readings": []
	}, {
		"TestName": "SPL KIDNEY TEST",
		"readings": []
	}, {
		"TestName": "LIVER FUNCTION TEST",
		"readings": []
	}, {
		"TestName": "PANCREATIC FUNCTION TEST",
		"readings": []
	}, {
		"TestName": "MICROBIOLOGY",
		"readings": []
	}, {
		"TestName": "LIPID PROFILE",
		"readings": []
	}, {
		"TestName": "THYROID PROFILE",
		"readings": []
	}, {
		"TestName": "SPECIAL TESTS",
		"readings": []
	}, {
		"TestName": "OTHER TESTS",
		"readings": []
	}, {
		"TestName": "CRP TURBILATEX TEST",
		"readings": []
	}, {
		"TestName": "RA TURBILATEX TEST",
		"readings": []
	}, {
		"TestName": "HIV",
		"readings": []
	}, {
		"TestName": "URINE ANALYSIS ",
		"readings": []
	}, {
		"TestName": "DIABETIC PACKAGE",
		"readings": []
	}, {
		"TestName": "DIABETIC PACKAGE",
		"readings": []
	}, {
		"TestName": "HbA1c",
		"readings": []
	}, {
		"TestName": "91 LFT LIVER FUNCTION TEST",
		"readings": []
	}, {
		"TestName": "TROPONIN 1",
		"readings": []
	}, {
		"TestName": "HBsAg( HEPATITIS B)",
		"readings": []
	}, {
		"TestName": "ASO TURBILATEX",
		"readings": []
	}, {
		"TestName": "ADENOSINE DEAMINASE TEST",
		"readings": []
	}, {
		"TestName": "CARDIO 2",
		"readings": []
	}, {
		"TestName": "BRUCELLA AGGLUTINATION",
		"readings": []
	}, {
		"TestName": "CKBM",
		"readings": []
	}, {
		"TestName": "BLOOD WIDAL SLIDE TEST",
		"readings": []
	}, {
		"TestName": "TYPHOID",
		"readings": []
	}, {
		"TestName": "VDRL",
		"readings": []
	}];
	
	
	
	
}