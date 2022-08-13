const { validationResult } = require("express-validator");

exports.diaryValidatorErrorChecker = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        //console.log(errors.array())
        // if(errors.array[0].pararm==="content"){
        //     return res.status(400).json({ 
        //         error:"내용을 입력하세요."
        //       })
        // }
    }
    next(); 
}