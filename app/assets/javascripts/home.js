var current_score = 0;

function getNext(current){
	var next = current.next('.block');
	current.animate({ marginLeft: '-5000px'}, 1000, function() {
		$(this).remove();
		next.css('margin-left', '780px');
		next.animate({marginLeft: 0, opacity: 1}, 800);
		if (next.find('.answers').length) {
			var answers = next.find('.answer_choice');

			answers.animate({
				opacity: 1,
				marginLeft: 0
			}, 1000);
		}

		if (next.attr('id') == 'information') {
			$('#feed_wrapper').cycle({
				fx: 'fade',
				width: '558px'
			});
		}

		if (next.find('select').length) {
			$('select').selectBox();
		}
	})
	
	
}

function updateGrade(score){
	var container  = $('#grade_section'),
		text = '';

	container.find('#grade_amount').html(score + '/12');

	var grades = {
		'0': 'F',
		'1': 'F',
		'2': 'F',
		'3': 'F',
		'4': 'D',
		'5': 'D',
		'6': 'C',
		'7': 'C',
		'8': 'B',
		'9': 'B',
		'10': 'A',
		'11': 'A',
		'12': 'A'
	};	

	if (grades[score] == 'A') {
		$('.grade_replacement1').html('High Five! You scored an ' + grades[score]);
		$('.grade_replacement2').html('You passed this quiz with flying colors right at the top of the class.');
		$('.grade_replacement3').html('Looks like we\'ve got ourselves on true retirement braniac!');
	} else if ( grades[score] == 'B') {
		$('.grade_replacement1').html('Nice Work! You scored a ' + grades[score]);
		$('.grade_replacement2').html('Give yourself a pat on the back.');
		$('.grade_replacement3').html('You’re understanding of retirement savings is impressive.');
	} else if (grades[score] == 'C') {
		$('.grade_replacement1').html('Not too shabby. You scored a ' + grades[score]);
		$('.grade_replacement2').html('Looks like you’ve got the retirement fundamentals down pat.');
		$('.grade_replacement3').html('But remember – there\'s always room for improvement.');
	} else if (grades[score] == 'D') {
		$('.grade_replacement1').html('We know you\'ll rally next time. You scored a ' + grades[score]);
		$('.grade_replacement2').html('Check out the links below to learn more about the fundamentals of Retirement Planning:');
		$('.grade_replacement3').html('<a href="http://www.ssa.gov/retirement/" target="_blank">http://www.ssa.gov/retirement/</a><a href="http://www.usa.gov/Topics/Seniors/Retirement.shtml" target="_blank">http://www.usa.gov/Topics/Seniors/Retirement.shtml</a>');
	} else {
		$('.grade_replacement1').html('Not so hot. You didn\'t pass the quiz.');
		$('.grade_replacement2').html('Practice does indeed make perfect. Brush up on Retirement 101 with these resources: ');
		$('.grade_replacement3').html('<a href="http://www.ssa.gov/retirement/" target="_blank">http://www.ssa.gov/retirement/</a><a href="http://www.usa.gov/Topics/Seniors/Retirement.shtml" target="_blank">http://www.usa.gov/Topics/Seniors/Retirement.shtml</a>');
	}

	container.find('#grade_letter').html('"' + grades[score] + '"');
}

$(document).ready(function() {

	$('input[placeholder], textarea[placeholder]').placeholder();

	setTimeout(function() {
		$('#frame_container').animate(
			{ marginTop: '70px', opacity: 1 },{ duration: 1300, easing: 'swing', complete: function() {
				$('#frame_left').animate( { backgroundPosition: '0px 0px' }, 1000);
				$('#frame_right').animate( { backgroundPosition: '-20px 0' }, 1000, function() {
					$('#homepage').animate({opacity: 1},'slow');
					$('#footer').animate({bottom: 0}, '1000', function() { $('#logo').fadeIn(2000);});
				});
				}
			});
	}, 1000);
	
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
			if ($(this).attr('id') == 'submission_email') {
				var email_check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;

				return !email_check.test($(this).val());
			} else if ($(this).attr('id') == 'submission_branch') {
				return $(this).val() != 'Branch Location';
			} else if ($(this).val() == '') {
				return true;
			} else {
				return false;
			}
		});

		if (empty.length || $('#submission_branch').val() == 'Branch Location') {
			$('#required_span').animate({opacity: 1}, 500);
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
			container.find('.answered_correctly').fadeIn('slow');
			correct_amount++
			updateGrade(correct_amount);
		} else {
		// WRONG
			correct_choice.find('.mark').remove();
			correct_choice.append('<div class="mark circle"></div>');
			wrong_choices.find('.mark').remove();
			wrong_choices.append('<div class="mark ex"></div>');
			wrong_choices.find('p').css('text-decoration', 'line-through');
			container.find('.answered_incorrectly').fadeIn('slow');
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

			if (container.next().find('.answers').length) {
				button.replaceWith('<a href="#" class="btn next next_question">Next Question</a>');
			} else {
				button.replaceWith('<a href="#" class="btn next finish_quiz">Finish Quiz</a>');
			}

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
					self.parents('.block').find('.bad_promo').animate({opacity: 1},'slow');
				}
			}
		});
		return false;
	});

});