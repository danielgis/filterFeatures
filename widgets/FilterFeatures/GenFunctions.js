import declare from 'dojo/_base/declare';
import BaseWidget from 'jimu/BaseWidget';
import lang from 'dojo/_base/lang';
import LayerInfos from 'jimu/LayerInfos/LayerInfos';

export default declare([BaseWidget], {
    _turnLayers(infos, turn, layersId = []) {
        recursiveSubLayers(infos, turn, layersId);

        function recursiveSubLayers(infos, turn, layersId) {
            for (var i in infos) {
                var sublayers = infos[i].getSubLayers();
                if (sublayers.length > 0) {
                    recursiveSubLayers(sublayers, turn, layersId)
                } else {
                    if (layersId.length > 0) {
                        if (layersId.includes(infos[i].id)) {
                        	(turn) ? infos[i].show() : infos[i].hide()
                        }
                    } else {
                    	(turn) ? infos[i].show() : infos[i].hide()
                    }
                }
            }
        };
    },

    _sortArray(array, idx){
    	array.sort((x, y) => (x[idx] > y[idx]) ? 1 : -1);
    	return array;
    },

})