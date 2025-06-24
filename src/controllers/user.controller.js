export const getUserData = async (req, res) => {
    try {
        const userData = req.user
        return res.status(200).json(userData)
    }
    catch (error) {
        console.error('Error al obtener las órdenes:', error)
        return res.status(error.status || 400).json({ error: error.message })
    }
}
