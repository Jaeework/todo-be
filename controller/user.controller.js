const User = require('../model/User');
const bcrypt = require("bcryptjs")
const saltRound = 10;

const userController = {}

userController.createUser = async(req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({email});
        
        if (user) {
            throw new Error("This email is already in use");
        }

        const hashedPassword = await bcrypt.hash(password, saltRound);
        const newUser = new User({ email, name, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ status: "success" });
    } catch(error) {
        console.log("error: ", error);
        res.status(400).json({ status: "fail", message: error.message });
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
        }
        throw new Error("Invalid email or password");
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
}

module.exports = userController;
