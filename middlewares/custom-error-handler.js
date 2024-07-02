const errorHandler = (err, req, res, next) => {
    res.status(400).json({
        msg: `Something is wrong, checkout`
    })
}


module.exports = errorHandler;