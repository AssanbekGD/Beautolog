import './createService.html';
import {Template} from 'meteor/templating';
import {Services} from '../../../api/services.js';
import {ReactiveDict} from 'meteor/reactive-dict';

Meteor.subscribe('services');

Template.createService.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.createService.helpers({
  services()
  {
    return Services.find();
  },
  incIndex(index)
  {
    return ++index;
  }
});

Template.createService.events({
  'submit #cd-form'(e, t)
  {
    e.preventDefault();

    const $name = $('#cd-service-name'),
          $price = $('#cd-service-price'),
          data = {
            name: $name.val(),
            price: $price.val(),

          };

    Meteor.call('services.insert', data, function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('Новый ресурс добавлен');
        name.val('');
        price.val('');

      }
    });
  }
});

Template.createService.events({
  'click .deleteService': function (event,) {
  Meteor.call('services.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Удален');
    }
  })
}
});


Template.createService.helpers({
  service: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return Services.find({name: regexp});
  }
});

Template.createService.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});


Template.createService.events({
  'input .name': function (event, instance) {
    instance.state.set('edittedService', event.target.innerText);
  },
})

Template.createService.events({
  'click .editService': function (event) {
    const instance = Template.instance();
    const data = {
      id: this._id,
      name: instance.state.get('edittedService')
    }
    Meteor.call('services.edit', data, function(err, result){
      if(err){
        toastr.error(err.reason);
      }
      else {
        toastr.success('Изменен');
      }
    })
  }
});
