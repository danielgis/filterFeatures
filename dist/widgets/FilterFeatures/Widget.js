define(['dojo/_base/declare', 'jimu/BaseWidget', 'dijit/_WidgetsInTemplateMixin', "esri/tasks/query", "esri/tasks/QueryTask", "dojo/dom", "dojo/on"], function (declare, BaseWidget, _WidgetsInTemplateMixin, Query, QueryTask, dom, on) {
  return declare([BaseWidget, _WidgetsInTemplateMixin, Query, QueryTask], {

    // Custom widget code goes here

    baseClass: 'filter-features',

    postCreate: function postCreate() {
      this.inherited(arguments);
      console.log('FilterFeatures::postCreate');
      self = this;

      // this._urlDepa;
      // this._fieldCodDepa;
      // this._fieldNomDepa;
      // this._urlProv;
      // this._fieldCodProv;
      // this._fieldNomPrv;
      // this._urlDist;
      // this._fieldCodDist;
      // this._fieldNomDist;
    },
    startup: function startup() {
      this.inherited(arguments);
      _urlDepa = this.config.departamento.url;
      _fieldCodDepa = this.config.departamento.value;
      _fieldNomDepa = this.config.departamento.label;
      clause = "1=1";

      _urlProv = this.config.provincia.url;
      _fieldCodProv = this.config.provincia.value;
      _fieldNomProv = this.config.provincia.label;
      _urlDist = this.config.distrito.url;
      _fieldCodDist = this.config.distrito.value;
      _fieldNomDist = this.config.distrito.label;

      this._turnOffAllLayers();

      this._filterFeature(_urlDepa, clause, _fieldCodDepa, _fieldNomDepa, self.depaSelectAttachPoint);
    },
    _filterFeatureDepa: function _filterFeatureDepa(evt) {
      var clause = _fieldCodProv + ' like \'' + evt + '%\'';

      this._zoomExtendSelected(_urlDepa, _fieldCodDepa, evt);
      this._filterFeature(_urlProv, clause, _fieldCodProv, _fieldNomProv, self.provSelectAttachPoint);
    },
    _filterFeatureProv: function _filterFeatureProv(evt) {
      var clause = _fieldCodDist + ' like \'' + evt + '%\'';

      this._zoomExtendSelected(_urlProv, _fieldCodProv, evt);
      this._filterFeature(_urlDist, clause, _fieldCodDist, _fieldNomDist, self.distSelectAttachPoint);
    },
    _filterFeatureDist: function _filterFeatureDist(evt) {
      var urlServiceDist = this.config.distrito.url;
      var valueFieldDist = this.config.distrito.value;
      var value = evt;

      this._zoomExtendSelected(urlServiceDist, valueFieldDist, evt);
    },
    _filterFeature: function _filterFeature(urlService, clause, valueField, labelField, dojonodeAlias) {
      var options = [];
      var queryTask = new QueryTask(urlService);
      var query = new Query();
      query.where = clause;
      query.outFields = [valueField, labelField];
      queryTask.execute(query, function (results) {
        for (var i in results.features) {
          var opt = {
            'label': results.features[i].attributes[labelField],
            'value': results.features[i].attributes[valueField]
          };
          options.push(opt);
        }
        dojonodeAlias.set('options', options);
      });
    },
    _zoomExtendSelected: function _zoomExtendSelected(urlService, field, value) {
      var queryTask = new QueryTask(urlService);
      var clause = field + '=\'' + value + '\'';
      var query = new Query();
      query.where = clause;
      query.returnGeometry = true;
      queryTask.executeForExtent(query, function (results) {
        var extent = results.extent;
        self.map.setExtent(extent, true);
      });
    },
    _turnOffAllLayers: function _turnOffAllLayers() {
      var layerIds = this.map.graphicsLayerIds;
      var feature;
      for (var i in layerIds) {
        feature = this.map.getLayer(layerIds[i]);
        feature.hide();
      }
    }
  }
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
  );
});
//# sourceMappingURL=Widget.js.map
