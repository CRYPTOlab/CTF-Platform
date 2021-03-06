// Generated by CoffeeScript 1.6.3
(function() {
  window.load_group_memberships = function() {
    return $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/api/groups'
    }).done(function(data) {
      var g, html, permission, _i, _len;
      html = "<div class=\"control-group\">";
      if (data.length === 0) {
        html += "<p class=\"text-info\">You are currently not a member of any groups.</p>";
      } else {
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          g = data[_i];
          if (g['owner'] === true) {
            permission = 'owner';
          } else {
            permission = 'member';
          }
          html += "<div class=\"controls " + permission + "\" id=\"gid_" + g.id + "\">" + g.name + "<div class=\"close remove-group-button\">&times;</div></div>";
        }
      }
      html += "</div>";
      $('#group_membership_table').html(html);
      return $('.remove-group-button').click(function(event) {
        return leave_group($(this).parent());
      });
    });
  };

  window.submit_new_group_membership = function() {
    return $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/api/joingroup',
      data: {
        name: $('#group_join_input').val()
      }
    }).done(function(data) {
      var msg_class;
      if (data['status'] === 0) {
        msg_class = 'error';
      } else if (data['status'] === 1) {
        msg_class = 'success';
        load_group_memberships();
      } else if (data['status'] === 2) {
        msg_class = 'default';
      } else if (data['status'] === 3) {
        msg_class = 'default';
      }
      return $.ambiance({
        message: data['message'],
        type: msg_class,
        timeout: 3
      });
    });
  };

  window.create_new_group = function() {
    return $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/api/creategroup',
      data: {
        name: $('#group_join_input').val()
      }
    }).done(function(data) {
      var msg_class;
      if (data['status'] === 0) {
        msg_class = 'error';
      } else if (data['status'] === 1) {
        msg_class = 'success';
        load_group_memberships();
      } else if (data['status'] === 2) {
        msg_class = 'default';
        $('#create-group-button').fadeOut('fast', function() {
          return $('#join-group-button').fadeIn('fast');
        });
      }
      return $.ambiance({
        message: data['message'],
        type: msg_class,
        timeout: 3
      });
    });
  };

  window.submit_new_password = function() {
    return $.ajax({
      type: 'POST'
    }, {
      dataType: 'json',
      url: '/api/updatepass',
      data: {
        pwd: $('#new-pass').val(),
        conf: $('#conf-pass').val()
      }
    }).done(function(data) {
      var msg_class;
      if (data['status'] === 0) {
        msg_class = 'error';
      } else if (data['status'] === 1) {
        msg_class = 'success';
      }
      $.ambiance({
        message: data['message'],
        type: msg_class,
        timeout: 3
      });
      $('#new-pass').val('');
      return $('#conf-pass').val('');
    });
  };

  window.leave_group = function(div) {
    console.log(div.attr('id'));
    return $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/api/leavegroup',
      data: {
        gid: div.attr('id').replace('gid_', '')
      }
    }).done(function(data) {
      var msg_class;
      if (data['status'] === 0) {
        msg_class = 'error';
      } else if (data['status'] === 1) {
        msg_class = 'success';
        load_group_memberships();
      }
      return $.ambiance({
        message: data['message'],
        type: msg_class,
        timeout: 3
      });
    });
  };

  $(document).ready(function() {
    $('#join-group-button').click(function(event) {
      event.preventDefault();
      submit_new_group_membership();
      return false;
    });
    $('#create-group-button').click(function(event) {
      event.preventDefault();
      create_new_group();
      return false;
    });
    return $('#update-password-button').click(function(event) {
      event.preventDefault();
      submit_new_password();
      return false;
    });
  });

}).call(this);
