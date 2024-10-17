const projectModel = require('../models/projectModel');
const httpsStatusCode = require('../constant/httpsStatusCode')


// Add a new project
const addProject = async (req, res) => {
  const { title, description, skills, links } = req.body;
  try {
    if(!title || !description || !skills || !links) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }
   
    const newProject = await projectModel.create({
      title,
      description,
      skills,
      links,
    });
    return res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: 'Project added successfully',
      data: newProject,
    });
  } catch (error) {
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error : error.message
    });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const getprojects = await projectModel.find();
    return res.status(httpsStatusCode.OK).json({
      success: true,
      data: getprojects,
    });
  } catch (error) {
    res.status(httpsStatusCode.BAD_REQUEST).json({
      success: false,
      message: 'Something went wrong',
        error : error.message
    });
  }
};


// Update an existing project
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, skills, links } = req.body;

  try {
    if(!title || !description || !skills || !links) {
        return res.status(httpsStatusCode.BAD_REQUEST).json({
            success: false,
            message: 'Please provide all required fields',
        });
        }
    if(Array.isArray(description) > 3 || Array.isArray(skills) > 3) {
        return res.status(httpsStatusCode.BAD_REQUEST).json({
            success: false,
            message: 'Please provide upto 3 description and skills',
        });
    }
    const updatedProject = await projectModel.findByIdAndUpdate(id, { 
        title, 
        description, 
        skills, 
        links 
    },
      
    );

    if (!updatedProject) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error) {
    console.error(error.message);
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Server error while updating project',
    });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await projectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: 'Project not found',
      });
    }
    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Server error while deleting project',
      error : error.message
    });
  }
};


module.exports = { addProject, getProjects, updateProject, deleteProject };