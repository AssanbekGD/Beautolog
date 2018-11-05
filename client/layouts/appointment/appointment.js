import './appointment.html';
import {Template} from 'meteor/templating';
import {Patients} from '../../../api/patients.js';
import {Services} from '../../../api/services.js';
import {Resource} from  '../../../api/resource.js';
import {Events} from '../../../api/events.js';
import {Appointments} from '../../../api/appointments.js';

Template.appointment.onRendered(function appointmentOnRendered(){


  Meteor.subscribe('patients', function(err){
    if(err)
    {
      toastr.error(err.reason);
    }
    else
    {
      const _id = FlowRouter.getParam('patientId'),
            currentPatient = Patients.findOne({ _id });
      Session.set('currentPatient', currentPatient);
    }
  });

  Meteor.subscribe('services', function(err){
    if(err)
    {
      toastr.error(err.reason);
    }
    else
    {
      $(".services-list").select2();
    }
  });



  Meteor.subscribe('events', function(err){
    if(err)
    {
      toastr.error(err.reason);
    }
  });


  $('#finish-button').parent().hide();
  $('#add-treatment-group-button').parent().hide();
});

Template.appointment.helpers({

  patientId()
  {
    return Session.get('currentPatient')._id;
  },
  patientName()
  {
    const name = Session.get('currentPatient').name,
          surname = Session.get('currentPatient').surname;

    return `${name} ${surname}`;
  },

  services()
  {
    return Services.find();
  },

  treatmentGroupIndex(index)
  {
    return index + 1;
  }
});


Template.appointment.events({

  'click #start-button'(e, t)
  {
    e.preventDefault();

    $('select, input').removeAttr('disabled');
    $('select').select2({});
    $('#finish-button').parent().show();
    $('#add-treatment-group-button').parent().show();
    $('#start-button').parent().hide();

    let now = moment().format();
    Session.set('startTime', now);
  },
  'submit #create-appointment-form'(e, t)
  {
    e.preventDefault();

    const $symptoms = $("#symptoms-list"),
          symptoms = $symptoms.val(),
          startTime = Session.get('startTime'),
          endTime = moment().format(),
          patientId = FlowRouter.getParam('patientId'),
          doctorId = FlowRouter.getParam('doctorId'),
          $treatmentGroups = $('.treatment-group'),
          treatmentGroups = [],
          teeth = Session.get('teeth');

    for(let i = 0, len = $treatmentGroups.length; i < len; i ++)
    {
      treatmentGroups.push({
        services: $($treatmentGroups[i]).find('.services-list').val(),

      });
    }

    data = {symptoms, treatmentGroups, startTime, endTime, patientId, doctorId, teeth};

    let now = moment().format();
    Session.set('startTime', now);

    Appointments.insert(data, function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('Прием добавлен в базу данных');
      }
    });

    Events.update({_id: FlowRouter.getParam('eventId')}, {$set: {finished: true}},
    function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('Статус события изменен');
      }
    });
  },
  'click #history-link'(e, t)
  {
    e.preventDefault();
    FlowRouter.go(`/patientHistory/${FlowRouter.getParam('patientId')}`);
  },
  'click #cancel-event-link'(e, t)
  {
    e.preventDefault();
    let eventId = FlowRouter.getParam('eventId'),
        patientId = FlowRouter.getParam('patientId');

    Events.remove({_id: FlowRouter.getParam('eventId')}, function(err)
    {
      if(err)
        toastr.error(err.reason);
      else
      {
         toastr.success('Прием отменен');
         FlowRouter.go('/registerPatient');
      }
    });
  },
  'click #add-service'(e, t)
  {
    e.preventDefault();

    let $lastdiagnoseslist = $('.services-list').last(),
        $ltgClone2 = $lastdiagnoseslist.clone();

        $lastdiagnoseslist.after($ltgClone2);
        $ltgClone2.find('.select2').remove();
},

  'click #add-treatment-group-button'(e, t)
  {
    e.preventDefault();

    let $lastTreatmentGroup = $('.treatment-group').last(),
        $ltgClone = $lastTreatmentGroup.clone();

    $lastTreatmentGroup.after($ltgClone);
    $ltgClone.find('.select2.select2-container').remove();
    $ltgClone.find('select').select2();

    let headerText = $ltgClone.find('h4').html(),
        treatmentLabel = headerText.split(' ')[0],
        treatmentNumber = parseInt(headerText.split(' ')[1]);

    $ltgClone.find('h4').html(`${treatmentLabel} ${++treatmentNumber}`);
  }
});
