const Event = require('../../models/event');
const User = require('../../models/user');
const { datetoString } = require('../../helpers/date');

const events = async eventIds => {
    try {
    const events = await Event.find({_id: {Sin: eventIds } })
      return events.map(event => {
        return { 
              ...event._doc, 
              _id: event.id, 
              date: dateToString(event._doc.date),
              creator: user.bind(this, event.creator) 
         };
      });
    } catch (err) {
        throw err;
    }
  };

  /// additional Function

  const singleEvent = async eventId => {
    try {
const event = await Event.findById(eventId);
return transformEvent(event);
    } catch (err) {
      throw err;
    }
  };
  
  /// second Function

  const user = async userId => {
      try {
    await User.findById(userId)
      return { 
          ...user._doc,
              _id: user.id, 
              createdEvents: events.bind(this, user._doc.createdEvents)
      };
    } catch (err) {
        throw err;
    }
  };

const transformEvent = event => {
    return {
          ...event._doc, 
          _id: event.id, 
          date: dateToString(event._doc.date),
          creator: user.bind(this, event.creator) 
    };
  };

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id, 
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.createdAt)
      }; 
    };
  
    exports.transformEvent = transformEvent;
    exports.transformBooking = transformBooking;
  // exports.user = user;
  // exports.events = events;
  // exports.singleEvent = singleEvent;