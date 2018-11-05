import {Mongo} from 'meteor/mongo';

export const Masters = new Mongo.Collection('masters');

if(Meteor.isServer)
{
  Meteor.publish('masters', function mastersPublication(){
    return Masters.find();
  });

  Meteor.methods({
    'masters.insert'(data)
    {
      return Masters.insert(data);
    },
    'masters.delete'(data){
      Masters.remove(data)
    }
  });



}
