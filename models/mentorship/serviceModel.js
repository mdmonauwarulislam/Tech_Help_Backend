const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    duration: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    availability: [{ 
        day: String, 
        times: [String] 
    }],
    isGroupSession: { 
        type: Boolean, 
        default: false 
    },
    maxParticipants: { 
        type: Number, 
        default: 1 
    },
    zoomLink: { 
        type: String 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
