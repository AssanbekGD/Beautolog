import {Mongo} from 'meteor/mongo';

export const Services = new Mongo.Collection('services');

if(Meteor.isServer)
{
  Meteor.publish('services', function servicesPublication(){
    return Services.find();
  });

  Meteor.methods({
    'services.insert'(data)
    {
      Services.insert(data);
    },
    'services.delete'(data){
      Services.remove(data)
    },
    'services.edit'(data)
    {
      Services.update(data.id, {
      $set: { name: data.name},
    }
  );
}
  });
}
