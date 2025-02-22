const httpsStatusCode = require("../../constant/httpsStatusCode");
const mentorModel = require("../../models/mentorModel");

// const updatementorSkills =  async (req, res) => {
//     try {
//         const {skills} = req.body;
//         const userId = req.user.user.userId;
//         const mentor = await mentorModel.findByIdAndUpdate(userId, {
//             skills: skills
//         }, {new: true});
//         if(!mentor){
//             return res.status(httpsStatusCode.BAD_REQUEST).json({
//                 status: false,
//                 message: "mentor not found"
//             });
//         }
//         return res.status(httpsStatusCode.OK).json({
//             status: true,
//             message: "mentor found",
//             data: mentor
//         });

//     } catch (error) {
//         return res.status(httpsStatusCode.BAD_REQUEST).json({
//             status: false,
//             message: error.message
//         });

//     }
// }



// Get Mentor Profile
const getMentorProfile = async (req, res) => {
    try {
        const userId = req.user.user.userId;
        if (!userId) {
            return res.status(400).json({ status: false, message: 'Invalid user ID format.' });
        }
        // Find the mentor document using the userId
        const mentor = await mentorModel.findById(userId);

        // Check if the mentor was found
        if (!mentor) {
            return res.status(httpsStatusCode.NOT_FOUND).json({
                status: false,
                message: "mentor not found",
            });
        }

        // Return the mentor data if found
        res.status(httpsStatusCode.OK).json({
            status: true,
            message: "mentor found",
            data: mentor,
        });
    } catch (error) {
        res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message,
        });
    }
};

// Update Mentor Profile
const updateMentorProfile = async (req, res) => {
  try {
    const { username, experties, yearofexperience, company, about, language } = req.body;
    const mentorId = req.user.user.userId;
    let mentor = await mentorModel.findByIdAndUpdate(
      mentorId,
      {
        username,
        experties,
        profilePicture: req.file.filename,
        yearofexperience,
        company,
        about,
        language,
      },
      { new: true }
    );

    if (!mentor) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "Mentor not found",
      });
    }
    return res.status(httpsStatusCode.OK).json({
      status: true,
      message: "Mentor found",
      data: mentor,
    });
  } catch (error) {
    return res.status(httpsStatusCode.BAD_REQUEST).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMentorProfile,
  updateMentorProfile,
};
