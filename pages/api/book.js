import connectDB from '../../middleware/mongodb';
import Order from '../../models/order';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { area,price,vehicle,type, email, phone,customerName,customerImage} = req.body;
    if (area && phone && vehicle) { 
      try {
        var newOrder = new Order({
          area,
          price,
          vehicle,
          type,
          email,
          phone,
          customerName,
          customerImage
        });
        newOrder.save()
        .then(data => res.status(200).json({"success": 'You have successfully booked a service'}))
        .catch(err => res.status(422).json({"error": 'incorrect data'}))
      } catch (error) {
          return res.status(500).json({"error": error.message});
        }
      } else {
        res.status(422).json({"error": 'data_incomplete'});
      }
  } else {
    res.status(422).json({"error": 'req_method_not_supported'});
  }
};

export default connectDB(handler);