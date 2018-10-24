import './createResource.html';
import {Template} from 'meteor/templating';
import {Resource} from '../../../api/resource.js';
import {ReactiveDict} from 'meteor/reactive-dict';

Meteor.subscribe('resource');

Template.createResource.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.createResource.helpers({
  diagnoses()
  {
    return Resource.find();
  },
  incIndex(index)
  {
    return ++index;
  }
});

Template.createResource.events({
  'submit #cd-form'(e, t)
  {
    e.preventDefault();

    const $name = $('#cd-resource-name'),
          $sht = $('#cd-resource-sht'),
          data = {
            name: $name.val(),
            sht: $sht.val(),

          };

    Meteor.call('resource.insert', data, function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('Новый ресурс добавлен');
        name.val('');
        sht.val('');

      }
    });
  }
});

Template.createResource.events({
  'click .deleteResource': function (event,) {
  Meteor.call('resource.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Удален');
    }
  })
}
});


Template.createResource.helpers({
  resource: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return Resource.find({name: regexp});
  }
});

Template.createResource.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});


Template.createResource.events({
  'input .name': function (event, instance) {
    instance.state.set('edittedResource', event.target.innerText);
  },
})

Template.createResource.events({
  'click .editResource': function (event) {
    const instance = Template.instance();
    const data = {
      id: this._id,
      name: instance.state.get('edittedResource')
    }
    Meteor.call('resource.edit', data, function(err, result){
      if(err){
        toastr.error(err.reason);
      }
      else {
        toastr.success('Изменен');
      }
    })
  }
});
