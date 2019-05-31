module.exports = {
    async index(req, res) {
      res.send({ok: true, urser: req.userId})
    },

}