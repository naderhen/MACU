var current_score = 0;

function getNext(){
	$('.question_container:first').show().animate({ left: 0 }, '3000', 'swing');
}

$(document).ready(function() {
	getNext();

	$('.question_container .answer_link').live('click', function(){
		var self = $(this),
			container = self.parents('.question_container'),
			correct_hash = container.attr('data-correct-answer-id'),
			clicked_hash = MD5_hexhash(self.attr('data-answer-id'));

		if (clicked_hash === correct_hash) {
			current_score++;
			container.remove();
			getNext();
		};
		return false;
	});
});