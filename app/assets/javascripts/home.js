var current_score = 0;

function getNext(current){
	var next = current.next('.block');
	current.remove();
	next.fadeIn('slow');
}

function updateGrade(score){
	var container  = $('#grade_section');

	container.find('#grade_amount').html(score + '/12');
}

$(document).ready(function() {

	$('input[placeholder], textarea[placeholder]').placeholder();

	$('select').selectBox();

	$('#frame_container').animate(
		{ marginTop: '100px' },{ duration: 2000, easing: 'easeOutBack', complete: function() {
			$('#frame_left').animate( { backgroundPosition: '0' }, 1000);
			$('#frame_right').animate( { backgroundPosition: '-20px 0' }, 1000, function() {
				$('#homepage').fadeIn('slow');
			});
			}
		});

	// Init
	
	correct_amount = 0;

	$('.next').live('click', function() {
		getNext($(this).parents('.block'));
		return false;
	});

	$('.new_submission .submit').click(function(){
		var form = $(this).parents('form'),
			inputs = $('.new_submission input');

		var empty = inputs.filter(function(index) {
			return $(this).val() == '' || $(this).val() == 'Branch Location';
		});

		if (empty.length) {
			inputs.removeClass('error');
			form.find('.selectBox-dropdown').removeClass('error');
			$.each(empty, function(){
				$(this).addClass('error');
			});
			if ($('#submission_branch').val() == 'Branch Location') {
				form.find('.selectBox-dropdown').addClass('error');
			}
		} else {
			$.ajax({
				url: 'submissions',
				type: 'POST',
				data: form.serialize(),
				dataType: 'json',
				success: function(data) {
					$('#content').attr('data-user-id', data.id);
					getNext(form.parents('.block'));
				}
			});
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
			container = $(this).parents('.question_container'),
			inputs = container.find('.answer_choice');

		$.each(inputs, function() {
			$(this).attr('data-answer-hash', MD5_hexhash($(this).attr('data-answer-id')));	
		});

		var correct_choice = container.find('.answer_choice[data-answer-hash="' + container.attr('data-correct-answer-id') + '"]'),
			wrong_choices = correct_choice.siblings();
		
		correct_choice.removeClass('selected deselected');
		wrong_choices.addClass('deselected');
		// CORRECT
		if (container.attr('data-selected-hash') === container.attr('data-correct-answer-id')) {
			correct_choice.find('.mark').remove();
			correct_choice.append('<div class="mark check"></div>');
			wrong_choices.css('opacity', .5);
			correct_amount++
			updateGrade(correct_amount);
		} else {
		// WRONG
			correct_choice.find('.mark').remove();
			correct_choice.append('<div class="mark circle"></div>');
			wrong_choices.find('.mark').remove();
			wrong_choices.append('<div class="mark ex"></div>');
			wrong_choices.find('p').css('text-decoration', 'line-through');
			updateGrade(correct_amount);
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

			correct_choice.animate({ top: 0 }, 'slow', function(){ response_text.appendTo(answer_section).fadeIn('slow'); });

			button.replaceWith('<a href="#" class="btn next next_question">Next Question</a>');

		}, 1000);
		return false;
	});

	$('#bucket_list .continue').live('click', function() {
		var self = $(this),
			user_id = $('#content').attr('data-user-id'),
			text = $('#bucket_list_text').val();
		
		if (text.length) {
			$.ajax({
				url: 'bucket_list/' + user_id,
				type: 'POST',
				data: {content: text},
				dataType: 'json',
				success: function(data) {
					if (data) {
						getNext(self.parents('.block'));
					}
				}
			});	
		} else {
			$('#bucket_list_text').addClass('error');
		}
		return false;
		
	});

	$('.did_i_win').live('click', function() {
		var self = $(this),
			code = $('#promo_code').val(),
			user_id = $('#content').attr('data-user-id');

		$.ajax({
			url: 'check/' + code + '/' + user_id,
			dataType: 'json',
			success: function(data) {
				if(data) {
					$('#prize_container').find('#prize_name').html(data.prize);
					getNext(self.parents('.block'));
				} else {
					self.parents('.block').find('.bad_promo').fadeIn('slow');
				}
			}
		});
		return false;
	});

});