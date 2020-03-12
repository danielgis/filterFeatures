import declare from 'dojo/_base/declare';
import BaseWidgetSetting from 'jimu/BaseWidgetSetting';
import _WidgetsInTemplateMixin from 'dijit/_WidgetsInTemplateMixin';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import lang from 'dojo/_base/lang';
import LayerInfos from 'jimu/LayerInfos/LayerInfos';
import array from 'dojo/_base/array';
import dom from "dojo/dom";
import on from "dojo/on";

export default declare([
  BaseWidgetSetting,
  _WidgetsInTemplateMixin,
  QueryTask,
  Query,
  ], {

  baseClass: 'filter-features-setting',


  startup: function() {
    this.inherited(arguments);
    this.setConfig(this.config);
  },

  postCreate () {
    // the config object is passed in
    // this.setConfig(this.config);
    this._setListLayers(this.NodeUrlDepa, this.NodeFieldLabelDepa, this.NodeFieldValueDepa);
    this._setListLayers(this.NodeUrlProv, this.NodeFieldLabelProv, this.NodeFieldValueProv);
    this._setListLayers(this.NodeUrlDist, this.NodeFieldLabelDist, this.NodeFieldValueDist);
    // this._setListLayers(this.textNodeUrlProv);
    // this._setListLayers(this.textNodeUrlDist);

    // this.textNodeUrlDepa.on('change', function(evt) {
    //     console.log(evt);
    // });

  },

  setConfig (config) {
    // console.log(this.textNodeUrlDepa);
    this.config = config;
    this.NodeUrlDepa.setValue(config.departamento.id);
    this.NodeFieldLabelDepa.setValue(config.departamento.label);
    this.NodeFieldLabelDepa.setValue(config.departamento.label);

    this.NodeUrlProv.setValue(config.provincia.id);
    this.NodeFieldLabelProv.setValue(config.provincia.label);
    this.NodeFieldValueProv.setValue(config.provincia.value);

    this.NodeUrlDist.setValue(config.distrito.id);
    this.NodeFieldLabelDist.setValue(config.distrito.label);
    this.NodeFieldValueDist.setValue(config.distrito.value);

    // this._setListLayers(this.textNodeUrlDepa);
    // this.textNodeFieldLabelDepa.set("value", config.departamento.label);
    // this.textNodeFieldValueDepa.set("value", config.departamento.value);

    // this.textNodeUrlProv.set("value", config.provincia.url);
    // this._setListLayers(this.textNodeUrlProv);
    // this.textNodeFieldLabelProv.set("value", config.provincia.label);
    // this.textNodeFieldValueProv.set("value", config.provincia.value);

    // this.textNodeUrlDist.set("value", config.distrito.url);
    // this._setListLayers(this.textNodeUrlDist);
    // this.textNodeFieldLabelDist.set("value", config.distrito.label);
    // this.textNodeFieldValueDist.set("value", config.distrito.value);
  },

  getConfig () {
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

  _setListLayers(dojonodeService, dojonodeAlias, dojonodeValue){
    LayerInfos.getInstance(this.map, this.map.itemInfo)
    .then(lang.hitch(this, function(layerInfosObj) {
      var infos = layerInfosObj.getLayerInfoArray();
      var options = [];
      for (var i in infos){
        options.push({
          label: infos[i].title,
          value: infos[i].id,
        })
      };
      dojonodeService.options = options;

      dojonodeService.on('change', function(evt){
        var selectedLayer = layerInfosObj.getLayerInfoById(evt);
        var fields = selectedLayer.layerObject.fields;
        var optionFields = []
        for (var i in fields){
          optionFields.push({
            label: fields[i].alias,
            value: fields[i].name,
          })
        };
        dojonodeAlias.set('options', optionFields);
        dojonodeValue.set('options', optionFields);
      })
    }));
  },

});
