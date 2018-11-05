FlowRouter.route('/', {
  action(){
      BlazeLayout.render('mainLayout', {
        content: 'home'
      });
  }
});

FlowRouter.route('/createUser', {
  action(){
      BlazeLayout.render('mainLayout', {
        content: 'createUser'
      });
  }
});

FlowRouter.route('/authorizeUser', {
  action(){
      BlazeLayout.render('mainLayout', {
        content: 'authorizeUser'
      });
  }
});

FlowRouter.route('/createDoctor', {
  action(){
      BlazeLayout.render('mainLayout', {
        content: 'createDoctor'
      });
  }
});

FlowRouter.route('/registerPatient', {
  action(){
      BlazeLayout.render('mainLayout', {
        content: 'registerPatient'
      });
  }
});

FlowRouter.route('/createClinic', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createClinic'
    });
  }
});

FlowRouter.route('/createMaster', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createMaster'
    });
  }
});

FlowRouter.route('/createMasterType', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createMasterType'
    });
  }
});

FlowRouter.route('/createResource', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createResource'
    });
  }
});

FlowRouter.route('/appointment/:patientId/:eventId/:doctorId', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'appointment'
    });
  }
});

FlowRouter.route('/createTreatment', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createTreatment'
    });
  }
});

FlowRouter.route('/createDiagnosis', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createDiagnosis'
    });
  }
});

FlowRouter.route('/createSymptom', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createSymptom'
    });
  }
});

FlowRouter.route('/patientHistory/:patientId', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'patientHistory'
    });
  }
});

FlowRouter.route('/createService', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createService'
    });
  }
});

FlowRouter.route('/Resource', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'Resource'
    });
  }
});

FlowRouter.route('/Archive', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'Archive'
    });
  }
});

FlowRouter.route('/NSI', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'NSI'
    });
  }
});
