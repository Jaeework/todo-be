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

        const hashedPassword = await bcrypt.hash(password, saltRound);
        const newUser = new User({ email, name, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ status: "success" });
    } catch(err) {
        console.log("err: ", err);
        res.status(400).json({ status: "fail", err });
    }
}

userController.signinWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email}, "-createdAt -updatedAt -__v");

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = user.generateToken();
                return res.status(200).json({ status: "success", user, token });
            }
            throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    } catch (err) {
        res.status(400).json({ status: "fail", err });
    }
}

module.exports = userController;
