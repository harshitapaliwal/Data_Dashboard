
//Data for Dashboard in Json Format
var rawData = '[{"year":2017,"details":[{"hired_last_year":"40","collegeName":"IIT, Madras","cgpa":7.09,"test_score":74,"technology_java":52,"technology_c":62,"technology_dotNet":68,"stream_ece":25,"stream_cse":36,"stream_it":40},{"hired_last_year":"55","collegeName":"IIT, Bombay","cgpa":6.8,"test_score":67,"technology_java":63,"technology_c":81,"technology_dotNet":74,"stream_ece":32,"stream_cse":34,"stream_it":44},{"hired_last_year":"70","collegeName":"IIT, Kharagpur","cgpa":8.45,"test_score":83,"technology_java":73,"technology_c":84,"technology_dotNet":79,"stream_ece":22,"stream_cse":32,"stream_it":38},{"hired_last_year":"65","collegeName":"VIT University","cgpa":7.6,"test_score":72,"technology_java":70,"technology_c":73,"technology_dotNet":83,"stream_ece":35,"stream_cse":41,"stream_it":32},{"hired_last_year":"30","collegeName":"Anna University","cgpa":6.43,"test_score":58,"technology_java":60,"technology_c":64,"technology_dotNet":51,"stream_ece":19,"stream_cse":27,"stream_it":34}]},{"year":2016,"details":[{"hired_last_year":"65","collegeName":"IIT, Madras","cgpa":7.05,"test_score":72.5,"technology_java":62,"technology_c":70,"technology_dotNet":72,"stream_ece":40,"stream_cse":34,"stream_it":28},{"hired_last_year":"61","collegeName":"IIT, Bombay","cgpa":7.5,"test_score":74,"technology_java":65,"technology_c":71,"technology_dotNet":69,"stream_ece":48,"stream_cse":51,"stream_it":39},{"hired_last_year":"65","collegeName":"IIT, Kharagpur","cgpa":8.05,"test_score":72,"technology_java":70,"technology_c":65,"technology_dotNet":74,"stream_ece":40,"stream_cse":50,"stream_it":57},{"hired_last_year":"63","collegeName":"VIT University","cgpa":7.22,"test_score":78,"technology_java":76,"technology_c":82,"technology_dotNet":72,"stream_ece":39,"stream_cse":41,"stream_it":35},{"hired_last_year":"33","collegeName":"Anna University","cgpa":7.12,"test_score":62,"technology_java":59,"technology_c":68,"technology_dotNet":70,"stream_ece":21,"stream_cse":30,"stream_it":31}]},{"year":2015,"details":[{"hired_last_year":"45","collegeName":"IIT, Madras","cgpa":7.1,"test_score":52,"technology_java":70,"technology_c":59,"technology_dotNet":63,"stream_ece":49,"stream_cse":43,"stream_it":38},{"hired_last_year":"51","collegeName":"IIT, Bombay","cgpa":7.58,"test_score":57,"technology_java":68,"technology_c":71,"technology_dotNet":78,"stream_ece":42,"stream_cse":37,"stream_it":57},{"hired_last_year":"65","collegeName":"IIT, Kharagpur","cgpa":7.03,"test_score":63,"technology_java":60,"technology_c":72,"technology_dotNet":65,"stream_ece":38,"stream_cse":48,"stream_it":41},{"hired_last_year":"70","collegeName":"VIT University","cgpa":8,"test_score":71,"technology_java":77,"technology_c":80,"technology_dotNet":70,"stream_ece":43,"stream_cse":41,"stream_it":37},{"hired_last_year":"52","collegeName":"Anna University","cgpa":6.8,"test_score":65,"technology_java":70,"technology_c":75,"technology_dotNet":61,"stream_ece":39,"stream_cse":42,"stream_it":45}]}]'; 
//Parse Json Data
var data = JSON.parse(rawData);
//For debugging purpose
    debugger;
    //Angular Controller
    var app = angular.module('myApp', ["chart.js"]).controller('myCtrl', function ($rootScope, $scope) {
      //By Default data of  2017 year will be displayed
      $scope.year_value = "2017";
      //For accesing all the data in controller
      $scope.years = data;
      //Arrays for storing colleges data in various fields
      $scope.labels_collegename = [];
      $scope.data_hired_last_year = [];
      $scope.data_test_score = [];
      $scope.data_cgpa = [];
      $scope.year = [];
      $scope.data_stream_ece = [];
      $scope.data_stream_cse = [];
      $scope.data_stream_it = [];
      $scope.data_technology_java = [];
      $scope.data_technology_c = [];
      $scope.data_technology_dotnet = [];
      $scope.data_technology = [];
      $scope.data_stream = [];
      //variable for matching year
      var match_year = 0;
      //Calculating length of data i.e. how many objects are there in JSON
      var length_year = $scope.years.length;
      var length_details;
      
      //colors for bar chart stram and technology
      $scope.colours_stream = ['#460952', '#004831', '#301815'];
      $scope.colours_technology = ['#fd0000', '#fdaa00', '#7f66cd'];
      // options for creating serires
      var legend = ["IIT, Madras", "IIT, Bombay", "IIT, Kharagpur", "VIT University", "Anna University"];
      $scope.options = { legend: { display: true, position: 'right' } };
      $scope.options_cgpa = { scales: { yAxes: [{ ticks: { min: 5 ,max:10} }] } };
      $scope.options_tech = { legend: { display: true, position: 'right' }, scales: { yAxes: [{ ticks: { min: 40, max: 100 } }] } };
      $scope.options_stream = { legend: { display: true, position: 'right' }, scales: { yAxes: [{ ticks: { min: 10, max: 60 } }] } };   
      $scope.options_score = { scales: { yAxes: [{ ticks: { min: 30, max: 100 } }] } };
      $scope.series = ["IIT, Madras", "IIT, Bombay", "IIT, Kharagpur", "VIT University", "Anna University"];
      $scope.series_technology = ["Java", "C", "DotNet"];
      $scope.series_stream = ["ECE", "CSE", "IT"];
      //loop for extracting all year
      for (var i = 0; i < length_year; i++) {

        $scope.year.push($scope.years[i].year);
      }
      //loop for extracting all information
      for (var i = 0; i < length_year; i++) {
        match_year = $scope.year[i];
        if ((match_year == $scope.year_value)) {
          length_details = $scope.years[i].details.length;

          for (j = 0; j < length_details; j++) {
            $scope.labels_collegename.push($scope.years[i].details[j].collegeName);
            $scope.data_hired_last_year.push($scope.years[i].details[j].hired_last_year);
            $scope.data_test_score.push($scope.years[i].details[j].test_score);
            $scope.data_cgpa.push($scope.years[i].details[j].cgpa);
            $scope.data_technology_java.push($scope.years[i].details[j].technology_java);
            $scope.data_technology_c.push($scope.years[i].details[j].technology_c);
            $scope.data_technology_dotnet.push($scope.years[i].details[j].technology_dotNet);
            $scope.data_stream_ece.push($scope.years[i].details[j].stream_ece);
            $scope.data_stream_cse.push($scope.years[i].details[j].stream_cse);
            $scope.data_stream_it.push($scope.years[i].details[j].stream_it);
          }
        }
      }
      //for displaying all technologies and stream of a college in one chart
      $scope.data_technology = [$scope.data_technology_java, $scope.data_technology_c, $scope.data_technology_dotnet];
      $scope.data_stream = [$scope.data_stream_ece, $scope.data_stream_cse, $scope.data_stream_it];
      //function when the button is clicked for a specific year
      $scope.show = function (value) {
        //getting the value of the year
        $scope.year_value = value;
        for (var i = 0; i < length_year; i++) {
          match_year = $scope.year[i];
          if ((match_year == $scope.year_value)) {
            length_details = $scope.years[i].details.length;
            //clear all the old data of chart 
            $scope.labels_collegename = [];
            $scope.data_hired_last_year = [];
            $scope.data_test_score = [];
            $scope.data_cgpa = [];
            $scope.data_technology = [];
            $scope.data_technology_java = [];
            $scope.data_technology_c = [];
            $scope.data_stream = [];
            $scope.data_technology_dotnet = [];
            $scope.data_stream_ece = [];
            $scope.data_stream_cse = [];
            $scope.data_stream_it = [];
            for (j = 0; j < length_details; j++) {
              $scope.labels_collegename.push($scope.years[i].details[j].collegeName);
              $scope.data_hired_last_year.push($scope.years[i].details[j].hired_last_year);
              $scope.data_test_score.push($scope.years[i].details[j].test_score);
              $scope.data_cgpa.push($scope.years[i].details[j].cgpa);
              $scope.data_technology_java.push($scope.years[i].details[j].technology_java);
              $scope.data_technology_c.push($scope.years[i].details[j].technology_c);
              $scope.data_technology_dotnet.push($scope.years[i].details[j].technology_dotNet);
              $scope.data_stream_ece.push($scope.years[i].details[j].stream_ece);
              $scope.data_stream_cse.push($scope.years[i].details[j].stream_cse);
              $scope.data_stream_it.push($scope.years[i].details[j].stream_it);
            }
          }
        }
        $scope.data_technology = [$scope.data_technology_java, $scope.data_technology_c, $scope.data_technology_dotnet];
        $scope.data_stream = [$scope.data_stream_ece, $scope.data_stream_cse, $scope.data_stream_it];

      }



    });