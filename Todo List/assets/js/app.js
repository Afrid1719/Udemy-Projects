$(document).ready(() => {
    $('#add-item').fadeOut(1);
});
var faded = false;
$('.fa-plus').on('click', () => {
    if (faded === false) {
        $('li.current').remove();
        $('#add-item').slideUp(200);
        $('#add-item').val('');
        faded = true;
    } else {
        $('#add-item').slideDown(200);
        faded = false;
        $('#add-item').focus();
    }

});

$('#add-item').on('keyup', addItem);

$('.todos li').on('click', toggleCompletion);


$('li span').on('click', removeItem);

function addItem(e) {

    if (e.target.value !== '') {
        if (e.target.value.length === 1 && e.key !== 'Backspace') {
            $('<li class="current"></li>').insertBefore($('.todos li:first-child'));
        }
        if (e.code === 'Enter')
            saveItem();
        else
            $('li.current').text(e.target.value);
    } else {
        $('li.current').remove();
    }
}


function saveItem() {
    $text = $('li.current').text();
    $trashIcon = '<span><i class="far fa-trash-alt"></i></span>';
    $('li.current').html($trashIcon + $text);
    $('li.current').on('click', toggleCompletion);
    $('li.current').removeClass('current');
    $('#add-item').val('');
}

function removeItem(e) {
    $(e.target).closest('li').remove();
}

function toggleCompletion(e) {
    $(e.target).toggleClass('completed');
}