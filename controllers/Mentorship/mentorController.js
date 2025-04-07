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
    const { username, experties, yearofexperience, company, about, category, languages, skills } = req.body;
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
        languages,
        category,
        skills,
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

const getMentors = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const mentors = await mentorModel.find(query);
    res.status(200).json({ success: true, data: mentors });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getMentorById = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await mentorModel.findById(mentorId).populate('services').populate('education').populate('experience');
    if (!mentor) {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }
    res.status(200).json({ success: true, data: mentor });
  } catch (error) {
    console.error("Error fetching mentor:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getMentorProfile,
  updateMentorProfile,
  getMentors,
  getMentorById
};
