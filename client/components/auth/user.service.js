'use strict';

angular.module('taskrUApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', 
    //Default Values for Parameters
    {
      id: '@_id'
    },
    //Actions
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      //
      setStudentEmail : {
        method: 'PUT', 
        params: {
          //Make request to /api/users/:id/studentEmail
          controller: 'studentEmail'
        }
      }
	  });
  });
