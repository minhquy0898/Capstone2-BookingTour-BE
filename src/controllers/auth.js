import * as authService from '../services/auth'

const register = async (req, res) => {
    const { name, phone, password } = req.body
    try {
        if (!name || !phone || !password) return res.status(400).json({
            err: 1,
            msg: "Missing input"
        })
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at auth cpntroller " + error
        })
    }
}

