const path = require("path");
const ratings = require(path.resolve("src/data/ratings-data"));

function isExists(customErrorMessage, paramName, type) {
    return function isRatingExists(req, res, next) {
        const id = req.params[paramName];
        const ratingFound = ratings.filter((rating) => rating[type] === Number(id))
        if (ratingFound.length > 0) {
            res.locals.data = ratingFound;
            return next()
        }
        next({
            status: 404,
            message: `${customErrorMessage}: ${id}`,
        });
    }
}

function list(req, res) {
    res.json({data: ratings})
}

function getRatingsForNote(req, res) {
    const ratings = res.locals.data;
    res.json({data: ratings})
}

function getRatingForNote(req, res, next) {
    const {noteId, ratingId} = req.params;
    const ratings = res.locals.data;
    const ratingFoundForNoteId = ratings.find(({id}) => id === Number(ratingId));
    if (ratingFoundForNoteId) {
        res.json({data: ratingFoundForNoteId})
    } else {
        next({
            status: 404,
            message: `Rating not found for rating id ${ratingId} and note id ${noteId} `
        })
    }
}

function read(req, res) {
    const rating = res.locals.data[0];
    res.json({data: rating})
}

module.exports = {
    list,
    read: [
        isExists('Rating not found for id', 'ratingId', 'id'),
        read
    ],
    allNoteRatings: [
        isExists('Ratings not found for Note id', 'noteId', 'noteId'),
        getRatingsForNote
    ],
    noteRating: [
        isExists('Ratings not found for Note id', 'noteId', 'noteId'),
        getRatingForNote
    ]
}