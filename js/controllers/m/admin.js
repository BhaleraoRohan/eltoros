materialAdmin

.controller('hospitalCtrl',function( $state, $scope,FrameworkService,$rootScope){

	$scope.HositalData = {};

	$scope.data = JSON.parse(localStorage.getItem("UserData")); 
	FrameworkService.getGenericGetCall('get_HospitalDetails.php?HospitalID=' 
			+ $scope.data[0].HospitalID
			, function(response){ 
				$scope.HositalData = response.data[0];
				//	 console.info($scope.HositalData); 

			}
			,function(error){
				console.log(error);
			});	

})


.controller('subscriptionCtrl',function( $state, $scope,FrameworkService,$rootScope){

	$scope.SubscriptionData = {};

	$scope.data = JSON.parse(localStorage.getItem("UserData")); 
	FrameworkService.getGenericGetCall('get_SubscriptionDetails.php?HospitalID=' 
			+ $scope.data[0].HospitalID
			, function(response){ 
				$scope.SubscriptionData = response.data[0];

				var TotalSMS = parseInt($scope.SubscriptionData.TotalSMS);
				var AvailableSMS = parseInt($scope.SubscriptionData.AvailableSMS);

				$scope.SubscriptionData.SMSPerc = (AvailableSMS/TotalSMS) * 100;

				console.info($scope.SubscriptionData); 



			}
			,function(error){
				console.log(error);
			});	

})



.controller('userDetailsCtrl',function( $state, $stateParams, $scope, ngTableParams, tableService,FrameworkService){
	$scope.params = { 
			name :"",
			Contact_1 :"",
			Contact_2 :"",
			Specialization :"",
			MessengerName :"",
			WeeklyOff :"",
			PatientTreatRate :"",
			isActive :"",
			CunsultationStartTime :"0",
			CunsultationEndTime :"0",
			ConsultationFees :"" ,

			isSunday : false,
			isMonday : false,
			isTuesday : false,
			isWednesday : false,
			isThursday : false,
			isFriday : false,
			isSaturday : false,
			AllowedMorningShift : false ,
			AllowedNoonShift : false ,
			AllowedEvenigShift :  false,
			RoleName : "",
			isActive : false,
			UserType : "2"
	}
	//console.info($stateParams);	
	$scope.UserData = JSON.parse(localStorage.getItem("UserData"));

	$scope.PageMode = "New";
	if($stateParams && $stateParams.params){			
		$scope.PageMode = "Update";			
		$scope.PageData = FrameworkService.getDecryptedString($stateParams.params);
		console.info($scope.PageData);
		//console.log(FrameworkService.getDecryptedString($scope.PageData));

		$scope.params.UserType = $scope.PageData.RoleID;

		if($scope.PageData.SpecificID){

			var passparams = {
					HospitalID : $scope.UserData[0].HospitalID,
					DoctorID : $scope.PageData.SpecificID,
					RoleID : $scope.params.UserType
			}

			//console.info(passparams);

			FrameworkService.getGenericGetCall('get_DoctorDetails.php?HospitalID=' 
					+ $scope.UserData[0].HospitalID + '&UserID=' 
					+ $scope.PageData.SpecificID + '&RoleID=' + $scope.params.UserType
					, function(response){ 
						console.info(response);
						$scope.params = response.data[0]; 

						$scope.params.isSunday_O = retYN($scope.params.isSunday);
						$scope.params.isMonday_O = retYN($scope.params.isMonday);
						$scope.params.isTuesday_O= retYN($scope.params.isTuesday);
						$scope.params.isWednesday_O = retYN($scope.params.isWednesday);
						$scope.params.isThursday_O = retYN($scope.params.isThursday);
						$scope.params.isFriday_O = retYN($scope.params.isFriday);
						$scope.params.isSaturday_O = retYN($scope.params.isSaturday);
						$scope.params.AllowedMorningShift_O = retYN($scope.params.AllowedMorningShift);
						$scope.params.AllowedNoonShift_O = retYN($scope.params.AllowedNoonShift);
						$scope.params.AllowedEvenigShift_O = retYN($scope.params.AllowedEvenigShift);

						if($scope.params.isActive === "1" ){
							$scope.params.isActive = true;
						}
						else{
							$scope.params.isActive = false;
						}

					}
					,function(error){
						console.log(error);
					});		
		}
		else{
			$scope.PageMode = "New";
		}
	}



	$scope.selected = undefined;
	$scope.SpecializationList=['AllergistorImmunologist',
	                           'Anesthesiologist',
	                           'Cardiologist',
	                           'Dermatologist',
	                           'Gastroenterologist',
	                           'Hematologist/Oncologist',
	                           'InternalMedicinePhysician',
	                           'Nephrologist',
	                           'Neurologist',
	                           'Neurosurgeon',
	                           'Obstetrician',
	                           'Gynecologist',
	                           'Nurse-Midwifery',
	                           'OccupationalMedicinePhysician',
	                           'Ophthalmologist',
	                           'OralandMaxillofacialSurgeon',
	                           'OrthopaedicSurgeon',
	                           'Otolaryngologist',
	                           'Pathologist',
	                           'Pediatrician',
	                           'PlasticSurgeon',
	                           'Podiatrist',
	                           'Psychiatrist',
	                           'PulmonaryMedicinePhysician',
	                           'RadiationOnconlogist',
	                           'DiagnosticRadiologist',
	                           'Rheumatologist',
	                           'Urologist']; 


	function retBool(bool){			 
		if(bool){
			return 'Y';
		}
		else {
			return 'N';
		}
	}

	function retYN(str){			 
		if(str === "Y"){
			return true;
		}
		else {
			return false;
		}
	}

	$scope.btnCRUD = function(op){

		$scope.params.op = op;

		if(op !== "INSERT"){
			$scope.params.UserID = $scope.PageData.SpecificID;
		}

		$scope.params.HospitalID = $scope.UserData[0].HospitalID;
		$scope.params.isSunday = retBool($scope.params.isSunday_O);
		$scope.params.isMonday = retBool($scope.params.isMonday_O);
		$scope.params.isTuesday = retBool($scope.params.isTuesday_O);
		$scope.params.isWednesday = retBool($scope.params.isWednesday_O);
		$scope.params.isThursday = retBool($scope.params.isThursday_O);
		$scope.params.isFriday = retBool($scope.params.isFriday_O);
		$scope.params.isSaturday = retBool($scope.params.isSaturday_O);
		$scope.params.AllowedMorningShift = retBool($scope.params.AllowedMorningShift_O);
		$scope.params.AllowedNoonShift = retBool($scope.params.AllowedNoonShift_O);
		$scope.params.AllowedEvenigShift = retBool($scope.params.AllowedEvenigShift_O);

		var asdasdasd = $scope.params.UserType;



		console.info($scope.params);			 
		FrameworkService.getGenericPostCall('UserRegistration.php',$scope.params
				, function(response){
			console.log(response);

			if(response !== "0"){
				$state.go('app.user');
			} 
			else{
				alert("peration Failed...");
			}
		}
		,function(error){
			console.log(error);
		});		
	}

	$scope.btnBack = function(){

		if($scope.PageData && $scope.PageData.prevState){
			// console.log($scope.PageData.prevState);
			$state.go($scope.PageData.prevState);
		}
		else{
			$state.go('app.doctor');
		}
	}

	$scope.TimeList =  [{
		DisplayText:"Select",
		value :"0"
	},{
		DisplayText:"6:00:00",
		value :"6:00:00"
	},{
		DisplayText:"6:30:00",
		value :"6:30:00"
	}];

	/*FrameworkService.getGenericGetCall('JSON_TimeList.php'
					, function(response){
						console.log(response);
						$scope.TimeList		=response;
					}
			        ,function(error){
			        	console.log(error);
			        });*/



	
























})






.controller('userCtrl',function( $state, $scope, ngTableParams, tableService,$filter, $sce,FrameworkService){         

	$scope.rowClick = function(ID,rid){	
		var asd = {					 
				SpecificID : ID,
				RoleID:rid,
				prevState : 'app.user'
		}

		var data = {
				params : FrameworkService.getEncryptedString(asd)
		}			 
		$state.go('app.userDetails', data);
	}

	$scope.btnAddNew = function(DoctorID){
		var asd = {			 
				prevState : 'app.user'
		}

		var data = {
				params : FrameworkService.getEncryptedString(asd)
		}	

		$state.go('app.userDetails',data);
	}

	$scope.PData = JSON.parse(localStorage.getItem("UserData"));
	$scope.UserList = [];

	if($scope.PData[0].HospitalID  ){

		FrameworkService.getGenericGetCall('get_UserList.php?HospitalID=' + $scope.PData[0].HospitalID	 
				, function(response){


			$scope.UserList =response.data;		

			for(var i=0;i<$scope.UserList.length;i++){

				var curr_obj = $scope.UserList[i];

				if(curr_obj.isActive === "Y"){
					$scope.UserList[i].isToggleActive = true;
				}
				else{
					$scope.UserList[i].isToggleActive = false;
				}

			}
			console.info($scope.UserList);	

		}
		,function(error){
			console.log(error);
		});
	}

	$scope.onuserStatusChange = function(w){
		console.info(w)
		alert("In process...");
	} 


	$scope.AppointmentList =[];


	FrameworkService.getGenericGetCall('getAppointmentList.php?HospitalID=' + $scope.PData[0].HospitalID + '&DoctorID=' + $scope.PData[0].UserID 
			, function(response){
		$scope.AppointmentList = response.data; 
	}
	,function(error){
		console.log(error);
	});

 

})