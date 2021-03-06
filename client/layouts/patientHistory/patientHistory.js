import './patientHistory.html';
import {Template} from 'meteor/templating';
import {Patients} from '../../../api/patients.js';
import {Appointments} from '../../../api/appointments.js';
import {Services} from '../../../api/services.js';
import {Doctors} from '../../../api/doctors.js';

Template.patientHistory.onRendered(function patientHistoryOnRendered(){
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
  getServicePrice(_id)
  {
    return Services.findOne({_id}).price;
  },
  getTreatmentName(_id)
  {
    return Treatments.findOne({_id}).name;
  },
  getDoctorName(_id)
  {
    const doctor = Doctors.findOne({_id});
    return `${doctor.name} ${doctor.surname}`;
  },
  getAppointmentDuration(start, end)
  {
    const startTime = moment(start),
          endTime = moment(end);

    return beautifyMilliseconds(endTime.diff(startTime));
  },
  isEven(index)
  {
    return index % 2;
  }
});

function beautifyMilliseconds(ms)
{
  const hours = parseInt(ms / 3600000),
        tempms = ms % 3600000,
        minutes = parseInt(tempms / 60000);

  return `${hours} часов, ${minutes} минут`;
}
