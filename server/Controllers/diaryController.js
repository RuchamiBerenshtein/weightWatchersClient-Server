const diaryService = require('../services/diaryService');


const getDiary = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const diary = await diaryService.getDiary(id);
        res.status(200).json({
            diary
        })
    } catch (error) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
}

const addNewDay = async (req, res) => {
    const id = parseInt(req.params.id);
    const { newDay } = req.body;
    console.log(newDay);
    console.log(id)

    try {
        const dayId = await diaryService.addNewDay(id, newDay);

        res.status(200).json({
            massage: `new day created successfully! day id is: ${dayId}`
        })
    } catch (error) {
        res.status(500).json({
            massage: `writing to json was failed ${err}`
        })
    }
}

const updateDay = async (req, res) => {
    const id = parseInt(req.params.id);
    const { day } = req.body;
    const dayId = parseInt(req.params.dayId);

    if (dayId !== day.id) {
        res.status(400).json({
            massage: 'there is not a same day'
        });
    }

    const existingDay = diaryService.existingDay(id, dayId);
    if (!existingDay) {
        res.status(400).json({
            massage: 'day is not find'
        })
    }

    diaryService.updateDay(id, dayId, day);
    res.status(200).json({
        massage: `user ${dayId} is updated`
    })
}

const deleteDay = async (req, res) => {
    const id = parseInt(req.params.id);
    const dayId = parseInt(req.params.dayId);

    try {
        const deleteDay = await diaryService.deleteDay(id, dayId);
        res.status(200).json({
            massage: `day ${deleteDay + 1} was deleted`
        })

    }
    catch (err) {
        res.status(500).json({
            massage: `writing to json was failed ${err}`
        })
    }
}

module.exports = {
    getDiary,
    addNewDay,
    updateDay,
    deleteDay,

}
