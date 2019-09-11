module.exports = {
    method(getCollection) {
        return getCollection.aggregate([{
            $match: {
                'completed': true,
            }
        },
        {
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "task"
            },
        },
        {
            $unwind: '$task'
        },
        {
            $project: {
                completed: 1,
                title: '$task.title',
                text: 1,
                color: '$task.color',
                assignedTo: 1,
                project: 1,
                createdAt: 1,
            }
        }
        ]);

    }

}

