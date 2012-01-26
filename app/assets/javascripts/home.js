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

	$('.next').live('click', function() {
		getNext($(this).parents('.block'));
		return false;
	});

	$('.new_submission .submit').click(function(){
		var inputs = $('.new_submission input');
		var empty = inputs.filter(function(index) {
			return $(this).val() == '';
		});

		if (empty.length) {
			inputs.removeClass('error');
			$.each(empty, function(){
				$(this).addClass('error');
			});
		} else {
			$(this).parents('form').submit();
		};

		return false;
	});

	$('.new_submission').bind('ajax:success', function(){
		getNext($(this).parents('.block'));
	});

	$('.question_container .answer_choice').live('click', function(){
		var self = $(this),
			container = self.parents('.question_container'),
			correct_hash = container.attr('data-correct-answer-id'),
			clicked_hash = MD5_hexhash(self.attr('data-answer-id'));

		self.removeClass('deselected').addClass('selected');
		self.siblings().removeClass('selected').addClass('deselected');

		container.find('.submit_answer').animate(
				{
					opacity: 1
				},' slow');
		
		container.attr('data-selected-hash', clicked_hash);
		return false;
	});

	$('.question_container .submit_answer').live('click', function() {
		var button = $(this),
			container = $(this).parents('.question_container');

		$.each(container.find('.answer_choice'), function() {
			$(this).attr('data-answer-hash', MD5_hexhash($(this).attr('data-answer-id')));	
		});

		var correct_choice = container.find('.answer_choice[data-answer-hash="' + container.attr('data-correct-answer-id') + '"]'),
			wrong_choices = correct_choice.siblings();

		// CORRECT
		if (container.attr('data-selected-hash') === container.attr('data-correct-answer-id')) {
			correct_choice.find('.mark').remove();
			correct_choice.append('<div class="mark check"></div>');
			wrong_choices.css('opacity', .5);
			correct_amount++
		} else {
		// WRONG
			correct_choice.find('.mark').remove();
			correct_choice.append('<div class="mark circle"></div>');
			wrong_choices.find('.mark').remove();
			wrong_choices.append('<div class="mark ex"></div>');
			wrong_choices.find('p').css('text-decoration', 'line-through');
		};

		setTimeout(function(){
			var correct_offset = correct_choice.position().top,
				response_text = container.find('.response_text')
				answer_section = container.find('.answers');

			wrong_choices.animate(
				{
					opacity: 0
				}, 'slow').remove();

			correct_choice.css({
				'position': 'absolute',
				'top': correct_offset
			});

			correct_choice.animate({ top: 98 }, 'slow', function(){ response_text.appendTo(answer_section).fadeIn('slow'); });

			button.replaceWith('<a href="#" class="btn next next_question">Next Question</a>');

		}, 1000);
		return false;
	});
});