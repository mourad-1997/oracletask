define(['accUtils',
        'knockout',
        'ojs/ojarraydataprovider',
        'ojs/ojlabel',
        'ojs/ojselectsingle',
        'ojs/ojchart',
        'ojs/ojbutton',
        'ojs/ojinputtext',
        'ojs/ojbootstrap',
        'ojs/ojcore',
        'ojs/ojknockout',
        'ojs/ojtable'
       ],
  function(accUtils, ko, ArrayDataProvider) {
  
    function DashboardViewModel() {
      var self = this;  //generated code
      self.user = ko.observable("");
      self.submittedValue = ko.observable("");
      var dataArray = [{ Q1: 100, Q2: 125, Q3: 150, Q4: 175 },
                       { Q1: 200, Q2: 225, Q3: 250, Q4: 275 }];
      this.dataArray = ko.observableArray(dataArray);
      this.dataprovider = new ArrayDataProvider(this.dataArray, { keyAttributes: 'Year' });
      var barSeries = [{ name: 'Q1', items: [0] },
                       { name: 'Q2', items: [0] },
                       { name: 'Q3', items: [0] },
                       { name: 'Q4', items: [0] }];
      var barGroups = [' '];
      this.barSeriesValue = ko.observableArray(barSeries);
      this.barGroupsValue = ko.observableArray(barGroups);
      this.handleDrop = function (event) {
        var jsonStr = event.dataTransfer.getData('application/ojtablerows+json');
        if (jsonStr) {
          var jsonObj = JSON.parse(jsonStr);
          var q1Revs = [];
          var q2Revs = [];
          var q3Revs = [];
          var q4Revs = [];
          this.barGroupsValue.removeAll();
          this.barSeriesValue.removeAll();
          for (var i = 0; i < jsonObj.length; i++) {
            var rawData = jsonObj[i].data;
 
           
            q1Revs.push(rawData.Q1);
            q2Revs.push(rawData.Q2);
            q3Revs.push(rawData.Q3);
            q4Revs.push(rawData.Q4);
          } 
          this.barSeriesValue.push({ name: 'Q1', items: q1Revs });
          this.barSeriesValue.push({ name: 'Q2', items: q2Revs });
          this.barSeriesValue.push({ name: 'Q3', items: q3Revs });
          this.barSeriesValue.push({ name: 'Q4', items: q4Revs });
        }
  
        event.stopPropagation();
        event.preventDefault();
      }.bind(this);
      self.submitBt = function (){
           self.submittedValue(self.user());
           var x = document.querySelector("[data-bind='text: submittedValue']").textContent;
           var y = x.replace(/[^0-9a-z]/gi, " ");
           var z = y.split(" ");
           var n = z.length;
           var q = n / 4 - 1;
           console.log(q);
           if (q == 2){
              this.dataArray.splice(0, 2, { Q1: parseInt(z[4].substring(1)), Q2: parseInt(z[5].substring(1)), Q3: parseInt(z[6].substring(1)), Q4: parseInt(z[7].substring(1)) }, { Q1: parseInt(z[8].substring(1)), Q2: parseInt(z[9].substring(1)), Q3: parseInt(z[10].substring(1)), Q4: parseInt(z[11].substring(1)) });
              var q1Revs = [dataArray[0].Q1, dataArray[1].Q1];
              var q2Revs = [dataArray[0].Q2, dataArray[1].Q2];
              var q3Revs = [dataArray[0].Q3, dataArray[1].Q3];
              var q4Revs = [dataArray[0].Q4, dataArray[1].Q4];
            
          
              this.barSeriesValue.splice(0, 4, { name: z[0], items: q1Revs }, { name: z[1].substring(1), items: q2Revs }, { name: z[2].substring(1), items: q3Revs }, { name: z[3].substring(1), items: q4Revs })                  
           } else {
              for( var i = 1; i <= q; i++){
                this.dataArray.splice(i-1, 1, { Q1: parseInt(z[4*i].substring(1)), Q2: parseInt(z[4*i + 1].substring(1)), Q3: parseInt(z[4*i + 2].substring(1)), Q4: parseInt(z[4*i + 3].substring(1)) })
              }
              var q1Revs = [dataArray[0].Q1, dataArray[1].Q1];
              var q2Revs = [dataArray[0].Q2, dataArray[1].Q2];
              var q3Revs = [dataArray[0].Q3, dataArray[1].Q3];
              var q4Revs = [dataArray[0].Q4, dataArray[1].Q4];
              for( var i = 2; i <= q-1; i++ ){
                q1Revs.push(dataArray[i].Q1);
                q2Revs.push(dataArray[i].Q2);
                q3Revs.push(dataArray[i].Q3);
                q4Revs.push(dataArray[i].Q4)
              }
              this.barSeriesValue.splice(0, 4, { name: z[0], items: q1Revs }, { name: z[1].substring(1), items: q2Revs }, { name: z[2].substring(1), items: q3Revs }, { name: z[3].substring(1), items: q4Revs })              
           }    
          }

      

      /**
       * Declare selection list observables and provide values
       */
      /**
       * Declare chart observables and add the static data
       */

      // chart data array and  ArrayDataProvider observable
      

      


	  
      // The following 3 functions are not addressed in this tutorial.
	  
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);