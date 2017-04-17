$(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#doDelete').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var name = button.data('name');
        var modal = $(this);
        modal.find('.modal-body').text(name);
        modal.find('.modal-footer .btn-primary').attr('data-url', button.data('url')).attr('data-id', button.data('id'));
    });

    $('#sureDoDelete').click(function () {
        var _this = $(this);
        var _url = _this.attr('data-url'), _id = _this.attr('data-id');
        $.post(_url, {'id': _id, '_token': $('#doDelete').find('input[name="_token"]').val()}, function (response) {
            $('#doDelete').modal('hide');
            doAlert(response.msg);
            location.reload();
        });
    });
    $('[data-toggle="tooltip"]').tooltip({
        'template': '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner" style="background:none; border:1px solid #666; color: #333; word-wrap: break-word;word-break: normal;"></div></div>',
    });
});

function doAlert(msg, callback) {
    var doAlert = $('#doAlert');
    doAlert.find('.modal-body').text(msg);
    doAlert.modal('show');
    doAlert.on('hide.bs.modal', function (event) {
        callback ? callback() : '';
    });
}
