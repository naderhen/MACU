var current_score = 0;

function getNext(current){
	var next = current.next('.block');
	current.remove();
	next.fadeIn('slow');
}

$(document).ready(function() {
	// Init
	$('#homepage').fadeIn('slow');
	correct_amount = 0;

	$('.btn').live('click', function() {
		getNext($(this).parents('.block'));
		return false;
	});

	$('.question_container .answer_choice').live('click', function(){
		var self = $(this),
			container = self.parents('.question_container'),
			correct_hash = container.attr('data-correct-answer-id'),
			clicked_hash = MD5_hexhash(self.attr('data-answer-id'));

		if (clicked_hash === correct_hash) {
			correct_amount++
			getNext($(this).parents('.block'));
		};
		return false;
	});
});