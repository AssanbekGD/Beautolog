import {Mongo} from 'meteor/mongo';

export const MasterTypes = new Mongo.Collection('masterTypes');

if(Meteor.isServer)
{
  Meteor.publish('masterTypes', function MasterTypesPublication(){
    return MasterTypes.find();
  });

  Meteor.methods({
    'masterTypes.insert'(data)
    {
      MasterTypes.insert(data);
    },
    'masterTypes.delete'(data){
      MasterTypes.remove(data)
    },
    'masterTypes.edit'(data)
    {
      MasterTypes.update(data.id, {
      $set: { name: data.name},
      
    }
  );
}
  });
}
