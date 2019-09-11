const mongoose = require('mongoose')

const Project = mongoose.model('Project')
const Task = mongoose.model('Task')

const TasksIncomplete = require('../methods/TasksIncomplete')
const TasksCompleted = require('../methods/TasksCompleted')

module.exports = {
  async index(req, res) {
    try {
      const projects = await Project.find().populate(['user', 'tasks']);    

      const incomplete = await TasksIncomplete.method(Task)
      const completed = await TasksCompleted.method(Task)


      return res.send({ 
        projects,
        tasks: [ 
          {
            title: 'Tasks', 
            creatable: true,
            completed: false,
            tasks: incomplete
          }, 
          {
            title: 'Pause', 
            creatable: false,
            completed: false,
            tasks: incomplete
          }, 
          {
            title: 'Completed', 
            creatable: false,
            completed: true,
            tasks: completed
          }
        ]
       })

    } catch (err) {
      return res.status(400).send({ error: 'Error loading projects' })
    }
  },


  async show(req, res) {
    try {
      const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);

      return res.send({ project })

    } catch (err) {
      return res.status(400).send({ error: 'Error loading project' })
    }
  },

  

  async create(req, res) {
    try {
      const { title, color, tasks } = req.body;

      const project = await Project.create({ title, color, user: req.userId.id });

      await Promise.all(tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project._id });

        await projectTask.save();

        project.tasks.push(projectTask);
      }));

      await project.save();


      return res.send({ project })

    } catch (err) {
      return res.status(400).send({ error: 'Error creating new project' })
    }

  },

  async update(req, res) {

    try {
      const { title, color, tasks } = req.body;

      const project = await Project.findByIdAndUpdate(req.params.projectId,
        {
          title,
          color,
        }, { new: true });


      project.tasks = []
      await Task.remove({ project: project._id })

      await Promise.all(tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project._id });

        await projectTask.save();

        project.tasks.push(projectTask);
      }));

      await project.save();


      return res.send({ project })

    } catch (err) {
      return res.status(400).send({ error: 'Error creating new project' })
    }



  },

  async destroy(req, res) {
    try {

      await Project.findByIdAndRemove(req.params.projectId);

      return res.send()

    } catch (err) {
      return res.status(400).send({ error: 'Error deleting project' })
    }
  }
}