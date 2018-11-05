import './Archive.html';
import {Template} from 'meteor/templating';
import {Resource} from '../../../api/resource.js';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Patients} from '../../../api/patients.js';
import {Appointments} from '../../../api/appointments.js';
import {Services} from '../../../api/services.js';
import {Doctors} from '../../../api/doctors.js';


Template.Archive.onRendered(function ArchiveOnRendered(){
  Session.set('patientId', FlowRouter.getParam('patientId'));
  Meteor.subscribe('patients');
  Meteor.subscribe('appointments', function(err){
    if(err)
    {
      toastr.error(err.reason);
    }
    else
    {
      $('.collapse').collapse();
    }
  });

  Meteor.subscribe('services');
  Meteor.subscribe('treatments');
  Meteor.subscribe('doctors');
});

Template.patientHistory.helpers({

  patientId()
  {
    return FlowRouter.getParam('patientId');
  },
  patientName()
  {
    const currPatient = Patients.findOne({_id: Session.get('patientId')});

    return `${currPatient.name} ${currPatient.surname}`;
  },
  appointments()
  {
    const appointmentsCursor = Appointments.find({patientId: Session.get('patientId')});
    return appointmentsCursor;
  },

  getServiceName(_id)
  {
    return Services.findOne({_id}).name;
  },

  getDoctorName(_id)
  {
    const doctor = Doctors.findOne({_id});
    return `${doctor.name} ${doctor.surname}`;
  },
});
