const User = require('../model/User');
const bcrypt = require("bcryptjs")
const saltRound = 10;

const userController = {}

userController.createUser = async(req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({email});
        
        if (user) {
            throw new Error("이미 가입이 된 유저 입니다.");
        }

        const hash = bcrypt.hashSync(password, saltRound);
        const newUser = new User({ email, name, password: hash });
        await newUser.save();

        res.status(200).json({ status: "success" });
    } catch(err) {
        console.log("err: ", err);
        res.status(400).json({ status: "fail", err });
    }
}

module.exports = userController;
