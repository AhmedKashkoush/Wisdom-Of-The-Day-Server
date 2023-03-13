const success = (res,options) => {
    const {code , data , message} = options;
    res.status(code || 200).json({
        status: 'success',
        code: code || 200,
        data: data,
        message: message
    });
}

const failure = (res,options) => {
    const {code , message} = options;
    res.status(code || 500).json({
        status: 'failure',
        code: code || 500,
        message: message
    });
}

module.exports = {
    success,failure
}