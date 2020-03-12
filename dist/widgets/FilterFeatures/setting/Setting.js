define(['dojo/_base/declare', 'jimu/BaseWidgetSetting', 'dijit/_WidgetsInTemplateMixin', 'esri/tasks/QueryTask', 'esri/tasks/query', 'dojo/_base/lang', 'jimu/LayerInfos/LayerInfos', 'dojo/_base/array', "dojo/dom", "dojo/on", "esri/request", "dojo/html", "dijit/form/CheckBox"], function (declare, BaseWidgetSetting, _WidgetsInTemplateMixin, QueryTask, Query, lang, LayerInfos, array, dom, on, esriRequest, html, CheckBox) {
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

            // this._gridxLayers();
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
            return {
                departamento: {
                    'url': this.NodeUrlDepa.value,
                    'label': this.NodeFieldLabelDepa.value,
                    'value': this.NodeFieldValueDepa.value
                },
                provincia: {
                    'url': this.NodeUrlProv.value,
                    'label': this.NodeFieldLabelProv.value,
                    'value': this.NodeFieldValueProv.value
                },
                distrito: {
                    'url': this.NodeUrlDist.value,
                    'label': this.NodeFieldLabelDist.value,
                    'value': this.NodeFieldValueDist.value
                }
            };
        },
        _setListLayers: function _setListLayers(dojonodeService, dojonodeAlias, dojonodeValue) {
            LayerInfos.getInstance(this.map, this.map.itemInfo).then(lang.hitch(this, function (layerInfosObj) {
                var infos = layerInfosObj.getLayerInfoArray();
                var layerInfosObjClone = layerInfosObj;
                var options = [];
                for (var i in infos) {
                    var arrayLayers = infos[i].getSubLayers();
                    if (arrayLayers.length > 0) {
                        var arrayoptions = this._listSubLayerdOfRootLayer(arrayLayers);
                        options.push.apply(options, arrayoptions.optSubLayers);
                        layerInfosObjClone._layerInfos = layerInfosObjClone._layerInfos.concat(arrayoptions.infoSubLayers);
                    } else {
                        options.push({
                            label: infos[i].title,
                            value: infos[i].layerObject.url
                        });
                    }
                };
                dojonodeService.options = options;

                dojonodeService.on('change', function (evt) {
                    // var selectedLayer = layerInfosObjClone.getLayerInfoById(evt);

                    // var url = selectedLayer.layerObject.url;
                    esriRequest({ url: evt + "?f=json" }).then(function (response) {
                        var fields = response.fields;
                        var optionFields = [];
                        fields.forEach(function (field) {
                            optionFields.push({
                                label: field.alias,
                                value: field.name
                            });
                        });
                        dojonodeAlias.set('options', optionFields);
                        dojonodeValue.set('options', optionFields);
                    });
                });
            }));
        },
        _listSubLayerdOfRootLayer: function _listSubLayerdOfRootLayer(arrayLayers) {
            var optionsSublayers = [];
            var infosSublayers = [];
            recursiveSubLayers(arrayLayers);

            function recursiveSubLayers(arrayLayers) {
                for (var i in arrayLayers) {
                    var sublayers = arrayLayers[i].getSubLayers();
                    if (sublayers.length > 0) {
                        recursiveSubLayers(sublayers);
                    } else {
                        optionsSublayers.push({
                            label: arrayLayers[i].title,
                            value: arrayLayers[i].layerObject.url
                        });
                        infosSublayers.push(arrayLayers[i]);
                    }
                }
            };
            return {
                optSubLayers: optionsSublayers,
                infoSubLayers: infosSublayers
            };
        }
    }

    // _gridxLayers(){
    // var listLayers = this.NodeUrlDepa.options;
    // var elm = document.getElementById("containerListFeatures");
    // var template;
    // for (var i in listLayers){
    // option = listLayers[i]
    // var tmp = `
    // <div>
    // <div></div>
    // <div>${option.label}</div>
    // <div><select data-dojo-type='dijit/form/Select'></select></div>
    // </div><br>
    // `
    // template = template + tmp;
    // }
    // html.set(this.containerListFeatures.domNode, template);
    // }


    );
});
//# sourceMappingURL=Setting.js.map
