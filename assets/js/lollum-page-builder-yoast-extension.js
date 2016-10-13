jQuery(function ($) {

	'use strict';
	/* global YoastSEO */

	var seo_fields = [];

	var LPB_YOAST = {
		init: function() {
			LPB_YOAST.getFields();
			addEventListener('load', function() {
				LPB_YOAST.load();
			});
		},

		reloadFields: function() {
			seo_fields = [];
			LPB_YOAST.getFields();
			console.log(seo_fields);
		},

		load: function() {
			YoastSEO.app.registerPlugin('LollumPageBuilder', {status: 'loading'});
			LPB_YOAST.bind();
			YoastSEO.app.pluginReady('LollumPageBuilder');
			YoastSEO.app.registerModification('content', LPB_YOAST.addContent, 'LollumPageBuilder', 5);
		},

		addContent: function(content) {
			seo_fields.map(function(fieldId) {
				content += ' ' + document.getElementById(fieldId).value;
			} );

			return content;
		},

		bind: function() {
			var timeout;

			function refresh() {
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					YoastSEO.app.refresh();
				}, 250 );
			}

			seo_fields.map(function(fieldId) {
				document.getElementById(fieldId).addEventListener('keyup', refresh);
			});
		},

		getFields: function() {
			var inputs = $('#section-items-selected').find('[data-yoast="true"]');

			$('#section-items-selected').find('[data-yoast="true"]').each(function(index) {
				LPB_YOAST.addRandomID($(this), index);
			});
		},

		addRandomID: function(input, index) {
			var new_id = (new Date().getTime()).toString(16) + index;
			input.attr('id', new_id);
			seo_fields.push(new_id);
		}
	};

	$(document).on('click', '#add-page-item-btn', function() {
		LPB_YOAST.reloadFields();
		LPB_YOAST.bind();
	});

	$('#section-items-selected').on('click', '.btn-clone', function() {
		LPB_YOAST.reloadFields();
		YoastSEO.app.refresh();
		LPB_YOAST.bind();
	});

	$(document).ready(function() {
		LPB_YOAST.init();
	});
});

