import './createMasterType.html';
import {Template} from 'meteor/templating';
import {MasterTypes} from '../../../api/masterTypes.js';
import {ReactiveDict} from 'meteor/reactive-dict';

Meteor.subscribe('masterTypes');

Template.createMasterType.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.createMasterType.helpers({
  diagnoses()
  {
    return MasterTypes.find();
  },
  incIndex(index)
  {
    return ++index;
  }
});

Template.createMasterType.events({
  'submit #cd-form'(e, t)
  {
    e.preventDefault();

    const $name = $('#cd-MasterType-name'),

          data = {
            name: $name.val(),

          };

    Meteor.call('masterTypes.insert', data, function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('Новый тип мастера добавлен');
        name.val('');


      }
    });
  }
});

Template.createMasterType.events({
  'click .deleteMasterType': function (event,) {
  Meteor.call('masterTypes.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Удален');
    }
  })
}
});


Template.createMasterType.helpers({
  masterTypes: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return MasterTypes.find({name: regexp});
  }
});

Template.createMasterType.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});


Template.createMasterType.events({
  'input .name': function (event, instance) {
    instance.state.set('edittedMasterType', event.target.innerText);
  },
})

Template.createMasterType.events({
  'click .editMasterType': function (event) {
    const instance = Template.instance();
    const data = {
      id: this._id,
      name: instance.state.get('edittedMasterType')
    }
    Meteor.call('masterTypes.edit', data, function(err, result){
      if(err){
        toastr.error(err.reason);
      }
      else {
        toastr.success('Изменен');
      }
    })
  }
});
