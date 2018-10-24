import {Mongo} from 'meteor/mongo';

export const Resource = new Mongo.Collection('resource');

if(Meteor.isServer)
{
  Meteor.publish('resource', function resourcePublication(){
    return Resource.find();
  });

  Meteor.methods({
    'resource.insert'(data)
    {
      Resource.insert(data);
    },
    'resource.delete'(data){
      Resource.remove(data)
    },
    'resource.edit'(data)
    {
      Resource.update(data.id, {
      $set: { name: data.name},
      $set: { sht: data.sht}
    }
  );
}
  });
}
