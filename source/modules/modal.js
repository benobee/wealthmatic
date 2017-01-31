/**
 * 
 * @desc when user clicks on an item it brings up a popup window
 * with more infomation exports to index.js which is exported to main.js
 *
 */

import $ from 'jquery';

const modal = {

	init() {

		/*
		 * @desc initialize all variables, event handlers
		 * 
		*/
		
		const team = $("#collection-5860565e414fb5a4e20f1d4a");

		if (team.length !== 0) {
			this.injectHTML();
			this.modalWindow = $('#modal-popup');
			this.events();	
		}
	},

	injectHTML() {
		/*
		 * @desc create div to inject modal popup into
		 * 
		*/
		$('main').after('<div id="modal-popup"><div class="modal-content"><div class="close">✕</div><div class="modal-image"></div><div class="modal-title"></div><div class="modal-data-inject"></div></div></div>');
	},

	open() {
		$(this.modalWindow).addClass('active');
	},

	close() {
		$(this.modalWindow).removeClass('active');
	},

	events() {

		/*
		 * @desc event binding - user clicks on item
		 * and the data-content is retrived from the HTML
		 * which displays info in separate popup window
		 * 
		*/
	
		const list = $('.hentry');

		$(list).on("click", (e) => {
			const image = $(e.currentTarget).find('img').clone();

			const title = $(e.currentTarget).data('title');

			const data = $(e.currentTarget).data('content');

			$(this.modalWindow).find('.modal-image').html(image);
			$(this.modalWindow).find('.modal-title').html(title);
			$(this.modalWindow).find('.modal-data-inject').html(data);

			this.open();
		});

		$('.close').on("click", () => {
			this.close();
		});	

		$('#modal-popup').on("click", () => {
			this.close();
		});
	}
};

export default modal;