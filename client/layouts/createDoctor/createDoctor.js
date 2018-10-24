import './createDoctor.html';

import {Template} from 'meteor/templating';
import {DoctorTypes} from '../../../api/doctorTypes.js';
import {Doctors} from '../../../api/doctors.js';
import {MasterTypes} from '../../../api/masterTypes.js';


Meteor.subscribe('doctorTypes');

Template.createDoctor.helpers({
  masterTypes()
  {
    return MasterTypes.find();
  },
  getMasterType(_id)
  {
    masterType = MasterTypes.findOne({_id});
    return masterType.name;
  },
  doctors()
  {
    return Doctors.find();
  },
  incIndex(i)
  {
    return i + 1;
  }


});



Template.createDoctor.events({
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

    Meteor.call('doctors.insert', data, function(err){
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

Template.createDoctor.events({
  'click .deleteDoctor': function (event,) {
  Meteor.call('doctors.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Врач удален');
    }
  })
}
});


Template.createDoctor.helpers({
  doctors: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return Doctors.find({name: regexp});
  }
});

Template.createDoctor.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});
