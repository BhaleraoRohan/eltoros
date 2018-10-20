materialAdmin
 
.controller('appointmentCtrl',function( $state, $scope, ngTableParams, tableService,$filter, $sce,FrameworkService){		
	  
	 $scope.AppointmentList = [];	
	 $scope.UserData = FrameworkService.getLocalStorage();
	 
	 console.info($scope.UserData);
	 
	 getAppointmentList($scope,FrameworkService);
	 
	 $scope.ChangeStatusAndNavigate = function(req,w){
		 $scope.CurrentObject =w;
		 $("#ChangeStatus").modal('hide');	 
		 
		 
		 $scope.params = {
				priority:req,
				AppointmentID:  $scope.CurrentObject.AppointmentID,
				date: $scope.CurrentObject.date ,
				HospitalID: $scope.CurrentObject.HospitalID,
				DoctorID:  $scope.CurrentObject.DoctorID,
				MobileNumber :$scope.CurrentObject.MobileNumber
		  }
		 
		 $scope.params.prevState = 'app.appointment';	
		  var data = {
			params : FrameworkService.getEncryptedString($scope.params)
		  }	
		  
		  
		  $state.go('app.ptreat',data);
	 }
	 
	 
})



function getAppointmentList($scope,FrameworkService){
	FrameworkService.getGenericGetCall('getAppointmentList.php?HospitalID=' + $scope.UserData[0].HospitalID + '&DoctorID=' + $scope.UserData[0].UserID 
			, function(response){
	  			$scope.AppointmentList = response.data;
			}
	        ,function(error){
	        	console.log(error);
	});
	
	
}
