const Event = require('../../models/event');
const { transformEvent } = require('./merge');
const User = require('../../models/user');

/// Function

module.export = {
    events: async () => {
        try {
      const events = await Event.find()
      return events.map(event => {
          return transformEvent(event);
        });
    } catch (err) {
        throw err;
     }
    },

    /// Function

    createEvent: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
    
      const event = new Event({
         title: args.eventImput.title,
         description: args.eventImput.description,
         price: +args.eventImput.price,
         date: new Date(args.eventImput.date),
         creator: req.userId
      });
      let createdEvent;
      try {
      const result = await event
      .save()
        createdEvent = transformEvent(result);
        const user = await User.findById(req.userID);
    
        if (!user) {
          throw new Error('User not found.');
      }
      user.createdEvents.push(event);
       await user.save();
    
       return createdEvent;
      } catch (err) {
          throw err;
      }
    },


};
