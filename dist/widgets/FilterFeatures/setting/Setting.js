define(['dojo/_base/declare', 'jimu/BaseWidgetSetting', 'dijit/_WidgetsInTemplateMixin', 'esri/tasks/QueryTask', 'esri/tasks/query', 'dojo/_base/lang', 'jimu/LayerInfos/LayerInfos', 'dojo/_base/array', "dojo/dom", "dojo/on"], function (declare, BaseWidgetSetting, _WidgetsInTemplateMixin, QueryTask, Query, lang, LayerInfos, array, dom, on) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin, QueryTask, Query], {

    baseClass: 'filter-features-setting',

    startup: function startup() {
      this.inherited(arguments);
      this.setConfig(this.config);
    },

    postCreate: function postCreate() {
      this._setListLayers(this.NodeUrlDepa, this.NodeFieldLabelDepa, this.NodeFieldValueDepa);
      this._setListLayers(this.NodeUrlProv, this.NodeFieldLabelProv, this.NodeFieldValueProv);
      this._setListLayers(this.NodeUrlDist, this.NodeFieldLabelDist, this.NodeFieldValueDist);
    },
    setConfig: function setConfig(config) {
      this.config = config;
      this.NodeUrlDepa.setValue(config.departamento.id);
      this.NodeFieldLabelDepa.setValue(config.departamento.label);
      this.NodeFieldValueDepa.setValue(config.departamento.value);

      this.NodeUrlProv.setValue(config.provincia.id);
      this.NodeFieldLabelProv.setValue(config.provincia.label);
      this.NodeFieldValueProv.setValue(config.provincia.value);

      this.NodeUrlDist.setValue(config.distrito.id);
      this.NodeFieldLabelDist.setValue(config.distrito.label);
      this.NodeFieldValueDist.setValue(config.distrito.value);
    },
    getConfig: function getConfig() {
      // this._setListLayers();
      // WAB will get config object through this method
      return {
        departamento: {
          'id': this.NodeUrlDepa.value,
          'label': this.NodeFieldLabelDepa.value,
          'value': this.NodeFieldValueDepa.value
        },
        provincia: {
          'id': this.NodeUrlProv.value,
          'label': this.NodeFieldLabelProv.value,
          'value': this.NodeFieldValueProv.value
        },
        distrito: {
          'id': this.NodeUrlDist.value,
          'label': this.NodeFieldLabelDist.value,
          'value': this.NodeFieldValueDist.value
        }
      };
    },
    _setListLayers: function _setListLayers(dojonodeService, dojonodeAlias, dojonodeValue) {
      LayerInfos.getInstance(this.map, this.map.itemInfo).then(lang.hitch(this, function (layerInfosObj) {
        var infos = layerInfosObj.getLayerInfoArray();
        var options = [];
        for (var i in infos) {
          options.push({
            label: infos[i].title,
            value: infos[i].id
          });
        };
        dojonodeService.options = options;

        dojonodeService.on('change', function (evt) {
          var selectedLayer = layerInfosObj.getLayerInfoById(evt);
          var fields = selectedLayer.layerObject.fields;
          var optionFields = [];
          for (var i in fields) {
            optionFields.push({
              label: fields[i].alias,
              value: fields[i].name
            });
          };
          dojonodeAlias.set('options', optionFields);
          dojonodeValue.set('options', optionFields);
        });
      }));
    }
  });
});
//# sourceMappingURL=Setting.js.map
