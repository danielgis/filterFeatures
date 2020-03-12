import declare from 'dojo/_base/declare';
import BaseWidget from 'jimu/BaseWidget';
import _WidgetsInTemplateMixin from 'dijit/_WidgetsInTemplateMixin';
import Query from "esri/tasks/query";
import QueryTask from "esri/tasks/QueryTask";
// import "dojo/parser";
// import "dijit/form/Select";

// To create a widget, you need to derive from BaseWidget.
export default declare([
  BaseWidget, 
  _WidgetsInTemplateMixin, 
  Query, 
  QueryTask], {

  // Custom widget code goes here

  baseClass: 'filter-features',

  // add additional properties here

  // methods to communication with app container:
  postCreate () {
    this.inherited(arguments);
    console.log('FilterFeatures::postCreate');
  },
  
  startup() {
    this.inherited(arguments);
    console.log('FilterFeatures::startup');
    console.log(this.map);
    var feature = this.map.getLayer(this.config.departamento.id)
    
    var urlService = feature.url;
    var clause = '1=1';
    var valueField = this.config.departamento.value;
    var labelField = this.config.departamento.label;
    var attachPoint = this.depaSelectAttachPoint;
    this._filterFeature(urlService, clause, valueField, labelField, attachPoint);

  },

  _filterFeature(urlService, clause, valueField, labelField, attachPoint){
    var queryTask = new QueryTask(urlService);
    var query = new Query();
    query.where = clause;
    query.outFields = [valueField, labelField];
    queryTask.execute(query, function(results){
      var options = []
      for(var i in results.features){
        var opt = {
          'label': results.features[i].attributes[labelField],
          'value': results.features[i].attributes[valueField]
        };
        options.push(opt);
      }
      attachPoint.options = options;
    });
  },
  // onOpen() {
  //   console.log('FilterFeatures::onOpen');
  // },
  // onClose(){
  //   console.log('FilterFeatures::onClose');
  // },
  // onMinimize(){
  //   console.log('FilterFeatures::onMinimize');
  // },
  // onMaximize(){
  //   console.log('FilterFeatures::onMaximize');
  // },
  // onSignIn(credential){
  //   console.log('FilterFeatures::onSignIn', credential);
  // },
  // onSignOut(){
  //   console.log('FilterFeatures::onSignOut');
  // }
  // onPositionChange(){
  //   console.log('FilterFeatures::onPositionChange');
  // },
  // resize(){
  //   console.log('FilterFeatures::resize');
  // }
});
