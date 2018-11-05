import './createMaster.html';

import {Template} from 'meteor/templating';
import {Masters} from '../../../api/masters.js';
import {MasterTypes} from '../../../api/masterTypes.js';


Meteor.subscribe('doctorTypes');

Template.createMaster.helpers({
  masterTypes()
  {
    return MasterTypes.find();
  },
  getMasterType(_id)
  {
    masterType = MasterTypes.findOne({_id});
    return masterType.name;
  },
  masters()
  {
    return Masters.find();
  },
  incIndex(i)
  {
    return i + 1;
  }


});



Template.createMaster.events({
  'submit #cd-form'(e, t)
  {
    e.preventDefault();

    const $phone = $('#cd-phone'),
          $email = $('#cd-email'),
          $name = $('#cd-name'),
          $surname = $('#cd-surname'),
          $masterType = $("#cd-master-type"),
          data = {
            phone: $phone.val(),
            email: $email.val(),
            name: $name.val(),
            surname: $surname.val(),
            masterType: $masterType.val()
          };

    Meteor.call('masters.insert', data, function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('Новый врач добавлен');
        $phone.val('');
        $email.val('');
        $name.val('');
        $surname.val('');
        $masterType.val('');
      }
    });
  }


});

Template.createMaster.events({
  'click .deleteMaster': function (event,) {
  Meteor.call('masters.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Врач удален');
    }
  })
}
});


Template.createMaster.helpers({
  masters: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return Masters.find({name: regexp});
  }
});

Template.createMaster.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});
